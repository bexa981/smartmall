<template>
    <div class="main">
      <div style="margin-top: 30px;" class="bg-white-50 p-8 container">
        <h2 style="font-weight: 500;" class="text-1xl font-500 mb-6">Mahsulotlar</h2>
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <!-- Product Card -->
          <div v-for="(product, index) in allProducts.slice(0, 12)" 
            :key="index"
            class="bg-white rounded-lg shadow hover:shadow-lg p-4 transition-transform transform hover:scale-105"
          >
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-40 object-cover rounded-t-lg"
            />
            <div class="mt-4">
              <h3 class="font-medium text-sm text-gray-800 truncate mb-2">
                {{ product.name }}
              </h3>
              <p class="text-green-600 font-semibold text-sm">
                {{ product.price }} UZS
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AllProductsHome",
    props: {
      allProducts: {
        type: Array,
        required: true,
      },
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
  
  @media (min-width: 1348px) {
    .container {
      max-width: 1348px;
    }
  }
  
  /* Hover effect and shadow styles */
  </style>
  
  