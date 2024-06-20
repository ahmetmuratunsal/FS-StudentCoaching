import { Schema, model } from "mongoose";

const ReviewSchema = new Schema(
  {
    privateLessonId: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
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

export default model("Review", ReviewSchema);
