<template>
  <nav>
    <Header />
    <MenuVue v-if="showMenu"/>

  </nav>
  <router-view />
  <Footer />
</template>

<script>
import Header from './components/Header.vue'; // Adjust the path as needed
import Footer from './components/Footer.vue';
import MenuVue from './components/Menu.vue';
export default {
  components: {
    Header,
    Footer,
    MenuVue,
  },
  computed:{
    showMenu(){
      return this.$route.path!=='/'
     
    }
  }
};
</script>
