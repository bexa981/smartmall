<template>
  <div>
    <!-- Loading Indicator -->
    <div class="flex items-center justify-center h-screen bg-gray-100" v-if="loading">
      <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <section class="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">Manage Categories</h2>
      <form @submit.prevent="addSubCategory" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <!-- Main Category Selection -->
        <div>
          <label class="block font-semibold mb-1">Main Category</label>
          <select v-model="selectedCategory"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500" required>
            <option value="" disabled>Select Main Category</option>
            <option v-for="category in categories" :key="category.id" :value="category">
              {{ category.id }}
            </option>
          </select>
        </div>

        <!-- Subcategory Name -->
        <div>
          <label class="block font-semibold mb-1">Subcategory Name ({{ currentLanguage }})</label>
          <input type="text" v-model="subCategoryName" placeholder="Enter subcategory name"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
            required />
        </div>

        <button type="submit" :disabled="!subCategoryName"
          class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 md:col-span-2 disabled:opacity-10">
          Add Subcategory
        </button>
      </form>

      <!-- Subcategories List -->
      <ul>
        <li v-for="(category, index) in paginatedCategories" :key="category.id" class="mb-4">
          <h3 class="font-bold text-lg mb-2">{{ category.id }} {{ index }}</h3>
          <ul>
            <li v-for="(subCategory, subIndex) in category.subCategories || []" :key="subIndex"
              class="flex justify-between items-center bg-gray-50 p-3 rounded shadow mb-2">
              <span>{{ subIndex + 1 }},{{ subCategory.name }}</span>
              <div class="flex space-x-2">
                <button @click="openEditModal(category.id, subCategory.id)"
                  class="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
                  Edit
                </button>
                <button @click="deleteSubCategory(category.id, subCategory.id)"
                  class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">
                  Delete
                </button>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <div class="flex justify-between mt-4">
        <button @click="prevPage" :disabled="currentPage === 1" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
          Previous
        </button>
        <button @click="nextPage" :disabled="!hasMorePages" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
          Next
        </button>
      </div>
      <!-- Edit Modal -->
      <div v-if="isEditModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 class="text-xl font-semibold mb-4">Edit Subcategory</h3>
          <form @submit.prevent="saveSubCategory">
            <div class="mb-4">
              <label class="block font-semibold mb-1">Subcategory Name ({{ currentLanguage }})</label>
              <input type="text" v-model="editedSubCategory.name"
                class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
                required />
            </div>
            <div class="flex justify-end space-x-2">
              <button type="button" @click="closeEditModal"
                class="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500">
                Cancel
              </button>
              <button type="submit" class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { addSubCategory, deleteSubCategory, getCategories,updateSubCategory } from '@/service/categories.service';

