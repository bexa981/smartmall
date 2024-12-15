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
import CarouselHomeVue from "@/components/CarouselHome.vue";
import ProductListHomeVue from "@/components/ProductListHome.vue";
import CategoryMediaVue from "@/components/CategoryMedia.vue";
import AllProductsHome from "@/components/AllProductsHome.vue";
import { getProducts, getTopProducts } from '../service/products.service'

export default {
  components: {
    CategoryHomeVue,
    CarouselHomeVue,
    ProductListHomeVue,
    CategoryMediaVue,
    MostViewed,
    MostSold,
    AllProductsHome,
  },
  data() {
    return {
      mostViewedProducts: [],
      mostSoldProducts: [],
      allProducts: [],
    };
  },
  methods: {
    navigateToProductDetail(product) {
      this.$router.push({
        name: "ProductDetail",
        query: { product: JSON.stringify(product) },
      });
    },
    async fetchProducts() {
      // // Gets most 5 viewed products
      this.mostViewedProducts = await getTopProducts(5, 'viewCount')

      // // Gets most 5 sold products
      this.mostSoldProducts = await getTopProducts(5, 'soldCount')

      // Gets all products
      this.allProducts = await getProducts()
    }
  },
  mounted() {
    this.fetchProducts();
  }
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
