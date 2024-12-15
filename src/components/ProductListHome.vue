<template>
  <div class="text-center">
    <div class="card-main grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-5">
      <router-link
        v-for="(card, index) in cards"
        :key="index"
        :to="{ 
          name: 'ProductDetail', 
          params: { id: index }, 
          query: { product: JSON.stringify(card) } 
        }"
        class="transform w-auto h-auto transition-transform duration-200  "
      >
        <Card
          :imageSrc="card.image"
          :price="card.price"
          :description="card.description?.Uzbek || card.description"
        />
      </router-link>
    </div>
  </div>
</template>




  
<script>
import Card from "@/components/Card.vue";
import { getProducts, getTopProducts } from "@/service/products.service";

export default {
  name: "ProductListHome",
  components: {
    Card,
  },
  data() {
    return {
      cards: [],
    };
  },
  methods: {
    async fetchProducts() {
      this.cards = await getTopProducts(5)
      console.log(this.cards)
    }
  },
  mounted() {
    this.fetchProducts();
  }
};
</script>
<style>


@media screen and (max-width: 500px) {
  .card-main{
  padding: 1px;
}
}
</style>
