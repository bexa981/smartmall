<template>
    
    <div>
        <Header />
        
        <MenuVue v-if="showMenu" />
        <router-view />
        <Footer />
    </div>
</template>
  
<script>
import Loading from '@/components/Loading.vue';
import Header from '../components/Header.vue'; // Adjust the path as needed
import Footer from '../components/Footer.vue';
import MenuVue from '../components/Menu.vue';


export default {
    components: {
        Header,
        Loading,
        Footer,
        MenuVue,
    },
    data() {
        return {
            isLoading: true, // Initial loading state
        };
    },
    mounted() {
        // Simulate loading time
        setTimeout(() => {
            this.isLoading = false;
        }, 3000); // Adjust duration as needed
    },
    name: "DefaultLayout",
    computed: {
        showMenu() {
            // Ensure MenuVue is shown only on specific routes
            return this.$route.path !== '/';
        },
    },
};
</script>
  
<style scoped>
/* Styles for header and footer */
</style>

  