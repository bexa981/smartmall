<template>
  <section class="bg-white shadow-md rounded-lg p-6 mb-8">
    <h2 class="text-2xl font-semibold mb-4">Manage Categories</h2>
    <form @submit.prevent="addSubCategory" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <!-- Main Category Selection -->
      <div>
        <label class="block font-semibold mb-1">Main Category</label>
        <select
          v-model="selectedCategory"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
          required
        >
          <option value="" disabled>Select Main Category</option>
          <option v-for="category in categories" :key="category.id" :value="category">
            {{ category.id }}
          </option>
        </select>
      </div>

      <!-- Subcategory Name -->
      <div>
        <label class="block font-semibold mb-1">Subcategory Name ({{ currentLanguage }})</label>
        <input
          type="text"
          v-model="subCategoryName"
          placeholder="Enter subcategory name"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
          required
        />
      </div>

      <button
        type="submit"
        :disabled="!subCategoryName"
        class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 md:col-span-2 disabled:opacity-10">
        Add Subcategory
      </button>
    </form>

    <!-- Subcategories List -->
    <ul>
      <li
        v-for="category in categories"
        :key="category.id"
        class="mb-4"
      >
        <h3 class="font-bold text-lg mb-2">{{ category.id }}</h3>
        <ul>
          <li
            v-for="(subCategory, subIndex) in category.subCategories"
            :key="subIndex"
            class="flex justify-between items-center bg-gray-50 p-3 rounded shadow mb-2"
          >
            <span>{{ subCategory.name }}</span>
            <div class="flex space-x-2">
              <button
                @click="openEditModal(index, subCategory.id)"
                class="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                @click="deleteSubCategory(category.id, subCategory.id)"
                class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
      </li>
    </ul>

    <!-- Edit Modal -->
    <div
      v-if="isEditModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 class="text-xl font-semibold mb-4">Edit Subcategory</h3>
        <form @submit.prevent="saveSubCategory">
          <div class="mb-4">
            <label class="block font-semibold mb-1">Subcategory Name ({{ currentLanguage }})</label>
            <input
              type="text"
              v-model="editedSubCategory.name[currentLanguage]"
              class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
              required
            />
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="closeEditModal"
              class="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import { addSubCategory, deleteSubCategory, getCategories } from '@/service/categories.service';

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
      selectedCategory: "",
      subCategoryName: "",
      mainCategories: [], // Categories will be loaded from local storage
      selectedMainCategory: null, // Tracks the selected main category
      newSubCategory: { name: { Uzbek: "", Russian: "" } }, // Tracks the new subcategory name
      isEditModalOpen: false, // Tracks modal state
      editedSubCategory: null, // Stores the subcategory being edited
      editedCategoryIndex: null, // Tracks the index of the main category for editing
      editedSubCategoryIndex: null, // Tracks the index of the subcategory for editing
    };
  },
  created() {
    // Load categories from local storage when the component is created
    // const storedCategories = localStorage.getItem("mainCategories");
    // if (storedCategories) {
    //   this.mainCategories = JSON.parse(storedCategories);
    // } else {
    //   // Default categories if local storage is empty
    //   this.mainCategories = [
    //     { Uzbek: "Kabellar", Russian: "Кабели", subCategories: [] },
    //     { Uzbek: "Simlar", Russian: "Провода", subCategories: [] },
    //     { Uzbek: "Elektrotexnika", Russian: "Электротехника", subCategories: [] },
    //   ];
    // }
  },
  methods: {
    saveToLocalStorage() {
      // Save the mainCategories to local storage
      localStorage.setItem("mainCategories", JSON.stringify(this.mainCategories));
    },
    async addSubCategory() {
      this.savingCategory = true;
      await addSubCategory(this.selectedCategory.id, this.subCategoryName)
      this.savingCategory = false;
      const category = this.categories.find(category => category.id === this.selectedCategory.id)
      if(!Array.isArray(category.subCategories)) {
        category.subCategories = []
      }
      category.subCategories.push({ name: this.subCategoryName })
      this.selectedCategory = ""
      this.subCategoryName = ""
      // if (!this.selectedMainCategory) return; // Ensure a main category is selected

      // // Add the new subcategory to the selected main category
      // this.selectedMainCategory.subCategories.push({ ...this.newSubCategory });

      // // Save changes to local storage
      // this.saveToLocalStorage();

      // // Clear the input fields
      // this.newSubCategory = { name: { Uzbek: "", Russian: "" } };
    },
    async deleteSubCategory(categoryIndex, subCategoryIndex) {
      await deleteSubCategory(categoryIndex, subCategoryIndex)
      this.categories = this.categories.map(category => category.id === categoryIndex ? ({
        ...category,
        subCategories: category.subCategories.filter((subCategory) => subCategory.id !== subCategoryIndex)
      }): category)
      // Remove the subcategory from the main category
      // this.mainCategories[categoryIndex].subCategories.splice(subCategoryIndex, 1);

      // // Save changes to local storage
      // this.saveToLocalStorage();
    },
    openEditModal(categoryIndex, subCategoryIndex) {
      // Open the modal and set the edited subcategory
      this.isEditModalOpen = true;
      this.editedCategoryIndex = categoryIndex;
      this.editedSubCategoryIndex = subCategoryIndex;
      this.editedSubCategory = {
        ...this.mainCategories[categoryIndex].subCategories[subCategoryIndex],
      };
    },
    closeEditModal() {
      // Close the modal and clear the edited subcategory
      this.isEditModalOpen = false;
      this.editedSubCategory = null;
      this.editedCategoryIndex = null;
      this.editedSubCategoryIndex = null;
    },
    saveSubCategory() {
      // Save the edited subcategory
      this.mainCategories[this.editedCategoryIndex].subCategories[
        this.editedSubCategoryIndex
      ] = { ...this.editedSubCategory };

      // Save changes to local storage
      this.saveToLocalStorage();

      // Close the modal
      this.closeEditModal();
    },
    async fetchCategories() {
      this.categories = await getCategories()
    }
  },
  mounted() {
    this.fetchCategories()
  }
};
</script>

