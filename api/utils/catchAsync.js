// Bir fonksiyonu parametre olarak alır
// Fonksiyonu çalıştırır
// hata oluşursa hata middleware'ine yönlendir
// bütün async fonksiyonları bu fonksiyon ile sarmalıyacağız
export default (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
