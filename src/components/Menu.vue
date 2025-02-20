<template>
    <div class="main">
        <div class="container">
            <div class="catalog-menu">
                <!-- Menu Header -->
                <div class="menu-header" @click="toggleMenu">
                    <h3 class="menu-title">
                        <div class="icon">
                            <Bars3Icon v-if="!isMenuOpen" class="menu-icon" />
                            <XMarkIcon v-else class="menu-icon" />
                        </div>
                        Mahsulotlar katalogi
                    </h3>
                </div>

                <!-- Collapsing Menu -->
                <transition name="slide-fade">
                    <div v-if="isMenuOpen" class="menu-content-overlay">
                        <div class="menu-content">
                            <!-- Category List -->
                            <div class="category-list">
                                <div class="category" v-for="(category, index) in categories" :key="index"
                                    @mouseenter="hoverCategory(category)">
                                    <div class="category-header">
                                        <img v-if="category.image" :src="category.image" alt="category" class="w-8 h-8 object-contain mr-2" />
                                        <span>{{ category.id }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Subcategory Links -->
                            <div v-if="activeCategory" @mouseenter="keepSubCategoriesVisible" class="subcategory-links">
                                <div class="subcat2">
                                    <ul>
                                        <li class="flex items-center  mb-2 text-xs cursor-pointer hover:text-green-900 p-2 rounded"
                                            v-for="(subCategory) in activeCategory.subCategories" :key="subCategory.id"
                                            @click="navigateToCategory(activeCategory.name, subCategory.name)">
                                            {{ subCategory.name }}
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>
  
 
<script>
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { getCategories } from "@/service/categories.service";

export default {
    name: "CatalogMenu",
    components: {
        Bars3Icon,
        XMarkIcon,
    },
    data() {
        return {
            isMenuOpen: false,
            isSubCategoryHovered: false,
            activeCategory: null, // Faol kategoriya
            categories: [], // Serverdan yuklangan kategoriyalar
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
            if (!this.isMenuOpen) {
                this.activeCategory = null; // Menyu yopilganda aktiv kategoriyani tiklash
            }
        },
        hoverCategory(category) {
            this.activeCategory = category;
            this.isSubCategoryHovered = true;
        },
        keepSubCategoriesVisible() {
            this.isSubCategoryHovered = true;
        },
        hideSubCategories() {
            this.isSubCategoryHovered = false;
            setTimeout(() => {
                if (!this.isSubCategoryHovered) {
                    this.activeCategory = null;
                }
            }, 200); // Delay hiding to allow smooth transition
        },
        navigateToCategory(categoryName, subCategoryName = null) {

            // Navigate to DynamicProducts.vue with query params
            this.$router.push({
                name: "AllProducts", // Replace with your route name
                query: {
                    category: categoryName,
                    subCategory: subCategoryName,
                },
            });
            this.isMenuOpen = false;
            this.activeCategory = null;
        },
        //   clearActiveCategory() {
        //     this.activeCategory = null;
        //   },
        async fetchCategories() {
            try {
                this.categories = await getCategories();
                // console.log(this.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        },


    },
    async mounted() {
        this.fetchCategories()
    },
};
</script>
  
<style scoped>
.main {
    background-color: white;
}

.catalog-menu {
    position: relative;
    width: 100%;
    background-color: white;
}

.menu-header {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    border-bottom: 1px solid #ddd;
}

.menu-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 400;
}

.icon {
    display: flex;
}

.menu-icon {
    width: 24px;
    height: 24px;
}

.menu-content-overlay {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
    z-index: 10;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.menu-content {
    display: flex;
    padding: 20px;
    gap: 20px;
}

.category-list {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.category {
    margin-bottom: 15px;
    cursor: pointer;
}

.category-header {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 400;
}



.subcategory-links {
    flex: 2;
    padding-left: 20px;
    border-left: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
    max-height: 300px;
    overflow-y: auto;
}

.subcategory-links>div {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    column-gap: 5px;
}

.subcategory-links a {
    font-size: 13px;
    color: black;
    text-decoration: none;
    flex: 1 1 25%;
    min-width: 150px;
    max-width: 200px;
    font-weight: 600;
}

.subcategory-links a:hover {
    color: #086c08;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
    transform: translateY(0);
    opacity: 1;
}

.container {
    width: 100%;
    padding-right: 8px;
    padding-left: 8px;
    margin-right: auto;
    margin-left: auto;
    background-color: white;
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
</style>

