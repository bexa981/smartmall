import { db as database, storage } from "../firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirebaseDocs } from "../utils";

const categoriesCollection = collection(database, "categories");

// ✅ Get Categories with Images
export async function getCategories() {
  try {
    const categories = await getFirebaseDocs(categoriesCollection);
    for (let category of categories) {
      const subCategoriesCollection = collection(database, `categories/${category.id}/subCategories`);
      const subCategories = await getFirebaseDocs(subCategoriesCollection);

      category.subCategories = subCategories.map((sub) => ({
        id: sub.id,
        name: sub.name,
      }));
    }
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

// ✅ Add Category with Name & Image
export async function addCategory(categoryName, categoryImage) {
  if (!categoryName || !categoryImage) {
    throw new Error("Category name and image are required.");
  }

  try {
    // 🔹 Step 1: Upload Image to Firebase Storage
    const imageRef = storageRef(storage, `categoryImages/${categoryImage.name}`);
    await uploadBytes(imageRef, categoryImage);
    const imageUrl = await getDownloadURL(imageRef);

    // 🔹 Step 2: Save Category Name & Image URL to Firestore
    const newCategory = await addDoc(categoriesCollection, {
      name: categoryName,
      image: imageUrl, // ✅ Store Image URL
    });

    console.log("✅ Category added successfully:", newCategory.id);
    return newCategory;
  } catch (error) {
    console.error("🔥 Error adding category:", error);
    throw error;
  }
}

// ✅ Update Category (Name & Image)
export async function updateCategory(categoryId, newCategoryName, newCategoryImage = null) {
  try {
    let updatedData = { name: newCategoryName };

    if (newCategoryImage) {
      // 🔹 Upload new image if provided
      const imageRef = storageRef(storage, `categoryImages/${newCategoryImage.name}`);
      await uploadBytes(imageRef, newCategoryImage);
      const imageUrl = await getDownloadURL(imageRef);
      updatedData.image = imageUrl;
    }

    // 🔹 Update category in Firestore
    const categoryDocRef = doc(database, "categories", categoryId);
    await updateDoc(categoryDocRef, updatedData);

    console.log("✅ Category updated successfully:", categoryId);
  } catch (error) {
    console.error("🔥 Error updating category:", error);
    throw error;
  }
}

// ✅ Delete Category
export async function deleteCategory(categoryId) {
  try {
    const categoryDocRef = doc(database, "categories", categoryId);
    await deleteDoc(categoryDocRef);
    console.log("✅ Category deleted:", categoryId);
  } catch (error) {
    console.error("🔥 Error deleting category:", error);
    throw error;
  }
}
