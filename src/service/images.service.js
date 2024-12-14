import { db as database } from '../firebaseConfig'
import { collection, getDocs } from "firebase/firestore"; 

const imagesCollection = collection(database, 'dashboard-carousel')

export async function getImages() {
  const snapshot = await getDocs(imagesCollection);
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
}