export default {
  props: {
    currentLanguage: {
      default: "Uzbek",
      type: String,
    }
  },
  data() {
    return {
      savingCategory: false,
      categories: [],
      loading: false,
      selectedCategory: "",
      subCategoryName: "",
      currentPage: 1,
      itemsPerPage: 5, // Items per page
      mainCategories: [], // Categories will be loaded from local storage
      selectedMainCategory: null, // Tracks the selected main category
      newSubCategory: { name: { Uzbek: "", Russian: "" } }, // Tracks the new subcategory name
      isEditModalOpen: false, // Tracks modal state
      editedSubCategory: null, // Stores the subcategory being edited
      editedCategoryIndex: null, // Tracks the index of the main category for editing
      editedSubCategoryIndex: null, // Tracks the index of the subcategory for editing
    };
  },
  computed: {
    paginatedCategories() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.categories.slice(start, start + this.itemsPerPage);
    },
    hasMorePages() {
      return this.currentPage * this.itemsPerPage < this.categories.length;
    },
  },
  methods: {
    async fetchCategories() {
      try {
        this.loading = true;
        const rawCategories = await getCategories();
        this.categories = rawCategories.map(category => ({
          ...category,
          subCategories: category.subCategories || []
        }));
      } catch (error) {
        console.error("Kategoriyalarni olishda xatolik:", error);
      } finally {
        this.loading = false;
      }
    },
    saveToLocalStorage() {
      // Save the mainCategories to local storage
      localStorage.setItem("mainCategories", JSON.stringify(this.mainCategories));
    },
    async addSubCategory() {
      if (!this.selectedCategory) {
        alert("Please select a category!");
        return;
      }
      try {
        const result = await addSubCategory(this.selectedCategory.id, this.subCategoryName);
        const category = this.categories.find(cat => cat.id === this.selectedCategory.id);
        category.subCategories.push({ id: result.id, name: this.subCategoryName });
        this.subCategoryName = "";
      } catch (error) {
        console.error("Error adding subcategory:", error);
      }
    },
    async deleteSubCategory(categoryId, subCategoryId) {
      try {
        const category = this.categories.find(cat => cat.id === categoryId);
        if (!category) {
          alert("Kategoriya topilmadi!");
          return;
        }

        const subCategory = category.subCategories.find(sub => sub.id === subCategoryId);
        if (!subCategory) {
          alert("Subkategoriya topilmadi!");
          return;
        }

        // Subkategoriya o'chirish
        await deleteSubCategory(categoryId, subCategoryId);

        // Mahalliy massivni yangilash
        category.subCategories = category.subCategories.filter(sub => sub.id !== subCategoryId);

        alert("Subkategoriya muvaffaqiyatli o'chirildi!");
      } catch (error) {
        console.error("Subkategoriya o'chirishda xatolik:", error);
        alert("Subkategoriya o'chirishda xatolik yuz berdi.");
      }
    },

    nextPage() {
      if (this.hasMorePages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    openEditModal(categoryId, subCategoryId) {
      try {
        const category = this.categories.find(cat => cat.id === categoryId);
        if (!category || !category.subCategories) {
          throw new Error("Kategoriya yoki subkategoriya mavjud emas!");
        }

        const subCategory = category.subCategories.find(sub => sub.id === subCategoryId);
        if (!subCategory) {
          throw new Error("Subkategoriya topilmadi!");
        }

        this.isEditModalOpen = true;
        this.editedSubCategory = {
          ...subCategory, // To'g'ridan-to'g'ri stringni ishlatish
        };

        this.editedCategoryId = categoryId;
        this.editedSubCategoryId = subCategoryId;
      } catch (error) {
        console.error("Xatolik:", error.message);
        alert(error.message);
      }
    },
    closeEditModal() {
      this.isEditModalOpen = false;
      this.editedSubCategory = null;
      this.editedCategoryId = null;
      this.editedSubCategoryId = null;
    },
    async saveSubCategory() {
      try {
        if (!this.editedCategoryId || !this.editedSubCategoryId) {
          alert("Tahrir qilish uchun subkategoriya tanlanmagan!");
          return;
        }

        // Yangilanish uchun ma'lumotlar
        const updatedSubCategory = { name: this.editedSubCategory.name };

        // Firebase'da yangilang
        await updateSubCategory(this.editedCategoryId, this.editedSubCategoryId, updatedSubCategory);

        // Lokal massivni yangilang
        const category = this.categories.find(cat => cat.id === this.editedCategoryId);
        if (category) {
          const subCategory = category.subCategories.find(sub => sub.id === this.editedSubCategoryId);
          if (subCategory) {
            subCategory.name = updatedSubCategory.name;
          }
        }

        alert("Subkategoriya muvaffaqiyatli yangilandi!");
        this.closeEditModal();
      } catch (error) {
        console.error("Subkategoriya saqlashda xatolik:", error);
        alert("Subkategoriya saqlashda xatolik yuz berdi.");
      }
    },

  },
  mounted() {
    this.fetchCategories()
  }
};
</script>

