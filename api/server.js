import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import privateLessonRouter from "./routes/privateLesson.route.js";
import reviewRouter from "./routes/review.route.js";
import questionRouter from "./routes/question.route.js";
import answerRouter from "./routes/answer.route.js";
import userRouter from "./routes/user.route.js";
import meetingRouter from "./routes/meeting.route.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import AppError from "./utils/appError.js";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

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

//*a) body headers vs. gelen json verisini js'de kullanbilir formata getirir
app.use(express.json({ limit: "10kb" }));

//*b) çerezleri işler ulaşmamızı sağlar

app.use(cookieParser());

//?c) react uygulamamızda gelen isteklere cevap vermesine izin ver

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//*d) yapılan isteklerin detayını konsola yazan middleware

app.use(morgan("dev"));

//! güvenlik ile alakalı middlewareler

//* güvenlik için headerlar ekler
app.use(helmet());

//* bir ip adresinden belirli süre içerinde gelicek olan istekleri sınırla
const limiter = rateLimit({
  max: 100, //* aynı ip adresinden gelicek maks istek sınırı
  windowMs: 60 * 60 * 1000, //* ms cinsinden 1 saat
  message:
    "1 saat içerisndeki istek hakkınızı doldurdunuz.Daha sonra tekrar deneyiniz",
});

// middleware'i api route'ları için tanıtma
//TODO app.use("/api", limiter); api limitlerini aktif edeceğiz

//* Data sanitization - Verileri Sterelize Etme - Query Injection
//* isteğin body / params / header kısmına eklenen her türlü opeatörü  kaldır
app.use(mongoSanitize());

//? route tanımlama

app.use("/api/auth", authRouter);
app.use("/api/privatelesson", privateLessonRouter);
app.use("/api/review", reviewRouter);
app.use("/api/question", questionRouter);
app.use("/api/answer", answerRouter);
app.use("/api/user", userRouter);
app.use("/api/meeting", meetingRouter);

// tanımlanmayan bir route istek atıldığında hata ver
app.all("*", (req, res, next) => {
  // hata detaylarını belirle
  const error = new AppError("Tanımlanmyan bir route'a istek attınız", 404);

  // hata middlwareine yönlendir ve hata bilgilerini gönder
  next(error);
});

//? hata yönetimi
//* controllerda yapılacak tüm yönlendirmeler bu middlewarei tetikler.
// hata olduğunda devreye giren bir middlware
// hata bilgilerini alır ve cevap olarak gönderir
app.use((err, req, res, next) => {
  // hata detaylarını konsola yaz
  console.log(err.stack);

  // durum kodu veya durum değerleri gönderilmediğinde varsayılan değerler devreye girsin
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "Üzgünüz bir hata oluştu";

  // cevap gönder
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

//! hangi portun dinleneceğini belirle
app.listen(process.env.PORT, () => {
  console.log(`API ${process.env.PORT} portunu dinlemeye başladı.`);
});
