<template>
  <div class="text-center">
    <div class="card-main grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-2">
      <router-link
        v-for="(card, index) in cards"
        :key="index"
        :to="{ 
          name: 'ProductDetail', 
          params: { id: card.id }, 
          query: { product: JSON.stringify(card) } 
        }"
        class="transform w-auto h-auto transition-transform duration-200"
      >
        <Card
          :imageSrc="card.image"
          :price="card.price"
          :description="card.name"
        />
      </router-link>
    </div>
  </div>
</template>




  
<script>
import Card from "@/components/Card.vue";
import { getProductsByGroup } from "@/service/products.service";

export default {
  name: "ProductListHome",
  components: {
    Card,
  },
  data() {
    return {
      cards: [], // Karusel mahsulotlari
    };
  },
  methods: {
    async fetchCarouselProducts() {
      try {
        // "carouselProducts" tipidagi mahsulotlarni olish
        this.cards = await getProductsByGroup("carouselProducts");
      } catch (error) {
        console.error("Karusel mahsulotlarini olishda xatolik:", error);
      }
    },
  },
  mounted() {
    this.fetchCarouselProducts();
  },
};
</script>

<style>


@media screen and (max-width: 500px) {
  .card-main{
  padding: 1px;
}
}
</style>
