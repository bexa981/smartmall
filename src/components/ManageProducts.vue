<template>
  <div>
    <!-- Loading Spinner -->
    <div v-if="loading" class="flex items-center justify-center h-screen bg-gray-100">
      <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Manage Products Section -->
    <section v-else class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-4">Manage Products</h2>

      <!-- Add Product Form -->
      <form @submit.prevent="addProduct" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <!-- File Input -->
        <div>
          <label class="block font-semibold mb-1">Product Image</label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            @change="onFileChange"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
          />
          <div v-if="newProduct.image" class="mt-2">
            <img :src="newProduct.image" alt="Product Preview" class="w-24 h-24 object-cover rounded" />
          </div>
        </div>

        <!-- Product Name -->
        <div>
          <label class="block font-semibold mb-1">Product Name</label>
          <input
            type="text"
            v-model="newProduct.name"
            placeholder="Enter product name"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
            required
          />
        </div>

        <!-- Product Description -->
        <div class="md:col-span-2">
          <label class="block font-semibold mb-1">Product Description</label>
          <textarea
            v-model="newProduct.description"
            placeholder="Enter product description"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
            required
          ></textarea>
        </div>

        <!-- Product Price -->
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

        <!-- Product Category -->
        <div>
          <label class="block font-semibold mb-1">Category</label>
          <select
            v-model="newProduct.category"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
            required
          >
            <option value="" disabled>Select category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Product Subcategory -->
        <div>
          <label class="block font-semibold mb-1">Subcategory</label>
          <select
            v-model="newProduct.subCategory"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
            required
          >
            <option value="" disabled>Select subcategory</option>
            <option v-for="sub in subCategories" :key="sub.id" :value="sub.name">{{ sub.name }}</option>
          </select>
        </div>

        <!-- Product In Stock -->
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

        <!-- Technical Characteristics -->
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
        <input
          type="text"
          v-model="filters.name"
          placeholder="Search by product name"
          class="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
        />
        <select
          v-model="filters.category"
          class="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
        >
          <option value="">Categories</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <select
          v-model="filters.subCategory"
          class="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
        >
          <option value="">Subcategories</option>
          <option v-for="sub in subCategories" :key="sub.id" :value="sub.name">{{ sub.name }}</option>
        </select>
        <input
          type="text"
          v-model="filters.kod"
          placeholder="Filter by Kod"
          class="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
        />
        <input
          type="number"
          v-model="filters.price"
          placeholder="Filter by Price"
          class="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
        />
      </div>

      <!-- Product Table -->
      <table class="table-auto w-full border-collapse border border-gray-300 mt-8">
        <thead class="bg-gray-200">
          <tr>
            <th class="border border-gray-300 p-2">Image</th>
            <th class="border border-gray-300 p-2">Name</th>
            <th class="border border-gray-300 p-2">Price</th>
            <th class="border border-gray-300 p-2">Category</th>
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
            <td class="border border-gray-300 p-2">{{ product.name }}</td>
            <td class="border border-gray-300 p-2">{{ product.price }} UZS</td>
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
              <button @click="openEditModal(product, index)" class="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
                Edit
              </button>
              <button @click="deleteProduct(index, product.id)" class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination Controls -->
      <div class="mt-4 flex justify-between">
        <button @click="loadPreviousPage" :disabled="!hasPreviousPage" class="bg-gray-300 px-4 py-2 rounded">
          Previous
        </button>
        <button @click="loadNextPage" :disabled="!hasMorePages" class="bg-gray-300 px-4 py-2 rounded">
          Next
        </button>
      </div>
    </section>

    <!-- Edit Modal -->
    <div v-if="isEditModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 class="text-xl font-semibold mb-4">Edit Product</h3>
        <form @submit.prevent="saveProduct">
          <div class="mb-4">
            <label class="block font-semibold mb-1">Product Name</label>
            <input
              type="text"
              v-model="editedProduct.name"
              class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Price (UZS)</label>
            <input
              type="number"
              v-model="editedProduct.price"
              class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
              required
            />
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="closeEditModal" class="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500">
              Cancel
            </button>
            <button type="submit" class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { getCategories } from '@/service/categories.service';
import { addProduct, deleteProduct, getPaginatedProducts, updateProduct } from '@/service/products.service';
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
      categories: [], // Kategoriyalar
      subCategories: [], // Subkategoriyalarni tanlash uchun
      products: [], // Mahsulotlar ro'yxati
      imageFile: null,
      imagePreview: '',
      lastVisibleProduct: null, // Sahifalash uchun oxirgi mahsulot
      hasMorePages: true, // Keyingi sahifani yuklash mumkinmi
      hasPreviousPage: false, // Oldingi sahifaga qaytish
      loading: false, // Yuklanish belgisi
      newProduct: {
        image: "",
        name: "",
        description: "",
        price: null,
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
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        return (
          (this.filters.name === "" || product.name.toLowerCase().includes(this.filters.name.toLowerCase())) &&
          (this.filters.subCategory === "" || product.subCategory === this.filters.subCategory) &&
          (this.filters.kod === "" || product.technical.kod.includes(this.filters.kod)) &&
          (this.filters.price === "" || product.price <= this.filters.price)
        );
      });
    },
  },
  watch: {
    // Subkategoriyalarni avtomatik yuklash
    "newProduct.category": function (categoryId) {
      const category = this.categories.find((cat) => cat.id === categoryId);
      this.subCategories = category ? category.subCategories : [];
    },
  },
  methods: {
    async loadInitialPage() {
      try {
        this.loading = true;
        const { products, lastVisible } = await getPaginatedProducts(null, 10);
        this.products = products;
        this.lastVisibleProduct = lastVisible;
        this.hasMorePages = products.length === 10;
      } catch (error) {
        console.error("Mahsulotlarni yuklashda xatolik:", error);
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
        this.hasMorePages = products.length === 10;
      } catch (error) {
        console.error("Keyingi sahifani yuklashda xatolik:", error);
      }
    },
    async loadCategories() {
      try {
        const categories = await getCategories();
        this.categories = categories.map((cat) => ({
          id: cat.id,
          name: cat.id, // Kategoriya nomi sifatida `id` ishlatiladi
          subCategories: cat.subCategories || [],
        }));
      } catch (error) {
        console.error("Kategoriyalarni olishda xatolik:", error);
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
        this.loading = true;
        const imageUrl = this.imageFile ? await uploadFile(this.imageFile) : "";

        const product = {
          ...this.newProduct,
          image: imageUrl,
        };

        const productId = await addProduct(product);
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
        price: null,
        category: "",
        subCategory: "",
        inStock: true,
        technical: { kod: "", uzunligi: "", kengligi: "", balandligi: "", ogirligi: "" },
      };
      this.imageFile = null;
      this.imagePreview = "";
    },
  },
  async mounted() {
    this.loadCategories();
    this.loadInitialPage();
  },
};
</script>


