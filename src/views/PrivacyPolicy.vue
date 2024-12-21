<template>
    <div class="main">
        <div class="container links">
            <router-link to="/">Bosh sahifa</router-link> >
            <router-link to="/privacy-policy">Maxfiylik Siyosati</router-link>
        </div>
        <div class="privacy-policy container">
            <h1>Maxfiylik Siyosati</h1>

            <section>
                <h2>Saytning Maqsadi</h2>
                <p>"NEWTEC BBS" MChJ (Kompaniya) ushbu veb-saytni yaratishdan maqsad – jismoniy va yuridik shaxslarga
                    (foydalanuvchilarga) Kompaniya faoliyati to'g'risida zarur ma'lumotlarni taqdim etish va "NEWTEC BBS"
                    MChJ tomonidan taqdim etilayotgan mahsulot va xizmatlar (mahsulotlar) haqida ma'lumot berishdan
                    iboratdir. Saytdagi ma'lumotlar ko'p hollarda ma'lumot beruvchi xususiyatga ega.
      <br>  <br>
                    Saytdagi barcha kontent "NEWTEC BBS" MChJ mulki hisoblanadi va mualliflik huquqlarini tartibga soluvchi
                    amaldagi qonunchilik bilan himoyalangan. Shu sababli, foydalanuvchilar sayt mazmunini faqat shaxsiy va
                    notijorat maqsadlarda foydalanishlari mumkin. Sayt mazmunidan boshqa holatlarda foydalanishga ruxsat
                    berilmaydi.
                    <br>
                    <br>
                    Kompaniya sayt mazmuniga o'zgartirishlar kiritish yoki uni ko'paytirishga ruxsat bermaydi.
                    <br>
                    Diqqat qiling: Kompaniya saytida boshqa veb-saytlarga havolalar mavjud bo'lishi mumkin. Bu holatda
                    Kompaniya boshqa manbalardagi maxfiylik ma'lumotlari uchun javobgar emas.
                    <br>   <br>
                    Kompaniya Siz tomonidan taqdim etilgan shaxsiy ma'lumotlarga ruxsatsiz kirishni oldini olish tizimini
                    yanada takomillashtirish maqsadida Maxfiylik Siyosatini istalgan vaqtda o'zgartirish huquqini o'zida
                    saqlab qoladi.
                </p>
            </section>

            <section>
                <h2>Shaxsiy Ma'lumotlaringizni Yig'ish va Foydalanish</h2>
                <p>
                    Kompaniya Sizning shaxsiy ma'lumotlaringizni quyidagi hollarda yig'adi:
                </p>
                <ul>
                    <li>Saytda ro'yxatdan o'tishda;</li>
                    <li>Buyurtma yoki hujjatlarni rasmiylashtirishda.</li>
                </ul>
                <p>Taqdim etiladigan ma'lumotlar:</p>
                <ul>
                    <li>Ism, familiya, otasining ismi;</li>
                    <li>Aloqa raqami va elektron pochta manzili;</li>
                    <li>Manzil va boshqa tegishli ma'lumotlar.</li>
                    <li>Buyurtma yetkazish manzili</li>
                </ul>
            </section>

            <section>
                <h2>Statistik Ma'lumotlar</h2>
                <p>Kompaniya quyidagi statistik ma'lumotlarni yig'ishi mumkin:</p>
                <ul>
                    <li>IP manzil;</li>
                    <li>Brauzer turi va versiyasi;</li>
                    <li>Joylashuv ma'lumotlari;</li>
                    <li>Saytga tashrif buyurilgan sanalar va sahifalar.</li>
                    <li>Joylashuv ma'lumotlari</li>
                    <li>Brauzer tomonidan taqdim etilgan qurilma va tizim ma'lumotlari</li>
                </ul>
            </section>

            <section>
                <h2>Kompaniya Kafolatlari</h2>
                <p>
                    Kompaniya Sizning shaxsiy ma'lumotlaringizni uchinchi shaxslarga
                    ruxsatsiz bermaslikni va qonunchilikka qat'iy rioya qilishni kafolatlaydi.
                </p>
                <p>To‘lov ma'lumotlari maxfiyligini banklar ta'minlaydi.</p>
            </section>

            <section>
                <h2>Yangilanishlar</h2>
                <p>
                    Kompaniya Maxfiylik Siyosatini istalgan vaqtda o'zgartirish huquqini
                    o'zida saqlab qoladi.
                </p>
            </section>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "PrivacyPolicy",
};
</script>
  
<style scoped>
.privacy-policy {
    padding: 20px;
    font-family: Arial, sans-serif;
    line-height: 1.6;
}

p {
    font-size: 13px;
}

.privacy-policy h1 {
    color: black;
    font-weight: 600;
    margin-bottom: 20px;
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
.privacy-policy h2 {
    color: black;
    margin-top: 20px;
    font-size: 15px;
    font-weight: 600;
}

.privacy-policy ul {
    list-style-type: disc;
    padding-left: 20px;
    font-size: 13px;
}

.main {
    background-color: white;
}

.container {

    width: 100%;
    background-color: white;
    padding-right: 8px;
    padding-left: 8px;
    margin-right: auto;
    margin-left: auto;
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
}</style>
  