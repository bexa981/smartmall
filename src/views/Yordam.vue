<template>
  <div class="main">
    <div class="container links">
            <router-link to="/">Bosh sahifa</router-link> >
            <router-link to="/cart">Savat</router-link>
        </div>
    <div class="container">
      <div class="contact-page">
        <h2>Kontakt</h2>
        <p>Agar sizda biron bir savol bo'lsa, quyidagi aloqa ma'lumotlari orqali biz bilan bog'laning</p>
        <div class="contact-info">
          <p><strong>Manzil:</strong> 123 Main St, Your City, Your Country</p>
          <p><strong>Telefon:</strong> +123 456 7890</p>
          <p><strong>Email:</strong> contact@smartmall.uz</p>
        </div>

        <!-- Yandex Map Section -->
        <div id="yandex-map" style="width: 100%; height: 400px; margin-top: 20px;"></div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ContactMap",
  data() {
    return {
      // Coordinates for the map's center (example: Moscow)
      center: [38.271416, 67.896493],
      zoom: 13,
    };
  },
  mounted() {
    // Load the Yandex Maps API script
    const script = document.createElement("script");
    script.src =
      "https://api-maps.yandex.ru/2.1/?lang=en_US&apikey=<YOUR_YANDEX_API_KEY>";
    script.async = true;
    script.onload = this.initMap;
    document.head.appendChild(script);
  },
  methods: {
    initMap() {
      ymaps.ready(() => {
        const map = new ymaps.Map("yandex-map", {
          center: this.center,
          zoom: this.zoom,
          controls: ["zoomControl", "typeSelector"],
        });

        // Add a placemark at the center
        const placemark = new ymaps.Placemark(this.center, {
          balloonContent: "Smartmall.uz",
        });
        map.geoObjects.add(placemark);
      });
    },
  },
};
</script>


<style scoped>
.links a {
    font-size: 13px;
    color: black;
    text-decoration: none;
    transition: .3s;
}
p{
  font-size: 14px;
  line-height: 2;
}

.links a:hover {
    color: #086c08;
}
.container h2 {
    font-size: 20px;
    font-weight: 500;
    padding: 20px 0;
    margin-top: 30px;
}
.main {
  background-color: white;
}
.contact-page {
  padding: 20px;
  background-color: white;
}

.contact-info {
  margin-top: 20px;
  font-size: 16px;
}

#yandex-map {
  margin-top: 30px;
  height: 400px;
  width: 100%;
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
