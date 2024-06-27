import express from "express";

import protect from "../middlewares/protect.js";
import {
  createAnswer,
  deleteAnswer,
  getAllAnswer,
  getOneAnswer,
  updateAnswer,
} from "../controllers/answer.controller.js";

const router = express.Router();

router.get("/", protect, getAllAnswer);
router.get("/:id", protect, getOneAnswer);
router.post("/", protect, createAnswer);
router.patch("/:id", protect, updateAnswer);
router.delete("/:id", protect, deleteAnswer);

export default router;
