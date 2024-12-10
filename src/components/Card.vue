<template>
  <div class="card" @click="onClick" tabindex="0" :aria-label="description">
    <img 
      :src="imageSrc || defaultImage" 
      alt="Card Image" 
      class="card-image" 
    />
    <div class="card-body">
      <h3 class="card-title">{{ price }} UZS</h3>
      <p class="card-text">{{ description }}</p>
    </div>
  </div>
</template>
  
  <script>
  export default {
  name: "Card",
  props: {
    imageSrc: String,
    price: String,
    description: String,
    clickHandler: Function, // Optional click handler
  },
  data() {
    return {
      defaultImage: "https://via.placeholder.com/150", // Placeholder image
    };
  },
  methods: {
    onClick() {
      if (this.clickHandler) {
        this.clickHandler();
      } else {
        console.log('clicked')
      }
    },
  },
};

  </script>
  
  <style scoped>
  

  .card {
  width: 170px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s ease;
  cursor: pointer;
  margin-top: 30px;
}

.card:hover .card-image {
  transform: scale(1.1);
  opacity: 0.7;
}

.card:focus {
  outline: 2px solid #086c08;
  outline-offset: 2px;
}

.card-image {
  transition: 0.3s;
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.card-body {
  padding: 5px;
}

.card-title {
  font-size: 13px;
  font-weight: bold;
  color: white;
  background-color: green;
  border-radius: 30px;
  margin: 0px 20px;
  text-align: center;
}

.card-text {
  font-size: 13px;
  color: black;
  margin-top: 8px;
  font-weight: 600;
}

@media only screen and (max-width: 1350px) {
  .card {
    width: 140px;
  }
}

@media only screen and (max-width: 700px) {
  .card {
    width: 200px;
  }
}

@media only screen and (max-width: 450px) {
  .card {
    width: 100%;
  }
  .card-title {
    width: fit-content;
    padding: 5px 20px;
  }
  .card-body {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

 
  </style>
  