<template>
    <div class="main">
        <div class="container links">
            <router-link to="/">Bosh sahifa</router-link> >
            <router-link to="/order-methods">Buyurtma qilish uslubi</router-link>
        </div>
        <div class="container privacy-policy">
            <h2>Buyurtma Qanday Qilinadi</h2>
            <p>Hurmatli saytimiz mehmonlari!
                <br>
                Ushbu videoda Rahmat.uz saytida qanday qilib buyurtma berish haqida bilib olamiz.
                <br>
                <br>
                Mahsulotni Tanlash
                <br>
                <br>
                Avval buyurtma bermoqchi bo'lgan mahsulotni tanlang.
                Shundan so'ng, siz mahsulot kartasi sahifasiga o'tasiz. Mahsulot kartasida mahsulot haqida ma'lumotlarni
                ko'rishingiz va o'zingizni qiziqtirgan savollarni berishingiz mumkin. Buyurtma berish uchun kerakli miqdorda
                mahsulotni tanlang.
                <br>
                <br>



                Agar bir nechta mahsulot buyurtma bermoqchi bo'lsangiz, mahsulotni "Savatga qo'shish" tugmasi orqali savatga
                qo'shing.
                Qolgan kerakli mahsulotlarni ham xuddi shu tarzda savatga qo'shing.
                Barcha mahsulotlarni savatga qo'shgandan so'ng, "Savat" bo'limiga o'ting. Savatda siz barcha qo'shilgan
                mahsulotlarni ko'rishingiz, ularning miqdorini oshirish yoki kamaytirishingiz mumkin.

                Keyin, "Buyurtma qilish" tugmasini bosing. Siz buyurtma shaklini to'ldirish sahifasiga o'tasiz.
                Shakldagi tegishli maydonlarni to'ldiring. Yetkazib berish turini va to'lov usulini tanlang. Buyurtma
                mazmunini qayta ko'rib chiqishingiz mumkin. So'ngra "Buyurtma qilish" tugmasini bosing.

                Tabriklaymiz! Sizning buyurtmangiz qabul qilindi!
                <br>
                Faqat Bitta Mahsulot Buyurtma Qilish
                <br>
                <br>
                Agar faqat bitta mahsulot sotib olishni xohlasangiz, "Hozir sotib olish" tugmasini bosing va
                to'g'ridan-to'g'ri buyurtma rasmiylashtirish sahifasiga o'tasiz.
                <br>
               
            <br>
            <br>
            Sizga yoqimli xaridlar tilaymiz! 🙌
            </p>
            <p> Agar qo'shimcha yordamga muhtoj bo'lsangiz, biz bilan quyidagi aloqa vositalari orqali bog'lanishingiz
                mumkin:</p>
            
            <ul>
                <li>Telefon orqali: +99878 120 09 09</li>
                <li>Elektron pochta orqali: info@smartmall.uz</li>
                <li>Telegramda: @smartmalluz</li>
            </ul>
        </div>
    </div>
</template>

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

.links a:hover {
    color: green;
}

.privacy-policy h2 {
    color: black;
    margin-top: 20px;
    margin-bottom: 20px;
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
}
</style>