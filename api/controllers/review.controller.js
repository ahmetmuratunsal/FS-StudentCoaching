import error from "../utils/error.js";
import Review from "../models/review.model.js";
import privateLessonModel from "../models/privateLesson.model.js";

//* yorum ekleme
export const createReview = async (req, res, next) => {
  //* 1) kullanıcı satıcı ise işlemi iptal et (öğretmen yorum yapamaz)
  if (!req.isStudent) return next(error(403, "Öğretmenler yorum atamaz."));

  //* 2) yorum belgesi oluştur.
  const newReview = new Review({
    studentId: req.userId, //? kullanıcı id protect mw sayesinde req içerisinde geliyor.
    privateLessonId: req.body.privateLessonId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    //* 3) öğrenci bu özel derse daha önce yaptığı yorumu al
    const oldReview = await Review.findOne({
      studentId: req.userId,
      privateLessonId: req.body.privateLessonId,
    });

    //* 4) eğerki eski bir yorum varsa işlemi iptal et (her öğrenci 1 yorum atabilir)
    if (oldReview)
      return next(error(403, "Daha önce bu özel derse bir yorum atmıştınız."));

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
    next(error(500, "Yorum gönderilirken bir sorun oluştu."));
  }
};

//* bir özel derse ait yorumları al
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      privateLessonId: req.params.privateLessonId,
    });
    res.status(200).json({ reviews });
  } catch (err) {
    next(error(500, "Yorumlar alınırken bir sorun oluştu."));
  }
};
export const deleteReview = (req, res, next) => {};
