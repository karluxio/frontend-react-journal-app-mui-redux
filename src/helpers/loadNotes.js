import { collection, getDocs } from "firebase/firestore/lite"
import { firebaseDB } from "../firebase/config"

/**
 * @description Fetch notes that belong to the user
 *
 * @remarks
 * To get more info: lumusitech@gmail.com
 * 
 * @public
 *
 * @param {string} uid - The user identifier
 * 
 * @author lumusitech <lumusitech@gmail.com>
 * 
 * @copyright 2023
 * @package helpers
 */

export const loadNotes = async (uid = '') => {
  if (!uid) throw new Error('uid is not exists')

  const collectionRef = collection(firebaseDB, `${uid}/journal/notes`)
  const docs = await getDocs(collectionRef)

  const notes = []

  docs.forEach(doc => {
    notes.push({ id: doc.id, ...doc.data() });
  })

  console.log(notes);

  return notes
}