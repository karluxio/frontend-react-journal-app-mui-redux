import { collection, deleteDoc, getDocs } from "firebase/firestore/lite"
import { addNewEmptyNote, savingNewNote, setActiveNote, startNewNote } from "../../../src/store/journal"
import { firebaseDB } from "../../../src/firebase/config"

describe('testing on journal/thunks', () => {

  const dispatch = jest.fn()
  const getState = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test("startNewNote should create an empty new note", async () => {
    const uid = 'TEST-UID'
    getState.mockReturnValue({ auth: { uid: uid } })

    await startNewNote()(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(savingNewNote())

    const newNote = {
      body: '',
      title: '',
      id: expect.any(String),
      date: expect.any(Number),
      imageUrls: expect.any(Array),
    }

    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote(newNote))

    expect(dispatch).toHaveBeenCalledWith(setActiveNote(newNote))

    // Delete all testing notes
    const collectionRef = collection(firebaseDB, `${uid}/journal/notes`)
    const docs = await getDocs(collectionRef)
    const deletePromises = []
    docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)))
    await Promise.all(deletePromises)
  })
})