import privateLessonModel from "../models/privateLesson.model.js";
import APIFeatures from "../utils/apiFeatures.js";
import { buildFilters } from "../utils/buildFilters.js";
import error from "../utils/error.js";

//* 1) Bütün özel dersleri al
export const getAllPrivateLesson = async (req, res, next) => {
  //* filtreleme ayarlarını oluşturan fonk. çağır

  const filters = buildFilters(req.query);

  const allFilters = {
    ...filters,
    sort: req.query.sort,
    fields: req.query.fields,
  };
  try {
    //* bütün özel derslere ulaş
    // const privateLessons = await privateLessonModel
    //   .find(filters)
    //   .populate("teacher");

    const features = new APIFeatures(
      privateLessonModel.find().populate("teacher"),
      allFilters
    )
      .filter()
      .sort()
      .limit()
      .paginate();

    const privateLessons = await features.query;

    if (privateLessons.length > 0) {
      res.status(200).json({
        message: "Özel dersler alındı",
        privateLessons,
      });
    } else {
      next(error(404, "Aratılan kriterlere uygun bir özel ders bulunamadı."));
    }
  } catch (err) {
    next(error(500, "Özel dersler alınırken bir sorun oluştu."));
  }
};
//* 2) Tek bir özel dersi al
export const getPrivateLesson = async (req, res, next) => {
  try {
    //* urldeki parametre olarak eklenen idden yola çıkarak özel dersin bilgilerine eriş
    const privateLesson = await privateLessonModel
      .findById(req.params.id)
      .populate("teacher");

    if (!privateLesson) return next(error(404, "Özel ders bulunamadı."));

    res.status(200).json({
      message: "Özel ders bulundu",
      privateLesson,
    });
  } catch (err) {
    next(error(404, "Bu id'ye sahip bir özel ders bulunamadı"));
  }
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
  } catch (err) {
    console.log(err);
    next(error(404, "Özel ders oluşturulurken bir hata oluştu"));
  }
};

//* 4) Bir özel dersi sil
export const deletePrivateLesson = async (req, res, next) => {
  try {
    //* 1) parametre olarak gönderilen idye eriş (req.params.id)
    //* özel dersin detaylarını al
    const privateLesson = await privateLessonModel.findById(req.params.id);

    //* 2) özel dersi oluşturan ve silmek isteyen kullanıcı aynı mı kontrol et

    if (privateLesson.teacher != req.userId)
      return next(
        error(403, "Sadece kendi oluşturduğunuz özel dersi silebilirsiniz.")
      );
    //* 3) özel dersi sil

    await privateLessonModel.findByIdAndDelete(req.params.id);

    //* 4) client'e cevap gönder
    res.status(200).json({
      message: "Özel ders başarıyla kaldırıldı.",
    });
  } catch (err) {
    console.log(err);
    return next(error(500, "Özel ders silinirken bir sorun oluştu."));
  }
};
