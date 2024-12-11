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
          :description="card.description"
        />
      </router-link>
    </div>
  </div>
</template>




  
<script>
import Card from "@/components/Card.vue";

export default {
  name: "ProductListHome",
  components: {
    Card,
  },
  data() {
    return {
      cards: [
        {
          image: require("@/assets/cardImage.jpeg"),
          price: 25127,
          description: "VPP 16 elektr simi",
        },
        {
          image: require("@/assets/cardImage.jpeg"),
          price: 2527,
          description: "VPP 16 elektr simi2",
        },
        {
          image: require("@/assets/sim2.jpeg"),
          price: 25127,
          description: "GSP 2х0,5 telefon simi",
        },
        {
          image: require("@/assets/sim3.jpeg"),
          price: 1740,
          description: "APV 10 elektr simi",
        },
        {
          image: require("@/assets/cardImage.jpeg"),
          price: 25127,
          description: "GSP 2х0,5 telefon simi4",
        },
      ],
    };
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
