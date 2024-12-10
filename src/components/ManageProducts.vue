<template>
    <section class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-4">Manage Products</h2>
  
      <!-- Add Product Form -->
      <form @submit.prevent="addProduct" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label class="block font-semibold mb-1">Product Image</label>
          <input
            type="file"
            @change="onFileChange"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
          />
          <div v-if="newProduct.image" class="mt-2">
            <img :src="newProduct.image" alt="Product Preview" class="w-24 h-24 object-cover rounded" />
          </div>
        </div>
        <div>
          <label class="block font-semibold mb-1">Product Name ({{ currentLanguage }})</label>
          <input
            type="text"
            v-model="newProduct.name[currentLanguage]"
            placeholder="Enter product name"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
            required
          />
        </div>
        <div class="md:col-span-2">
          <label class="block font-semibold mb-1">Product Description ({{ currentLanguage }})</label>
          <textarea
            v-model="newProduct.description[currentLanguage]"
            placeholder="Enter product description"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
            required
          ></textarea>
        </div>
        <div>
          <label class="block font-semibold mb-1">Price (UZS)</label>
          <input
            type="number"
            v-model="newProduct.price"
            placeholder="Enter product price"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label class="block font-semibold mb-1">Category</label>
          <select
            v-model="selectedCategory"
            @change="updateSubcategories"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
            required
          >
            <option value="" disabled>Select category</option>
            <option v-for="(category, index) in categories" :key="index" :value="category.name">
              {{ category.name[currentLanguage] }}
            </option>
          </select>
        </div>
        <div>
          <label class="block font-semibold mb-1">Subcategory</label>
          <select
            v-model="newProduct.subCategory"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
            required
          >
            <option value="" disabled>Select subcategory</option>
            <option
              v-for="(subCategory, index) in subCategories"
              :key="index"
              :value="subCategory"
            >
              {{ subCategory }}
            </option>
          </select>
        </div>
        <div>
          <label class="block font-semibold mb-1">In Stock</label>
          <select
            v-model="newProduct.inStock"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div class="md:col-span-2">
          <h3 class="text-xl font-bold mb-4">Technical Characteristics</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold mb-1">Kod</label>
              <input
                type="text"
                v-model="newProduct.technical.kod"
                placeholder="Enter Kod"
                class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
              />
            </div>
            <div>
              <label class="block font-semibold mb-1">Uzunligi</label>
              <input
                type="text"
                v-model="newProduct.technical.uzunligi"
                placeholder="Enter Uzunligi"
                class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
              />
            </div>
            <div>
              <label class="block font-semibold mb-1">Kengligi</label>
              <input
                type="text"
                v-model="newProduct.technical.kengligi"
                placeholder="Enter Kengligi"
                class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
              />
            </div>
            <div>
              <label class="block font-semibold mb-1">Balandligi</label>
              <input
                type="text"
                v-model="newProduct.technical.balandligi"
                placeholder="Enter Balandligi"
                class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
              />
            </div>
            <div>
              <label class="block font-semibold mb-1">Og‘irligi</label>
              <input
                type="text"
                v-model="newProduct.technical.ogirligi"
                placeholder="Enter Og‘irligi"
                class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 md:col-span-2"
        >
          Add Product
        </button>
      </form>
  
      <!-- Product List -->
      <table class="table-auto w-full border-collapse border border-gray-300 mt-8">
        <thead class="bg-gray-200">
          <tr>
            <th class="border border-gray-300 p-2">Image</th>
            <th class="border border-gray-300 p-2">Name</th>
            <th class="border border-gray-300 p-2">Price</th>
            <th class="border border-gray-300 p-2">Subcategory</th>
            <th class="border border-gray-300 p-2">In Stock</th>
            <th class="border border-gray-300 p-2">Technical Characteristics</th>
            <th class="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in products"
            :key="index"
            class="hover:bg-gray-100"
          >
            <td class="border border-gray-300 p-2">
              <img :src="product.image" alt="Product Image" class="w-16 h-16 object-cover rounded" />
            </td>
            <td class="border border-gray-300 p-2">{{ product.name[currentLanguage] }}</td>
            <td class="border border-gray-300 p-2">{{ product.price }} UZS</td>
            <td class="border border-gray-300 p-2">{{ product.subCategory }}</td>
            <td class="border border-gray-300 p-2">
              {{ product.inStock ? "Yes" : "No" }}
            </td>
            <td class="border border-gray-300 p-2">
              <ul>
                <li>Kod: {{ product.technical.kod }}</li>
                <li>Uzunligi: {{ product.technical.uzunligi }}</li>
                <li>Kengligi: {{ product.technical.kengligi }}</li>
                <li>Balandligi: {{ product.technical.balandligi }}</li>
                <li>Og‘irligi: {{ product.technical.ogirligi }}</li>
              </ul>
            </td>
            <td class="border border-gray-300 p-2">
              <button
                @click="$emit('editProduct', product, index)"
                class="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                @click="$emit('deleteProduct', index)"
                class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </template>
  
  <script>
  export default {
    props: {
      currentLanguage: {
        type: String,
        required: true,
      },
      categories: {
        type: Array,
        required: true,
      },
      products: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        selectedCategory: "",
        subCategories: [],
        newProduct: {
          image: "",
          name: { Uzbek: "", Russian: "" },
          description: { Uzbek: "", Russian: "" },
          price: null,
          category: "",
          subCategory: "",
          inStock: true,
          technical: {
            kod: "",
            uzunligi: "",
            kengligi: "",
            balandligi: "",
            ogirligi: "",
          },
        },
      };
    },
    methods: {
        
      updateSubcategories() {
        const category = this.categories.find(
          (cat) => cat.name === this.selectedCategory
        );
        this.subCategories = category?.subCategories || [];
      },
      onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.newProduct.image = URL.createObjectURL(file);
        }
      },
      addProduct() {
        this.$emit("addProduct", { ...this.newProduct });
        this.resetForm();
      },
      resetForm() {
        this.newProduct = {
          image: "",
          name: { Uzbek: "", Russian: "" },
          description: { Uzbek: "", Russian: "" },
          price: null,
          category: "",
          subCategory: "",
          inStock: true,
          technical: {
            kod: "",
            uzunligi: "",
            kengligi: "",
            balandligi: "",
            ogirligi: "",
          },
        };
        this.selectedCategory = "";
        this.subCategories = [];
      },
    },
  };
  </script>
  
  <style scoped>
  .table-auto {
    width: 100%;
  }
  </style>
  