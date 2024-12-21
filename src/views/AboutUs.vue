<template>
<div class="main">
    <div class="container links">
            <router-link to="/">Bosh sahifa</router-link> >
            <router-link to="/about-us">Biz haqimizda</router-link>
        </div>
    <div class="about-us">
        <div class="about-images">
            <img class="rasm1" src="../assets/aboutUs.png" alt="about us">
            <img  class="rasm2" src="../assets/smartmallLogoHd.svg" alt="smart mall hd">
        </div>
        <div class="container">
            <div class="about-info">
                <h2>{{ $t('info1') }}</h2>
                <p>{{ $t('info2') }}</p>
                <ul>
                    <li>{{ $t('info3') }}</li>
                    <li>{{ $t('info4') }}</li>
                    <li>{{ $t('info5') }}</li>
                    <li>{{ $t('info6') }}</li>
                </ul>
                <h3>{{ $t('info7') }}</h3>
                <p class="infoBigger" style="font-size: 15px;">{{ $t('info8') }}</p>
                <p class="titleAbout">{{ $t('info9') }}</p>
                <p>{{ $t('info10') }}</p>
                <p class="titleAbout">{{ $t('info11') }}</p>
                <p>{{ $t('info12') }}</p>
                <p class="titleAbout">{{ $t('info13') }}</p>
                <p>{{ $t('info14') }}</p>
                <p class="titleAbout">{{ $t('info15') }}</p>
                <p>{{ $t('info16') }}</p>
                <p class="titleAbout">{{ $t('info17') }}</p>
                <p>{{ $t('info18') }}</p>
                <p class="titleAbout">{{ $t('info19') }}</p>
                <p>{{ $t('info20') }}</p>


            </div>
        </div>

    </div>
</div>
    
</template>
<script>

</script>

<style scoped>
.about-images {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-right: auto;
    margin-left: auto;
}
.links a {
    font-size: 13px;
    color: black;
    text-decoration: none;
    transition: .3s;
   
}
.links {
    margin-bottom: 30px;
}
.links a:hover{
    color: green;
}
.rasm1 {
    width: 700px;
}

.about-info {
    padding: 16px;
    position: relative;
    max-height: auto;
    overflow: hidden;
    background-color: white;
    color: #000;
    
    transition: 0.5s;
}
.main{
    background-color: white;
}
.container {
   
    width: 100%;
    padding-right: 8px;
    padding-left: 8px;
    margin-right: auto;
    margin-left: auto;
}

.titleAbout {
    font-size: 14px;
    font-weight: 600;
}

p {
    line-height: 2;
    font-size: 14px;
}

h3 {
    font-weight: 500;
}

li {
    font-size: 14px;
    margin-left: 20px;
}
@media (min-width: 768px) {
    .container {
        max-width: 768px;
    }
}

@media (min-width: 992px) {
    .container {
        max-width: 992px;
    }
}
@media (min-width: 1200px) {
    .container {
        max-width: 1200px;
    }
}

@media only screen and (max-width: 610px) {
 .rasm2{
    width: 100%;
    margin: 5px;
 }
 .rasm1{
    width: 100%;
    margin: 5px;
 }
}





</style>