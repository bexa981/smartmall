<template>
  <div class="flex  relative" @mouseleave="hideSubCategories">
    <!-- Sidebar -->
    <aside class="bg-white text-black w-64 p-0">
      <div class="p-3 bg-gray-200 flex justify-between">
        <h2 class="text-normal text-sm font-semibold ">Bo'limlar</h2>
        <router-link to="/allproducts" class="text-xs text-gray-600 hover:text-green-700">Barchasi></router-link>
      </div>

      <ul>
        <li v-for="(category, index) in categories" :key="index" @mouseenter="hoverCategory(category)"
          class="flex items-center  mb-2 text-xs cursor-pointer hover:text-green-900 p-2 rounded">
          <i class="w-8" :class="category.icon"></i>
          {{ category.id }}
        </li>
      </ul>
    </aside>

    <!-- Subcategories Overlay -->
    <div v-if="activeCategory" @mouseenter="keepSubCategoriesVisible"
      class="absolute top-0 left-64 bg-white p-4 h-full z-10 category-sub">
      <h2 class="text-lg font-bold mb-4">{{ activeCategory.name }}</h2>
      <ul class="grid grid-cols-4 gap-x-4 gap-y-2 justify-around">
        <li v-for="(subCategory, index) in activeCategory.subCategories" :key="subCategory.id"
          class="cursor-pointer w-full text-xs border-b hover:text-green-600 mb-2" :class="{
            'row-start-2': (index + 1) % 6 === 0, // Move every 6th item to the bottom
          }" @click="navigateToCategory(activeCategory.name, subCategory.name)">
          {{ subCategory.name }}
        </li>
      </ul>
    </div>

    <!-- Main Content Placeholder -->

  </div>
</template>
  
<script>
import { getCategories } from '../service/categories.service'
export default {
  name: "SidebarWithCategories",
  data() {
    return {
      categories: [],
      activeCategory: null,
      isSubCategoryHovered: false,
    };
  },
  methods: {
    hoverCategory(category) {
      this.activeCategory = category;
      this.isSubCategoryHovered = true;
    },
    keepSubCategoriesVisible() {
      this.isSubCategoryHovered = true;
    },
    hideSubCategories() {
      this.isSubCategoryHovered = false;
      setTimeout(() => {
        if (!this.isSubCategoryHovered) {
          this.activeCategory = null;
        }
      }, 200); // Delay hiding to allow smooth transition
    },
    navigateToCategory(categoryName, subCategoryName = null) {
      // Navigate to DynamicProducts.vue with query params
      this.$router.push({
        name: "AllProducts", // Replace with your route name
        query: {
          category: categoryName,
          subCategory: subCategoryName,
        },
      });
    },
    async fetchCategories() {
      try {
        this.categories = await getCategories();
        console.log(this.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
  },
  mounted() {
    this.fetchCategories()
  }
};
</script>
  
<style scoped>
/* Subcategories overlay styling */
.absolute {
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.category-sub {
  width: 700px;
}

.hover:bg-gray-700 {
  transition: background-color 0.2s ease-in-out;
}
</style>
  
  
  