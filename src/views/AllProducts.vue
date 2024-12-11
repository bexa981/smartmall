<template>
    
    <div class="main">
        <div class="container">

            <DynamicProducts />
        </div>
    </div>
</template>

<script>

import DynamicProducts from '@/components/DynamicProducts.vue';
export default {
    name: "AllProducts", // Provide a name for your parent component
    components: {
        // Register the imported component
        DynamicProducts,
    },
}
</script>


  
  <style scoped>
.container {
    width: 100%;
    
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