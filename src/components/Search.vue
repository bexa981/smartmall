<template>
    <div class="search-bar">
        <div class="search-container">
            <!-- Search Input -->
            <input 
                type="text" 
                :placeholder="$t('search')" 
                class="search-input" 
                v-model="searchQuery"
                @keyup.enter="performSearch"
            />

            <!-- Search Button -->
            <button class="search-button" @click="performSearch">
                <MagnifyingGlassIcon class="search-icon" />
            </button>
        </div>
    </div>
</template>

<script >
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
export default {
    name: "Search",
    components: {
        MagnifyingGlassIcon,
    },
    data() {
        return {
            searchQuery: "", // ✅ Foydalanuvchi yozgan so‘z
        };
    },
    methods: {
        performSearch() {
            if (this.searchQuery.trim() === "") {
                // 🔥 Agar input bo‘sh bo‘lsa, barcha mahsulotlarni ko‘rsatish
                this.$router.push({ name: "AllProducts", query: {} });
            } else {
                // 🔥 Agar inputda qidiruv so‘zi bo‘lsa, filtrlangan mahsulotlarni chiqarish
                this.$router.push({
                    name: "AllProducts",
                    query: { search: this.searchQuery }
                });
            }
    }
}
};
</script>


<style scoped>
/* search bar */
.search-bar {
    background-color: white;
    font-size: 12px;
    order: 2;
}

.search-container {
    display: flex;
    align-items: center;
}

.search-input {
    flex: 4;
    width: 500px;
    padding: 10px 15px;
    font-size: 13px;
    border: 1px solid #086c08;
    outline: none;
    transition: border-color 0.3s;
}

.search-dropdown {
    flex: 1;
    padding: 9.5px;

    border: 1px solid #086c08;
    background-color: #ffffff;
    color: #333;
    outline: none;
    transition: border-color 0.3s;
}

.search-button {
    padding: 6px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    background-color: #086c08;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
}
.search-icon{
    color: white;
    width: 30px;
    height: 30px;
}
.search-button:hover {
    background-color: #086c08;
}

.search-info {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
}

@media only screen and (max-width: 1350px) {

    .search-bar {
        order: 2;
    }


    .search-container {
        align-items: normal;
    }
}

@media only screen and (max-width: 900px) {

    .search-bar {
        width: 95%;
        margin: 0 10px;
    }

    .search-dropdown {
        display: none;
    }

    .search-icon {
        width: 20px;
    }

    .search-input {
        width: 100%;
    }
}
</style>