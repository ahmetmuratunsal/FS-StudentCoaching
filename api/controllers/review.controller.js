import Review from "../models/review.model.js";
import privateLessonModel from "../models/privateLesson.model.js";
import reviewModel from "../models/review.model.js";
import AppError from "../utils/appError.js";
import { factoryGetAll } from "./handlerFactory.js";

//! yorum ekleme
export const createReview = async (req, res, next) => {
  //* 1) kullanıcı öğretmen ise işlemi iptal et (öğretmen yorum yapamaz)
  if (!req.isStudent)
    return next(new AppError("Öğretmenler yorum atamaz.", 403));

  //* 2) yorum belgesi oluştur.
  const newReview = new Review({
    student: req.userId, //? kullanıcı id protect mw sayesinde req içerisinde geliyor.
    privateLessonId: req.body.privateLessonId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    //* 3) öğrenci bu özel derse daha önce yaptığı yorumu al
    const oldReview = await Review.findOne({
      student: req.userId,
      privateLessonId: req.body.privateLessonId,
    });

    //* 4) eğerki eski bir yorum varsa işlemi iptal et (her öğrenci 1 yorum atabilir)
    if (oldReview)
      return next(
        new AppError("Daha önce bu özel derse bir yorum atmıştınız.", 403)
      );

    //* 5) eski yorum yoksa yorumu kaydet
    await newReview.save();

    //* 6) özel dersin rating değerlerini güncelle
    await privateLessonModel.findByIdAndUpdate(req.body.privateLessonId, {
      // toplam yıldız sayısını yeni atılan yorumun yıldızı kadar arttır
      // toplam yorum sayısını ise mevcut değerin 1 fazlası kadar arttır
      $inc: { starCount: req.body.star, reviewCount: 1 },
      //! mongodb operatörü inc sayesinde önceki değere söylediğimiz değer kadarını ekliyor
    });
    res.status(201).json({
      message: "Yorum gönderildi",
      review: newReview,
    });
  } catch (err) {
    console.log(err);
    next(new AppError("Yorum gönderilirken bir sorun oluştu.", 500));
  }
};

//! Bütün yorumları al

export const getAllReviews = factoryGetAll(reviewModel);

//! bir özel derse ait yorumları al
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      privateLessonId: req.params.privateLessonId,
    }).populate("student");
    res.status(200).json({ reviews });
  } catch (err) {
    next(new AppError("Yorumlar alınırken bir sorun oluştu.", 500));
  }
};

//! Yorumu silme

export const deleteReview = async (req, res, next) => {
  try {
    //* 1) parametre olarak gönderilen idye eriş (req.params.id)
    //* yorumun detaylarını al
    const review = await reviewModel.findById(req.params.id);

    //* 2) yorumu oluşturan ve silmek isteyen kullanıcı aynı mı kontrol et

    if (review.teacher != req.userId)
      return next(
        new AppError("Sadece kendi oluşturduğunuz yorumu silebilirsiniz.", 403)
      );

    //* 3) özel dersi sil

    await reviewModel.findByIdAndDelete(req.params.id);

    //* 4) client'e cevap gönder
    res.status(200).json({
      message: "Yorum başarıyla kaldırıldı.",
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Yorum silinirken bir sorun oluştu.", 500));
  }
};
