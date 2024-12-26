<template>
  <div class="main">


    <div class="product-detail container">
      <div class="card">
        <img :src="imageSrc" alt="Product Image" class="product-image" />
        <div class="card-main">
          <div class="card-content">
            <h2 class="product-title">{{ title }}</h2>
            <div class="likes">
              <p class="product-price"> {{ price }} UZS</p>
              <button @click="toggleLike" class="like-button">
                <i :class="liked ? 'fas fa-heart icons text-red-500' : 'far fa-heart icons text-gray-500'"></i>
                Tanlanganlarga
              </button>
            </div>

          </div>
          <!-- Quantity Control -->
          <div class="quantity-control">
            <div class="cont1">
              <label for="">Soni:</label>
              <p class="product-stock" :class="inStock ? 'text-green' : 'text-red'"> {{ inStock ? "Sotuvda mavjud" :
                "Sotuvda mavjud emas" }}</p>
            </div>
            <div class="cont2">
              <button @click="decrementQuantity" :disabled="quantity <= 0">-</button>
              <span>{{ quantity }}</span>
              <button @click="incrementQuantity">+</button>
            </div>

          </div>
          <!-- Actions -->
          <div class="actions">
            <button class="buy-button" @click="addToCart">Savatga qo'shish +</button>
          </div>
          <p class="aloqa"> Bizni ijtimoiy tarmoqlarda ham kuzatib boring!</p>
          <div class="social">
            <a href="https://www.facebook.com" target="_blank" class="social-icon">
              <i class="fab fa-facebook icons"></i> <!-- Facebook Icon -->
            </a>
            <a href="https://www.instagram.com" target="_blank" class="social-icon">
              <i class="fab fa-instagram icons"></i> <!-- Facebook Icon -->
            </a>
            <a href="https://t.me/smartmalltexnika" target="_blank" class="social-icon">
              <i class="fab fa-telegram icons"></i> <!-- Facebook Icon -->
            </a>
          </div>
        </div>
        <div class="tavsiya2">
          <h2>Sizga tavsiya qilamiz</h2>
          <div class="tavsiya">
            <div class="tavsiya-prod">
              <div></div>
              <p>12 000 UZS</p>
            </div>

            <div class="tavsiya-prod">
              <div></div>
              <p>12 000 UZS</p>
            </div>
            <div class="tavsiya-prod">
              <div></div>
              <p>12 000 UZS</p>
            </div>


          </div>

        </div>
      </div>
      <TabsVue :techSpecs="product?.technical || {}" :description="product?.description || {}" />

    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import TabsVue from "@/components/Tabs.vue";

export default {
  name: "ProductDetail",
  components: {
    TabsVue,
  },
  props: ["id"], // Receive `id` as a prop
  data() {
    return {
      product: null,
      quantity: 1,
      liked: false, // Initial state of the like button
    };
  },
  created() {
    const productData = this.$route.query.product
      ? JSON.parse(this.$route.query.product)
      : null;

    if (productData) {
      this.product = productData;
    } else if (this.id) {
      this.fetchProduct(this.id); // Fetch product details if `id` is available
    } else {
      this.handleMissingData(); // Handle missing data
    }

    this.checkIfLiked(); // Check the like state when the component is created
  },
  computed: {
    imageSrc() {
      return this.product?.image || "https://via.placeholder.com/150";
    },
    title() {
      return this.product?.name || "Unknown Product";
    },
    description() {
      return this.product?.description || "No description available.";
    },
    price() {
      return this.product?.price || "N/A";
    },
    inStock() {
      return this.product?.inStock || false;
    },
  },
  methods: {
    async fetchProduct(id) {
      try {
        // Mahsulotni Firestore'dan olish
        const fetchedProduct = await getProduct(id);
        if (fetchedProduct) {
          this.product = fetchedProduct; // Mahsulotni saqlash
        } else {
          this.handleMissingData();
        }
      } catch (error) {
        console.error("Mahsulotni olishda xatolik:", error);
        this.handleMissingData();
      }
    },
    handleMissingData() {
      // Redirect to a fallback page or show an error message
      Swal.fire({
        icon: "error",
        title: "Mahsulot topilmadi",
        text: "Iltimos, qayta urinib ko'ring yoki boshqa mahsulotni tanlang.",
        confirmButtonText: "OK",
      }).then(() => {
        this.$router.push({ name: "Home" }); // Replace "Home" with your fallback route name
      });
    },
    incrementQuantity() {
      this.quantity += 1;
    },
    decrementQuantity() {
      if (this.quantity > 0) {
        this.quantity -= 1;
      }
    },
    toggleLike() {
      if (this.liked) {
        this.removeFromLikes();
      } else {
        this.addToLikes();
      }
      this.liked = !this.liked; // Toggle the like state
    },
    checkIfLiked() {
      try {
        const likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];
        this.liked = likedProducts.some((p) => p.id === this.id);
      } catch (error) {
        console.error("Failed to check liked products:", error);
      }
    },
    addToLikes() {
      try {
        const product = {
          id: this.id, // Ensure each product has a unique ID
          image: this.imageSrc,
          description: this.description,
          name: this.title,
          price: this.price,
        };
        const likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];
        likedProducts.push(product);
        localStorage.setItem("likedProducts", JSON.stringify(likedProducts));

        Swal.fire({
          icon: "success",
          title: "Mahsulot tanlanganlarga qo'shildi!",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Failed to add to likes:", error);
      }
    },
    removeFromLikes() {
      try {
        const likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];
        const updatedLikes = likedProducts.filter((p) => p.id !== this.id);
        localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));

        Swal.fire({
          icon: "info",
          title: "Mahsulot tanlanganlardan o'chirildi!",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Failed to remove from likes:", error);
      }
    },
    addToCart() {
      try {
        const product = {
          id: this.id, // Ensure each product has a unique ID
          image: this.imageSrc,
          name: this.title,
          description: this.description,
          price: this.price,
          quantity: this.quantity,
        };
        const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
        const existingProductIndex = cartProducts.findIndex((p) => p.id === product.id);

        if (existingProductIndex !== -1) {
          cartProducts[existingProductIndex].quantity += this.quantity;
        } else {
          cartProducts.push(product);
        }

        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        window.dispatchEvent(new Event("cart-updated"));

        Swal.fire({
          icon: "success",
          title: "Mahsulot savatga qo'shildi!",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Failed to add to cart:", error);
      }
    },
  },
};
</script>





<style scoped>
.main {
  background-color: white;
}

.tavsiya2 {
  display: flex;
  flex-direction: column;
}

.tavsiya2 h2 {
  font-size: 13px;
  font-weight: 500;
}

.card {
  display: flex;
  padding: 10px;
  gap: 20px;

}

.text-red-500 {
  color: red;
}

.icons {
  font-size: 18px;
  margin-right: 8px;
  transition: color 0.3s ease;
}

.like-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
}

