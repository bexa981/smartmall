<template>
  <div style="text-align: center;">
    <div class="card-container">
      <router-link
        v-for="(card, index) in cards"
        :key="index"
        :to="{ 
          name: 'ProductDetail', 
          params: { id: index }, 
          query: { product: JSON.stringify(card) } 
        }"
        class="card-link"
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
  import Card from '@/components/Card.vue'
  
  export default {
    name: 'ProductListHome',
    components: {
      Card
    },
    data() {
      return {
        cards: [
          {
            image: require('@/assets/cardImage.jpeg'),
            price: 25127,
            description: 'VPP 16 elektr simi'
          },
          {
            image: require('@/assets/cardImage.jpeg'),
            price: 2527,
            description: 'VPP 16 elektr simi2'
          },
          {
            image: require('@/assets/sim2.jpeg'),
            price: 25127,
            description: 'GSP 2х0,5 telefon simi'
          },
          {
            image: require('@/assets/sim3.jpeg'),
            price: 1740,
            description: 'APV 10 elektr simi'
          },
          {
            image: require('@/assets/cardImage.jpeg'),
            price: 25127,
            description: 'GSP 2х0,5 telefon simi4'
          }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0px 10px;
  }
  
  .card-link {
    text-decoration: none;
  }
  @media only screen and (max-width: 700px) {
    .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0px 10px;
  }
  }
  @media only screen and (max-width: 450px) {
  .card-link{
      width: 100%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card{
      width: 300px;
    }

    .card-container {
   text-align: center;
   gap: 20px;
   justify-content: center;
  }
  }
  </style>
  