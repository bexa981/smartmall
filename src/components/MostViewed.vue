<template>
  <div class="main">
    <div class="bg-white-50 p-8 container">
      <h2 style="font-weight: 500;" class="text-1xl font-500 mb-6">Ko'p ko'rilganlar</h2>
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div
          v-for="(product, index) in mostViewedProducts"
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
              {{ product.name }}
            </h3>
            <p class="text-green-600 font-semibold text-sm">{{ product.price }} UZS</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  
<script>
export default {
  name: "MostViewed",
  props: {
    mostViewedProducts: {
      type: Array,
      required: true,
    },
  },
  methods: {
  navigateToProductDetail(product) {
    this.$router.push({
      name: "ProductDetail",
      params: {
        id: product.id, // Ensure each product has a unique `id`
      },
      query: {
        product: JSON.stringify(product), // Optional: pass additional product data
      },
    });
  },
},
};
</script>

  
  <style scoped>
  .main{
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .container {
  width: 100%;
  padding-right: 8px;
  padding-left: 8px;
  margin-right: auto;
  margin-left: auto;
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
  /* Custom styles for most viewed component */
  </style>
  