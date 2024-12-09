<template>
    <div class="carousel-container">
      <div class="carousel">
        <!-- Container for all images, shifting by currentIndex -->
        <div class="carousel-images" :style="{ transform: 'translateX(' + (-currentIndex * 100) + '%)' }">
          <img v-for="(wallpaper, index) in wallpapers" :key="index" :src="require(`@/assets/carousel/${wallpaper}`)" alt="Wallpaper" class="carousel-image" />
        </div>
  
        <!-- Carousel Controls (Prev/Next) -->
        <div class="carousel-controls">
          <button @click="prevImage" class="prev-btn">
            <ChevronLeftIcon class="arrowIcon" />
          </button>
          <button @click="nextImage" class="next-btn">
            <ChevronRightIcon class="arrowIcon" />
          </button>
        </div>
  
        <!-- Indicators -->
        <div class="carousel-indicators">
          <span v-for="(wallpaper, index) in wallpapers" :key="index" :class="['indicator', { active: currentIndex === index }]" @click="goToImage(index)"></span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ChevronLeftIcon } from '@heroicons/vue/24/solid';
  import { ChevronRightIcon } from '@heroicons/vue/24/solid';
  
  export default {
    components: {
      ChevronLeftIcon,
      ChevronRightIcon,
    },
    data() {
      return {
        currentIndex: 0,
        wallpapers: [
          "carousel1.jpg",
          "carousel2.jpg",
          "carousel3.jpg"
        ],
        interval: null,
      };
    },
    methods: {
      nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.wallpapers.length;
      },
      prevImage() {
        this.currentIndex =
          (this.currentIndex - 1 + this.wallpapers.length) % this.wallpapers.length;
      },
      goToImage(index) {
        this.currentIndex = index;
      },
      startAutoSwitch() {
        this.interval = setInterval(this.nextImage, 4000);
      },
      stopAutoSwitch() {
        clearInterval(this.interval);
      },
    },
    mounted() {
      this.startAutoSwitch();
    },
    beforeDestroy() {
      this.stopAutoSwitch();
    },
  };
  </script>
  
  <style scoped>
  .arrowIcon {
    width: 30px;
    color: white;
  }
  
  .carousel-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    height: 300px;
  }
  
  .carousel {
    border-radius: 10px;
    position: relative;
    width: 100%;
    max-width: 800px;
    height: 290px; /* Set a fixed height for the carousel */
    overflow: hidden;
  }
  @media only screen and (max-width: 1350px) {
.carousel{
  height: auto;
  max-width: 700px;
}
.carousel-container{
  margin: 10px 0px;
  height: auto;
}
  }
  @media only screen and (max-width: 700px) {
  .carousel-container{
    margin: 2px 5px;
  }
  .carousel{
  
    border-radius: 0px;
  }
  }
  
  .carousel-images {
    display: flex;
    transition: transform 0.5s ease-in-out; /* Add smooth transition */
    width: 100%;
    height: 100%;
  }
  
  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .carousel-controls {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 0.3s, opacity 0.3s ease;
  }
  
  .carousel:hover .carousel-controls {
    visibility: visible;
    opacity: 1;
  }
  
  .prev-btn,
  .next-btn {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }
  
  .prev-btn:hover,
  .next-btn:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  .carousel-indicators {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
  }
  
  .indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
  
  .indicator.active {
    background-color: green;
  }
  </style>
  