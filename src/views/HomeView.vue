<template>
  <div class="home">
    <div class="catTop">
      <CategoryHomeVue />
      <div class="rightTop">
        <div class="itemsCarousel">
          <CarouselHomeVue />
          <CategoryMediaVue/>
          <ProductListHomeVue />
        </div>
        <router-link to="/category/:categoryId" class="bg-wall-link bg-wall">
          
        </router-link>
      </div>

    </div>

  </div>
</template>


<script>
import CategoryHomeVue from "@/components/CategoryHome.vue";
import CarouselHomeVue from '@/components/CarouselHome.vue';
import ProductListHomeVue from '@/components/ProductListHome.vue';
import CategoryMediaVue from "@/components/CategoryMedia.vue";
export default {
  components: {
    CategoryHomeVue,
    CarouselHomeVue,
    ProductListHomeVue,
    CategoryMediaVue,
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
@media only screen and (max-width: 1350px) {
.catTop{
  flex-direction: column;


}
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

</style>
