import express from "express";
import {
  createReview,
  getReviews,
  deleteReview,
  getAllReviews,
} from "../controllers/review.controller.js";
import protect from "../middlewares/protect.js";

const router = express.Router();

router.post("/", protect, createReview);
router.get("/", getAllReviews);
router.get("/:privateLessonId", getReviews);
router.delete("/:privateLessonId", protect, deleteReview);

export default router;
