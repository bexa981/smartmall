<template>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Manage Categories</h2>
  
      <!-- Add Category Form -->
      <form @submit.prevent="addCategory" class="grid grid-cols-1 gap-4 mb-6">
        <div>
          <label class="block font-semibold mb-1">Category ID (Name)</label>
          <input
            type="text"
            v-model="newCategoryId"
            placeholder="Enter category ID"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
            required
          />
        </div>
  
        <div>
          <label class="block font-semibold mb-1">Category Image</label>
          <input type="file" @change="handleImageUpload" accept="image/*" />
          <p v-if="imageError" class="text-red-500 text-sm">{{ imageError }}</p>
        </div>
  
        <button
          type="submit"
          :disabled="!newCategoryId || !newCategoryImage"
          class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Add Category
        </button>
      </form>
  
      <!-- Category List -->
      <ul class="mt-6">
        <li
          v-for="category in categories"
          :key="category.id"
          class="flex items-center justify-between bg-gray-100 p-3 rounded shadow mb-2"
        >
          <div class="flex items-center gap-4">
            <img :src="category.image" alt="Category" class="w-12 h-12 rounded-full object-cover" />
            <span class="text-lg font-semibold">{{ category.id }}</span>
          </div>
          <button @click="openEditModal(category)" class="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
            Edit
          </button>
        </li>
      </ul>
  
      <!-- Edit Category Modal -->
      <div v-if="isEditModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 class="text-xl font-semibold mb-4">Edit Category</h3>
          <form @submit.prevent="saveCategory">
            <div class="mb-4">
              <label class="block font-semibold mb-1">Category ID</label>
              <input
                type="text"
                v-model="editedCategory.id"
                class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
                disabled
              />
            </div>
            <div class="mb-4">
              <label class="block font-semibold mb-1">Category Image</label>
              <input type="file" @change="handleEditImageUpload" accept="image/*" />
            </div>
            <div class="flex justify-end space-x-2">
              <button type="button" @click="closeEditModal" class="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500">
                Cancel
              </button>
              <button type="submit" class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { db } from "@/firebaseConfig"; // ✅ Firestore import
  import { collection, getDocs, setDoc, doc, updateDoc } from "firebase/firestore";
  import { uploadFile } from '@/service/files.service'; // ✅ Use GitHub Upload
  
  export default {
    setup() {
      const categories = ref([]);
      const newCategoryId = ref("");
      const newCategoryImage = ref(null);
      const imageError = ref("");
      const isEditModalOpen = ref(false);
      const editedCategory = ref({});
      const editedCategoryImage = ref(null);
  
      // ✅ Fetch Categories from Firestore
      const fetchCategories = async () => {
        categories.value = [];
        const snapshot = await getDocs(collection(db, "categories"));
        snapshot.forEach((doc) => {
          categories.value.push({ id: doc.id, ...doc.data() });
        });
      };
  
      // ✅ Handle Image Upload (Limit: 5MB)
      const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) {
          imageError.value = "";
          newCategoryImage.value = file;
        } else {
          imageError.value = "Image size must be less than 5MB!";
        }
      };
  
      // ✅ Add Category to Firestore + Upload Image to GitHub
      const addCategory = async () => {
        if (!newCategoryId.value || !newCategoryImage.value) return;
  
        try {
          // Upload image to GitHub
          const imageUrl = await uploadFile(newCategoryImage.value);
  
          // Save to Firestore
          await setDoc(doc(db, "categories", newCategoryId.value), {
            image: imageUrl
          });
  
          alert("Category added successfully!");
          newCategoryId.value = "";
          newCategoryImage.value = null;
          fetchCategories();
        } catch (error) {
          console.error("Error adding category:", error);
        }
      };
  
      // ✅ Open Edit Category Modal
      const openEditModal = (category) => {
        editedCategory.value = { ...category };
        isEditModalOpen.value = true;
      };
  
      // ✅ Handle Edit Image Upload
      const handleEditImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) {
          imageError.value = "";
          editedCategoryImage.value = file;
        } else {
          imageError.value = "Image size must be less than 5MB!";
        }
      };
  
      // ✅ Save Edited Category
      const saveCategory = async () => {
        try {
          let imageUrl = editedCategory.value.image;
  
          // If a new image is uploaded, replace the old one
          if (editedCategoryImage.value) {
            imageUrl = await uploadFile(editedCategoryImage.value);
          }
  
          // Update Firestore
          await updateDoc(doc(db, "categories", editedCategory.value.id), {
            image: imageUrl
          });
  
          alert("Category updated successfully!");
          closeEditModal();
          fetchCategories();
        } catch (error) {
          console.error("Error updating category:", error);
        }
      };
  
      // ✅ Close Edit Modal
      const closeEditModal = () => {
        isEditModalOpen.value = false;
        editedCategory.value = {};
        editedCategoryImage.value = null;
      };
  
      onMounted(fetchCategories);
  
      return {
        categories, newCategoryId, newCategoryImage, imageError,
        addCategory, handleImageUpload, openEditModal, saveCategory,
        isEditModalOpen, editedCategory, editedCategoryImage, handleEditImageUpload, closeEditModal
      };
    }
  };
  </script>
  