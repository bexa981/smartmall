<template>
  <div class="home">
    <div class="catTop container">
      <CategoryHomeVue class="category-home"/>
      <div class="rightTop">
        <div class="itemsCarousel">
          <CarouselHomeVue />
          <CategoryMediaVue/>
          <ProductListHomeVue />
        </div>
        <!-- <router-link to="/category/:categoryId" class="bg-wall-link bg-wall">
          
        </router-link> -->
      </div>
      
    </div>
    <MostViewed :mostViewedProducts="mostViewedProducts" />
    <MostSold :mostSoldProducts="mostSoldProducts" />
    <AllProductsHome :allProducts="allProducts" />
  </div>
</template>


<script>
import MostSold from "@/components/MostSold.vue";
import MostViewed from "@/components/MostViewed.vue";
import CategoryHomeVue from "@/components/CategoryHome.vue";
import CarouselHomeVue from '@/components/CarouselHome.vue';
import ProductListHomeVue from '@/components/ProductListHome.vue';
import CategoryMediaVue from "@/components/CategoryMedia.vue";
import AllProductsHome from "@/components/AllProductsHome.vue";
export default {
  components: {
    CategoryHomeVue,
    CarouselHomeVue,
    ProductListHomeVue,
    CategoryMediaVue,
    MostViewed,
    MostSold ,
    AllProductsHome
  },
  data() {
    return {
      mostViewedProducts: [
        {
          name: "ПВС 2x1,5 электр сими",
          price: "5 818",
          image: "https://rahmat.uz/photos/products_xl/5180qupVW8Ue.png", // Replace with actual URLs
        },
        {
          name: "СИП-4 2x16 сими",
          price: "6 150",
          image: "https://rahmat.uz/photos/products_xl/5180qupVW8Ue.png",
        },
        {
          name: "ПУНП 2x2,5 электр сими",
          price: "7 347",
          image: "https://rahmat.uz/photos/products_xl/5180qupVW8Ue.png",
        },
        {
          name: "Эмалланган сим ПЭТВ-2 1,18",
          price: "162 000",
          image: "https://rahmat.uz/photos/products_xl/5180qupVW8Ue.png",
        },
        {
          name: "AC 25/4,2 сими",
          price: "37 329",
          image: "https://rahmat.uz/photos/products_xl/5180qupVW8Ue.png",
        },
       
      ],
      mostSoldProducts: [
        {
          name: "Product A",
          price: "7,000",
          image: "https://rahmat.uz/photos/products_xl/5180qupVW8Ue.png",
        },
        {
          name: "Product B",
          price: "12,000",
          image: "https://rahmat.uz/photos/products_xl/5180qupVW8Ue.png",
        },
        {
          name: "Product C",
          price: "18,000",
          image: "https://rahmat.uz/photos/products_xl/5180qupVW8Ue.png",
        },
        {
          name: "Product D",
          price: "22,000",
          image: "https://rahmat.uz/photos/products_xl/5180qupVW8Ue.png",
        },
        {
          name: "Product E",
          price: "29,000",
          image: "https://rahmat.uz/photos/products_xl/5180qupVW8Ue.png",
        },
       
      ],
      allProducts: [
        {
          name: "PUNP 2x1,5 elektr simi",
          price: "4,776",
          image: "https://via.placeholder.com/150",
        },
        {
          name: "PUNP 2x2,5 elektr simi",
          price: "7,347",
          image: "https://via.placeholder.com/150",
        },
        {
          name: "PUNP 2x4,0 elektr simi",
          price: "11,775",
          image: "https://via.placeholder.com/150",
        },
        {
          name: "PUNP 2x4,0 elektr simi",
          price: "11,775",
          image: "https://via.placeholder.com/150",
        },
        {
          name: "PUNP 2x4,0 elektr simi",
          price: "11,775",
          image: "https://via.placeholder.com/150",
        },
        {
          name: "PUNP 2x4,0 elektr simi",
          price: "11,775",
          image: "https://via.placeholder.com/150",
        },
        {
          name: "PUNP 2x4,0 elektr simi",
          price: "11,775",
          image: "https://via.placeholder.com/150",
        },
        {
          name: "PUNP 2x4,0 elektr simi",
          price: "11,775",
          image: "https://via.placeholder.com/150",
        },
        {
          name: "PUNP 2x4,0 elektr simi",
          price: "11,775",
          image: "https://via.placeholder.com/150",
        },
        {
          name: "PUNP 2x4,0 elektr simi",
          price: "11,775",
          image: "https://via.placeholder.com/150",
        },
        {
          name: "PUNP 2x4,0 elektr simi",
          price: "11,775",
          image: "https://via.placeholder.com/150",
        },
        {
          name: "PUNP 2x4,0 elektr simi",
          price: "11,775",
          image: "https://via.placeholder.com/150",
        },
        {
          name: "PUNP 2x1,5 elektr simi",
          price: "4,776",
          image: "https://via.placeholder.com/150",
        },
        {
          name: "PUNP 2x1,5 elektr simi",
          price: "4,776",
          image: "https://via.placeholder.com/150",
        },
        {
          name: "PUNP 2x1,5 elektr simi",
          price: "4,776",
          image: "https://via.placeholder.com/150",
        },
        
       
        // Add more product objects here
      ],
    };
  },
};
</script>

<style scoped>

.rightTop{
  display: flex;
}
.catTop {
  display: flex;
  justify-content: center;
  width: 100%;

}

.bg-wall {
  width: 250px;
  background-image: url(../assets/simRight.jpg);
  background-size: cover;
  background-position: center;
  margin-top: 20px;
}
@media only screen and (max-width: 850px) {
  .category-home{
    display: none!important;
  }
}
@media only screen and (max-width: 1350px) {

.rightTop{
  justify-content: center;
}
.bg-wall{
  width: 200px;

}
}
@media only screen and (max-width: 900px) {
.bg-wall{
  display: none;
}
}
.container {
    width: 100%;
    
    margin-top: 30px;
    margin-right: auto;
    margin-left: auto;
    background-color: transparent;
}

@media (min-width: 1346px) {
    .container {
        max-width: 1366px;
    }
}

@media (min-width: 1250px) {
    .container {
        max-width: 1250px;
    }
}
</style>
