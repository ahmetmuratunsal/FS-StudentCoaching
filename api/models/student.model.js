import { Schema, model } from "mongoose";

// öğrenci şemasını belirle

const studentSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Lütfen username alanını belirleyin"],
      unique: [
        true,
        "Bu isimde bir kullanıcı mevcut. Lütfen farklı bir username belirleyin.",
      ],
    },
    firstName: {
      type: String,
      required: [true, "Lütfen isim alanını belirleyin"],
    },
    lastName: {
      type: String,
      required: [true, "Lütfen soyisim alanını belirleyin"],
    },
    email: {
      type: String,
      required: [true, "Lütfen email alanını belirleyin"],
      unique: [
        true,
        "Bu email adresinde bir kullanıcı mevcut. Lütfen farklı bir email belirleyin.",
      ],
    },
    password: {
      type: String,
      required: [true, "Lütfen şifre alanını belirleyin"],
    },
    profilePhoto: {
      type: String,
      required: [true, "Lütfen bir fotoğraf seçiniz."],
    },
    city: {
      type: String,
      required: [true, "Lütfen şehir alanını belirleyin."],
    },
    phone: {
      type: Number,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    isStudent: {
      type: Boolean,
      default: true,
      required: [true, "Lütfen öğrenci misin alanını belirleyin."],
    },
    studentReviewCount: {
      type: Number,
      default: 0,
    },
    questionCount: {
      type: Number,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  //* ayarlar alanı
  //* timestamps sayesinde oluşturduğumuz bütün belgelere otomatik olarak oluşturulma ve güncellenme tarihleri eklenir
  { timestamps: true }
);

export default model("Student", studentSchema);
