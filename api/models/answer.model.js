import { Schema, model } from "mongoose";

const AnswerSchema = new Schema(
  {
    teacher: {
      type: Schema.ObjectId,
      ref: "Teacher",
      required: [true, "Soruyu hangi öğretmen cevaplamış belirtilmelidir."],
    }, // Soruyu çözen öğretmen (Many-to-One)
    question: {
      type: Schema.ObjectId,
      ref: "Question",
      required: [true, "Soru bilgisi eklenmelidir."],
    }, // Cevabın ilgili olduğu soru (Many-to-One)
    importantpoint: {
      type: String,
      required: [true, "Soruda dikkat edilmesi gereken yerler olmalıdır."],
    }, // Soruda dikkat edilmesi gerekenler
    suggestion: {
      type: String,
      required: [true, "Sorunun çözüm önerileri olmalıdır."],
    }, // Çözüm için öneriler
    answerPhoto: {
      type: String,
      required: [true, "Sorunun cevap fotoğrafı olmalıdır."],
    }, // Cevabın resmi
  },
  { timestamps: true }
); // Otomatik olarak createdAt ve updatedAt alanlarını ekler

AnswerSchema.pre(/^find/, function (next) {
  this.populate("teacher");

  next();
});

AnswerSchema.pre(/^find/, function (next) {
  this.populate("question");

  next();
});

export default model("Answer", AnswerSchema);
