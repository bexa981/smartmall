<template>
    <div class="main">


    <div class="all-products">
        <!-- Breadcrumb Navigation -->
        <div class="link-back">
            <router-link to="/">Bosh sahifa</router-link> >
            <router-link to="">Bo'limlar</router-link>
        </div>

        <!-- Main Categories Navigation -->
        <div class="categories-list">
            <div v-for="(category, index) in categories" :key="index" class="category-item"
                @click="scrollToCategory(category.name)">
                <i :class="category.iconClass"></i> {{ category.name }}
            </div>
        </div>
        <CategoryMediaVue/>

        <!-- Categories and Subcategories Sections -->
        <div class="category-sections">
            <div v-for="(category, index) in categories" :key="index" :id="category.name" class="category-section">
                <h2>{{ category.name }}</h2>
                <div class="subcategory-list">
                    <div v-for="(subcategory, subIndex) in category.subcategories" :key="subIndex" class="subcategory-item">
                        {{ subcategory }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Product List Display -->
        <div class="products">
            <!-- Add product display logic here -->
        </div>
    </div>
</div>
</template>
<script>
import CategoryMediaVue from "@/components/CategoryMedia.vue";
import Menu from '@/components/Menu.vue';
export default {
    components: {
    CategoryMediaVue,
    Menu,
  },
    data() {
        return {
            categories: [
                {
                    name: 'Kabellar',
                    iconClass: 'fas fa-cogs',  // Example FontAwesome icon for cables
                    subcategories: ['HDMI', 'USB', 'Power Cables']
                },
                {
                    name: 'Simlar',
                    iconClass: 'fas fa-plug',  // Example FontAwesome icon for wires
                    subcategories: ['Wire A', 'Wire B', 'Wire C']
                },
                {
                    name: 'Elektrotexnika',
                    iconClass: 'fas fa-bolt',  // Example FontAwesome icon for electrical devices
                    subcategories: ['Transformers', 'Generators', 'Motors']
                },
                {
                    name: 'Sport va hordiq',
                    iconClass: 'fas fa-football-ball',  // Example FontAwesome icon for sports
                    subcategories: ['Football', 'Basketball', 'Fitness']
                }
            ]
        };
    },
    methods: {
        scrollToCategory(categoryName) {
            // Scroll to the category section by category name
            const element = document.getElementById(categoryName);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }
};
</script>

<style scoped>
.main{
    background-color: white;
}

.all-products {
    padding-bottom: 20px;
    padding-top: 20px;
    background-color: white;
 
    width: 100%;
    padding-right: 8px;
    padding-left: 8px;
    margin-right: auto;
    margin-left: auto;
}

.link-back {
    margin-bottom: 20px;
    font-size: 14px;
    color: black;

}

.link-back a {
    color: black;
    text-decoration: none;
    transition: .3s;
    font-weight: 300;
}

.link-back a:hover {
    color: #086c08;
}

.categories-list {
    display: flex;
    margin-bottom: 30px;
}

.category-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 200px;
    font-size: 14px;
    padding: 10px 30px;
    font-weight: 500;
    border: 1px solid gray;
    color: #333;
    transition: color 0.3s ease;

}

.category-item:hover {
    color: #086c08;
    /* Change color on hover */
}

.category-item i {
    font-size: 22px;
    /* Adjust icon size */
}

.category-sections {
    margin-top: 50px;
    width: 80%;
    margin-left: 10%;
}

.category-section {
    margin-bottom: 40px;
    padding: 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #ccc;


}

.category-section h2 {
    font-size: 19px;
    margin-bottom: 10px;
    font-weight: 500;
    color: #086c08;
}

.subcategory-list {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
}

.subcategory-item {
    font-size: 14px;
    color: #333;
    cursor: pointer;
}

.subcategory-item:hover {
    color: #167f16;
    /* Change color on hover */
    text-decoration: underline;
}

.products {
    margin-top: 40px;
    /* Add your product display styles here */
}

/* Scroll effect */
html {
    scroll-behavior: smooth;
}

/* Media Queries for Responsiveness */
@media (max-width: 770px) {
    .category-sections {
        margin-top: 20px;
    }

    .category-item {
        font-size: 16px;
    }

    .category-section h2 {
        font-size: 20px;
    }

    .subcategory-item {
        font-size: 16px;
    }
}

@media (min-width: 768px) {
    .all-products {
        max-width: 768px;
    }
}

@media (min-width: 992px) {
    .all-products {
        max-width: 992px;
    }
}

@media (min-width: 1200px) {
    .all-products {
        max-width: 1200px;
    }
}

@media (min-width: 1400px) {
    .all-products {
        max-width: 1400px;

    }
}
@media only screen and (max-width: 700px) {
 .categories-list{
    display: none;
 }
}
</style>

  
  