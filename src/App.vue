<template>
  <div>
  <Loading v-if="isLoading" />
  <router-view v-else/>

</div>
 

</template>
<script>
import Loading from '@/components/Loading.vue';



export default {
    components: {
      
        Loading,
       
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
