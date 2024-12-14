import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Yordam from "../views/Yordam.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import CategoryPage from "../views/CategoryPage.vue";
import AllProducts from "@/views/AllProducts.vue";
import LikesPage from "@/views/LikesPage.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import CartPage from "@/views/CartPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import AdminPage from "@/views/AdminPage.vue";
import RegisterMethods from "@/views/RegisterMethods.vue"; // Component for registration methods
import OrderMethods from "@/views/OrderMethods.vue"; // Component for order methods
import TermsOfUse from "@/views/TermsOfUse.vue"; // Component for terms of use
import AboutUs from "@/views/AboutUs.vue"; // Component for about us
import BlankLayout from "@/layouts/BlankLayout.vue";
import PrivacyPolicy from "@/views/PrivacyPolicy.vue"; // Component for privacy policy

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", component: HomeView, name: "HomeView" },
      { path: "yordam", component: Yordam, name: "Yordam" },
      { path: "allproducts", component: AllProducts, name: "AllProducts" },
      { path: "cart", component: CartPage, name: "CartPage" },
      { path: "likes", component: LikesPage, name: "LikesPage" },
      {
        path: "/product-detail/:id",
        component: ProductDetail,
        name: "ProductDetail",
        props: true,
      },
      {
        path: "category/:categoryId",
        component: CategoryPage,
        name: "CategoryPage",
        props: true,
      },
    ],
  },
  {
    path: "/login",
    component: BlankLayout,
    children: [{ path: "", component: LoginPage, name: "LoginPage" }],
  },
  {
    path: "/admin",
    component: BlankLayout,
    children: [
      {
        path: "",
        component: AdminPage,
        name: "AdminPage",
        meta: { requiresAuth: true },
      },
    ],
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login"); // Redirect to login if not authenticated
  } else {
    next(); // Proceed
  }
});

export default router;
