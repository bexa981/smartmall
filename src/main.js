import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import VueGoogleMaps from "@fawmi/vue-google-maps";
// Add all solid icons to the library
import "@fortawesome/fontawesome-free/css/all.css";

// Create the app
createApp(App)
  .use(VueGoogleMaps, {
    load: {
      key: "YOUR_GOOGLE_MAPS_API_KEY", // Replace with your API key
      libraries: "places", // Include other libraries if needed
    },
  })
  .use(store) // Use Vuex store
  .use(i18n)
  .use(router) // Use Vue Router
  .mount("#app"); // Mount the app
