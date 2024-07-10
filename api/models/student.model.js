import { Schema, model } from "mongoose";
import validator from "validator";
// öğrenci şemasını belirle

const studentSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Lütfen username alanını belirleyin"],
      lowercase: true,
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
      lowercase: true,
      validate: [validator.isEmail, "Lütfen geçerli bir email adresi giriniz"],
      unique: [
        true,
        "Bu email adresinde bir kullanıcı mevcut. Lütfen farklı bir email belirleyin.",
      ],
    },
    password: {
      type: String,
      required: [true, "Lütfen şifre alanını belirleyin"],
      minLength: [8, "Şifreniz en az 8 karakter olmalıdır."],
      validate: [validator.isStrongPassword, "Şifreniz yeterince güçlü değil."],
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
    meetings: [{ type: Schema.ObjectId, ref: "Meeting" }], // Öğrencinin randevuları (One-to-Many)
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  //* ayarlar alanı
  //* timestamps sayesinde oluşturduğumuz bütün belgelere otomatik olarak oluşturulma ve güncellenme tarihleri eklenir
  { timestamps: true }
);

studentSchema.methods.controlPassDate = function (JWTTime) {
  if (JWTTime && this.passwordChangedAt) {
    //* Şifre değiştirme tarihini saniye formatına çevirme
    const changeTime = parseInt(this.passwordChangedAt.getTime() / 1000);
    console.log(changeTime);

    //* eğer jwt verilme tarihi şifre sıfırlama tarihinden önceyse true döndürür
    //* jwt verilme tarihi sifre sıfırlama tarihinden sonra ise jwt geçersiz olacağından false döndürür
    return JWTTime < changeTime;
  }
  return false;
};

export default model("Student", studentSchema);
