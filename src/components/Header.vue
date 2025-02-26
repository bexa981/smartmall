<template>
    <div class="main-nav">
        <!-- Top Header -->
        <div class="header-top header" ref="headerTop">
            <div class="left-header">
                <a style="align-items: center; display: flex; gap: 10px;" href="tel:+998978100404">
                    <PhoneIcon class="phoneicon" /> +99897 810 04 04
                </a>
                <a style="align-items: center; display: flex; gap: 10px;" href="https://t.me/Electronika070">
                    <AtSymbolIcon class="emailIcon" /> @Electronika070
                </a>
                <div class="info-time">
                    <ClockIcon class="clock-icon" />

                    <p>{{ $t('mon') }}: 8.00-20.00</p>

                </div>
                <!-- <div class="currency-display">
                    <span style="color: #007bff;">{{ $t('kurs') }}:</span>
                    <div class="currency-item">
                        <span class="currency-icon">
                            <CurrencyDollarIcon />
                        </span>
                        <span>{{ dollarRate }} {{ $t('sum') }}</span>
                    </div>
                    <div class="currency-item">
                        <span class="currency-icon">
                            <CurrencyEuroIcon />
                        </span>
                        <span>{{ euroRate }} {{ $t('sum') }}</span>
                    </div>


                </div> -->
                <router-link class="contact" to="/yordam">{{ $t('contact') }}</router-link>
                <div class="language-buttons">
                    <!-- Uzbek Button -->
                    <button :class="{ active: currentLanguage === 'uz' }" @click="changeLanguage('uz')"
                        class="language-button">
                        <img src="../assets/uz.png" alt="Uzbek Flag" class="flag-icon" />
                        <span>UZ</span>
                    </button>

                    <!-- Russian Button -->
                    <button :class="{ active: currentLanguage === 'ru' }" @click="changeLanguage('ru')"
                        class="language-button">
                        <img src="../assets/ru.png" alt="Russian Flag" class="flag-icon" />
                        <span>RU</span>
                    </button>
                </div>
            </div>


        </div>

        <!-- Navbar -->

        <div class="nav " ref="nav">
            <div class="navbar-main">
                <div class="logo">
                    <router-link to="/">
                        <img class="logo2" width="30px" src="../assets/smartmal2.png" alt="">
                        <img class="logomn" width="200px" src="../assets/smartmalIcon.png" alt="Logo" />

                    </router-link>
                    <div class="language-buttons language-buttons2">
                        <!-- Uzbek Button -->
                        <button :class="{ active: currentLanguage === 'uz' }" @click="changeLanguage('uz')"
                            class="language-button">
                            <img src="https://flagcdn.com/w40/uz.png" alt="Uzbek Flag" class="flag-icon" />
                            <span>UZ</span>
                        </button>

                        <!-- Russian Button -->
                        <button :class="{ active: currentLanguage === 'ru' }" @click="changeLanguage('ru')"
                            class="language-button">
                            <img src="https://flagcdn.com/w40/ru.png" alt="Russian Flag" class="flag-icon" />
                            <span>RU</span>
                        </button>
                    </div>
                </div>
                <SearchVue />

                <div class="karzina-main">
                    <router-link to="/cart" class="karzina">
                        <ShoppingCartIcon class="shopping-icon" />
                        <div class="card-inside">
                            <span class="item-quantity">{{ cartQuantity }}</span>
                            <span class="liked-color">{{ $t('card') }}</span>
                        </div>
                    </router-link>

                    <router-link to="/likes" class="karzina">
                        <HeartIcon class="shopping-icon" />
                        <div class="card-inside">
                            <span class="item-quantity">{{ likesQuantity }}</span>
                            <span class="liked-color">{{ $t('choosen') }}</span>
                        </div>
                    </router-link>
                </div>
                <!-- Cart -->
               
            </div>
        </div>
        <!-- Placeholder -->
        <div ref="navPlaceholder"></div>

    </div>
