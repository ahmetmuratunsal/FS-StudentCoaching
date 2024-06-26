import bcrypt from "bcrypt";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";
import error from "./../utils/error.js";
import jwt from "jsonwebtoken";

//* kaydol : yeni hesap oluşturma

export const register = async (req, res, next) => {
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
      return next(error(400, "Öğrenci misin alanını belirtiniz."));
    }

    //* veritabanına kaydedilecek kullanıcıyı oluştur
    const newUser = new collection({ ...req.body, password: hashedPass });

    const haveUsername = await collection.findOne({
      username: req.body.username,
    });
    const haveEmail = await collection.findOne({ email: req.body.email });

    if (haveUsername)
      return next(error(404, "Bu kullanıcı adına sahip bir kullanıcı mevcut"));
    if (haveEmail)
      return next(error(404, "Bu emaile sahip bir kullanıcı mevcut"));

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
    next(error(400, "Hesap oluşturulurken bir hata oluştu."));
    console.log(err);
  }
};

//* Giriş yapma: varolan hesaba giriş yapacak

export const login = async (req, res, next) => {
  let collection;
  let userType;

  if (req.body.isStudent === true) {
    collection = Student;
    userType = "Student";
  } else if (req.body.isStudent === false) {
    collection = Teacher;
    userType = "Teacher";
  } else {
    return next(error(404, "Kullanıcı tipinizi belirtiniz."));
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
    return next(error(404, "Girdiğiniz bilgilere ait kullanıcı bulunamadı."));

  //* 5) Şifre doğruysa jwt tokeni oluştur.

  const token = jwt.sign(
    { id: user._id, isStudent: user.isStudent },
    process.env.JWT_KEY,
    {
      expiresIn: "7d",
    }
  );

  //* cevabı göndermeden önce passwordu kaldır

  user.password = undefined;

  //* 6) tokeni çerezler (cookie) ile client'a gönder
  res
    .cookie("accessToken", token, { httpOnly: true })
    .status(200)
    .json({ message: "Başarılı bir şekilde giriş yapıldı.", user });
};

//* Çıkış yap : oturumu kapat
//* kullanıcıya giriş yaptığında gönderdiğimiz accessToken çerezinin geçerliliğini sonlandır.

export const logout = async (req, res, next) => {
  res.clearCookie("accessToken").status(200).json({
    message: "Başarılı bir şekilde çıkış yapıldı Yine bekleriz.",
  });
};