.text-green {
  color: green;
  font-weight: 300;
  border: 1px solid;
  /* Optional for better emphasis */
}

.text-red {
  color: red;
  font-weight: 300;
  border: 1px solid;

  /* Optional for better emphasis */
}

.actions {
  margin-top: 20px;
}

.actions button {
  padding: 5px 8px;
  color: white;
  cursor: pointer;
  background-color: #086c08;
  border: none;
  border-radius: 3px;
  transition: .3s;
}

.actions button:hover {
  background-color: #279627;
}

.tavsiya {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

}



.tavsiya .tavsiya-prod div {
  width: 150px;
  height: 150px;
  background-color: gray;
}

.tavsiya .tavsiya-prod {
  text-align: center;
}

.card-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;

}

.card-main h2 {
  font-size: 16px;
  font-weight: 600;
  padding: 10px 4px;
}

.card-main p {
  padding: 5px;
}

.card img {
  width: 40%;
  height: 40%;
}

.likes {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.likes p {
  font-size: 20px;
  font-weight: 600;
}

.quantity-control {
  display: flex;
  flex-direction: column;
  margin-left: 5px;

}

.quantity-control button {
  border-radius: 50%;
  width: 25px;
  height: 25px;
  border: none;
  text-align: center;
  cursor: pointer;
  font-size: 13px;
  font-weight: 300;
}

.quantity-control span {
  font-size: 13px;
  padding: 2px 20px;
  margin: 0px 5px;
  border: 1px solid rgb(198, 195, 195);
}

.cont1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;

}

.social {
  display: flex;
  gap: 30px;
  margin-top: -10px;
}

.aloqa {
  font-size: 13px;
  padding: 0 !important;
  margin: 0;
}

.social i {
  font-size: 30px;
  color: rgb(32, 67, 143);
  transition: .3s;
}

.social i:hover {
  transform: scale(1.1);
}

.cont1 label {
  font-weight: 300;
}



.container {
  width: 100%;
  padding-right: 8px;
  padding-left: 8px;
  margin-right: auto;
  margin-left: auto;
  background-color: white;
}

@media screen and (max-width: 750px) {
  .card {
    flex-direction: column;
    flex-wrap: wrap;
  }

  .tavsiya .tavsiya-prod div {
    width: 120px;
    height: 120px;
    background-color: gray;
    margin-top: 10px;
  }

  .tavsiya {
    flex-wrap: wrap;
  }

  .product-image {
    width: 100% !important;

  }

  .tavsiya {
    flex-direction: row;
  }

  .aloqa {
    font-size: 12px;
  }


}

@media screen and (max-width: 550px) {
  .cont1 {
    flex-direction: column-reverse;
    gap: 20px;
  }

  .quantity-control {
    text-align: center;
    gap: 10px;
  }

  .actions {
    text-align: center;
  }
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
