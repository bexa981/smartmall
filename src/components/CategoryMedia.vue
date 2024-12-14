<template>
    <div class="category-media">
        <ul>
            <li>
                <router-link to="/allproducts"><Bars4Icon class="images-cat"/></router-link>
            </li>
            <li>
                <router-link to="/category/2"><img class="images-cat" src="../assets/kabeli.svg" alt="kabel"></router-link>
            </li>
            <li>
                <router-link to="/category/3"><img class="images-cat" src="../assets/provoda.svg" alt="provada"></router-link>
            </li>
            <li>
                <router-link to="/category/4"><img class="images-cat" src="../assets/category-icon-8.svg" alt="category"></router-link>
            </li>
            <li>
                <router-link to="/allproducts"><Bars4Icon class="images-cat"/></router-link>
            </li>
            <li>
                <router-link to="/category/2"><img class="images-cat" src="../assets/kabeli.svg" alt="kabel"></router-link>
            </li>
            <li>
                <router-link to="/category/3"><img class="images-cat" src="../assets/provoda.svg" alt="provada"></router-link>
            </li>
            <li>
                <router-link to="/category/4"><img class="images-cat" src="../assets/category-icon-8.svg" alt="category"></router-link>
            </li>
            <li>
                <router-link to="/allproducts"><Bars4Icon class="images-cat"/></router-link>
            </li>
            <li>
                <router-link to="/category/2"><img class="images-cat" src="../assets/kabeli.svg" alt="kabel"></router-link>
            </li>
            <li>
                <router-link to="/category/3"><img class="images-cat" src="../assets/provoda.svg" alt="provada"></router-link>
            </li>
            <li>
                <router-link to="/category/4"><img class="images-cat" src="../assets/category-icon-8.svg" alt="category"></router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import { Bars4Icon } from '@heroicons/vue/24/outline';
export default {
    name: 'CategoryMedia',
    components:{
        Bars4Icon,
    }
};
</script>

<style scoped>
.images-cat{
    width: 40px;
    color: black;
   
}
.category-media {
    display: none;
    text-align: center;
    margin-top: 20px;
}
.category-media a{
    background-color: #fff;
    border-radius: 50%;
    padding: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    transition: .3s;
}
.category-media a:hover{
    background-color: rgb(193, 191, 191);
}
ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    gap: 10px;
    justify-content: center;
}

li {
    margin: 10px 0;
}

@media only screen and (max-width: 700px) {
    .category-media {
        display: block;
    }
}
</style>