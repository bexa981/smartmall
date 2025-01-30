<template>
  <div>
    <!-- Loading Spinner -->
    <div v-if="loading" class="flex items-center justify-center h-screen bg-gray-100">
      <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Manage Products Section -->
    <section v-else class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-4">Mahsulot qo'shish</h2>

      <!-- Add Product Form -->
      <form @submit.prevent="addProduct" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <!-- File Input -->
        <div>
          <label class="block font-semibold mb-1">Mahsulot rasmi</label>
          <input id="fileInput" type="file" accept="image/*" @change="onFileChange"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500" />
          <div v-if="newProduct.image" class="mt-2">
            <img :src="newProduct.image" alt="Product Preview" class="w-24 h-24 object-cover rounded" />
          </div>
        </div>

        <!-- Product Name -->
        <div>
          <label class="block font-semibold mb-1">Mahsulot nomi</label>
          <input type="text" v-model="newProduct.name" placeholder="Enter product name"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
            required />
        </div>

        <!-- Product Description -->
        <div class="md:col-span-2">
          <label class="block font-semibold mb-1">Mahsulot tavsifi</label>
          <textarea v-model="newProduct.description" placeholder="Enter product description"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
            required></textarea>
        </div>

        <!-- Product Price -->
        <div>
          <label class="block font-semibold mb-1">Narxi ($)</label>
          <input type="text" v-model="formattedPrice" @input="formatPrice" placeholder="0.00$"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
            required />
        </div>

        <!-- Product Category -->
        <div>
          <label class="block font-semibold mb-1">Kategoriyasi</label>
          <select v-model="newProduct.category"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500" required>
            <option value="" disabled>Kategoriya tanlang</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Product Subcategory -->
        <div>
          <label class="block font-semibold mb-1">Sub kategoriyasi</label>
          <select v-model="newProduct.subCategory"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500" required>
            <option value="" disabled>Sub kategoriya tanlang</option>
            <option v-for="sub in subCategories" :key="sub.id" :value="sub">{{ sub.name }}</option>
          </select>
        </div>

        <!-- Product In Stock -->
        <div>
          <label class="block font-semibold mb-1">Sotuvda mavjudmi</label>
          <select v-model="newProduct.inStock"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500" required>
            <option :value="true">Ha mavjud</option>
            <option :value="false">Zakazga</option>
          </select>
        </div>

        <!-- Technical Characteristics -->
        <div class="md:col-span-2">
          <h3 class="text-xl font-bold mb-4">Texnik sifatlari</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold mb-1">Kod</label>
              <input type="text" v-model="newProduct.technical.kod" placeholder="Enter Kod"
                class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500" />
            </div>
            <div>
              <label class="block font-semibold mb-1">Uzunligi</label>
              <input type="text" v-model="newProduct.technical.uzunligi" placeholder="Enter Uzunligi"
                class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500" />
            </div>
            <div>
              <label class="block font-semibold mb-1">Kengligi</label>
              <input type="text" v-model="newProduct.technical.kengligi" placeholder="Enter Kengligi"
                class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500" />
            </div>
            <div>
              <label class="block font-semibold mb-1">Balandligi</label>
              <input type="text" v-model="newProduct.technical.balandligi" placeholder="Enter Balandligi"
                class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500" />
            </div>
            <div>
              <label class="block font-semibold mb-1">Og‘irligi</label>
              <input type="text" v-model="newProduct.technical.ogirligi" placeholder="Enter Og‘irligi"
                class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500" />
            </div>
          </div>
        </div>

        <button type="submit" class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 md:col-span-2">
          Mahsulot qo'shish
        </button>
      </form>

      <!-- Filter Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input type="text" v-model="filters.name" placeholder="Search by product name"
          class="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
          @input="searchProducts" />
        <select v-model="filters.category"
          class="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
          @change="filterProducts">
          <option value="">Kategoriyalar</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <select v-model="filters.subCategory"
          class="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
          @change="filterProducts">
          <option value="">Subcategories</option>
          <option v-for="sub in subCategories" :key="sub.id" :value="sub">{{ sub.name }}</option>
        </select>
        <input type="text" v-model="filters.price" placeholder="Filter by Max Price"
          class="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
          @input="filterProducts" />
      </div>
      <!-- Product Table -->
      <table class="table-auto w-full border-collapse border border-gray-300 mt-8">
        <thead class="bg-gray-200">
          <tr>
            <th class="border border-gray-300 p-2">Mahsulot rasmi</th>
            <th class="border border-gray-300 p-2">Mahsulot nomi</th>
            <th class="border border-gray-300 p-2">Mahsulot narxi</th>
            <th class="border border-gray-300 p-2">Kategoriyasi</th>
            <th class="border border-gray-300 p-2">Subcategoiyasi</th>
            <th class="border border-gray-300 p-2">Sotuvda mavjudmi</th>
            <th class="border border-gray-300 p-2">Texnik sifatlari</th>
            <th class="border border-gray-300 p-2">Sozlamalar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index" class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">
              <img :src="product.image" alt="Product Image" class="w-16 h-16 object-cover rounded" />
            </td>
            <td class="border border-gray-300 p-2">{{ product.name }}</td>
            <td class="border border-gray-300 p-2">{{ product.price }} $</td>
            <td class="border border-gray-300 p-2">{{ product.categoryName }}</td>
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
                O'zgartirish
              </button>
              <button @click="deleteProduct(index, product.id)"
                class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">
                O'chirish
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination Controls -->
      <div class="mt-4 flex justify-between">
        <button @click="loadPreviousPage" :disabled="!hasPreviousPage" class="bg-gray-300 px-4 py-2 rounded">
          Oldingi
        </button>
        <button @click="loadNextPage" :disabled="!hasMorePages" class="bg-gray-300 px-4 py-2 rounded">
          Keyingi
        </button>
      </div>
    </section>

    <!-- Edit Modal -->
    <div v-if="isEditModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 class="text-xl font-semibold mb-4">Mahsulot sozlamalari</h3>
        <form @submit.prevent="saveProduct">
          <div class="mb-4">
            <label class="block font-semibold mb-1">Mahsulot nomi</label>
            <input type="text" v-model="editedProduct.name"
              class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
              required />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Narxi ($)</label>
            <input type="text" v-model="formattedEditPrice" @input="formatEditPrice" placeholder="0.00$"
              class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
              required />
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="closeEditModal"
              class="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500">
              Bekor qilish
            </button>
            <button type="submit" class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { getCategories } from '@/service/categories.service';
