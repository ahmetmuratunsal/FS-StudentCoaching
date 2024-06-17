//* Clienttan çerezler ile gönderilen jwt tokenin geçerliliğini kontrol edecek
//* ve geçersiz ise hata gönderecek

import error from "../utils/error.js";
import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  //* 1) çerezler ile gelen tokene eriş
  const token = req.cookies.accessToken;

  //* 2) Token yoksa hata ver

  if (!token) return next(error(403, "Yetkiniz yok (Token bulunmaadı)"));

  //* 3) token geçerli mi kontrol et (süresini ve imzayı)

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(error(403, "Tokeniniz geçersiz veya süresi dolmuş."));
    //* 4) req içerisine kullanıcı id ve isStudent değerini ekle
    req.userId = payload.id;
    req.isStudent = payload.isStudent;
  });

  //* 5) sonraki adıma devam et
  next();
};

export default protect;
