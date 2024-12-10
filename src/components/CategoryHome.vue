<template>
    <div class="flex min-h relative"  @mouseleave="hideSubCategories">
      <!-- Sidebar -->
      <aside class="bg-white text-black w-64 p-0">
        <div class="p-3 bg-gray-200 flex justify-between">
            <h2 class="text-normal text-sm font-semibold ">Bo'limlar</h2>
            <router-link class="text-xs text-gray-600 hover:text-green-700">Barchasi></router-link>
        </div>
       
        <ul>
          <li
            v-for="(category, index) in categories"
            :key="index"
            @mouseenter="hoverCategory(category)"
            class="flex items-center mb-2 text-xs cursor-pointer hover:text-green-900 p-2 rounded"
          >
            <span class="mr-2">{{ category.icon }}</span>
            {{ category.name }}
          </li>
        </ul>
      </aside>
  
      <!-- Subcategories Overlay -->
      <div
        v-if="activeCategory"
        @mouseenter="keepSubCategoriesVisible"
       
        class="absolute top-0 left-64 bg-white  p-4  h-full z-10 category-sub"
      >
        <h2 class="text-lg font-bold mb-4">{{ activeCategory.name }}</h2>
        <ul>
          <li
            v-for="(subCategory, index) in activeCategory.subCategories"
            :key="index"
            @click="navigateToCategory(activeCategory.name, subCategory)"
            class="cursor-pointer text-xs border-b hover:text-green-600 mb-2"
          >
            {{ subCategory }}
          </li>
        </ul>
      </div>
  
      <!-- Main Content Placeholder -->
      
    </div>
  </template>
  
  <script>
  export default {
    name: "SidebarWithCategories",
    data() {
      return {
        categories: [
          {
            name: "Kabellar",
            icon: "🔌",
            subCategories: ["ABB", "ABBHng", "AB6Sh"],
          },
          {
            name: "Simlar",
            icon: "⚡",
            subCategories: ["VVF", "VVFng", "BB6Sh"],
          },
          {
            name: "Elektrotexnika",
            icon: "💡",
            subCategories: ["AC", "AS", "APB"],
          },
          {
            name: "Sport va hordiq",
            icon: "🏀",
            subCategories: ["TTP", "KGBF", "MKSh"],
          },
        ],
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
        this.$router.push({
          name: "CategoryPage",
          query: { category: categoryName, subCategory: subCategoryName },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Subcategories overlay styling */
  .absolute {
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  }
  .category-sub{
    width: 500px;
  }
  .hover:bg-gray-700 {
    transition: background-color 0.2s ease-in-out;
  }
  </style>
  
  
  