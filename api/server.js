import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import privateLessonRouter from "./routes/privateLesson.route.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
//* env dosyasındaki verilere erişmek için kurulum
dotenv.config();

//* veritabanı ile bağlantı kurulumu
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Veritabanı ile bağlantı kuruldu."))
  .catch((err) =>
    console.log("Veritabı ile bağlantı kurulurken hata oluştu.", err)
  );

//* express uygulaması oluştur.
const app = express();

//! middlewares

//*a) bodydeki json içeriğinin okunmasını sağlar

app.use(express.json());

//*b) çerezleri işler ulaşmamızı sağlar

app.use(cookieParser());

//?c) react uygulamamızda gelen isteklere cevap vermesine izin ver

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//*d) yapılan isteklerin detayını konsola yazan middleware

app.use(morgan("dev"));

//? route tanımlama

app.use("/api/auth", authRouter);
app.use("/api/privatelesson", privateLessonRouter);

//? hata yönetimi
//* controllerda yapılacak tüm yönlendirmeler bu middlewarei tetikler.
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Üzgünüz bir şeyler ters gitti";

  return res.status(errStatus).json({
    statusCode: errStatus,
    message: errMessage,
  });
});

//! hangi portun dinleneceğini belirle
app.listen(process.env.PORT, () => {
  console.log(`API ${process.env.PORT} portunu dinlemeye başladı.`);
});
