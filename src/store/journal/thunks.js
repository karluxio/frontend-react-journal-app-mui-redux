import { collection, doc, setDoc, deleteDoc } from "firebase/firestore/lite"
import { firebaseDB } from "../../firebase/config"
import { fileUpload, loadNotes } from "../../helpers"
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./"

export const startNewNote = () => {
  return async (dispatch, getState) => {
    try {

      dispatch(savingNewNote())

      const newNote = {
        title: "",
        body: "",
        imageUrls: [],
        date: new Date().getTime()
      };

      const { uid } = getState().auth

      const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`))
      await setDoc(newDoc, newNote)

      newNote.id = newDoc.id

      //! dispatch
      dispatch(addNewEmptyNote(newNote))
      dispatch(setActiveNote(newNote))

    } catch (error) {

    }
  }
}

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    if (!uid) throw new Error('uid is not exists')

    const notes = await loadNotes(uid)
    dispatch(setNotes(notes))
  }
}

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving())

    const { uid } = getState().auth
    const { active: note } = getState().journal

    const noteToFirestore = { ...note }
    delete noteToFirestore.id

    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`)
    await setDoc(docRef, noteToFirestore, { merge: true })

    dispatch(updateNote(note))
  }
}

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving())

    const fileUploadPromises = []

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file))
    }

    const photoUrls = await Promise.all(fileUploadPromises)

    dispatch(setPhotosToActiveNote(photoUrls))

  }
}

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    const { active: note } = getState().journal

    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`)
    await deleteDoc(docRef)

    dispatch(deleteNoteById(note.id))
  }
}