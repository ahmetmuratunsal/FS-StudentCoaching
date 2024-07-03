import Answer from "../models/answer.model.js";
import catchAsync from "../utils/catchAsync.js";
import Teacher from "../models/teacher.model.js";
import AppError from "./../utils/appError.js";

import {
  factoryDeleteOne,
  factoryGetAll,
  factoryGetOne,
  factoryUpdateOne,
} from "./handlerFactory.js";
import Question from "../models/question.model.js";

export const getAllAnswer = factoryGetAll(Answer);
export const getOneAnswer = factoryGetOne(Answer);
export const createAnswer = catchAsync(async (req, res, next) => {
  //* 1) kullanıcı öğrenci ise işlemi iptal et (öğrenci cevap gönderemez)
  if (req.isStudent)
    return next(new AppError("Öğrenciler cevap gönderemez.", 403));

  const foundAnswer = await Answer.findOne({
    question: req.questionId,
    teacher: req.userId,
  });

  if (foundAnswer)
    return next(
      new AppError(
        "Bir öğretmen aynı soruya yalnızca 1 kere cevap atabilir",
        403
      )
    );

  //* 2) soru belgesi oluştur.
  const newAnswer = new Answer({
    teacher: req.userId, //? kullanıcı id protect mw sayesinde req içerisinde geliyor.
    question: req.body.questionId,
    importantpoint: req.body.importantpoint,
    answerPhoto: req.body.answerPhoto,
    suggestion: req.body.suggestion,
  });

  //* yeni cevabı  kaydet
  const savedAnswer = await newAnswer
    .save()
    .then((answer) => {
      console.log("Cevap oluşturuldu:", answer);

      // Şimdi cevabı ilgili soruya eklememiz gerekiyor
      const questionId = req.body.questionId; // Sorunun MongoDB ID'si

      // Soruyu güncelle ve cevabı ekleyerek kaydet
      Question.findByIdAndUpdate(
        questionId,
        { $push: { answers: answer._id } }, // answers dizisine yeni cevabın ID'sini ekle
        { new: true, useFindAndModify: false }
      )
        .populate("answers") // Eğer gerekliyse cevapları doldur
        .then((updatedQuestion) => {
          console.log("Soruya cevap eklendi:", updatedQuestion);
        })
        .catch((err) => {
          console.error("Soruya cevap eklenirken hata oluştu:", err);
        });
    })
    .catch((err) => {
      console.error("Cevap oluşturulurken hata oluştu:", err);
    });

  //* sorunun status değerini güncelle ve cevap ekle
  await Question.findByIdAndUpdate(req.body.questionId, {
    $set: { status: "Çözüldü" },
  });

  //* öğretmenin cevapladığı soru sayısını güncelle
  await Teacher.findByIdAndUpdate(req.userId, {
    // öğrencinin yorum sayısını  mevcut değerin 1 fazlası kadar arttır
    $inc: { answeredCount: 1 },
    //! mongodb operatörü inc sayesinde önceki değere söylediğimiz değer kadarını ekliyor
  });

  //* clienta cevap gönder
  res.status(201).json({
    message: "Cevabınız başarıyla oluşturuldu",
    question: savedAnswer,
  });
});
export const updateAnswer = factoryUpdateOne(Answer);

export const deleteAnswer = factoryDeleteOne(Answer);
//TODO Cevap silerken sorunun durumunu "devam ediyor" diye değiştir
