<template>
    <div class="category-media">
        <ul>
            <li>
                <router-link to="/allproducts">
                    <i class="fa-solid fa-bars" ></i>
                </router-link>
            </li>

            <li v-for="category in categories" :key="category.id">
                <router-link :to="`/category/${category.id}`">
                    <i :class="`${category.icon} images-cat`"></i>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import { getCategories } from '../service/categories.service'

export default {
    name: 'CategoryMedia',
    data() {
        return {
            categories: []
        }
    },
    methods: {
        async fetchCategories() {
            this.categories = await getCategories()
        }
    },
    mounted() {
        this.fetchCategories()
    }
};
</script>

<style scoped>
.images-cat{
    width: 40px;
    color: black;
   
}
.category-media {
    display: none;
    text-align: center;
    margin-top: 20px;
}
.category-media a{
    background-color: #fff;
    border-radius: 50%;
    padding: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    transition: .3s;
}
.category-media a:hover{
    background-color: rgb(193, 191, 191);
}
ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    gap: 10px;
    justify-content: center;
}

li {
    margin: 10px 0;
}

@media only screen and (max-width: 700px) {
    .category-media {
        display: block;
    }
}
</style>