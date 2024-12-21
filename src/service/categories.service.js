import { db as database } from '../firebaseConfig';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  limit,
  startAfter,
  updateDoc,
} from 'firebase/firestore';
import { getFirebaseDocs } from '../utils';

const categoriesCollection = collection(database, 'categories');
const productsCollection = collection(database, 'products'); // Mahsulotlar kolleksiyasi

// Kategoriyalarni olish
export async function getCategories() {
    const categories = await getFirebaseDocs(categoriesCollection);
    for (let category of categories) {
      const subCategoriesCollection = collection(database, `categories/${category.id}/subCategories`);
      const subCategories = await getFirebaseDocs(subCategoriesCollection);
  
      category.subCategories = subCategories.map(sub => ({
        id: sub.id,
        name: sub.name // Oddiy string sifatida ishlatiladi
      }));
    }
    return categories;
  }

// Subkategoriya mahsulotlarini olish (filtrlash va sahifalash)
export async function getProductsBySubCategory(
  subCategoryName,
  pageSize = 10,
  lastDoc = null
) {
  try {
    let productQuery = query(
      productsCollection,
      where('subCategory.name', '==', subCategoryName),
      limit(pageSize)
    );

    if (lastDoc) {
      productQuery = query(productQuery, startAfter(lastDoc));
    }

    const snapshot = await getDocs(productQuery);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // `lastDoc`ni keyingi sahifa uchun saqlab qo'yish
    const newLastDoc = snapshot.docs[snapshot.docs.length - 1];
    return { products, lastDoc: newLastDoc };
  } catch (error) {
    console.error('Error fetching products by subcategory:', error);
    throw error;
  }
}

// Subkategoriya qo'shish
export async function addSubCategory(categoryId, subCategoryName) {
    const subCategoriesCollection = collection(database, `categories/${categoryId}/subCategories`);
    const result = await addDoc(subCategoriesCollection, {
      name: subCategoryName // Oddiy string sifatida saqlash
    });
    return result;
  }

// Subkategoriya o'chirish
export async function deleteSubCategory(categoryId, subCategoryId) {
  const result = await deleteDoc(
    doc(database, 'categories', categoryId, 'subCategories', subCategoryId)
  );
  return result;
}
export async function updateSubCategory(categoryId, subCategoryId, updatedSubCategory) {
    try {
      const subCategoryDocRef = doc(database, `categories/${categoryId}/subCategories`, subCategoryId);
      await updateDoc(subCategoryDocRef, updatedSubCategory);
      console.log("Subkategoriya muvaffaqiyatli yangilandi:", updatedSubCategory);
    } catch (error) {
      console.error("Subkategoriya yangilashda xatolik:", error);
      throw error;
    }
  }