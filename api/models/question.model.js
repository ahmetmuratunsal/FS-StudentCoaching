import { Schema, model } from "mongoose";

const QuestionSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Soruyu hangi öğrenci sormuş belirtilmelidir."],
    }, // Soruyu soran öğrenci (Many-to-One)
    questionTitle: {
      type: String,
      required: [true, "Sorunun bir başlığı olmalıdır."],
    }, // Sorunun metni
    questionText: {
      type: String,
      required: [true, "Sorunun bir metni olmalıdır."],
    }, // Sorunun metni
    questionPhoto: {
      type: String,
      required: [true, "Sorunun bir resmi olmalıdır."],
    },
    category: {
      type: String,
      required: [true, "Sorunun bir kategorisi olmalıdır."],
    }, // Sorunun kategorisi
    status: {
      type: String,
      default: "Devam ediyor",
    },
    //! answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }], // Sorunun cevapları (One-to-Many)
  },
  { timestamps: true }
); // Otomatik olarak createdAt ve updatedAt alanlarını ekler

QuestionSchema.pre(/^find/, function (next) {
  this.populate("student");

  next();
});

export default model("Question", QuestionSchema);
