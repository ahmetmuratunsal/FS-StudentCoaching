import catchAsync from "../utils/catchAsync.js";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";
import AppError from "./../utils/appError.js";
import bcrypt from "bcrypt";
import { factoryGetAll } from "./handlerFactory.js";

/* bütün kullanıcıları al */
export const getAllStudent = factoryGetAll(Student);
export const getAllTeacher = factoryGetAll(Teacher);

/* yeni bir kullanıcı oluştur */
export const createUser = catchAsync(async (req, res, next) => {
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
    console.log(err);
    // hata middlewareine yönlendirdik. ve hata açıklamasını gönderdik
    next(new AppError("Hesap oluşturulurken bir hata oluştu.", 400));
  }
});

/* bir tane kullanıcıyı al */
export const getUser = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const students = await Student.find().select("-password");

  const teachers = await Teacher.find().select("-password");

  let users = [...students, ...teachers];

  const user = users.find((user) => user._id == req.params.id);

  if (!user)
    return next(
      new AppError("Belirttiğiniz id'ye sahip kullanıcı bulunamadı.")
    );
  res
    .status(200)
    .json({ message: "Parametredeki idli kullanıcı bulunmuştur.", user });
});

/* kullanıcıyı güncelle */
export const updateUser = catchAsync(async (req, res, next) => {
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

  const updatedUser = await collection
    .findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    .select("-password");

  if (!updatedUser)
    return next(new AppError("Kullanıcı güncellenirken bir hata oluştu", 400));

  res.status(200).json({
    message: `${userType} kullanıcısı başarıyla güncellendi.`,
    updatedUser,
  });
});

/* kullanıcıyı sil */
export const deleteUser = catchAsync(async (req, res, next) => {
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

  await collection.findByIdAndDelete(req.params.id);

  res.status(204).json({ message: `${userType} başarıyla silindi.` });
});
