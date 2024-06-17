import express from "express";
import {
  createPrivateLesson,
  deletePrivateLesson,
  getAllPrivateLesson,
  getPrivateLesson,
} from "../controllers/privateLesson.controller.js";
import protect from "../middlewares/protect.js";

//* 1) router oluştur
const router = express.Router();

//* 2) yolları ve gerekli fonksiyonları tanımla

router.get("/", getAllPrivateLesson);
router.get("/:id", getPrivateLesson);
router.post("/", protect, createPrivateLesson);
router.delete("/:id", protect, deletePrivateLesson);

//* 3) export et ve app'e tanıt
export default router;
