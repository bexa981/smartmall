<template>
    <div class="flex bg-gray-50 min-h-screen main-allProd">
        <!-- Sidebar -->
        <aside class="w-1/4 bg-white shadow-lg p-3">
            <ul>
                <li v-for="(category, index) in categories" :key="index" class="mb-3">
                    <!-- Category Header -->
                    <div class="font-semibold text-xs flex justify-between items-center cursor-pointer p-3 menu-items rounded-lg"
                        @click="toggleCategory(index)">
                        {{ category.id }}
                        <span :class="{
                            'rotate-180': activeCategory === index,
                            'rotate-0': activeCategory !== index,
                        }" class="transition-transform duration-300">
                            ▼
                        </span>
                    </div>
                    <transition name="slide-down">
                        <ul v-if="activeCategory === index" class="mt-2 pl-6 border-gray-200">
                            <li v-for="(subCategory, subIndex) in category.subCategories" :key="subIndex"
                                class="text-xs cursor-pointer py-2 hover:text-green-600 rounded transition-colors"
                                :class="{ 'font-bold': activeSubCategory === subCategory.name }"
                                @click="setActiveSubCategory(category.id, subCategory.name)">
                                {{ subCategory.name }}
                            </li>
                        </ul>
                    </transition>
                </li>
            </ul>
        </aside>

        <!-- Products Section -->
        <section class="w-3/4 p-3 bg-transparent">



            <!-- Filters and Sorting -->
            <div class="mb-6 flex flex-wrap items-center gap-4">
                <!-- All Products Button -->
                <button :class="{
                    'bg-green-800 text-white': filter === '',
                    'bg-gray-200 text-gray-700 hover:bg-gray-300': filter !== '',
                }" class="px-4 py-2 rounded transition-colors" @click="setFilter('')">
                    Barchasi
                </button>

                <!-- Sotuvda Mavjud Button -->
                <button :class="{
                    'bg-green-800 text-white': filter === 'inStock',
                    'bg-gray-200 text-gray-700 hover:bg-gray-300': filter !== 'inStock',
                }" class="px-4 py-2 rounded transition-colors" @click="setFilter('inStock')">
                    Sotuvda mavjud
                </button>

                <!-- Yangi Qo'shilgan Button -->
                <button :class="{
                    'bg-green-800 text-white': filter === 'new',
                    'bg-gray-200 text-gray-700 hover:bg-gray-300': filter !== 'new',
                }" class="px-4 py-2 rounded transition-colors" @click="setFilter('new')">
                    Yangi qo'shilgan
                </button>

                <select v-model="sortBy"
                    class="border text-xs -mt-3 border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-800">
                    <option value="">Narx</option>
                    <option value="priceLow">O'sish bo'yicha</option>
                    <option value="priceHigh">Kamayish bo'yicha</option>
                </select>

                <button @click="resetFilters"
                    class="bg-gray-200 text-xs -mt-3 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors">
                    Filtrlarni tiklash
                </button>
            </div>

            <!-- Products Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div v-for="(product, index) in filteredProducts" :key="index" @click="navigateToProductDetail(product)"
                    class="bg-white border border-gray-200 rounded-lg p-2 text-center shadow hover:shadow-lg transition-shadow">
                    <img :src="product.image" alt="Product Image" class="w-full h-32 object-cover mb-4 rounded" />
                    <h4 class="font-normal text-left text-xs text-gray-800">
                        {{ product.name }}
                    </h4>
                    <p class="text-green-800 text-left font-semibold">{{ product.subCategory.name }}</p>
                    <p class="text-green-800 text-left font-semibold">{{ product.price }} UZS</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { getCategories } from "../service/categories.service";
import { getProducts } from "../service/products.service";

