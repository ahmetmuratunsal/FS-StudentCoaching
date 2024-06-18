import privateLessonModel from "../models/privateLesson.model.js";
import error from "../utils/error.js";

//* filtreleme ayarları oluşturan method.
const buildFilters = (query) => {
  //* bir filtreleme ayarlarının tanımlandığı nesne oluştur.

  const filters = {};

  //* eğerki userId param eklendiyse filtre ayarlarına ekle
  if (query.userId) {
    filters.teacher = query.userId;
  }

  //* eğerki kategori  param eklendiyse filtre ayarlarına ekle

  if (query.cat) {
    filters.category = query.cat;
  }

  //* eğer min veya max filtresi eklendiyse
  if (query.min || query.max) {
    filters.price = {};
    if (query.min) {
      filters.price.$gt = query.min;
    }

    if (query.max) {
      filters.price.$lt = query.max;
    }
  }

  if (query.search) {
    //* regex operatörü ile içinde varsa karşılaştırması yaptık.
    //* options operatörü ile büyük küçük harf duyarlılığını kaldırdık
    filters.title = { $regex: query.search, $options: "i" };
  }
  //* fonksiyonu çağırıldığı yere ayarları döndür
  return filters;
};

//* 1) Bütün özel dersleri al
export const getAllPrivateLesson = async (req, res, next) => {
  //* filtreleme ayarlarını oluşturan fonk. çağır
  const filters = buildFilters(req.query);
  try {
    //* bütün özel derslere ulaş
    const privateLessons = await privateLessonModel.find(filters);

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
    const privateLesson = await privateLessonModel.findById(req.params.id);

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
  } catch (error) {
    console.log(error);
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
