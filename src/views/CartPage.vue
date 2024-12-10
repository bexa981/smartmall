<template>
    <div class="main-cart">
        <div class="container links">
            <router-link to="/">Bosh sahifa</router-link> >
            <router-link to="/cart">Savat</router-link>
        </div>
        <div class="container">
            <h2>Savat</h2>
            <div class="flex">
                <!-- Cart Table -->
                <table v-if="cartProducts.length > 0">
                    <thead class="thTop">
                        <tr>
                            <th>Mahsulot</th>
                            <th>Narxi</th>
                            <th>Soni</th>
                            <th>Umumiy narx</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in cartProducts" :key="index">
                            <td class="nameImg">
                                <img :src="product.image" alt="Product Image" class="product-image" />
                                {{ product.description }}
                            </td>
                            <td class="price">{{ product.price }} UZS</td>
                            <td class="increments">
                                <button @click="decrementQuantity(index)">-</button>
                                <span>{{ product.quantity }}</span>
                                <button @click="incrementQuantity(index)">+</button>
                            </td>
                            <td class="allPrice">{{ product.price * product.quantity }} UZS</td>
                            <td class="actions">
                                <button class="removeBtn" @click="removeFromCart(index)">
                                    <TrashIcon class="trash" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- Empty Cart Message -->
                <p v-else>Savatingiz bo'sh! <router-link to="/allproducts">Do'konga o'tish</router-link></p>

                <!-- Order Form -->
                <div class="forBuy">
                    <h3>Buyurtmani rasmiylashtirish</h3>
                    <p class="items" v-if="cartProducts.length > 0">
                        <span>Umumiy narxi:</span> <span>{{ totalCost }} UZS</span>
                    </p>

                    <div class="form-group">
                        <label for="name">Ismingiz</label>
                        <input type="text" id="name" v-model="order.name" placeholder="Ismingizni kiriting" />
                    </div>
                    <div class="form-group">
                        <label for="phone">Raqamingiz</label>
                        <input type="text" id="phone" v-model="order.phone" placeholder="Telefon raqamingizni kiriting" />
                    </div>
                    <button class="order-btn" @click="placeOrder">Buyurtma qilish</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { TrashIcon } from "@heroicons/vue/24/outline";

export default {
    data() {
        return {
            cartProducts: JSON.parse(localStorage.getItem("cartProducts")) || [],
            order: {
                name: "",
                phone: "",
            },
        };
    },
    components: {
        TrashIcon,
    },
    computed: {
        totalCost() {
            return this.cartProducts.reduce(
                (total, product) => total + product.price * product.quantity,
                0
            );
        },
    },
    methods: {
        updateCart() {
            this.cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
        },
        incrementQuantity(index) {
            this.cartProducts[index].quantity += 1;
            localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts));
            this.updateCart();
        },
        decrementQuantity(index) {
            if (this.cartProducts[index].quantity > 1) {
                this.cartProducts[index].quantity -= 1;
                localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts));
                this.updateCart();
            }
        },
        removeFromCart(index) {
            this.cartProducts.splice(index, 1);
            localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts));
            this.updateCart();
        },
        updateLocalStorage() {
            localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts));
        },
        placeOrder() {
            if (!this.order.name || !this.order.phone) {
                alert("Iltimos, barcha maydonlarni to‘ldiring!");
                return;
            }
            alert(`Buyurtma qabul qilindi! ${this.order.name}, ${this.order.phone}`);
            // Reset the form and cart
            this.cartProducts = [];
            this.order.name = "";
            this.order.phone = "";
            this.updateLocalStorage();
        },
    },
};
</script>


<style scoped>
table {
    width: 100%;
    border: 1px solid gray;
    padding: 10px;
    border-collapse: collapse;
}

.flex {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;

}

.forBuy {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
    margin-bottom: 20px;
}

.forBuy h3 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 15px;
}

.forBuy .items {
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
}

.form-group {
    display: flex;
    flex-direction: column;
    /* Stack label and input vertically */
    margin-bottom: 15px;
}

.form-group label {
    margin-bottom: 5px;
    /* Add spacing between label and input */
    font-size: 14px;
    font-weight: 500;
    color: #333;
}

.form-group input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
}

.form-group input:focus {
    border-color: #086c08;
    outline: none;
}

.order-btn {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #086c08;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.order-btn:hover {
    background-color: #064b06;
}

.removeBtn {
    display: flex;
    align-items: center;
    background-color: white;
    border: none;
    cursor: pointer;
}

.trash {
    width: 25px;
    transition: .3s;
}

.trash:hover {
    width: 25px;
    transition: .3s;
    color: red;
}

.thTop {
    border-bottom: 1px solid gray !important;

}

.increments span {
    margin: 10px;
    padding: 2px 8px;
    font-size: 13px;
    border: 1px solid rgb(215, 212, 212);
}

.nameImg {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    font-size: 14px;
    font-weight: 300;
}

.increments button {
    border-radius: 50%;
    width: 25px;
    height: 25px;
    border: none;
    font-size: 13px;
    font-weight: 300;
    cursor: pointer;
    text-align: center;
}

th {
    font-size: 13px;
    font-weight: 400;
    color: gray;
    padding: 10px;

}

.price {
    font-size: 15px;
    font-weight: 600;
}

.allPrice {
    font-size: 15px;
    font-weight: 600;
}

tbody tr {
    text-align: center;
}

.main-cart {
    width: 100%;
    background-color: white;
}

.links {
    padding: 20px 0px;
}

.container h2 {
    font-size: 20px;
    font-weight: 500;
    padding: 20px 0;
}

.links a {
    font-size: 13px;
    color: black;
    text-decoration: none;
    transition: .3s;
}

.links a:hover {
    color: #086c08;
}

.product-image {
    width: 100px;

    object-fit: cover;
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
  