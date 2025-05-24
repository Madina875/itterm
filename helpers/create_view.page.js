/*
Yo‘llarni tartibli va xavfsiz qilish
Har safar fayl manzilini yozib o‘tirish o‘rniga,
createViewPage("home") kabi yozib, home.hbs faylini aniq va to‘g‘ri topa olasiz.

Kodda takrorlanishni kamaytiradi
Har safar path.resolve(__dirname, "../views", "fayl.hbs") yozmasdan,
bitta funksiya orqali hal qilasiz.

Kengaytirish oson
Keyinchalik agar views papkasini boshqa joyga ko‘chirsangiz,
faqat shu fayldagi yo‘lni o‘zgartirishingiz kifoya — boshqa joylarga tegmaysiz.
*/

const path = require("node:path");

const createViewPage = (page) => {
  return path.resolve(__dirname, "../views", `${page}.hbs`);
};

module.exports = {
  createViewPage,
};

/*
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

Unda siz shunchaki:
res.render("home");

deb yozsangiz, Express avtomatik ravishda views/home.hbs faylini topadi.
 Bu holda createViewPage funksiyasi kerak emas.
*/
