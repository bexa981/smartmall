<template>
  <section class="bg-white shadow-md rounded-lg p-6">
    <h2 class="text-2xl font-semibold mb-4">Home Page Menu</h2>

    <!-- Groups for Product Selection -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Carousel Products -->
      <div class="bg-gray-100 p-4 rounded border">
        <h3 class="text-xl font-bold mb-2">Carousel Products (Max: 5)</h3>
        <div v-for="(product, index) in homePageContent.carouselProducts" :key="`carousel-${index}`" class="bg-white p-2 rounded border mb-2">
          <p><strong>{{ product.name[currentLanguage] }}</strong></p>
          <p>{{ product.price }} UZS</p>
          <img :src="product.image" alt="Product Image" class="w-16 h-16 object-cover rounded" />
          <button @click="removeFromGroup('carouselProducts', product)" class="text-red-500 hover:underline">Delete</button>
        </div>
      </div>

      <!-- Most Viewed -->
      <div class="bg-gray-100 p-4 rounded border">
        <h3 class="text-xl font-bold mb-2">Most Viewed (Max: 5)</h3>
        <div v-for="(product, index) in homePageContent.mostViewed" :key="`viewed-${index}`" class="bg-white p-2 rounded border mb-2">
          <p><strong>{{ product.name[currentLanguage] }}</strong></p>
          <p>{{ product.price }} UZS</p>
          <img :src="product.image" alt="Product Image" class="w-16 h-16 object-cover rounded" />
          <button @click="removeFromGroup('mostViewed', product)" class="text-red-500 hover:underline">Delete</button>
        </div>
      </div>

      <!-- Most Sold -->
      <div class="bg-gray-100 p-4 rounded border">
        <h3 class="text-xl font-bold mb-2">Most Sold (Max: 5)</h3>
        <div v-for="(product, index) in homePageContent.mostSold" :key="`sold-${index}`" class="bg-white p-2 rounded border mb-2">
          <p><strong>{{ product.name[currentLanguage] }}</strong></p>
          <p>{{ product.price }} UZS</p>
          <img :src="product.image" alt="Product Image" class="w-16 h-16 object-cover rounded" />
          <button @click="removeFromGroup('mostSold', product)" class="text-red-500 hover:underline">Delete</button>
        </div>
      </div>

      <!-- Main Products -->
      <div class="bg-gray-100 p-4 rounded border">
        <h3 class="text-xl font-bold mb-2">Main Products (Max: 20)</h3>
        <div v-for="(product, index) in homePageContent.mainProducts" :key="`main-${index}`" class="bg-white p-2 rounded border mb-2">
          <p><strong>{{ product.name[currentLanguage] }}</strong></p>
          <p>{{ product.price }} UZS</p>
          <img :src="product.image" alt="Product Image" class="w-16 h-16 object-cover rounded" />
          <button @click="removeFromGroup('mainProducts', product)" class="text-red-500 hover:underline">Delete</button>
        </div>
      </div>
    </div>

    <!-- Table of Products -->
    <div class="mt-6">
      <h3 class="text-xl font-bold mb-4">Available Products</h3>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by product name"
        class="border border-gray-300 p-2 mb-4 rounded w-full focus:outline-none focus:ring focus:ring-green-500"
      />
      <table class="table-auto w-full border-collapse border border-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th class="border border-gray-300 p-2">Image</th>
            <th class="border border-gray-300 p-2">Name</th>
            <th class="border border-gray-300 p-2">Price</th>
            <th class="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in filteredProducts" :key="`table-${index}`" class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">
              <img :src="product.image" alt="Product Image" class="w-16 h-16 object-cover rounded" />
            </td>
            <td class="border border-gray-300 p-2">{{ product.name[currentLanguage] }}</td>
            <td class="border border-gray-300 p-2">{{ product.price }} UZS</td>
            <td class="border border-gray-300 p-2">
              <select v-model="selectedGroup" class="border p-2 rounded">
                <option value="" disabled selected>Select Group</option>
                <option value="carouselProducts">Carousel Products</option>
                <option value="mostViewed">Most Viewed</option>
                <option value="mostSold">Most Sold</option>
                <option value="mainProducts">Main Products</option>
              </select>
              <button @click="addToGroupFromTable(product)" class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 ml-2">
                Select
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
  },
  data() {
    return {
      products: [],
      selectedProduct: "",
      selectedGroup: "",
      homePageContent: {
        carouselProducts: [],
        mostViewed: [],
        mostSold: [],
        mainProducts: [],
      },
      searchQuery: "",
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) =>
        product.name[this.currentLanguage]
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    },
  },
  created() {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    this.products = storedProducts;
  },
  methods: {
    addToGroup(group) {
      const product = this.products.find((p) => p.id === this.selectedProduct);
      if (
        product &&
        this.homePageContent[group].length <
          (group === "mainProducts" ? 20 : 5) &&
        !this.homePageContent[group].some((p) => p.id === product.id)
      ) {
        this.homePageContent[group].push(product);
        this.selectedProduct = "";
      }
    },
    addToGroupFromTable(product) {
      if (
        this.selectedGroup &&
        this.homePageContent[this.selectedGroup].length <
          (this.selectedGroup === "mainProducts" ? 20 : 5) &&
        !this.homePageContent[this.selectedGroup].some((p) => p.id === product.id)
      ) {
        this.homePageContent[this.selectedGroup].push(product);
      }
      this.selectedGroup = "";
    },
    removeFromGroup(group, product) {
      this.homePageContent[group] = this.homePageContent[group].filter(
        (p) => p.id !== product.id
      );
    },
  },
};
</script>

<style scoped>
/* Add Tailwind CSS custom styles */
</style>