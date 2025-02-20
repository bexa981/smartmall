<template>
  <section class="bg-white shadow-md rounded-lg p-6">
    <h2 class="text-2xl font-semibold mb-4">Bosh Sahifa Menyusi</h2>

    <!-- Mahsulotlarni Tanlash Guruhlari -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="group in groups" :key="group.key" class="bg-gray-100 p-4 rounded border">
        <h3 class="text-xl font-bold mb-2">{{ group.title }}</h3>
        <div v-for="(product, index) in groupedProducts[group.key]" :key="`group-${group.key}-${index}`"
          class="bg-white p-2 rounded border mb-2">
          <p><strong>{{ product.name }}</strong></p>
          <p>{{ product.price }} $</p>
          <img :src="product.image" alt="Product Image" class="w-16 h-16 object-cover rounded" />
          <button @click="removeProductFromGroup(product.id, group.key)" class="text-red-500 hover:underline">
            O'chirish
          </button>
        </div>
      </div>
    </div>

    <!-- Qidiruv va Jadval -->
    <div class="mt-6">
      <h3 class="text-xl font-bold mb-4">Mavjud Mahsulotlar</h3>
      <input v-model="searchQuery" @input="onSearch" type="text" placeholder="Mahsulot nomi bo'yicha qidirish"
        class="border border-gray-300 p-2 mb-4 rounded w-full focus:outline-none focus:ring focus:ring-green-500" />

      <table class="table-auto w-full border-collapse border border-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th class="border border-gray-300 p-2">Rasm</th>
            <th class="border border-gray-300 p-2">Nomi</th>
            <th class="border border-gray-300 p-2">Narxi</th>
            <th class="border border-gray-300 p-2">Harakatlar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id" class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">
              <img :src="product.image" alt="Mahsulot Rasmi" class="w-16 h-16 object-cover rounded" />
            </td>
            <td class="border border-gray-300 p-2">
              {{ product.name }}
            </td>
            <td class="border border-gray-300 p-2">{{ product.price }} $</td>
            <td class="border border-gray-300 p-2">
              <select v-model="product.selectedGroup" class="border p-2 rounded">
                <option value="" disabled>Guruhni tanlang</option>
                <option v-for="group in groups" :key="group.key" :value="group.key">
                  {{ group.title }}
                </option>
              </select>
              <button @click="addProductToGroup(product)"
                class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 ml-2">
                Qo'shish
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-between mt-4">
        <button @click="loadPreviousPage" :disabled="!canLoadPrevious" class="bg-gray-300 px-4 py-2 rounded">
          Oldingi
        </button>
        <button @click="loadNextPage" :disabled="!canLoadNext" class="bg-gray-300 px-4 py-2 rounded">
          Keyingi
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import {
  getPaginatedProducts,
  getProductsByGroup,
  addProductToGroup,
  removeProductFromGroup,
  searchProductsByName,

} from "@/service/products.service";

