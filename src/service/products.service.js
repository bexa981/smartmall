import {
  query,
  orderBy,
  limit,
  startAfter,
  collection,
  getDocs,
  doc,
  setDoc,
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
export async function getPaginatedProducts(lastVisibleProduct = null, pageSize = 10) {
  try {
    const q = lastVisibleProduct
      ? query(productsCollection, orderBy("name"), startAfter(lastVisibleProduct), limit(pageSize))
      : query(productsCollection, orderBy("name"), limit(pageSize));

    const snapshot = await getDocs(q);

    // Mahsulotlar ro'yxatini shakllantirish
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;

    return { products, lastVisible };
  } catch (error) {
    console.error("Sahifalash orqali mahsulotlarni olishda xatolik:", error);
    throw error;
  }
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