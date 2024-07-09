import bcrypt from "bcrypt";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";
import error from "./../utils/error.js";
import jwt from "jsonwebtoken";
import AppError from "./../utils/appError.js";
import catchAsync from "./../utils/catchAsync.js"; // catchAsync
//* kaydol : yeni hesap oluşturma

export const register = catchAsync(async (req, res, next) => {
  try {
    //* şifreyi hashle ve saltla
    const hashedPass = await bcrypt.hash(req.body.password, 5);

    let collection;
    let userType;

    if (req.body.isStudent === true) {
      collection = Student;
      userType = "Student";
    } else if (req.body.isStudent === false) {
      collection = Teacher;
      userType = "Teacher";
    } else {
      return next(new AppError("Öğrenci misin alanını belirtiniz.", 400));
    }

    //* veritabanına kaydedilecek kullanıcıyı oluştur
    const newUser = new collection({ ...req.body, password: hashedPass });

    const haveUsername = await collection.findOne({
      username: req.body.username,
    });
    const haveEmail = await collection.findOne({ email: req.body.email });

    if (haveUsername)
      return next(
        new AppError("Bu kullanıcı adına sahip bir kullanıcı mevcut", 404)
      );
    if (haveEmail)
      return next(new AppError("Bu emaile sahip bir kullanıcı mevcut", 404));

    //* veritabanına kaydet
    await newUser.save();

    //* şifre alanını kaldırarak clienta cevap gönder
    newUser.password = undefined;

    res.status(201).json({
      message: `${userType} tipinde kullanıcı oluşturuldu.`,
      user: newUser,
    });
  } catch (err) {
    // hata middlewareine yönlendirdik. ve hata açıklamasını gönderdik
    next(new AppError("Hesap oluşturulurken bir hata oluştu.", 400));
    console.log(err);
  }
});

//* Giriş yapma: varolan hesaba giriş yapacak

export const login = catchAsync(async (req, res, next) => {
  let collection;
  let userType;

  if (req.body.isStudent === true) {
    collection = Student;
    userType = "Student";
  } else if (req.body.isStudent === false) {
    collection = Teacher;
    userType = "Teacher";
  } else {
    return next(new AppError("Kullanıcı tipinizi belirtiniz.", 404));
  }
  //* 1) İsmine göre kullanıcıyı bul.

  const user = await collection.findOne({ username: req.body.username });

  //* 2) Kullanıcı bulunamazsa hata gönder.

  if (!user)
    return next(error(404, "Girdiğiniz bilgilere ait kullanıcı bulunamadı."));

  //* 3) Bulunursa şifresi doğru mu kontrol et( veritabanındaki hashlenmiş şifre ile isteğin bodysinde gelen normal şifreyi karşılaştır.)
  const isCorrect = bcrypt.compareSync(req.body.password, user.password);

  //* 4) Şifre yanlışsa hata ver

  if (!isCorrect)
    return next(
      new AppError("Girdiğiniz bilgilere ait kullanıcı bulunamadı.", 404)
    );

  //* 5) Şifre doğruysa jwt tokeni oluştur.

  const token = jwt.sign(
    { id: user._id, isStudent: user.isStudent, isAdmin: user.isAdmin },
    process.env.JWT_KEY,
    {
      expiresIn: "7d",
    }
  );

  //* cevabı göndermeden önce passwordu kaldır

  user.password = undefined;

  //* 6) tokeni çerezler (cookie) ile client'a gönder
  res
    .cookie("accessToken", token, { httpOnly: true, maxAge: 604800000 })
    .status(200)
    .json({ message: "Başarılı bir şekilde giriş yapıldı.", user });
});

//* Çıkış yap : oturumu kapat
//* kullanıcıya giriş yaptığında gönderdiğimiz accessToken çerezinin geçerliliğini sonlandır.

export const logout = catchAsync(async (req, res, next) => {
  res.clearCookie("accessToken").status(200).json({
    message: "Başarılı bir şekilde çıkış yapıldı Yine bekleriz.",
  });
});

//* Şifremi unuttum alanı: Kullanıcı şifresini unuttuysa
//TODO BURDA KALDIK
export const forgotPassword = catchAsync(async (req, res, next) => {
  let collection;
  let userType;
  if (req.body.isStudent === true) {
    collection = Student;
    userType = "Student";
  } else if (req.body.isStudent === false) {
    collection = Teacher;
    userType = "Teacher";
  } else {
    return next(new AppError("Kullanıcı tipinizi belirtiniz.", 404));
  }

  //*1 : Kullanıcıyı bul
  const user = await collection.findOne({ email: req.body.email });
  if (!user)
    return next(
      new AppError("Girdiğiniz bilgilere ait kullanıcı bulunamadı.", 404)
    );

  //*2 : Şifre sıfırlamada kullanılacak token oluştur
});