import { addProduct, deleteProduct, getPaginatedProducts, filterProductsByCriteria, searchProductsByName, updateProduct } from '@/service/products.service';
import { uploadFile } from '@/service/files.service';

export default {
  props: {
    currentLanguage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formattedEditPrice: "",
      categories: [], // Kategoriyalar
      subCategories: [], // Subkategoriyalarni tanlash uchun
      products: [], // Mahsulotlar ro'yxati
      imageFile: null,
      formattedPrice: "",
      imagePreview: '',
      lastVisibleProduct: null, // Sahifalash uchun oxirgi mahsulot
      hasMorePages: true, // Keyingi sahifani yuklash mumkinmi
      hasPreviousPage: false, // Oldingi sahifaga qaytish
      loading: false, // Yuklanish belgisi
      newProduct: {
        image: "",
        name: "",
        description: "",
        price: "",
        category: "",
        subCategory: "",
        inStock: true,
        technical: { kod: "", uzunligi: "", kengligi: "", balandligi: "", ogirligi: "" },
      },

      filters: { name: "", subCategory: "", category: "", kod: "", price: "" }, // Filtrlar
      isEditModalOpen: false, // Tahrirlash oynasi holati
      editedProduct: null, // Tahrirlanayotgan mahsulot
      editedProductIndex: null,
    };
  },
  // computed: {
  //   filteredProducts() {
  //     return this.products.filter((product) => {
  //       return (
  //         (this.filters.name === "" || product.name.toLowerCase().includes(this.filters.name.toLowerCase())) &&
  //         (this.filters.subCategory === "" || product.subCategory === this.filters.subCategory) &&
  //         (this.filters.kod === "" || product.technical.kod.includes(this.filters.kod)) &&
  //         (this.filters.price === "" || product.price <= this.filters.price)
  //       );
  //     });
  //   },
  // },
  watch: {
    // Subkategoriyalarni avtomatik yuklash
    "newProduct.category": function (categoryId) {
      const category = this.categories.find((cat) => cat.id === categoryId);
      this.subCategories = category ? category.subCategories : [];
    },
  },
  methods: {
    formatPrice(event) {
      let value = event.target.value.replace(/[^0-9.]/g, ""); // Remove invalid characters

      // Ensure only one decimal point
      if (value.split(".").length > 2) {
        value = value.substring(0, value.lastIndexOf("."));
      }

      // Prevent leading "." (convert ".5" → "0.5")
      if (value.startsWith(".")) {
        value = "0" + value;
      }

      // Ensure proper decimal formatting (max 2 decimal places)
      if (value.includes(".")) {
        const [integer, decimal] = value.split(".");
        value = integer + "." + (decimal.length > 2 ? decimal.slice(0, 2) : decimal);
      }

      // Update stored value (pure number)
      this.newProduct.price = value ? parseFloat(value) : "";

      // Display formatted value with "$" symbol
      this.formattedPrice = value ? `${value}` : "";
    },

    formatEditPrice(event) {
      let value = event.target.value.replace(/[^0-9.]/g, ""); // Remove invalid characters

      // Ensure only one decimal point
      if (value.split(".").length > 2) {
        value = value.substring(0, value.lastIndexOf("."));
      }

      // Prevent leading "." (convert ".5" → "0.5")
      if (value.startsWith(".")) {
        value = "0" + value;
      }

      // Ensure max 2 decimal places
      if (value.includes(".")) {
        const [integer, decimal] = value.split(".");
        value = integer + "." + (decimal.length > 2 ? decimal.slice(0, 2) : decimal);
      }

      // Store pure number in `editedProduct.price`
      this.editedProduct.price = value ? parseFloat(value) : "";

      // Display formatted value with "$" symbol
      this.formattedEditPrice = value ? `${value}` : "";
    },



    async loadInitialPage() {
      try {
        this.loading = true;
        const { products, lastVisible } = await getPaginatedProducts(null, 6);
        this.products = products;
        this.lastVisibleProduct = lastVisible;
        this.hasMorePages = products.length === 6;
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        this.loading = false;
      }
    },
    async loadNextPage() {
      if (!this.hasMorePages) return;

      try {
        const { products, lastVisible } = await getPaginatedProducts(this.lastVisibleProduct, 10);
        this.products = [...this.products, ...products];
        this.lastVisibleProduct = lastVisible;
        this.hasMorePages = products.length === 5;
      } catch (error) {
        console.error("Error loading next page:", error);
      }
    },
    async loadPreviousPage() {
      // Implement if necessary
    },
    async loadCategories() {
      try {
        const categories = await getCategories();
        this.categories = categories.map((cat) => ({
          id: cat.id,
          name: cat.id,
          subCategories: cat.subCategories || [],
        }));
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    },
    async searchProducts() {
      try {
        const products = await searchProductsByName(this.filters.name);
        this.products = products;
      } catch (error) {
        console.error("Error searching products:", error);
      }
    },
    async onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageFile = file;
        this.imagePreview = URL.createObjectURL(file);
      }
    },
    async addProduct() {
      try {
        if (!this.newProduct.price || isNaN(this.newProduct.price)) {
          alert("Iltimos, mahsulot uchun to'g'ri narx kiriting!");
          return;
        }

        console.log("✅ Mahsulot narxi:", this.newProduct.price, "$");


        this.loading = true;
        const imageUrl = this.imageFile ? await uploadFile(this.imageFile) : "";

        const product = {

          ...this.newProduct,
          image: imageUrl,
        };

        const productId = await addProduct(product);
        console.log(productId);
        product.id = productId;
        this.products.unshift(product);
        this.resetForm();

        alert("Mahsulot muvaffaqiyatli qo'shildi!");
      } catch (error) {
        console.error("Mahsulot qo'shishda xatolik:", error);
        alert("Mahsulot qo'shishda xatolik yuz berdi.");
      } finally {
        this.loading = false;
      }
    },
    async filterProducts() {
      try {
        const criteria = {
          category: this.filters.category,
          subCategory: this.filters.subCategory,
          maxPrice: this.filters.price ? parseFloat(this.filters.price.replace("$", "")) : null, // 🔥 Ensure numeric value
        };

        const products = await filterProductsByCriteria(criteria);
        this.products = products;
      } catch (error) {
        console.error("Error filtering products:", error);
      }
    },
    async deleteProduct(index, productId) {
      try {
        await deleteProduct(productId);
        this.products.splice(index, 1);
        alert("Mahsulot muvaffaqiyatli o'chirildi!");
      } catch (error) {
        console.error("Mahsulotni o'chirishda xatolik:", error);
        alert("Mahsulotni o'chirishda xatolik yuz berdi.");
      }
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
    async saveProduct() {
      try {
        if (this.editedProductIndex !== null) {
          const updatedProduct = { ...this.editedProduct };

          await updateProduct(this.editedProduct.id, updatedProduct);
          this.products.splice(this.editedProductIndex, 1, updatedProduct);

          alert("Mahsulot muvaffaqiyatli yangilandi!");
          this.closeEditModal();
        }
      } catch (error) {
        console.error("Mahsulotni yangilashda xatolik:", error);
        alert("Mahsulotni yangilashda xatolik yuz berdi.");
      }
    },
    resetForm() {
      this.newProduct = {
        image: "",
        name: "",
        description: "",
        price: "",
        category: "",
        subCategory: "",
        inStock: true,
        technical: { kod: "", uzunligi: "", kengligi: "", balandligi: "", ogirligi: "" },
      };
      this.imageFile = null;
      this.imagePreview = "";
      this.formattedEditPrice = "";
      this.formattedPrice = "";
    },
  },
  async mounted() {
    this.loadCategories();
    this.loadInitialPage();
  },
};
</script>


