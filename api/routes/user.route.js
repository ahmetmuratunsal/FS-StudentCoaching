import express from "express";
import {
  createUser,
  deleteUser,
  getAllStudent,
  getAllTeacher,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";
import protect from "../middlewares/protect.js";
import adminProtect from "./../middlewares/adminProtect.js";
// 1) router oluşturma
const router = express.Router();

// 2) yolları belirle

/* Genellikle adminler kullanır. */
router.get("/student", protect, getAllStudent);
router.get("/teacher", protect, getAllTeacher);
router.post("/", protect, adminProtect, createUser);

/* kullanıcıların kullandığı kısım */
router.get("/:id", protect, getUser);
router.patch("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

// 3) app'e tanıtmak için export et

export default router;