</template>
  
<style scoped>
:root {
    --greenColor: #086c08;
    --mainColor: #fcfbf7;
}

.header-top {
    position: relative;
    width: 100%;
    background-color: #fcfbf7;
    z-index: 10;
}

.nav {
    position: sticky;
    top: 0;
    z-index: 20;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.sticky-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 30;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-placeholder {
    height: 0;
}

.nav-placeholder.sticky {
    height: 70px;
    /* Adjust to match nav height */
}

.karzina-main {
    order: 2;
    display: flex;
}

.main {
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
}

.shopping-icon {
    width: 30px;
    color: black;
}

.logo {
    margin-top: 20px;
    display: flex;
    order: 1;
}

.logo a {
    display: flex;
}

.logo2 {
    background-color: #084404;
    width: 51px;
    margin-right: -2px;
}

.phoneicon {
    width: 25px;
    color: black;
    transform: rotate(265deg);
}

.liked-color:hover {
    color: #086c08;
}

.search-icon {
    width: 30px;
}

.clock-icon {
    width: 30px;
    color: black;
}

.left-header a {
    text-decoration: none;
    color: black;
    font-weight: 400;
    font-size: 13px;
}

.left-header a:hover {
    text-decoration: underline;
    color: #086c08;
}

.right-header a {
    text-decoration: none;
    color: black;
    font-weight: 500;
    font-size: 13px;
}

.right-header a:hover {
    color: #086c08;
}

.info-time {
    display: flex;
    gap: 10px;
}

.info-time p {
    font-size: 13px;
    display: flex;
    align-items: center;
    color: rgb(96, 96, 96);
}

.emailIcon {
    width: 25px;
    color: black;
    stroke-width: 3;
}

.left-header {
    display: flex;
    gap: 30px;
    align-items: center;
    justify-content: center;
}

.right-header {
    display: flex;
    align-items: center;
    gap: 30px;
}

.header {
    padding: 1px 20px;
    background-color: #fcfbf7;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.header ul {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 20px;
    margin: 0;
    padding: 0;
}

.header li {
    cursor: pointer;
}

.language-select select {
    border: 1px solid #ccc;
    padding: 5px;
    font-size: 14px;
}

.language-buttons {
    display: flex;
    gap: 10px;
}

.language-button {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    background-color: #fff;
    cursor: pointer;
    font-size: 14px;
    color: #333;
    transition: background-color 0.3s, color 0.3s;
}

.language-button img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}

.language-button.active {
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
}

.navbar-main {
    display: flex;
    gap: 20px;
    width: 100%;
    padding: 20px 0px;
    justify-content: center;
    align-items: center;
}


.karzina {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    order: 3;
    text-decoration: none;
}

.card-inside {
    display: flex;
    flex-direction: column;
    color: black;
    font-size: 13px;
    font-weight: 300;
}

.item-quantity {
    background-color: #086c08;
    width: 30px;
    border-radius: 10px;
    text-align: center;
    color: white;
}

.currency-display {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    color: #333;
}

.currency-item {
    display: flex;
    align-items: center;
    gap: 5px;
}

.currency-item span {
    display: flex;
    font-size: 13px;
}

.currency-icon {
    width: 25px;
    font-size: 18px;
    color: rgb(58, 57, 57);
}

