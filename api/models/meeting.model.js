import { Schema, model } from "mongoose";

const MeetingSchema = new Schema(
  {
    student: {
      type: Schema.ObjectId,
      ref: "Student",
      required: [true, "Randevunun ilgili öğrencisi olmalı."],
    }, // Randevunun ilgili olduğu öğrenci (Many-to-One)
    teacher: {
      type: Schema.ObjectId,
      ref: "Teacher",
      required: [true, "Randevunun ilgili öğretmeni olmalı."],
    }, // Randevunun ilgili olduğu öğretmen (Many-to-One)
    date: { type: Date, required: [true, "Randevunun tarihi olmalı."] }, // Randevu tarihi ve saati
    status: {
      type: String,
      enum: ["Beklemede", "Planlanmış", "Tamamlandı", "İptal Edildi"],
      default: "Beklemede",
    }, // Randevu durumu
    notes: { type: String }, // Randevu notları (opsiyonel)
    link: { type: String },
    program: { type: String, default: "Zoom" },
    rejectText: { type: String },
  },
  { timestamps: true }
); // Otomatik olarak createdAt ve updatedAt alanlarını ekler

MeetingSchema.pre(/^find/, function (next) {
  this.populate("teacher");

  next();
});

MeetingSchema.pre(/^find/, function (next) {
  this.populate("student");

  next();
});

export default model("Meeting", MeetingSchema);
