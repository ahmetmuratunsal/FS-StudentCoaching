//* Clienttan çerezler ile gönderilen jwt tokenin geçerliliğini kontrol edecek
//* ve geçersiz ise hata gönderecek

import error from "../utils/error.js";
import jwt from "jsonwebtoken";
import AppError from "./../utils/appError.js";
import studentModel from "../models/student.model.js";
import teacherModel from "../models/teacher.model.js";

const protect = async (req, res, next) => {
  //* 1) çerezler ile gelen tokene eriş
  const token = req.cookies.accessToken;

  //* 2) Token yoksa hata ver

  if (!token) return next(error(403, "Yetkiniz yok (Token bulunmaadı)"));

  //* 3) token geçerli mi kontrol et (süresini ve imzayı)
  let decoded;
  try {
    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
      if (err)
        return next(
          new AppError("Tokeniniz geçersiz veya süresi dolmuş.", 403)
        );
      //* 4) req içerisine kullanıcı id ve isStudent değerini ekle
      req.userId = payload.id;
      req.isStudent = payload.isStudent;
      req.isAdmin = payload.isAdmin;
      decoded = payload;
    });
  } catch (err) {
    return next(new AppError("Tokeniniz geçersiz veya güncellenmiş.", 403));
  }

  let collection;

  if (decoded.isStudent) {
    collection = studentModel;
  } else {
    collection = teacherModel;
  }

  //* 5) Kullanıcının hesabı duruyor mu kontrol et
  const activeUser = await collection.findById(decoded.id);
  if (!activeUser) {
    return next(new AppError("Kullanıcının hesabına artık erişilemiyor.", 403));
  }
  //* Tokeni verdikten sonra şifresini değiştirdi mi kontrol et

  if (activeUser.controlPassDate(decoded.iat)) {
    return next(
      new AppError(
        "Yakın zamanda şifrenizi değiştirdiniz. Lütfen tekrar giriş yapınız.",
        403
      )
    );
  }

  //* 5) sonraki adıma devam et
  next();
};

export default protect;
