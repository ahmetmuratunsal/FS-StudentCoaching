import { Schema, model } from "mongoose";

const ReviewSchema = new Schema(
  {
    privateLessonId: {
      type: String,
      required: true,
    },
    student: {
      type: Schema.ObjectId,
      ref: "Student",
      required: true,
    },
    star: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.pre(/^find/, function (next) {
  this.populate("student");

  next();
});

ReviewSchema.pre("save", function (next) {
  this.populate("student");

  next();
});

export default model("Review", ReviewSchema);
