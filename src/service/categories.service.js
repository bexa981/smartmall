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

// ✅ Get Categories with Images & Subcategories
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
    console.error("🔥 Error fetching categories:", error);
    throw error;
  }
}

// ✅ Add Category with Name & Image
export async function addCategory(categoryName, categoryImage) {
  if (!categoryName || !categoryImage) {
    throw new Error("Category name and image are required.");
  }

  try {
    // 🔹 Upload Image to Firebase Storage
    const imageRef = storageRef(storage, `categoryImages/${categoryImage.name}`);
    await uploadBytes(imageRef, categoryImage);
    const imageUrl = await getDownloadURL(imageRef);

    // 🔹 Save Category to Firestore
    const newCategory = await addDoc(categoriesCollection, {
      name: categoryName,
      image: imageUrl,
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

// ✅ Delete Category (with subcategories)
export async function deleteCategory(categoryId) {
  try {
    // 🔹 Delete subcategories first
    const subCategoriesCollection = collection(database, `categories/${categoryId}/subCategories`);
    const subcategories = await getDocs(subCategoriesCollection);
    subcategories.forEach(async (sub) => {
      await deleteDoc(doc(database, `categories/${categoryId}/subCategories`, sub.id));
    });

    // 🔹 Delete main category
    const categoryDocRef = doc(database, "categories", categoryId);
    await deleteDoc(categoryDocRef);

    console.log("✅ Category deleted:", categoryId);
  } catch (error) {
    console.error("🔥 Error deleting category:", error);
    throw error;
  }
}

// ✅ Add Subcategory
export async function addSubCategory(categoryId, subCategoryName) {
  if (!categoryId || !subCategoryName) {
    throw new Error("Category ID and subcategory name are required.");
  }

  try {
    const subCategoriesCollection = collection(database, `categories/${categoryId}/subCategories`);
    const newSubCategory = await addDoc(subCategoriesCollection, {
      name: subCategoryName,
    });

    console.log("✅ Subcategory added successfully:", newSubCategory.id);
    return newSubCategory;
  } catch (error) {
    console.error("🔥 Error adding subcategory:", error);
    throw error;
  }
}

// ✅ Update Subcategory
export async function updateSubCategory(categoryId, subCategoryId, newSubCategoryName) {
  if (!categoryId || !subCategoryId || !newSubCategoryName) {
    throw new Error("Category ID, subcategory ID, and new name are required.");
  }

  try {
    const subCategoryDocRef = doc(database, `categories/${categoryId}/subCategories`, subCategoryId);
    await updateDoc(subCategoryDocRef, { name: newSubCategoryName });

    console.log("✅ Subcategory updated successfully:", subCategoryId);
  } catch (error) {
    console.error("🔥 Error updating subcategory:", error);
    throw error;
  }
}

// ✅ Delete Subcategory
export async function deleteSubCategory(categoryId, subCategoryId) {
  if (!categoryId || !subCategoryId) {
    throw new Error("Category ID and subcategory ID are required.");
  }

  try {
    const subCategoryDocRef = doc(database, `categories/${categoryId}/subCategories`, subCategoryId);
    await deleteDoc(subCategoryDocRef);

    console.log("✅ Subcategory deleted:", subCategoryId);
  } catch (error) {
    console.error("🔥 Error deleting subcategory:", error);
    throw error;
  }
}
