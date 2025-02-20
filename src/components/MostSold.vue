<template>
  <div class="main">
    <div class="bg-gray-50 p-8 container">
      <h2 style="font-weight: 500;" class="text-1xl font-semibold mb-6">Ko'p sotilganlar</h2>
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div
          v-for="(product, index) in mostSoldProducts"
          :key="index"
          class="bg-white rounded-lg shadow hover:shadow-lg p-4 transition-transform transform hover:scale-105 cursor-pointer"
          @click="navigateToProductDetail(product)"
        >
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-40 object-cover rounded-t-lg"
          />
          <div class="mt-4">
            <h3 class="font-normal text-xs text-gray-800 mb-2">
              {{ product.name}}
            </h3>
            <p class="text-green-600 font-semibold text-sm">
              {{ product.price }} $
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


  
<script>
import { getProductsByGroup } from "@/service/products.service";

export default {
  name: "MostSold",
  data() {
    return {
      mostSoldProducts: [], // Ko‘p sotilgan mahsulotlar
    };
  },
  methods: {
    async fetchMostSoldProducts() {
      try {
        this.mostSoldProducts = await getProductsByGroup("mostSold"); // "mostSold" guruhidan mahsulotlar
      } catch (error) {
        console.error("Ko'p sotilgan mahsulotlarni yuklashda xatolik:", error);
      }
    },
    navigateToProductDetail(product) {
      this.$router.push({
        name: "ProductDetail",
        params: {
          id: product.id, // Har bir mahsulot uchun unikal `id`
        },
        query: {
          product: JSON.stringify(product), // Qo'shimcha ma'lumotlar
        },
      });
    },
  },
  mounted() {
    this.fetchMostSoldProducts(); // Boshlanishida yuklash
  },
};
</script>


  
  <style scoped>
  .main {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .container {
    width: 100%;
    padding: 0 8px;
    margin: 0 auto;
    background-color: transparent;
  }
  
  @media (min-width: 1246px) {
    .container {
      max-width: 1266px;
    }
  }
  
  @media (min-width: 1248px) {
    .container {
      max-width: 1248px;
    }
  }
  
  /* Hover effect and shadow styles */
  </style>
  