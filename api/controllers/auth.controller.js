import bcrypt from "bcrypt";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";
import error from "./../utils/error.js";
//* kaydol : yeni hesap oluşturma

export const register = async (req, res, next) => {
  try {
    //* şifreyi hashle ve saltla
    const hashedPass = bcrypt.hashSync(req.body.password, 5);

    //* veritabanına kaydedilecek kullanıcıyı oluştur.
    if (req.body.isStudent === true) {
      const newStudent = new Student({ ...req.body, password: hashedPass });
      //* veritabanına kaydet
      await newStudent.save();
      //* clienta cevap gönder
      res.status(201).json({
        message: "Yeni öğrenci oluşturuldu.",
        student: newStudent,
      });
    } else if (req.body.isStudent === false) {
      const newTeacher = new Teacher({ ...req.body, password: hashedPass });
      //* veritabanına kaydet
      await newTeacher.save();
      //* clienta cevap gönder
      res.status(201).json({
        message: "Yeni öğretmen oluşturuldu.",
        teacher: newTeacher,
      });
    } else {
      next(error(400, "Öğrenci misin kısmını doldurunuz."));
    }
  } catch (err) {
    // hata middlewareine yönlendirdik. ve hata açıklamasını gönderdik
    next(error(400, "Hesap oluşturulurken bir hata oluştu. "));
    console.log(err.errmsg);
  }
};

//* Giriş yapma: varolan hesaba giriş yapacak

export const login = async (req, res, next) => {};

//* Çıkış yap : oturumu kapat

export const logout = async (req, res, next) => {};
