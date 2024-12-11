<template>
    <div class="flex bg-gray-50 min-h-screen main-allProd">
        <!-- Sidebar -->
        <aside class="w-1/4 bg-white shadow-lg p-3">
            <ul>
                <li v-for="(category, index) in categories" :key="index" class="mb-3">
                    <!-- Category Header -->
                    <div class="font-semibold text-xs flex justify-between items-center cursor-pointer p-3 menu-items rounded-lg"
                        @click="toggleCategory(index)">
                        {{ category.name }}
                        <span :class="{
                            'rotate-180': activeCategory === index,
                            'rotate-0': activeCategory !== index,
                        }" class="transition-transform duration-300">
                            ▼
                        </span>
                    </div>

                    <!-- Submenu with Animation -->
                    <transition name="slide-down">
                        <ul v-if="activeCategory === index" class="mt-2 pl-6 border-gray-200">
                            <li v-for="(subCategory, subIndex) in category.subCategories" :key="subIndex"
                                class="text-xs cursor-pointer py-2 hover:text-green-600 rounded transition-colors"
                                :class="{ 'font-bold': activeSubCategory === subCategory.id, 'font-normal': activeSubCategory !== subCategory.id }"
                                @click="selectSubCategory(subCategory)">
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
                <div class="mb-4 text-xs flex flex-wrap items-center gap-4">
                    <!-- All Products Button -->
                    <button :class="{
                        'bg-green-800 text-white': filter === '',
                        'bg-gray-200 text-gray-700 hover:bg-gray-300': filter !== '',
                    }" class="px-4 py-2 rounded transition-colors" @click="setFilter('')">
                        Barchasi
                    </button>

                    <!-- In Stock Button -->
                    <button :class="{
                        'bg-green-800 text-white': filter === 'inStock',
                        'bg-gray-200 text-gray-700 hover:bg-gray-300': filter !== 'inStock',
                    }" class="px-4 py-2 rounded transition-colors" @click="setFilter('inStock')">
                        Sotuvda mavjud
                    </button>

                    <!-- Newly Added Button -->
                    <button :class="{
                        'bg-green-800 text-white': filter === 'new',
                        'bg-gray-200 text-gray-700 hover:bg-gray-300': filter !== 'new',
                    }" class="px-4 py-2 rounded transition-colors" @click="setFilter('new')">
                        Yangi qo'shilgan
                    </button>
                </div>


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

            <!-- Products -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div v-for="(product, index) in filteredProducts" :key="index"
                    class="bg-white border border-gray-200 rounded-lg p-2 text-center shadow hover:shadow-lg transition-shadow">
                    <img :src="product.image" alt="Product Image" class="w-full h-32 object-cover mb-4 rounded" />
                    <h4 class="font-normal text-left text-xs text-gray-800">{{ product.name }}</h4>
                    <p class="text-green-800 text-left font-semibold">{{ product.price }} UZS</p>
                </div>
            </div>

        </section>
    </div>
</template>
<script>
export default {
    name: "DynamicProducts",
    data() {
        return {
            categories: [
                {
                    name: "Kabellar",
                    subCategories: [
                        { name: "AVVG", id: 1 },
                        { name: "VG", id: 2 },
                        { name: "VVF", id: 3 },
                    ],
                },
                {
                    name: "Simlar",
                    subCategories: [
                        { name: "VVF", id: 4 },
                        { name: "VVFng", id: 5 },
                    ],
                },
            ],
            products: [
                {
                    id: 1,
                    name: "Kabel AVVG",
                    price: 5950,
                    stock: true,
                    new: true,
                    image: "https://via.placeholder.com/150",
                    subCategory: 1,
                    rating: 4.5,
                },
                {
                    id: 1,
                    name: "Kabel AVVG",
                    price: 5950,
                    stock: true,
                    new: true,
                    image: "https://via.placeholder.com/150",
                    subCategory: 1,
                    rating: 4.5,
                },
                {
                    id: 1,
                    name: "Kabel AVVG",
                    price: 5950,
                    stock: true,
                    new: true,
                    image: "https://via.placeholder.com/150",
                    subCategory: 1,
                    rating: 4.5,
                },
                {
                    id: 1,
                    name: "Kabel AVVG",
                    price: 5950,
                    stock: true,
                    new: true,
                    image: "https://via.placeholder.com/150",
                    subCategory: 1,
                    rating: 4.5,
                },
                {
                    id: 1,
                    name: "Kabel AVVG",
                    price: 5950,
                    stock: true,
                    new: true,
                    image: "https://via.placeholder.com/150",
                    subCategory: 1,
                    rating: 4.5,
                },
                {
                    id: 2,
                    name: "Kabel VG",
                    price: 8500,
                    stock: false,
                    new: false,
                    image: "https://via.placeholder.com/150",
                    subCategory: 2,
                    rating: 4.0,
                },
                {
                    id: 3,
                    name: "Kabel VVF",
                    price: 4500,
                    stock: true,
                    new: true,
                    image: "https://via.placeholder.com/150",
                    subCategory: 3,
                    rating: 3.5,
                },
            ],
            activeCategory: null,
            activeSubCategory: null,
            filter: "",
            sortBy: "",
        };
    },
    computed: {
        filteredProducts() {
            let products = this.products.filter(
                (product) => product.subCategory === this.activeSubCategory
            );

            // Apply filters
            if (this.filter === "inStock") {
                products = products.filter((product) => product.stock);
            } else if (this.filter === "new") {
                products = products.filter((product) => product.new);
            }

            // Apply sorting
            if (this.sortBy === "priceLow") {
                products = products.sort((a, b) => a.price - b.price);
            } else if (this.sortBy === "priceHigh") {
                products = products.sort((a, b) => b.price - a.price);
            }

            return products;
        },
    },
    methods: {
        toggleCategory(index) {
            this.activeCategory = this.activeCategory === index ? null : index;
        },
        selectSubCategory(subCategory) {
            this.activeSubCategory = subCategory.id;
            this.resetFilters();
        },
        resetFilters() {
            this.filter = "";
            this.sortBy = "";
        },
        setFilter(value) {
            this.filter = value; // Set the active filter
        },
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
    .main-allProd{
flex-direction: column;
}
aside{
    width: 100%;
}
section{
    width: 100%;
}
}
</style>
  