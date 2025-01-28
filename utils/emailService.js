const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASS, // App password (Enable 2FA & generate an App Password)
  },
});

async function sendOTPEmail(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Email Verification",
    text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendOTPEmail;
