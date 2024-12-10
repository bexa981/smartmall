<template>
    <section class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-4">Home Page Menu</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Most Viewed Section -->
        <div>
          <h3 class="text-xl font-bold mb-4">Most Viewed</h3>
          <ul>
            <li
              v-for="(product, index) in products"
              :key="index"
              @click="toggleSelection(product, 'mostViewed')"
              :class="isSelected(product, 'mostViewed') ? 'bg-green-100' : ''"
              class="cursor-pointer p-2 rounded border hover:bg-gray-100"
            >
              {{ product.name[currentLanguage] }}
            </li>
          </ul>
        </div>
  
        <!-- Most Sold Section -->
        <div>
          <h3 class="text-xl font-bold mb-4">Most Sold</h3>
          <ul>
            <li
              v-for="(product, index) in products"
              :key="index"
              @click="toggleSelection(product, 'mostSold')"
              :class="isSelected(product, 'mostSold') ? 'bg-green-100' : ''"
              class="cursor-pointer p-2 rounded border hover:bg-gray-100"
            >
              {{ product.name[currentLanguage] }}
            </li>
          </ul>
        </div>
  
        <!-- Subcategories Section -->
        <div class="md:col-span-2">
          <h3 class="text-xl font-bold mb-4">Subcategories</h3>
          <ul>
            <li
              v-for="(subcategory, index) in subcategories"
              :key="index"
              @click="toggleSelection(subcategory, 'subCategories')"
              :class="isSelected(subcategory, 'subCategories') ? 'bg-green-100' : ''"
              class="cursor-pointer p-2 rounded border hover:bg-gray-100"
            >
              {{ subcategory.name[currentLanguage] }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    props: {
      currentLanguage: {
        type: String,
        required: true,
      },
      products: {
        type: Array,
        required: true,
      },
      subcategories: {
        type: Array,
        required: true,
      },
      homePageContent: {
        type: Object,
        required: true,
      },
    },
    methods: {
      toggleSelection(item, type) {
        const index = this.homePageContent[type].findIndex((i) => i.id === item.id);
  
        if (index !== -1) {
          // Remove item if already selected
          this.homePageContent[type].splice(index, 1);
        } else {
          // Add item to the list
          this.homePageContent[type].push(item);
        }
  
        this.$emit("updateHomePageContent", { ...this.homePageContent });
      },
      isSelected(item, type) {
        return this.homePageContent[type].some((i) => i.id === item.id);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add Tailwind CSS custom styles */
  </style>
  