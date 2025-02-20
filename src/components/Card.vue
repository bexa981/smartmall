<template>
  <div
    class="card h-auto  bg-white rounded-lg shadow-md hover:shadow-lg transform hover:translate-y-[-5px] transition duration-200 cursor-pointer mx-auto"
    @click="onClick"
    tabindex="0"
    :aria-label="description"
  >
    <img 
      :src="imageSrc || defaultImage" 
      alt="Card Image" 
      class="card-image w-full h-32 object-cover  transition-transform duration-300 "
    />
    <div class="card-body p-4 text-center">
      <h3 class="card-title text-xs font-semibold text-white bg-green-700 rounded-full py-1 px-2 inline-block">
        {{ price }} $
      </h3>
      <p class="card-text mt-2 text-xs font-semibold text-gray-800 leading-relaxed">
        {{ description }}
      </p>
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
        console.log("Card clicked");
      }
    },
  },
};
</script>

<style scoped>
.card:focus {
  outline: 2px solid #086c08;
  outline-offset: 2px;
}
</style>
