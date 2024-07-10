import nodemailer from "nodemailer";
import catchAsync from "./catchAsync.js";

const sendMail = catchAsync(async (options) => {
  //* 1- Transporter isminde mailleri taşıyacak yapıyı oluştur
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_SMTP_EMAIL_ADDRESS,
      pass: process.env.GMAIL_SMTP_APP_PASSWORD,
    },
  });

  //* 2- Email içeriğini tanımla

  const mailOptions = {
    from: "Öğrenci Koçluğu Sistemi <<info@ogrencikoclugusistemi.com>> ",
    to: options.email,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  //* 3- Emaili gönder
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

export default sendMail;
