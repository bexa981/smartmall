// src/firestoreOperations.js
import { db, storage } from "@/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  limit,
} from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

/**
 * Reference to the 'products' collection in Firestore
 */
const productCollection = collection(db, "products");

/**
 * Fetch all products from Firestore
 */
export async function fetchProducts() {
  try {
    const querySnapshot = await getDocs(productCollection);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

/**
 * Fetch a single product by ID
 * @param {string} id - Product ID
 */
export async function fetchProductById(id) {
  try {
    const productDoc = doc(db, "products", id);
    const productSnapshot = await getDoc(productDoc);
    if (productSnapshot.exists()) {
      return { id: productSnapshot.id, ...productSnapshot.data() };
    } else {
      console.warn("No such product!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

/**
 * Fetch recommended products based on category (excluding current product)
 * @param {string} category - Product category
 * @param {string} excludeId - Current product ID to exclude
 */
export async function fetchRecommendedProducts(category, excludeId) {
  try {
    const q = query(
      productCollection,
      where("category", "==", category),
      where("__name__", "!=", excludeId),
      limit(4) // Limit to 4 recommended products
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching recommended products:", error);
    throw error;
  }
}

/**
 * Add a new product to Firestore
 * @param {Object} product - Product data
 */
export async function addProduct(product) {
  try {
    const newProductRef = await addDoc(productCollection, product);
    return { id: newProductRef.id, ...product };
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

/**
 * Delete a product from Firestore
 * @param {string} productId - Product ID
 */
export async function deleteProduct(productId) {
  try {
    const productDoc = doc(db, "products", productId);
    await deleteDoc(productDoc);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

/**
 * Update a product in Firestore
 * @param {string} productId - Product ID
 * @param {Object} updatedData - Updated product data
 */
export async function updateProduct(productId, updatedData) {
  try {
    const productDoc = doc(db, "products", productId);
    await updateDoc(productDoc, updatedData);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

/**
 * Upload a product image to Firebase Storage
 * @param {File} file - Image file
 * @returns {Object} - { downloadURL, storagePath }
 */
export async function uploadProductImage(file) {
  try {
    const uniqueFileName = `${Date.now()}_${file.name}`;
    const storagePath = `products/${uniqueFileName}`;
    const storageReference = storageRef(storage, storagePath);
    const snapshot = await uploadBytes(storageReference, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { downloadURL, storagePath };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