export default {
  props: {
    currentLanguage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      products: [], // Mavjud mahsulotlar
      searchQuery: "", // Qidiruv
      selectedGroup: "", // Tanlangan guruh
      lastVisible: null, // Sahifalash uchun oxirgi mahsulot
      loading: false, // Yuklanish holati
      canLoadNext: true, // Keyingi sahifa mavjudmi
      canLoadPrevious: false, // Oldingi sahifa mavjudmi
      groups: [
        { key: "carouselProducts", title: "Karusel Mahsulotlari (Max: 5)", limit: 5 },
        { key: "mostViewed", title: "Ko'p Ko'rilganlar (Max: 5)", limit: 5 },
        { key: "mostSold", title: "Ko'p Sotilganlar (Max: 5)", limit: 5 },
        { key: "mainProducts", title: "Asosiy Mahsulotlar (Max: 20)", limit: 20 },
      ],
      groupedProducts: {
        carouselProducts: [],
        mostViewed: [],
        mostSold: [],
        mainProducts: [],
      },
      paginatedProducts: [],
    };
  },
  methods: {
    async loadGroupedProducts() {
      for (const group of this.groups) {
        this.groupedProducts[group.key] = await getProductsByGroup(group.key);
      }
    },
    async loadPaginatedProducts(initial = false) {
      try {
        this.loading = true;
        const { products, lastVisible } = await getPaginatedProducts(
          initial ? null : this.lastVisible,
          10
        );
        this.paginatedProducts = products;
        this.lastVisible = lastVisible;
        this.canLoadNext = products.length === 10;
      } catch (error) {
        console.error("Sahifalashda xatolik:", error);
        alert("Sahifalashda xatolik yuz berdi.");
      } finally {
        this.loading = false;
      }
    },
    async addProductToGroup(product) {
      if (!product.selectedGroup) {
        return alert("Iltimos, guruhni tanlang!");
      }

      const group = this.groups.find((g) => g.key === product.selectedGroup);
      const currentGroup = this.groupedProducts[group.key];

      // Guruhda mahsulotlar soni limitini tekshirish
      if (currentGroup.length >= group.limit) {
        return alert(`Ushbu guruhda faqat ${group.limit} mahsulot bo'lishi mumkin.`);
      }

      // Mahsulotni guruhga qo'shish
      await addProductToGroup(product.id, group.key);

      // Mahsulot obyektining `selectedGroup` xususiyatini yangilash
      product.selectedGroup = group.key;

      // Guruhlangan mahsulotlarni qayta yuklash
      await this.loadGroupedProducts();
    },
    async removeProductFromGroup(productId, groupKey) {
      await removeProductFromGroup(productId);
      await this.loadGroupedProducts();
    },
    async fetchProducts(initial = false) {
      try {
        this.loading = true;
        const { products, lastVisible } = await getPaginatedProducts(
          initial ? null : this.lastVisible,
          10
        );
        const updatedProducts = products.map((product) => ({
          ...product,
          selectedGroup: "", // Har bir mahsulot uchun alohida `selectedGroup`
        }));

        if (initial) {
          this.products = updatedProducts;
        } else {
          this.products = [...this.products, ...updatedProducts];
        }
        this.lastVisible = lastVisible;
        this.canLoadNext = products.length === 10;
      } catch (error) {
        console.error("Mahsulotlarni yuklashda xatolik:", error);
        alert("Mahsulotlarni yuklashda xatolik yuz berdi.");
      } finally {
        this.loading = false;
      }
    },
    async onSearch() {
      if (!this.searchQuery) {
        this.fetchProducts(true); // Qidiruv bo'sh bo'lsa, asosiy mahsulotlarni yuklash
        return;
      }

      try {
        this.loading = true;
        const results = await searchProductsByName(this.searchQuery, 10);
        this.paginatedProducts = results;
        this.canLoadNext = false; // Qidiruvda sahifalash ishlamaydi
      } catch (error) {
        console.error("Qidiruvda xatolik:", error);
        alert("Qidiruvda xatolik yuz berdi.");
      } finally {
        this.loading = false;
      }
    },
    async loadNextPage() {
      if (this.canLoadNext) {
        await this.fetchProducts();
      }
    },
    loadPreviousPage() {
      alert("Firebase sahifalashda orqaga harakat qilinmaydi.");
    },
  },
  async mounted() {
    await this.loadGroupedProducts();
    await this.fetchProducts(true);
    this.products.forEach((product) => {
      const groupKey = Object.keys(this.groupedProducts).find((key) =>
        this.groupedProducts[key].some((p) => p.id === product.id)
      );

      // Agar mahsulot allaqachon guruhga qo'shilgan bo'lsa, guruhni belgilang
      product.selectedGroup = groupKey || "";
    });
  },
};
</script>

<style scoped>
/* Zarur bo'lsa, qo'shimcha CSS yozing */
</style>

