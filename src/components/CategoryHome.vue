<template>
    <div class="category-main">
        <div class="cat-top">
            <Bars3BottomLeftIcon class="barsleft" />
            <p style="font-weight: bold;">Bo'limlar</p>
            <router-link to="/allproducts" class="barchasi">Barchasi</router-link>
        </div>
        <!-- category -->
        <div class="category-container">
            <div v-for="category in categories" :key="category.id" class="category-item"
                @mouseenter="showItems(category.id)" @mouseleave="hideItems">
                <span>{{ category.name }}</span>
                <div v-show="activeCategoryId === category.id" class="category-items">
                    <ul>
                        <li v-for="item in category.items" :key="item.id">{{ item.name }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { Bars3BottomLeftIcon } from '@heroicons/vue/24/outline';
export default {
    components: {
        Bars3BottomLeftIcon,
    },
    data() {
        return {
            categories: [
                { id: 1, name: 'Electronics', items: [{ id: 1, name: 'TV' }, { id: 2, name: 'Phone' }, { id: 3, name: 'Laptop' },{ id: 3, name: 'Laptop' },{ id: 3, name: 'Laptop' },{ id: 3, name: 'Laptop' },{ id: 3, name: 'Laptop' },{ id: 3, name: 'Laptop' },{ id: 3, name: 'Laptop' },{ id: 3, name: 'Laptop' },{ id: 3, name: 'Laptop' },{ id: 3, name: 'Laptop' },{ id: 3, name: 'Laptop' },{ id: 3, name: 'Laptop' },{ id: 3, name: 'Laptop' },{ id: 3, name: 'Laptop' },{ id: 3, name: 'Laptop' },{ id: 3, name: 'Laptop' },{ id: 3, name: 'Laptop' }] },
                { id: 2, name: 'Furniture', items: [{ id: 4, name: 'Sofa' }, { id: 5, name: 'Table' }, { id: 6, name: 'Chair' }] },
                { id: 3, name: 'Clothing', items: [{ id: 7, name: 'Shirt' }, { id: 8, name: 'Pants' }, { id: 9, name: 'Shoes' }] },
            ],
            activeCategoryId: null,
        };
    },
    methods: {
        showItems(id) {
            this.activeCategoryId = id;
        },
        hideItems() {
            this.activeCategoryId = null;
        },
    },
};
</script>

<style scoped>
.barsleft {
    width: 24px;
    color: black;
}
.barchasi{
    color: black;
    text-decoration: none;
    transition: .3s;
}
.barchasi:hover{
    color: green;
    text-decoration: underline;
}
.category-main{
    width: 250px;
    background-color: white;
    
}
.cat-top{
    display: flex;
    justify-content: space-between;
    background-color: #dadad8;
    font-size: 14px;
    align-items: center;
    padding: 10px;
    border-radius: 7px 7px 0px 0px;
    width: 100%;
}
.category-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    
}

.category-item {
    position: relative;
    padding: 10px;
    cursor: pointer;
    font-size: 14px;
}
@media only screen and (max-width: 1350px) {
    .category-container{
        display: none;
    }
    .category-main{
        position: relative;
        left: 11%;
    }
}
@media only screen and (max-width: 700px) {
    .category-main{
        position: static;
        margin-left: 5px;
        
    }
    .cat-top{
        display: none;
    }
}

.category-item:hover {
    font-weight: bold;
}

.category-items {
  z-index: 5;
 
  position: absolute;
  top: 0;
  left: 250px;
  width: 300px;
  background-color: white;
  display: flex;
  /* flex-wrap: wrap; */
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.1);
  padding: 10px;
  height: 400px; /* Fixed height for the category items */
  overflow-y: auto; /* Allow scrolling if the content overflows */
}

.category-items > div {
  width: 200px; /* Adjust the width of each category item */
  margin: 5px;  /* Space between items */
}

.category-item:hover .category-items {
    display: block;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
}

li {
    padding: 1px 0;
    margin: 5px 0;
}

.category-item:hover .category-items ul li {
    cursor: pointer;
    padding: 1px 0;
    width: 250px;
    border-bottom: 2px solid rgb(234, 231, 231);
}

.category-item:hover .category-items ul li:hover {
    
    color: #086c08;
}
</style>