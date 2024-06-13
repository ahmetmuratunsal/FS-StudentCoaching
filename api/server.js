import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";

//* env dosyasındaki verilere erişmek için kurulum
dotenv.config();

//* veritabanı ile bağlantı kurulumu
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Veritabanı ile bağlantı kuruldu."))
  .catch((err) =>
    console.log("Veritabı ile bağlantı kurulurken hata oluştu.", err)
  );

//*express uygulaması oluştur.
const app = express();

//! middlewares

//* bodydeki json içeriğinin okunmasını sağlar

app.use(express.json());

//* yapılan isteklerin detayını konsola yazan middleware

//todo morgan eklenecek

//? route tanımlama

app.use("/api/auth", authRouter);

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
