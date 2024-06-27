import express from "express";

import protect from "../middlewares/protect.js";
import {
  createQuestion,
  deleteQuestion,
  getOneQuestion,
  getQuestions,
  updateQuestion,
} from "../controllers/question.controller.js";

const router = express.Router();

router.get("/", protect, getQuestions);
router.get("/:id", protect, getOneQuestion);
router.post("/", protect, createQuestion);
router.patch("/:id", protect, updateQuestion);
router.delete("/:id", protect, deleteQuestion);

export default router;
