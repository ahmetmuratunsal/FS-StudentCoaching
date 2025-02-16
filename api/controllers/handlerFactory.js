import APIFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { buildFilters } from "./../utils/buildFilters.js";

//* delete işlemini proje içerisnde sadece model ismini değiştirerek defalarca kullanıp gereksiz
//* kod tekrarına sebep oluyorduk bizde bu kod tekrarini önlemek için silme işlevindeki dinamik olan
//* modeli parametre olarak alıyoruz. herhangi bir route eleman silinmesi gerektiğinde bu methodu
//* çağırıp parametre olarak silinecek elemanın modelinni gönderiyoruz bu sayede büyük bir kod kalabalığından kurtuluyoruz

export const factoryDeleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    try {
      const document = await Model.findByIdAndDelete(req.params.id);

      if (document) {
        res.status(204).json({
          status: "success",
          data: null,
        });
      } else {
        next(new AppError("Silinmeye çalışan id'li belge bulunamadı", 400));
      }
    } catch (err) {
      next(new AppError("Silinmeye çalışan id'li belge bulunamadı", 400));
    }
  });

// Güncelleme işlemi için ortak olarak kullanılabilecek method

export const factoryUpdateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    try {
      // new parametresi ile döndürlecek olan değerin dökümanın eski değil yeni değerleri olmasını istedik
      const updated = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (updated) {
        res
          .status(200)
          .json({ message: "Belge başarıyla güncellendi", data: updated });
      } else {
        next(new AppError("Girilen id'ye sahip bir belge bulunamadı.", 400));
      }
    } catch (err) {
      next(new AppError("Girilen id'ye sahip bir belge bulunamadı.", 400));
    }
  });

// Oluşturma işlemi için ortak olarak kullanılabilecek method

export const factoryCreateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    try {
      const document = await Model.create(req.body);

      res
        .status(200)
        .json({ message: "Belge başarıyla oluşturuldu", data: document });
    } catch (err) {
      next(new AppError("Belge oluşturulurken hata oluştu", 400));
    }
  });

// Tek bir elemanı alma işlemi için ortak olarak kullanılabilecek method

export const factoryGetOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    // bir sorgu oluştur
    let query = Model.findById(req.params.id);

    // eğer populate ayarları varsa sorguya ekle
    if (popOptions) query = query.populate(popOptions);

    // sorguyu çalıştır
    const found = await query;

    if (found) {
      // cevabı gönder
      res.status(200).json({ message: "Belge bulundu", data: found });
    } else {
      next(new AppError("Girilen id'ye sahip bir belge bulunamadı.", 400));
    }
  });

// Bütün elemanları alma işlemi için ortak olarak kullanılabilecek method

export const factoryGetAll = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    //* filtreleme ayarlarını oluşturan fonk. çağır

    const filters = buildFilters(req.query);

    const allFilters = {
      ...req.query,
      ...filters,
      sort: req.query.sort,
      fields: req.query.fields,
      limit: req.query.limit,
      page: req.query.page,
    };

    try {
      // apiFeatures class'ından örnek oluşturduk ve içerisndeki istediğimiz api özelliklerini çağırdık
      const features = new APIFeatures(
        Model.find().populate(popOptions),
        allFilters
      )
        .filter()
        .sort()
        .limit()
        .paginate();

      const allDoc = await Model.find();

      // Hazırldaığımız Komutu Çalıştır Verileri Al
      const docs = await features.query;

      if (docs.length > 0) {
        res.status(200).json({
          message: "Belgeler başarıyla alındı",
          totalDataLength: allDoc.length,
          filteredDataLength: docs.length,
          data: docs,
        });
      } else {
        return next(new AppError("Belge Bulunamadı", 400));
      }
    } catch (err) {
      return next(new AppError("Belge Bulunamadı", 400));
    }
  });
