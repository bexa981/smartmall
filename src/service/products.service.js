import {
  query,
  orderBy,
  where,
  startAfter,
  limit,
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db as database } from "../firebaseConfig";

// Firebase'dagi "products" kolleksiyasini aniqlash
const productsCollection = collection(database, "products");

/**
 * Sahifalash yordamida mahsulotlarni olish
 * @param {object|null} lastVisibleProduct - Oxirgi ko'rilgan mahsulot (sahifalash uchun)
 * @param {number} pageSize - Bir sahifada ko'rsatiladigan mahsulotlar soni
 * @returns {object} Mahsulotlar va oxirgi ko'rilgan mahsulot
 */
export async function getPaginatedProducts(lastVisible, pageSize = 10) {
  const q = lastVisible
    ? query(productsCollection, orderBy("name"), startAfter(lastVisible), limit(pageSize))
    : query(productsCollection, orderBy("name"), limit(pageSize));

  const snapshot = await getDocs(q);
  const products = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
  return { products, lastVisible: lastVisibleDoc };
}

export async function searchProductsByName(name) {
  const q = query(productsCollection, where("name", ">=", name), where("name", "<=", name + "\uf8ff"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function filterProductsByCriteria({ category, subCategory, maxPrice }) {
  let filters = [];
  if (category) filters.push(where("category", "==", category));
  if (subCategory) filters.push(where("subCategory", "==", subCategory));
  if (maxPrice) filters.push(where("price", "<=", maxPrice));

  const q = query(productsCollection, ...filters);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}


export async function addProduct(product) {
 try {
   const result = await addDoc(productsCollection, product);
   console.log(product);
   return result.id; // Qo'shilgan hujjat IDsi qaytariladi
 } catch (error) {
   console.error("Mahsulot qo'shishda xatolik:", error);
   throw error; // Xatolikni qaytaring
 }
}

export async function getProductsByGroup(type, limitCount = 5) {
  const q = query(
    productsCollection,
    where("type", "==", type),
    orderBy("name"),
    limit(limitCount)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addProductToGroup(productId, group) {
  const productDoc = doc(productsCollection, productId);
  await updateDoc(productDoc, { type: group });
}

export async function removeProductFromGroup(productId) {
  const productDoc = doc(productsCollection, productId);
  await updateDoc(productDoc, { type: null });
}
/**
 * Mahsulotni yangilash
 * @param {string} productId - Yangilanayotgan mahsulotning ID raqami
 * @param {object} updatedProduct - Yangilangan mahsulot ma'lumotlari
 * @returns {void}
 */
export async function updateProduct(productId, updatedProduct) {
  try {
    const productDoc = doc(productsCollection, productId);
    await setDoc(productDoc, updatedProduct, { merge: true });
    console.log(`Mahsulot (${productId}) muvaffaqiyatli yangilandi.`);
  } catch (error) {
    console.error(`Mahsulot (${productId})ni yangilashda xatolik:`, error);
    throw error;
  }
}

/**
 * Mahsulotni o'chirish
 * @param {string} productId - O'chirilayotgan mahsulotning ID raqami
 * @returns {void}
 */
export async function deleteProduct(productId) {
  try {
    const productDoc = doc(productsCollection, productId);
    await deleteDoc(productDoc);
    console.log(`Mahsulot (${productId}) muvaffaqiyatli o'chirildi.`);
  } catch (error) {
    console.error(`Mahsulot (${productId})ni o'chirishda xatolik:`, error);
    throw error;
  }
}
export async function getTopProducts(count = 5, field = "viewCount") {
  try {
    const q = query(productsCollection, orderBy(field, "desc"), limit(count));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Eng yaxshi mahsulotlarni olishda xatolik:", error);
    throw error;
  }
}

export async function getProducts() {
  try {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Mahsulotlarni olishda xatolik:", error);
    throw error;
  }
}