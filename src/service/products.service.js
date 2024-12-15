import { db as database } from '../firebaseConfig'
import { query, orderBy, limit, collection, addDoc } from "firebase/firestore"; 
import { getFirebaseDocs } from '../utils';

const productsCollection = collection(database, 'products')

export async function getProducts() {
  const products = await getFirebaseDocs(productsCollection)
  return products
}

export async function getTopProducts(count = 5, field = 'viewCount') {
    const products = await getFirebaseDocs(query(productsCollection, orderBy(field, 'desc'), limit(count)))
    return products
}

export async function addProduct(product) {
  await addDoc(productsCollection, product)
  return product
}