import { db as database } from '../firebaseConfig'
import { collection } from "firebase/firestore"; 
import { getFirebaseDocs } from '../utils';

const imagesCollection = collection(database, 'dashboard-carousel')

export async function getImages() {
  return getFirebaseDocs(imagesCollection)
}