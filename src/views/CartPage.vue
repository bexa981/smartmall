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
                                {{ product.name }}
                            </td>
                            <td class="price">{{ product.price }} $</td>
                            <td class="increments">
                                <button @click="decrementQuantity(index)">-</button>
                                <span>{{ product.quantity }}</span>
                                <button @click="incrementQuantity(index)">+</button>
                            </td>
                            <td class="allPrice">Jami: {{ product.price * product.quantity }} $</td>
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
                        <span>Umumiy narxi:</span> <span>{{ totalCost }} $</span>
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
import Swal from "sweetalert2";
import axios from "axios";

export default {
    name: "CartPage",
    components: {
        TrashIcon,
    },
    data() {
        return {
            cartProducts: JSON.parse(localStorage.getItem("cartProducts")) || [],
            order: {
                name: "",
                phone: "",
            },
        };
    },
    computed: {
        totalCost() {
            return this.cartProducts.reduce(
                (total, product) => total + (product.price * (product.quantity || 1)), 0
            );
        },
    },
    mounted() {
        window.addEventListener("cart-updated", this.updateCart);
    },
    beforeUnmount() {
        window.removeEventListener("cart-updated", this.updateCart);
    },
    methods: {
        updateCart() {
            this.cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
        },
        incrementQuantity(index) {
            this.cartProducts[index].quantity += 1;
            this.syncCart();
        },
        decrementQuantity(index) {
            if (this.cartProducts[index].quantity > 1) {
                this.cartProducts[index].quantity -= 1;
                this.syncCart();
            }
        },
        removeFromCart(index) {
            this.cartProducts.splice(index, 1);
            this.cartProducts = [...this.cartProducts];
            this.syncCart();
        },
        syncCart() {
            localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts));
            window.dispatchEvent(new Event("cart-updated"));
        },
        async placeOrder() {
            if (!this.order.name.trim() || !this.order.phone.trim()) {
                Swal.fire({
                    icon: "error",
                    title: "Xatolik!",
                    text: "Iltimos, barcha maydonlarni to‘ldiring!",
                });
                return;
            }

            const userId = Math.floor(Math.random() * 1000000);

            let orderText = `🛒 *Yangi Buyurtma!* \n`;
            orderText += `🆔 *User ID:* ${userId} \n`;
            orderText += `👤 *FIO:* ${this.order.name} \n`;
            orderText += `📞 *Telefon:* ${this.order.phone} \n`;
            orderText += `💰 *Umumiy narx:* ${this.totalCost} $ \n\n`;

            this.cartProducts.forEach((product, index) => {
                orderText += `📌 *Mahsulot ${index + 1}:* \n`;
                orderText += `📷 *Rasm:* [Tovarga qarash](${product.image})\n`;
                orderText += `🔹 *Nomi:* ${product.name} \n`;
                orderText += `💵 *Narxi:* ${product.price} $ \n`;
                orderText += `📦 *Soni:* ${product.quantity} \n\n`;
            });

            orderText += `🌍 *Web sayt orqali buyurtma berildi!*`;

            const botToken = "7545687507:AAG_TGgNnbRQ9S19EPBdSuIpQ59ZWJ5uLfg"; 
            const chatId = "-4796888041"; 
            const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

            try {
                await axios.post(telegramUrl, {
                    chat_id: chatId,
                    text: orderText,
                    parse_mode: "Markdown",
                });

                Swal.fire({
                    icon: "success",
                    title: "Buyurtma qabul qilindi!",
                    text: `Hurmatli ${this.order.name}, biz siz bilan bog‘lanamiz!`,
                });

                this.cartProducts = [];
                this.order.name = "";
                this.order.phone = "";
                this.syncCart();

            } catch (error) {
                console.error("Telegram xabar yuborishda xatolik:", error);
                Swal.fire({
                    icon: "error",
                    title: "Xatolik!",
                    text: "Buyurtmani jo‘natishda muammo yuzaga keldi!",
                });
            }
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
    padding: 5px;
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
     height: 100px;
    object-fit:contain;
}
@media screen and (max-width: 650px) {
  .thTop{
    display: none;
  }
  tbody tr{
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }
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
  