const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
const PORT = config.get("port") || 3030;

const viewRouter = require("./routes/views.routes"); //views
const exHbs = require("express-handlebars");

const app = express();
app.use(express.json());
app.use(cookieParser());

//----------------------------------------------------------------------------------------------
/*
partials da - Qayta foydalaniladigan bo‘laklar
layouts da - Sahifaning asosiy strukturasi (skeleti)
-------------------------------------------------------
🧩 3. .hbs kengaytmasi nima uchun kerak?
.hbs — bu Handlebars shablonlari uchun kengaytma.

Shablon fayl bu { HTML + JavaScript }  o‘zgaruvchilari aralash bo‘lgan fayl.
Masalan:
<!-- views/index.hbs -->
<h1>{{title}}</h1>
<p>Bu asosiy sahifa</p>
----------------------
*/

const hbs = exHbs.create({
  defaultLayout: "main", // asosiy fayl (har bir sahifa shu layout ichida korsatiladi)
  extname: "hbs", // Handlebars fayllarining kengaytmasi .hbs bo‘lishi ko‘rsatilmoqda.
});

app.engine("hbs", hbs.engine); //express ga: agar .hbs fayl bo'lsa hbs.engine bilan och deydi.
app.set("view engine", "hbs"); // Barcha .hbs fayllar views/ papkasida bo‘ladi
app.set("views", "./views"); // .hbs kengaytmasi ishlatiladi
app.use(express.static("views")); //views ni korsatilishi. (index papkasini qidiradi)

/*
odatda statik fayllar public, assets yoki static nomli alohida papkada bo‘ladi.
*/
//--------------------------------------------------------------------------------------------------

const indexRouter = require("./routes/index.routes");
app.use("/", viewRouter);
app.use("/api", indexRouter);

async function start() {
  try {
    const uri = config.get("dbUri");
    await mongoose.connect(uri);
    app.listen(PORT, () => {
      console.log(`server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
