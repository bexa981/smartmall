import { createRouter, createWebHistory, } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Yordam from "../views/Yordam.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import CategoryPage from "../views/CategoryPage.vue";
import AllProducts from "@/views/AllProducts.vue";
import LikesPage from "@/views/LikesPage.vue";
import CartPage from "@/views/CartPage.vue";
import RegisterMethods from "@/views/RegisterMethods.vue"; // Component for registration methods
import OrderMethods from "@/views/OrderMethods.vue"; // Component for order methods
import TermsOfUse from "@/views/TermsOfUse.vue"; // Component for terms of use
import AboutUs from "@/views/AboutUs.vue"; // Component for about us
import PrivacyPolicy from "@/views/PrivacyPolicy.vue"; // Component for privacy policy// You'll need to create this for category items
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register-methods",
    name: "RegisterMethods",
    component: RegisterMethods,
  },
  {
    path: "/order-methods",
    name: "OrderMethods",
    component: OrderMethods,
  },
  {
    path: "/terms-of-use",
    name: "TermsOfUse",
    component: TermsOfUse,
  },
  {
    path: "/about-us",
    name: "AboutUs",
    component: AboutUs,
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy,
  },
  {
    path: "/yordam",
    name: "Yordam",
    component: Yordam, // This links to the Yordam page component
  },
  {
    path: "/allproducts",
    name: "allproducts",
    component: AllProducts, // This links to the Yordam page component
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: ProductDetail,
    props: true,
  },
  { path: "/likes", component: LikesPage, name: "LikesPage" },
  { path: "/cart", component: CartPage, name: "CartPage" },
  {
    path: "/category/:categoryId", // Dynamic route to load category items
    name: "category",
    component: CategoryPage, // Create this page to handle the category items
    props: true, // This allows the route parameter to be passed as a prop to the component
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
