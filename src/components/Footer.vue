<template>
    <div class="footer-main">
        <div class="footer1">
            <p class="title">Ijtimoiy tarmoqlarda biz bilan do'stlasshing:</p>
            <div class="social">
                <a href="https://www.facebook.com" target="_blank" class="social-icon">
                    <i class="fab fa-facebook icons"></i> <!-- Facebook Icon -->
                </a>
                <a href="https://www.instagram.com" target="_blank" class="social-icon">
                    <i class="fab fa-instagram icons"></i> <!-- Facebook Icon -->
                </a>
                <a href="https://t.me/smartmalltexnika" target="_blank" class="social-icon">
                    <i class="fab fa-telegram icons"></i> <!-- Facebook Icon -->
                </a>
            </div>
            <div>
                <div class="tg-acc">
                    <img class="logoAkk" src="../assets/smartmal2.png" alt="">
                    <div>
                        <a class="tg" href="https://t.me/smartmalltexnika">Smartmall.uz</a>
                        <p>35 obunachi</p>
                    </div>

                </div>
                <div class="main-obuna">

                    <a href="" class="obuna">
                        <i class="fab fa-telegram icon2"></i>
                        <p>Kanalimizga obuna bo'ling</p>

                    </a>
                </div>

            </div>
        </div>
        <div class="footer2">
            <p class="title">Xaridlarga yordam</p>
           
            <router-link to="/order-methods">Buyurtma qilish uslubi</router-link> <!-- Updated Link -->
            <router-link to="/terms-of-use">Foydalanish shartlari</router-link> <!-- Updated Link -->
        </div>
        <div class="footer2">
            <p class="title">Ma'lumotlar</p>
            <router-link to="/about-us">Biz haqimizda</router-link> <!-- Updated Link -->
            <router-link to="/yordam">Kontaktlar</router-link> <!-- Updated Link -->
            <router-link to="/privacy-policy">Maxfiylik siyosati</router-link> <!-- Updated Link -->
        </div>
        <div class="footer4">
            <p class="title">Yangilik va aksiyalarni kuzatib borish</p>
            <div class="input-container">
                <input v-model="inputText" type="email" placeholder="Sizning elektron manzilingiz" />
                <button @click="handleSubmit">Submit</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            inputText: '', // The model for the input field
        };
    },
    methods: {
        handleSubmit() {
            alert(`Submitted: ${this.inputText}`);
            this.inputText = ''; // Clear input after submit
        },
    },
};
</script>
<style scoped>
.footer2 {
    width: 220px;

    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: start;
    justify-content: flex-start;

}

.footer2 a {
    text-decoration: none;
    color: black;
    font-size: 13.5px;
    font-weight: 300;
}

.footer2 a:hover {
    color: #086c08;
}

.title {
    font-size: 15px;
    font-weight: 300;
}

.tg {
    transition: .3s;
    text-decoration: none;
    color: rgb(89, 89, 234);

}

.tg:hover {
    text-decoration: underline !important;

}

.footer-main {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 20px;
    background-color: white;
    padding: 20px;
    flex-wrap: wrap;

}

.tg-acc {
    display: flex;
    gap: 20px;
    padding: 10px;
    border: 1px solid rgb(213, 229, 235);
}

.tg-acc p {
    font-size: 14px;

}

.main-obuna {
    padding: 10px;
    background-color: rgb(213, 229, 235);
}

.logoAkk {
    width: 50px;
    background-color: #086c08;
    border: 1px solid black;

}

.footer1 {
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 20px;

}

.social {
    display: flex;
    gap: 30px;
}

.obuna {
    display: flex;
    align-items: center;
    gap: 5px;
    transition: .3s;
    border: 1px solid rgb(171, 169, 169);
    color: black;
    width: fit-content;
    font-size: 14px;
    padding: 5px;
    text-decoration: none;
}

.obuna:hover {
    background-color: rgb(196, 194, 194);
}

.icon2 {
    font-size: 15px;
    color: rgb(11, 144, 205);
}

.icons {
    color: rgb(72, 72, 72);
    font-size: 35px;
    transition: .3s;
}

.fa-facebook:hover {
    color: rgb(40, 40, 222);
}

.fa-instagram:hover {
    color: rgb(243, 13, 78);
}

.fa-telegram:hover {
    color: rgb(11, 144, 205);
}

.input-container {
    display: flex;
    align-items: center;

    position: relative;
    width: 500px;
    margin: 50px auto;
}

.input-container input {
    padding: 12px;
    font-size: 14px;
    border: 2px solid #ccc;
    border-radius: 25px;
    outline: none;
    width: 100%;
    transition: border-color 0.3s ease;
}

.input-container input:focus {
    border-color: #086c08;
}

.input-container button {
    padding: 12px 24px;
    position: absolute;
    right: 0;
    font-size: 16px;
    background-color: #086c08;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.input-container button:hover {
    background-color: #167f16;
}

@media only screen and (max-width: 550px) {
    .footer1 {
        width: 100%;
        text-align: center;
    }

    .social {
        justify-content: center;
    }

    .footer2 {
        text-align: center;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }

    .footer4 {
        text-align: center;
        width: 100%;
    }

    .input-container {
        width: 100%;
        margin-top: 10px;
    }
}</style>