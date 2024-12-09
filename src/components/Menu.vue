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
                                    @mouseenter="setActiveCategory(index)">
                                    <div class="category-header">
                                        <img :src="category.icon" alt="Category Icon" />
                                        <span>{{ category.name }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Subcategory Links -->
                            <div v-if="activeCategory !== null" class="subcategory-links">
                               
                                <div class="subcat2">
                                    <a v-for="(link, linkIndex) in categories[activeCategory].links" :key="linkIndex"
                                        :href="link.href">
                                        {{ link.text }}
                                    </a>
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

export default {
    name: "CatalogMenu",
    components: {
        Bars3Icon,
        XMarkIcon,
    },
    data() {
        return {
            isMenuOpen: false,
            activeCategory: null, // Track the currently active category
            categories: [
                {
                    name: "Kabellar",
                    icon: require('@/assets/kabeli.svg'),
                    links: [
                        { text: "AVVG | AVVGng", href: "/kabellar/avvg" },
                        { text: "SIP-2 | SIP-3 | SIP-4", href: "/kabellar/sip" },
                        { text: "TPP | TPPep", href: "/kabellar/tpp" },
                        { text: "AVVG | AVVGng", href: "/kabellar/avvg" },
                        { text: "SIP-2 | SIP-3 | SIP-4", href: "/kabellar/sip" },
                        { text: "TPP | TPPep", href: "/kabellar/tpp" },
                        { text: "AVVG | AVVGng", href: "/kabellar/avvg" },
                        { text: "SIP-2 | SIP-3 | SIP-4", href: "/kabellar/sip" },
                        { text: "TPP | TPPep", href: "/kabellar/tpp" },
                        { text: "AVVG | AVVGng", href: "/kabellar/avvg" },
                        { text: "SIP-2 | SIP-3 | SIP-4", href: "/kabellar/sip" },
                        { text: "TPP | TPPep", href: "/kabellar/tpp" },
                    ],
                },
                {
                    name: "Simlar",
                    icon: require('@/assets/provoda.svg'),
                    links: [
                        { text: "PUNP", href: "/simlar/punp" },
                        { text: "PUGNP", href: "/simlar/pugnp" },
                    ],
                },
                {
                    name: "Elektrotexnika",
                    icon: require('@/assets/category-icon-8.svg'),
                    links: [
                        { text: "Lampalar", href: "/elektrotexnika/lampalar" },
                        { text: "Yoritgichlar", href: "/elektrotexnika/yoritgichlar" },
                    ],
                },
            ],
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
            if (!this.isMenuOpen) {
                this.activeCategory = null; // Reset the active category when the menu is closed
            }
        },
        setActiveCategory(index) {
            this.activeCategory = index;
        },
    },
};
</script>

<style scoped>
.main {
    background-color: white;
}

/* Catalog Menu Container */
.catalog-menu {
    position: relative;
    width: 100%;
    background-color: white;
}

/* Menu Header */
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

/* Collapsing Menu Content */
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

.category-header img {
    width: 17px;
}

/* Subcategory Links */
.subcategory-links {
    flex: 2;
    padding-left: 20px;
    border-left: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap; /* Allow links to wrap to the next column */
    gap: 10px;
    max-height: 300px; /* Set max height */
    overflow-y: auto; /* Allow scrolling for overflow */
}

.subcategory-links>div {
    display: flex;
    flex-wrap: wrap; /* Allow links to wrap into multiple columns */
    flex-direction: row;
    column-gap: 5px; /* Space between columns */
}

.subcategory-links a {
    font-size: 13px;
    color: black;
    text-decoration: none;
    flex: 1 1 25%; /* Ensure 4 links per row */
    min-width: 150px;
    max-width: 200px;
    font-weight: 600;
}

.subcategory-links a:hover {
    
    color: #086c08;
}

/* Scrollbar Customization (Optional) */
.subcategory-links::-webkit-scrollbar {
    width: 6px;
}

.subcategory-links::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 3px;
}



/* Smooth Collapsing Animation */
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

@media (min-width: 13466px) {
    .container {
        max-width: 1366px;
    }
}

@media (min-width: 1200px) {
    .container {
        max-width: 1200px;
    }
}
</style>
