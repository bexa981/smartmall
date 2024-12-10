<template>
  <div class="main">
    <div class="container links">
      <router-link to="/">Bosh sahifa</router-link>
      >
      <router-link to="/likes">Tanlanganlar</router-link>
    </div>

    <div class="container">
      <h2>Tanlanganlar</h2>
      <div v-if="likedProducts.length > 0" class="products">
        <router-link v-for="(product, index) in likedProducts" :key="index"
          :to="{ name: 'ProductDetail', params: { id: product.id } }" class="product">
          <img :src="product.image" alt="Product Image" />
          <p class="prodName">{{ product.description }}</p>
          <div class="likesBtn">
            <p class="prodPrice"> {{ product.price }} UZS</p>
            <button @click.stop.prevent="removeFromLikes(index)">
              <HeartIcon class="icon" />
            </button>
          </div>
        </router-link>
      </div>
      <p v-else>Istaklar ro'yxati bo'sh!  <router-link to="/allproducts">Do'konga o'tish</router-link></p>
    </div>
  </div>
</template>

<script>
import { HeartIcon } from "@heroicons/vue/24/solid";

export default {
  data() {
    return {
      likedProducts: [],
    };
  },
  components: {
    HeartIcon,
  },
  created() {
    this.loadLikedProducts();
  },
  methods: {
    loadLikedProducts() {
      this.likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];
    },
    removeFromLikes(index) {
      this.likedProducts.splice(index, 1);
      localStorage.setItem("likedProducts", JSON.stringify(this.likedProducts));
    },
  },
};
</script>

  



<style scoped>
.container h2 {
  font-size: 20px;
  font-weight: 500;
  padding: 20px 0;
  margin-top: 30px;
}

.links a {
  font-size: 13px;
  color: black;
  text-decoration: none;
  transition: .3s;
}

.links {
  padding-top: 20px;
}

.products a {
  text-decoration: none;
  color: black;
}

.links a:hover {
  color: #086c08;
}

.main {
  background-color: white;
}

.products {
  display: flex;
}

.products img {
  width: 100%;
  height: 200px;
  transition: .3s;

}

.products img:hover {
  transform: scale(1.1);
}

.product {
  width: 250px;
  padding: 10px;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.product:hover img {
  transform: scale(1.1);

}

.likesBtn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.likesBtn .icon {
  width: 24px;
  color: red;
}

.likesBtn button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
}

.prodName {
  font-size: 14px;
  font-weight: 300;
}

.prodPrice {
  font-weight: 600;
}

.container {
  width: 100%;
  padding-right: 8px;
  padding-left: 8px;
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
  