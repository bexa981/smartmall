<template>
    <section class="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">Manage Categories</h2>
      <form @submit.prevent="addCategory" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label class="block font-semibold mb-1">Category Name ({{ currentLanguage }})</label>
          <input
            type="text"
            v-model="newCategory.name[currentLanguage]"
            placeholder="Enter category name"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label class="block font-semibold mb-1">Subcategory Name ({{ currentLanguage }})</label>
          <input
            type="text"
            v-model="newCategory.subCategory[currentLanguage]"
            placeholder="Enter subcategory name"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 md:col-span-2"
        >
          Add Category
        </button>
      </form>
  
      <ul>
        <li
          v-for="(category, index) in categories"
          :key="index"
          class="flex justify-between items-center bg-gray-50 p-3 rounded shadow mb-2"
        >
          <div>
            <p class="font-bold">{{ category.name[currentLanguage] }}</p>
            <small v-if="category.subCategory[currentLanguage]">
              Subcategory: {{ category.subCategory[currentLanguage] }}
            </small>
          </div>
          <div class="flex space-x-2">
            <button
              @click="editCategory(index)"
              class="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              @click="deleteCategory(index)"
              class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    </section>
  </template>
  
  <script>
  export default {
    props: ["currentLanguage", "categories"],
    data() {
      return {
        newCategory: { name: { Uzbek: "", Russian: "" }, subCategory: { Uzbek: "", Russian: "" } },
      };
    },
    methods: {
      addCategory() {
        const updatedCategories = [...this.categories, { ...this.newCategory }];
        this.$emit("updateCategories", updatedCategories);
        this.newCategory = { name: { Uzbek: "", Russian: "" }, subCategory: { Uzbek: "", Russian: "" } };
      },
      deleteCategory(index) {
        const updatedCategories = [...this.categories];
        updatedCategories.splice(index, 1);
        this.$emit("updateCategories", updatedCategories);
      },
      editCategory(index) {
        const category = this.categories[index];
        this.newCategory = { ...category };
        this.deleteCategory(index);
      },
    },
  };
  </script>
  