import Question from "../models/question.model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import {
  factoryDeleteOne,
  factoryGetAll,
  factoryGetOne,
  factoryUpdateOne,
} from "./handlerFactory.js";

//* Bütün soruları al
export const getQuestions = factoryGetAll(Question);

//* Tek bir soruyu al
export const getOneQuestion = factoryGetOne(Question);

//* Soru oluştur
export const createQuestion = catchAsync(async (req, res, next) => {
  //* 1) kullanıcı öğretmen ise işlemi iptal et (öğretmen soru gönderemez)
  if (!req.isStudent)
    return next(new AppError("Öğretmenler soru gönderemez.", 403));

  //* 2) yorum belgesi oluştur.
  const newQuestion = new Question({
    student: req.userId, //? kullanıcı id protect mw sayesinde req içerisinde geliyor.
    questionTitle: req.body.questionTitle,
    questionText: req.body.questionText,
    questionPhoto: req.body.questionPhoto,
    category: req.body.category,
  });

  //* yeni soruyu  kaydet
  const savedQuestion = await newQuestion.save();
  //* clienta cevap gönder
  res.status(201).json({
    message: "Sorunuz başarıyla oluşturuldu",
    question: savedQuestion,
  });
});

//* Soru düzenle
export const updateQuestion = factoryUpdateOne(Question);

//* Soruyu sil
export const deleteQuestion = factoryDeleteOne(Question);
