//* filtreleme ayarları oluşturan method.
export const buildFilters = (query) => {
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
      filters.price.gt = query.min;
    }

    if (query.max) {
      filters.price.lt = query.max;
    }
  }

  if (query.title) {
    //* regex operatörü ile içinde varsa karşılaştırması yaptık.
    //* options operatörü ile büyük küçük harf duyarlılığını kaldırdık
    filters.title = { $regex: query.title, $options: "i" };
  }
  //* fonksiyonu çağırıldığı yere ayarları döndür
  return filters;
};
