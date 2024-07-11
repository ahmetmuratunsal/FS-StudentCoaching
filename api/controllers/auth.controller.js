import bcrypt from "bcrypt";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";
import error from "./../utils/error.js";
import jwt from "jsonwebtoken";
import AppError from "./../utils/appError.js";
import catchAsync from "./../utils/catchAsync.js"; // catchAsync
import sendMail from "./../utils/email.js";

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

  const user = await collection
    .findOne({ username: req.body.username })
    .select("+password");

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
  const resetToken = jwt.sign(
    {
      id: user._id,
      isStudent: user.isStudent,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "10m",
    }
  );

  //* 3 : Veritabanına kaydedilecek şifreyi hashle
  user.passwordResetToken = resetToken;

  //* 4 : Sıfırlama tokeninin suresini 10 dakika olarak belirle
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  //* 5 : Veritabanına kaydet
  await user.save();

  //* 6 : Kullanıcının mailine tokeni link ile gönder
  try {
    const link = `http://localhost:5173/reset-password/${resetToken}`;
    const html = `<h3>Merhaba ${user.username}</h3>
      <p>${user.email} epostasına bağlı öğrenci koçluğu sitesi hesabı için şifre sıfırlama linki aşağıdadır.</p>
      <p>
      <a href="${link}">${link}</a> 
      10 Dakika içerisinde bu linke tıklayarak sıfırlama yapabilirsiniz.
      </p>
      <p>Bu sıfırlama linki 10 dakika sonra iptal olacaktır.</p>
      <p>Eğer bu isteği siz yapmadıysanız mesajı görmezden gelebilirsiniz.</p>
      <p>Öğrenci Koçluğu Sistemi Ekibi</p>
      `;
    await sendMail({
      email: user.email,
      subject: `Şifre Sıfırlama Talebi (10 Dakika)`,
      html,
    });
  } catch (err) {
    return next(new AppError("Mail gönderilirken hata oluştu", 500));
  }

  res.status(200).json({
    message:
      "Sıfırlama bağlantısı mailinize gönderildi. Sıfırlama linkine tıklayarak yeni şifrenizi girebilirsiniz.",
  });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  //* 1 : Tokenden yola çıkarak kullanıcıyı bul
  const token = req.params.token;
  //* 2) token geçerli mi kontrol et (süresini ve imzayı)
  let decoded;
  try {
    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
      if (err) {
        return next(
          new AppError("Tokeniniz geçersiz veya süresi dolmuş.", 403)
        );
      }

      decoded = payload;
    });
  } catch (err) {
    return next(new AppError("Tokeniniz geçersiz veya güncellenmiş.", 403));
  }

  let collection;

  if (decoded.isStudent) {
    collection = Student;
  } else {
    collection = Teacher;
  }

  //* 3 : token değeri geçerli olan ve son geçerlilik tarihi henüz dolmamış olan kullanıcıyı al
  const user = await collection
    .findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    })
    .select("+password");
  if (!user) {
    return next(new AppError("Gecersiz token ya da süresi dolmuş.", 400));
  }

  //* 4 : Kullanıcıdan alınan şifreyi hashle ve saltla

  const hashedPass = await bcrypt.hash(req.body.password, 5);

  //* 5 : Kullanıcı bulunduysa ve token tarihi geçmemişse yeni şifreyi belirle
  user.password = hashedPass;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  //* 6 : Kullanıcının şifre değiştirme tarihini güncelle
  user.passwordChangedAt = Date.now();
  //* 7 : Veritabanına kaydet
  await user.save();
  res
    .status(200)
    .json({ message: "Şifreniz sıfırlama başarılı. Giriş yapabilirsiniz." });
});
