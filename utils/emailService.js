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
    html: `
<html>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); margin: auto;">
            <div style="text-align: center;">
                <h1>READMOREE</h1>
            </div>

            <p>Dear <strong>User Your OTP is</strong>,</p>
            <div style="text-align: center;">
                <h1 style="color:red;">${otp}</h1>
            </div>
            <h2 style="color: #444;">It will expire in 2 minutes.</h2>
            
            <p>Thank you for Registering with <strong>READMOREE</strong>! </p>

           

            <p>If you have any questions, feel free to contact us at <a href="mailto:support@youremail.com">support@youremail.com</a>.</p>
            
            <p style="text-align: center; font-size: 12px; color: #888;">1801 California St., Denver, CO 80202</p>
        </div>
    </body>
</html>`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendOTPEmail;
