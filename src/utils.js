import { getDocs } from "firebase/firestore"; 

export async function getFirebaseDocs(collection) {
    const snapshot = await getDocs(collection);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
}