export default {
    name: "DynamicProducts",
    data() {
        return {
            categories: [], // List of categories
            products: [], // List of products
            activeCategory: null, // Currently selected category index
            activeSubCategory: null, // Currently selected subcategory name
            filter: "", // Current filter (e.g., 'inStock', 'new')
            sortBy: "", // Sorting option (e.g., 'priceLow', 'priceHigh')
        };
    },
    computed: {
        filteredProducts() {
            let filtered = this.products;

            // Tanlangan subkategoriya bo'yicha filtrlash
            if (this.activeSubCategory) {
                filtered = filtered.filter((product) => {
                    if (!product.subCategory || !product.subCategory.name) {
                        return false; // subCategory.name mavjud bo'lmasa, false qaytaradi
                    }
                    // subCategory.name va activeSubCategory ni solishtiradi
                    return (
                        product.subCategory.name.trim().toLowerCase() ===
                        this.activeSubCategory.trim().toLowerCase()
                    );
                });
            }

            // Qo'shimcha filtrlash (agar kerak bo'lsa)
            if (this.filter === "inStock") {
                filtered = filtered.filter((product) => product.stock);
            } else if (this.filter === "new") {
                filtered = filtered.filter((product) => product.new);
            }

            // Narx bo'yicha saralash
            if (this.sortBy === "priceLow") {
                filtered = filtered.sort((a, b) => a.price - b.price);
            } else if (this.sortBy === "priceHigh") {
                filtered = filtered.sort((a, b) => b.price - a.price);
            }

            return filtered;
        },
    },
    methods: {
        extractSubCategoryName(subCategoryObj) {
            if (!subCategoryObj || typeof subCategoryObj !== "object") {
                console.warn("Noto'g'ri subCategoryPath:", subCategoryObj);
                return ""; // Agar subCategory obyekt bo'lmasa, bo'sh string qaytariladi
            }
            return subCategoryObj.name || ""; // Agar `name` mavjud bo'lsa, uni qaytaradi
        },
        async fetchCategories() {
            try {
                this.categories = await getCategories();

            } catch (error) {
                console.error("Error fetching categories:", error);
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
        async fetchProducts() {
            try {
                const rawProducts = await getProducts();
                this.products = rawProducts.map((product) => ({
                    ...product,
                    subCategory: {
                        ...product.subCategory, // Mavjud obyektni saqlash
                        name: product.subCategory?.name || "", // `name` maydonini qo'shish
                    },
                }));
            } catch (error) {
                console.error("Mahsulotlarni olishda xatolik:", error);
            }
        },
        toggleCategory(index) {
            this.activeCategory = this.activeCategory === index ? null : index;
        },
        setActiveSubCategory(categoryId, subCategoryName) {
            this.activeSubCategory = subCategoryName; // Tanlangan subkategoriya nomini saqlash
            this.$router.push({
                query: { subCategory: subCategoryName }, // URL query parametrlarini yangilash
            });
        },
        loadFromQuery() {
            const subCategoryName = this.$route.query.subCategory;
            if (subCategoryName) {
                this.activeSubCategory = subCategoryName;

                const categoryIndex = this.categories.findIndex((category) =>
                    category.subCategories.some((sub) => sub.name === subCategoryName)
                );
                this.activeCategory = categoryIndex;
            }
        },
        filterBySubCategory(subCategory) {
            // Set the active subcategory locally and filter products
            this.activeSubCategory = subCategory.name;
        },
        resetFilters() {
            this.filter = "";
            this.sortBy = "";
        },
        setFilter(value) {
            this.filter = value; // Set the active filter
        },
    },
    async created() {

        await this.fetchCategories();
        await this.fetchProducts();
        this.loadFromQuery();
    },
    watch: {
        $route: "loadFromQuery",
    },
};
</script>



<style scoped>
.menu-items {
    background: linear-gradient(90deg, rgb(234, 245, 238), rgb(247, 237, 230));
}

/* Slide-Down Transition */
.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.3s ease-in-out;
}

.slide-down-enter-from,
.slide-down-leave-to {
    transform: scaleY(0);
    opacity: 0;
    transform-origin: top;
}

.slide-down-enter-to,
.slide-down-leave-from {
    transform: scaleY(1);
    opacity: 1;
}


@media screen and (max-width: 650px) {
    .main-allProd {
        flex-direction: column;
    }

    aside {
        width: 100%;
    }

    section {
        width: 100%;
    }
}
</style>
  
  