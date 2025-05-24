const { createViewPage } = require("../helpers/create_view.page");
const router = require("express").Router(); //marshrut
/*
responce - bu "template ni och va uni foydalanuvchiga ko‘rsat" degani.
res — bu javob (response) obyektidir.
Express'da foydalanuvchiga ma'lumot jo‘natish uchun ishlatiladi.

res.render(<name>) — faylini topib, uni HTML qilib brauzerga jo‘natadi
*/

router.get("/", (req, res) => {
  res.render(createViewPage("index"), {
    title: "Asosiy sahifa", //sahifada chiquvchi so'z
    isHome: true,
  });
});

router.get("/authors", async (req, res) => {
  res.render(createViewPage("authors"), {
    title: "Mualliflar sahifasi",
    isAuthor: true,
  });
});

router.get("/dictionary", async (req, res) => {
  res.render(createViewPage("dictionary"), {
    title: "Lug'atlar sahifasi",
    isDict: true,
  });
});

router.get("/topics", async (req, res) => {
  res.render(createViewPage("topics"), {
    title: "Mavzular sahifasi",
    isTopic: true,
  });
});

router.get("/login", (req, res) => {
  res.render(createViewPage("login"), {
    title: "Login",
    isLogin: true,
  });
});

module.exports = router;
