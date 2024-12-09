import { createI18n } from "vue-i18n";

const messages = {
  uz: {
    contact: "Bog'lanish",
    mon: "Dush-Yak",
    sum: "So'm",
    search: "Qidirish",
    category: "Barcha bo'limlar",
    card: "Savat",
    choosen: "Tanlanganlar",
    kurs: "MB kursi",
    info1:
      "Elektrotovarlar, elektronika va maishiy texnikalar internet do‘koni Samartmall.uz",
    info2:
      "Assalomu alaykum, hurmatli mehmon! Bizning yangi loyihamiz — Smartmall.uz ga tashrif buyurganingiz uchun rahmat. Siz bizning xizmatimizdan foydalanib xaridni amalga oshirishingiz yoki siz uchun qiziqarli bo‘lgan tovarlar bilan tanishishingiz mumkin. Agar sizga maslahatimiz kerak bo‘lsa, quyidagi xizmatlardan biri orqali biz bilan bog‘lanishingiz mumkin:",
    info3: "Qayta qo‘ng‘iroq",
    info4: "Qo‘ng‘iroq qiling: +99878 120 09 09",
    info5: "Elektron pochtaga yozing: info@smartmall.uz",
    info6: "Savollarni bevosita tovarning kartochkasiga yozib qoldiring.",
    info7:
      "Smartmall.uz internet do‘koni assortimentida kabellar, elektr simlari, emallangan simlar, chiroqlar, yoritgichlar va boshqa ko‘plab tovarlar mavjud.",
    info8:
      "E‘tiboringizga Smartmall.uz internet do‘koni prays-listini havola qilamiz. Unda siz tovarlar narxi bilan tanishib, amaldagi narxlardan boxabar bo‘lib borishingiz mumkin.",
    info9: "Biz haqimizda",
    info10:
      "Bizning yosh, ammo ambisiyasi yuqori Smarmall.uz jamoasi o‘z oldiga quyidagi maqsadlarni qo‘ygan: shunday onlayn do‘kon yaratmoqchimizki, unga tashrif buyurgan har bir mijoz bizga rahmat aytadi. Biz sinovdan o‘tgan va ishonchli tovar yetkazuvchilar bilan hamkorlik qilamiz. Bu orqali mijozlarimizning turli talablarini maksimal darajada qondirishga harakat qilamiz. Bizning ustun jihatimiz:",
    info11: "Tezkor yetkazib berish",
    info12:
      "Bizning guruhimiz istalgan vazn va har qanday o‘lchamdagi texnikani, hattoki lift ishlamayotgan bo‘lsa ham, yuqori qavatlarga chiqarib beradi. Tovar yetkazilishidan bir soat oldin mutaxassislarimiz mijozga qo‘ng‘iroq qilishadi. Rahmat.uz tovarni yetkazish jarayonida uning bus-butunligi uchun mas‘uliyatni o‘z zimmasiga oladi.",
    info13: "Kafolat.",
    info14:
      "Buyurtma yetkazilishidan mutaxassislarimiz uning bus-butunligini hamda texnikaning ishlashini diqqat bilan tekshirishadi. Texnikada qandaydir nosozlik aniqlansa, yetkazish xizmati do‘kondan yangi tovarni bepul yetkazib beradi. Bir nechta tovar buyurtma berilganda, barcha texnika bir vaqtda yetkazib beriladi",
    info15: "Xushmuomala xizmat.",
    info16:
      "Bizning qo‘llab-quvvatlash operatorlarimiz, zarurat tug‘ilsa, Sizda yuzaga kelgan savollarga xushmuomalalik bilan javob berishga tayyor. Smartmall.uz saytida xaridorlarning rostmana fikrlari joylashtirilgan. Siz tovarlar haqidagi havolalarni ijtimoiy tarmoqlar orqali bo‘lishishingiz yoki boshqa iste‘molchilardan texnikani ishlatish bo‘yicha jo‘yali maslahatlar olishingiz mumkin.",
    info17: "Raqobatbardosh narxlar.",
    info18:
      "Biz imkon qadar hammabop narxlar belgilashga harakat qildik. Bu orqali siz uydan chiqmay turib amalga oshirgan xaridingizdan rozi bo‘lasiz.",
    info19: "Buyurtmani rasmiylashtirishning qulay uslubi.",
    info20:
      "Buning uchun ismi-sharifingiz, manzil va telefon raqamingizni qoldirsangiz kifoya. Boshqa ma‘lumot talab etilmaydi",
  },
  ru: {
    contact: "Связаться",
    mon: "Пон-Вос",
    sum: "Cум",
    search: "Поиск",
    category: "Все категории",
    card: "Корзина",
    choosen: "Избранные",
    kurs: "НБ kурс",
    info1:
      "Интернет-магазин электротоваров, электроники и бытовой техники Samartmall.uz",
    info2:
      "Здравствуйте, дорогой гость! Благодарим вас за посещение нашего нового проекта – Smartmall.uz. Вы можете совершить покупку с помощью нашего сервиса или ознакомиться с интересующими вас товарами. Если вам нужна наша консультация, вы можете связаться с нами через одну из следующих служб:      ",
    info3: "Перезвонить",
    info4: "Звоните: +99897 845 11 11",
    info5: "Пишите на почту: info@smartmall.uz",
    info6: "Пишите вопросы прямо на карточке товара.",
    info7:
      "В ассортименте интернет-магазина Smartmall.uz представлены кабели, электрические провода, эмалированные провода, светильники, светотехника и многие другие товары.",
    info8:
      "Предлагаем Вашему вниманию прайс-лист интернет-магазина Smartmall.uz. В нем вы сможете ознакомиться с ценами на товары и быть в курсе текущих цен.",
    info9: "O нас",
    info10:
      "Наша молодая, но амбициозная команда Smarmall.uz поставила перед собой следующие цели: мы хотим создать такой интернет-магазин, чтобы каждый покупатель, посетивший его, был нам благодарен. Мы сотрудничаем с проверенными и надежными поставщиками. Благодаря этому мы стараемся максимально удовлетворить различные требования наших клиентов. Наше преимущество:",
    info11: "Быстрая доставка",
    info12:
      "Наша команда может переместить на верхние этажи оборудование любого веса и размера, даже если лифт не работает. Наши специалисты позвонят клиенту за час до доставки товара. Rahmat.uz берет на себя ответственность за целостность товара при доставке.",
    info13: "Гарантия.",
    info14:
      "После доставки заказа наши специалисты тщательно проверяют его комплектность и работу оборудования. При обнаружении технической неисправности служба доставки бесплатно доставит новый товар из магазина. При заказе нескольких товаров все оборудование будет доставлено одновременно",
    info15: "Дружелюбное обслуживание.",
    info16:
      "Наши операторы поддержки готовы вежливо ответить на любые ваши вопросы. Сайт Smartmall.uz содержит честные мнения покупателей. Вы можете поделиться ссылками на продукцию в социальных сетях или получить советы от других потребителей по использованию оборудования.",
    info17: "Конкурентоспособные цены.",
    info18:
      "Мы постарались установить максимально универсальные цены. Таким образом, вы останетесь довольны сделанной покупкой, не выходя из дома.",
    info19: "Удобный способ сделат8ь заказ.",
    info20:
      "Все, что вам нужно сделать, это оставить свое имя, адрес и номер телефона. Никакой другой информации не требуется.",
  },
};

const i18n = createI18n({
  locale: "uz", // Default language
  fallbackLocale: "ru",
  messages,
});

export default i18n;