@media only screen and (max-width: 1350px) {
    .logo2 {
        width: 30.2px;
    }

    .logo a {
        display: flex;
    }

    .navbar-main {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .logo {
        order: 1;
    }

    .search-bar {
        order: 2;
    }

    .karzina {
        order: 3;
        display: flex;
        align-items: center;
    }

    .logomn {
        width: 120px;
    }

    .search-container {
        align-items: normal;
    }

    .left-header {
        flex-wrap: wrap;
    }
}

.currency-display2 {
    display: none;
}

.language-buttons2 {
    display: none;
}

@media only screen and (max-width: 1200px) {
    .karzina-main {
        display: none;
    }

    .navbar-main {
        justify-content: center;
    }

    .karzina-main {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: white;
        /* Optional: add a background color */
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        /* Optional: add a shadow */
        padding: 10px 20px;
        /* Optional: add padding to make it look nice */
        display: flex;
        justify-content: space-around;
        z-index: 1000;
        /* Ensure it appears above other content */
    }

}

@media only screen and (max-width: 900px) {
    .navbar-main {
        flex-direction: column;
        align-items: center;
    }

    .search-bar {
        width: 95%;
        margin: 0 10px;
    }

    .header {
        display: none;
    }

    .currency-display2 {
        display: none;
        order: 2;
        display: flex;
    }

    .language-buttons2 {
        display: block;
        display: flex;
    }

    .logo {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0 20px;
    }

    .search-dropdown {
        display: none;
    }

    .search-icon {
        width: 20px;
    }

    .search-input {
        width: 100%;
    }
}

@media only screen and (max-width: 500px) {
    .currency-display2 {
        display: none;
    }
}
</style>
<script >
import SearchVue from "../components/Search.vue";
import { 
    PhoneIcon, AtSymbolIcon, ClockIcon, ShoppingCartIcon, 
    HeartIcon
} from "@heroicons/vue/24/outline";

export default {
    name: "Header",
    components: {
        PhoneIcon,
        AtSymbolIcon,
        ClockIcon,
        SearchVue,
        ShoppingCartIcon,
        HeartIcon,
    },
    data() {
        return {
            currentLanguage: "uz",
            isSticky: false,
            searchQuery: "",
            selectedCategory: "all",
            cartProducts: JSON.parse(localStorage.getItem("cartProducts")) || [],
            likedProducts: JSON.parse(localStorage.getItem("likedProducts")) || [],
        };
    },
    computed: {
        cartQuantity() {
            return this.cartProducts.reduce(
                (total, product) => total + (product.quantity || 1), 0
            );
        },
        likesQuantity() {
            return this.likedProducts.length;
        },
    },
    mounted() {
        this.updateCartProducts();
        this.updateLikedProducts();

        // 🔥 Eventlarni eshitish (headerni avtomatik yangilash uchun)
        window.addEventListener("cart-updated", this.updateCartProducts);
        window.addEventListener("likes-updated", this.updateLikedProducts);

        // 🔥 Sticky navbar
        this.$nextTick(() => {
            if (this.$refs.headerTop && this.$refs.nav) {
                window.addEventListener("scroll", this.handleScroll);
            }
        });
    },
    beforeUnmount() {
        // 🔥 Eventlarni tozalash (Memory leak oldini olish)
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("cart-updated", this.updateCartProducts);
        window.removeEventListener("likes-updated", this.updateLikedProducts);
    },
    methods: {
        handleScroll() {
            const headerTop = this.$refs.headerTop;
            const nav = this.$refs.nav;
            const navPlaceholder = this.$refs.navPlaceholder;

            if (!headerTop || !nav || !navPlaceholder) return;

            const scrollPosition = window.scrollY;
            const headerTopHeight = headerTop.offsetHeight;

            if (scrollPosition > headerTopHeight) {
                this.isSticky = true;
                nav.classList.add("sticky-nav");
                navPlaceholder.style.height = `${nav.offsetHeight}px`;
            } else {
                this.isSticky = false;
                nav.classList.remove("sticky-nav");
                navPlaceholder.style.height = "0";
            }
        },
        updateCartProducts() {
            this.cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
        },
        updateLikedProducts() {
            this.likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];
        },
        performSearch() {
            if (this.searchQuery.trim() === "") {
                this.$router.push({ name: "AllProducts", query: {} });
            } else {
                this.$router.push({
                    name: "AllProducts",
                    query: { search: this.searchQuery }
                });
            }
        },
        changeLanguage(language) {
            this.currentLanguage = language;
            this.$i18n.locale = language;
        }
    },
};
</script>
