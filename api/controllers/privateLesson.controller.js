import privateLessonModel from "../models/privateLesson.model.js";
import error from "../utils/error.js";

//* 1) Bütün özel dersleri al
export const getAllPrivateLesson = async (req, res, next) => {
  res.status(200).json({
    message: "Backend'den cevap gönderildi",
  });
};
//* 2) Tek bir özel dersi al
export const getPrivateLesson = async (req, res, next) => {
  res.status(200).json({
    message: "Backend'den cevap gönderildi",
  });
};
//* 3) Yeni özel ders oluştur
export const createPrivateLesson = async (req, res, next) => {
  //* eğer kullanıcı öğretmen değilse hata gönder
  if (req.isStudent)
    return next(error(403, "Sadece öğretmenler özel ders oluşturabilir."));

  //* yeni özel ders oluştur
  const newPrivateLesson = new privateLessonModel({
    teacher: req.userId,
    ...req.body,
  });

  try {
    //* yeni özel dersi kaydet
    const savedPrivateLesson = await newPrivateLesson.save();
    //* clienta cevap gönder
    res.status(201).json({
      message: "Özel ders başarıyla oluşturuldu",
      privateLesson: savedPrivateLesson,
    });
  } catch (error) {
    console.log(error);
    next(error(404, "Özel ders oluşturulurken bir hata oluştu"));
  }
};

//* 4) Bir özel dersi sil
export const deletePrivateLesson = async (req, res, next) => {
  res.status(200).json({
    message: "Backend'den cevap gönderildi",
  });
};
