import Meeting from "../models/meeting.model.js"; // Meeting modelini import et
import Student from "../models/student.model.js"; // Student modelini import et
import Teacher from "../models/teacher.model.js"; // Teacher modelini import et
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { factoryGetAll } from "./handlerFactory.js";

// Randevu oluşturma
export const createMeeting = catchAsync(async (req, res, next) => {
  try {
    if (!req.isStudent) {
      return next(new AppError("Sadece öğrenciler randevu oluşturabilir", 403));
    }
    // Randevu bilgilerini al
    const { teacherId, date, notes } = req.body;

    // Öğrenci ve öğretmen ID'lerinin geçerli olup olmadığını kontrol et
    const student = await Student.findById(req.userId);
    const teacher = await Teacher.findById(teacherId);

    if (!student || !teacher) {
      return res
        .status(404)
        .json({ message: "Ogretmen veya ogrenci bulunamadi" });
    }

    // Yeni randevu oluştur
    const newMeeting = new Meeting({
      student: req.userId,
      teacher: teacherId,
      date,
      notes,
    });

    // Randevuyu kaydet
    const savedMeeting = await newMeeting.save();

    // Öğrenci ve öğretmenin randevu listelerine ekle
    student.meetings.push(savedMeeting._id);
    teacher.meetings.push(savedMeeting._id);

    await student.save();
    await teacher.save();

    res
      .status(201)
      .json({ message: "Randevu başarıyla kaydedildi", data: savedMeeting });
  } catch (err) {
    next(new AppError("Randevu oluşturulurken bir hata oluştu.", 500));
  }
});

// Randevuları listeleme
export const getAllMeetings = factoryGetAll(Meeting);

// Tek bir randevuyu getirme
export const getOneMeeting = catchAsync(async (req, res, next) => {
  try {
    const meeting = await Meeting.findById(req.params.id)
      .populate("student", "firstName lastName email")
      .populate("teacher", "firstName lastName email");

    if (!meeting) {
      return next(new AppError("Randevu bulunamadı", 404));
    }

    res
      .status(200)
      .json({ message: "Randevu başarıyla getirildi", data: meeting });
  } catch (err) {
    next(new AppError("Randevu getirilirken bir hata oluştu", 500));
  }
});

// Randevu güncelleme
export const updateMeeting = catchAsync(async (req, res, next) => {
  try {
    // Randevu bilgilerini al
    const { date, status, notes, link } = req.body;

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { date, status, notes, link },
      { new: true, useFindAndModify: false }
    )
      .populate("student", "firstName lastName email")
      .populate("teacher", "firstName lastName email");

    if (!updatedMeeting) {
      return next(new AppError("Randevu bulunamadı", 404));
    }

    res.status(200).json({
      message: "Randevu başarıyla güncellendi",
      data: updatedMeeting,
    });
  } catch (err) {
    next(new AppError("Randevu güncellenirken bir hata oluştu", 500));
  }
});

// Randevu silme
export const deleteMeeting = catchAsync(async (req, res, next) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.id);

    if (!meeting) {
      return next(new AppError("Randevu bulunamadı", 404));
    }

    // Öğrenci ve öğretmenin randevu listelerinden çıkar
    await Student.findByIdAndUpdate(meeting.student, {
      $pull: { meetings: meeting._id },
    });
    await Teacher.findByIdAndUpdate(meeting.teacher, {
      $pull: { meetings: meeting._id },
    });

    res.status(200).json({ message: "Randevu başarıyla silindi" });
  } catch (err) {
    next(new AppError("Randevu silinirken bir hata oluştu", 500));
  }
});
