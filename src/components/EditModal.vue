<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-2xl font-bold mb-4">Edit Product</h2>
        <form @submit.prevent="save">
          <div class="mb-4">
            <label class="block font-semibold mb-1">Mahsulot nomi({{ currentLanguage }})</label>
            <input
              v-model="product.name[currentLanguage]"
              class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Narxi ($)</label>
            <input
              type="text"
              v-model="product.price"
              class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">In Stock</label>
            <select
              v-model="product.inStock"
              class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
              required
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div class="mb-4">
            <h3 class="font-semibold mb-2">Technical Characteristics</h3>
            <div v-for="(value, key) in product.technical" :key="key" class="mb-2">
              <label class="block font-semibold mb-1">{{ key }}</label>
              <input
                v-model="product.technical[key]"
                class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-500"
              />
            </div>
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              class="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
              @click="close"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
      product: {
        type: Object,
        required: true,
      },
      currentLanguage: {
        type: String,
        required: true,
      },
    },
    methods: {
      close() {
        this.$emit("close");
      },
      save() {
        this.$emit("save", this.product);
        this.close();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Modal Styling */
  </style>
  
  