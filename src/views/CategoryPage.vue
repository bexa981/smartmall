<template>
    <div class="category-page">
      <h2>Category: {{ categoryId }}</h2>
      <ul>
        <!-- Example of category items -->
        <li v-for="item in categoryItems" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CategoryPage',
    props: {
      categoryId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        categoryItems: []  // To store items of the current category
      };
    },
    created() {
      this.fetchCategoryItems();
    },
    methods: {
      fetchCategoryItems() {
        // Fetch items based on categoryId. 
        // You can replace this with an API call or a static array for testing.
        const allItems = {
          1: [{ id: 1, name: 'Item 1A' }, { id: 2, name: 'Item 1B' }],
          2: [{ id: 3, name: 'Item 2A' }, { id: 4, name: 'Item 2B' }],
          3: [{ id: 5, name: 'Item 3A' }, { id: 6, name: 'Item 3B' }],
          4: [{ id: 7, name: 'Item 4A' }, { id: 8, name: 'Item 4B' }],
        };
        this.categoryItems = allItems[this.categoryId] || [];
      }
    }
  };
  </script>
  
  <style scoped>
  .category-page {
    text-align: center;
    margin-top: 20px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 10px 0;
  }
  </style>