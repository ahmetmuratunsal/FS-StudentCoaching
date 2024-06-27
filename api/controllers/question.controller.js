import Question from "../models/question.model.js";
import studentModel from "../models/student.model.js";
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

  //* 2) soru belgesi oluştur.
  const newQuestion = new Question({
    student: req.userId, //? kullanıcı id protect mw sayesinde req içerisinde geliyor.
    questionTitle: req.body.questionTitle,
    questionText: req.body.questionText,
    questionPhoto: req.body.questionPhoto,
    category: req.body.category,
  });

  //* yeni soruyu  kaydet
  const savedQuestion = await newQuestion.save();

  //* öğrencinin soru sayısını güncelle
  await studentModel.findByIdAndUpdate(req.userId, {
    // öğrencinin yorum sayısını  mevcut değerin 1 fazlası kadar arttır
    $inc: { questionCount: 1 },
    //! mongodb operatörü inc sayesinde önceki değere söylediğimiz değer kadarını ekliyor
  });

  //* clienta cevap gönder
  res.status(201).json({
    message: "Sorunuz başarıyla oluşturuldu",
    question: savedQuestion,
  });
});

//* Soru düzenle
export const updateQuestion = catchAsync(async (req, res, next) => {
  const found = await Question.findOne({ student: req.userId });
  if (!found)
    return next(new AppError("Sadece kendi sorunuzu düzenleyebilirsiniz", 403));
  // new parametresi ile döndürlecek olan değerin dökümanın eski değil yeni değerleri olmasını istedik
  const updated = await Question.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (updated) {
    res
      .status(200)
      .json({ message: "Belge başarıyla güncellendi", data: updated });
  } else {
    next(new AppError("Girilen id'ye sahip bir belge bulunamadı.", 400));
  }
});

//* Soruyu sil
export const deleteQuestion = factoryDeleteOne(Question);
