import { Schema, model } from "mongoose";

const privateLessonSchema = new Schema(
  {
    teacher: {
      type: Schema.ObjectId,
      ref: "Teacher",
      required: [true, "Dersin bir öğretmeni olması zorunludur."],
    }, // Dersi veren öğretmen (Many-to-One)
    title: {
      type: String,
      required: [true, "Dersin başlığı zorunludur."],
    }, // Dersin başlığı
    desc: {
      type: String,
      required: [true, "Dersin bir açıklaması olması zorunludur."],
    }, // Ders açıklaması
    avgRating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    }, // dersin ortalama puanı
    totalRating: {
      type: Number,
      default: 0,
    }, // toplam oylama puanı
    category: {
      type: String,
      required: [true, "Dersin kategorisi olmalıdır."],
    }, // kategori bilgisi akademik ders mi öğrenci koçluğu mu sanatsal bir ders mi
    coverImg: {
      type: String,
      required: [true, "Kapak fotoğrafı olmalıdır."],
    }, // Dersin kapak resmi
    images: {
      type: [String],
    }, // Dersin detaylarında paylaşılacak resimler (opsiyonel)
    price: {
      type: Number,
      required: [true, "Dersin fiyat bilgisi girilmelidir."],
    }, // Ders ücreti
    duration: {
      type: Number,
      required: [true, "Ders süresi tanımlanmalıdır."],
    }, // Ders süresi (dakika olarak)
    shortTitle: {
      type: String,
      required: [true, "Lütfen shortTitle tanımlayın"],
    }, // kapakta göstermelik kısa başlığı
    shortDesc: {
      type: String,
      required: [true, "Lütfen shortDesc tanımlayın"],
    }, // kapakta göstermelik kısa açıklama
    lessonType: {
      type: String,
      required: [
        true,
        "Lütfen derslerin nasıl yapılacağını (uzaktan,yüzyüze) belirtiniz.",
      ],
    }, //dersin türü uzaktan mı yüzyüze mi
    sales: {
      type: Number,
      default: 0,
    }, // dersin kaç öğrenci tarafından alındığı

    availability: [{ type: Date }], // Müsait tarih ve saatler (opsiyonel)
  },
  { timestamps: true }
); // Otomatik olarak createdAt ve updatedAt alanlarını ekler

export default model("PrivateLesson", privateLessonSchema); //şemaya ait modeli oluşturduk.
