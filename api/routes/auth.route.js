import express from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
// 1) router oluşturma
const router = express.Router();

// 2) yolları belirle

// kullanıcıların kaydolması için
router.post("/register", register);
// kullanıcıların varolan hesaba giriş yapması için
router.post("/login", login);
// kullanıcıların giriş yapılmış hesaptan çıkması için
router.post("/logout", logout);
// kullanıcı şifresini unuttuysa
router.post("/forgot-password", forgotPassword);
// epostasına gönderdiğimiz linke istek attınca
router.patch("/reset-password/:token", resetPassword);

// 3) app'e tanıtmak için export et

export default router;
