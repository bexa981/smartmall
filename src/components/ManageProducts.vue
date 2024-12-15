<template>
  <section class="bg-white shadow-md rounded-lg p-6">
    <h2 class="text-2xl font-semibold mb-4">Manage Products</h2>

    <!-- Add Product Form -->
    <form @submit.prevent="addProduct" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <!-- File Input -->
      <div>
        <label class="block font-semibold mb-1">Product Image</label>
        <input id="fileInput" type="file" accept="image/*" @change="onFileChange"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500" />
        <div v-if="newProduct.image" class="mt-2">
          <img :src="newProduct.image" alt="Product Preview" class="w-24 h-24 object-cover rounded" />
        </div>
      </div>

      <!-- Other Inputs -->
      <div>
        <label class="block font-semibold mb-1">Product Name ({{ currentLanguage }})</label>
        <input type="text" v-model="newProduct.name[currentLanguage]" placeholder="Enter product name"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500" required />
      </div>
      <div class="md:col-span-2">
        <label class="block font-semibold mb-1">Product Description ({{ currentLanguage }})</label>
        <textarea v-model="newProduct.description[currentLanguage]" placeholder="Enter product description"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
          required></textarea>
      </div>
      <div>
        <label class="block font-semibold mb-1">Price (UZS)</label>
        <input type="number" v-model="newProduct.price" placeholder="Enter product price"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500" required />
      </div>
      <div>
        <label class="block font-semibold mb-1">Category</label>
        <select defaultValue="" v-model="newProduct.category"  class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500" required>
          <option value="" disabled>Select category</option>
          <option v-for="(category, index) in categories" :key="index" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div>
        <label class="block font-semibold mb-1">Subcategory</label>
        <select v-model="newProduct.subCategory"
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500" required>
          <option value="" disabled>Select subcategory</option>
          <option v-for="(subCategory, index) in subCategories" :key="index" :value="`/categories/${newProduct.category}/subCategories/${subCategory.id}`">
            {{ subCategory.name }}
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
            <option :value="true">Yes</option>
            <option :value="false">No</option>
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
      <button type="submit" class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 md:col-span-2">
        Add Product
      </button>
    </form>

    <!-- Filter Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <input type="text" v-model="filters.name" placeholder="Search by product name"
        class="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500" />
      <select v-model="filters.subCategory"
        class="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500">
        <option value="">All Subcategories</option>
        <option v-for="(subCategory, index) in subCategories" :key="index" :value="subCategory">
          {{ subCategory }}
        </option>
      </select>
      <input type="text" v-model="filters.kod" placeholder="Filter by Kod"
        class="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500" />
      <input type="number" v-model="filters.price" placeholder="Filter by Price"
        class="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500" />
    </div>

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
        <tr v-for="(product, index) in filteredProducts" :key="index" class="hover:bg-gray-100">
          <td class="border border-gray-300 p-2">
            <img :src="product.image" alt="Product Image" class="w-16 h-16 object-cover rounded" />
          </td>
          <td class="border border-gray-300 p-2">{{ product.name[currentLanguage] }}</td>
          <td class="border border-gray-300 p-2">{{ product.price }} UZS</td>
          <td class="border border-gray-300 p-2">{{ product.subCategory }}</td>
          <td class="border border-gray-300 p-2">{{ product.inStock ? "Yes" : "No" }}</td>
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
            <button @click="openEditModal(product, index)"
              class="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
              Edit
            </button>
            <button @click="deleteProduct(index)" class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- edit modal -->
    <div v-if="isEditModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 class="text-xl font-semibold mb-4">Edit Product</h3>
        <form @submit.prevent="saveProduct">
          <div class="mb-4">
            <label class="block font-semibold mb-1">Product Name ({{ currentLanguage }})</label>
            <input type="text" v-model="editedProduct.name[currentLanguage]"
              class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
              required />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Price (UZS)</label>
            <input type="number" v-model="editedProduct.price"
              class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
              required />
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="closeEditModal"
              class="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500">
              Cancel
            </button>
            <button type="submit" class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { getCategories } from '@/service/categories.service';
import { addProduct } from '@/service/products.service';
import { uploadFile } from '../service/files.service';

export default {
  props: {
    currentLanguage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      categories: [],
      subCategories: [], // Load subcategories from local storage
      products: [], // Products array
      imageFile: null,
      imagePreview: '',
      newProduct: {
        image: "",
        name: { Uzbek: "", Russian: "" },
        description: { Uzbek: "", Russian: "" },
        price: null,
        category: "",
        subCategory: "",
        inStock: true,
        technical: { kod: "", uzunligi: "", kengligi: "", balandligi: "", ogirligi: "" },
      },
      filters: { name: "", subCategory: "", kod: "", price: "" },
      isEditModalOpen: false, // Controls the modal visibility
      editedProduct: null, // Product being edited
      editedProductIndex: null,
    };
  },
  created() {
    // Load subcategories and products from local storage
    // const categories = JSON.parse(localStorage.getItem("mainCategories")) || [];
    // this.subCategories = categories.flatMap((category) => category.subCategories);
    // const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    // this.products = storedProducts;
    console.log(this.newProduct)
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        return (
          (this.filters.name === "" || product.name[this.currentLanguage].toLowerCase().includes(this.filters.name.toLowerCase())) &&
          (this.filters.subCategory === "" || product.subCategory === this.filters.subCategory) &&
          (this.filters.kod === "" || product.technical.kod.includes(this.filters.kod)) &&
          (this.filters.price === "" || product.price <= this.filters.price)
        );
      });
    },
  },
  watch: {
    newProduct: {
      deep: true,
      handler(value) {
        if(value.category) {
          this.subCategories = this.categories.find((category) => category.id === value.category).subCategories
        }
      }
    }
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageFile = file;
        this.imagePreview = URL.createObjectURL(file);
      }
    },
    async addProduct() {
      const imageUrl = await uploadFile(this.imageFile)
      const product = {
        ...this.newProduct,
        image: imageUrl,
      }
      await addProduct(product)
      this.products.push(product);
      // localStorage.setItem("products", JSON.stringify(this.products));
      // this.resetForm();
    },
    deleteProduct(index) {
      this.products.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(this.products));
    },
    openEditModal(product, index) {
      this.editedProduct = { ...product };
      this.editedProductIndex = index;
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
      this.editedProduct = null;
      this.editedProductIndex = null;
    },
    saveProduct() {
      if (this.editedProductIndex !== null) {
        this.products.splice(this.editedProductIndex, 1, this.editedProduct);
        localStorage.setItem("products", JSON.stringify(this.products));
        this.closeEditModal();
      }
    },
    resetForm() {
      this.newProduct = {
        image: "",
        viewCount: 0,
        soldCount: 0,
        name: { Uzbek: "", Russian: "" },
        description: { Uzbek: "", Russian: "" },
        price: null,
        subCategory: "",
        inStock: true,
        technical: { kod: "", uzunligi: "", kengligi: "", balandligi: "", ogirligi: "" },
      };
    },
    async fetchCategories() {
      this.categories = await getCategories()
    }
  },
  mounted() {
    this.fetchCategories()
  }
};
</script>
