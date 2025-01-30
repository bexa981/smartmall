<template>
    <div class="admin-page flex min-h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside class="sidebar bg-gray-800 text-white w-64 p-6">
        <div class="admin-info text-center mb-8">
          <div class="logo bg-gray-500 w-16 h-16 rounded-full mx-auto">
            <img src="/smartmallLogoo.jpg" alt="Logo" class="w-16 h-16 object-cover rounded-full mx-auto" />

          </div>
          <h3 class="text-xl font-semibold mt-4">Super-Admin</h3>
        </div>
        <nav>
          <ul>
            <li
              v-for="(item, index) in navItems"
              :key="index"
              :class="['mb-4 p-2 rounded cursor-pointer', activeTab === item ? 'bg-gray-700' : 'hover:bg-gray-700']"
              @click="changeTab(item)"
            >
              {{ item }}
            </li>
          </ul>
        </nav>
        <div class="mt-auto pt-8">
        <!-- Logout Button -->
        <button
          class="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
          @click="logout"
        >
          Logout
        </button>
      </div>
      </aside>
  
      <!-- Main Content -->
      <main class="flex-1 p-8">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold">{{ activeTab }}</h1>
          <div>
            <label class="mr-2 font-semibold">Language:</label>
            <select v-model="currentLanguage" class="border p-2 rounded">
              <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
            </select>
          </div>
        </div>
  
        <!-- Dynamic Component Rendering -->
        <component
          :is="currentComponent"
          :currentLanguage="currentLanguage"
          :categories="categories"
          :products="products"
          :homePageContent="homePageContent"
          @updateCategories="updateCategories"
          @updateProducts="updateProducts"
          @updateHomePageContent="updateHomePageContent"
        />
      </main>
    </div>
  </template>
  
  <script>
  import ManageCategories from "@/components/ManageCategories.vue";
  import ManageProducts from "@/components/ManageProducts.vue";
  import HomePageMenu from "@/components/HomePageMenu.vue";
  import ManageMainCat from "@/components/ManageMainCat.vue"
  
  export default {
    components: {
      ManageCategories,
      ManageProducts,
      HomePageMenu,
      ManageMainCat,
    },
    data() {
      return {
        activeTab: "Manage Categories",
        navItems: ["Sub kategoriya qo'shish", "Mahsulot qo'shish", "Mahsulotlarni boshqarish","Kategoriya qo'shish"],
        languages: ["Uzbek", "Russian"],
        currentLanguage: "Uzbek",
        categories: [],
        products: [],
        homePageContent: {
          mostViewed: [],
          mostSold: [],
          subCategoryProducts: {},
        },
      };
    },
    computed: {
      currentComponent() {
        switch (this.activeTab) {
          case "Sub kategoriya qo'shish":
            return "ManageCategories";
          case "Mahsulot qo'shish":
            return "ManageProducts";
          case "Mahsulotlarni boshqarish":
            return "HomePageMenu";
            case "Kategoriya qo'shish":
              return "ManageMainCat";
          default:
            return null;
        }
      },
    },
    methods: {
      changeTab(tab) {
        this.activeTab = tab;
      },
      updateCategories(updatedCategories) {
        this.categories = updatedCategories;
      },
      updateProducts(updatedProducts) {
        this.products = updatedProducts;
      },
      updateHomePageContent(updatedContent) {
        this.homePageContent = updatedContent;
      },
      logout() {
      // Clear any necessary state or tokens
      localStorage.clear();

      // Navigate to the login page
      this.$router.push("/login");
    },
    },
  };
  </script>
  
  <style scoped>
  .admin-page {
    display: flex;
    min-height: 100vh;
  }
  </style>
  