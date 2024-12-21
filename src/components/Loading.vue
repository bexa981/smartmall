<template>
    <div class="flex items-center justify-center h-screen bg-green-900">
        <div class="relative">
            <!-- Logo Animation -->
            <img src="@/assets/smartmallLogoHd.svg" alt="Smartmall Logo" class="animate-pulse w-max rounded-full" />
            <!-- Rotating Ring -->
            <div
                class="absolute top-[10]  left-[40%] w-32 h-32 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin">
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "LoadingScreen",
};
</script>
  
<style scoped>
/* Add any additional custom styles if necessary */
</style>
  