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
router.get("/student", protect, adminProtect, getAllStudent);
router.get("/teacher", protect, adminProtect, getAllTeacher);
router.post("/", protect, adminProtect, createUser);

/* kullanıcıların kullandığı kısım */
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

// 3) app'e tanıtmak için export et

export default router;
