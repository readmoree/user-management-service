const express = require("express");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
<<<<<<< Updated upstream
const { snakeToCamelCase } = require("../utils/miscUtils");
=======
>>>>>>> Stashed changes
const sendOTPEmail = require("../utils/emailService");

const registerUser = async (req, res) => {
  console.log("hiii");
<<<<<<< Updated upstream
  console.log("hiii");
=======
>>>>>>> Stashed changes
  try {
    const { firstName, lastName, email, password, phone, dob, gender } =
      req.body;

    // Check if user already exists
    const [existingUser] = await db.query(
      "SELECT * FROM customer WHERE email = ?",
      [email]
    );
    console.log(existingUser);
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user with default status = REGISTERED
    const [user] = await db.query(
      "INSERT INTO customer (first_name, last_name, email, password, mobile, dob, gender, role, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        firstName,
        lastName,
        email,
        hashedPassword,
        phone,
        dob,
        gender,
        "CUSTOMER",
        "REGISTERED",
      ]
    );

    console.log(user);
    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    // Store OTP in DB
    await db.query(
      "INSERT INTO email_verification (customer_id, otp, expires_at) VALUES (?, ?, ?)",
      [user.insertId, otp, expiresAt]
    );

    // Send OTP via email
    await sendOTPEmail(email, otp);

    //Store email in session
    req.session.email = email;
<<<<<<< Updated upstream
    console.log("Session set:", req.session.email); // Debugging purpos
=======
    console.log("Session set:", req.session.email); // Debugging purpose
>>>>>>> Stashed changes

    return res
      .status(201)
      .json({ status: "success", message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};
const verifyEmail = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.session.email;
    console.log(email);
    if (!email) {
      return res.status(400).json({
        status: "error",
        message: "Session expired. Please register again.",
      });
    }

    // Check if OTP is valid and not expired
    const [otpRecord] = await db.query(
      "SELECT * FROM email_verification WHERE otp = ? AND expires_at > NOW() AND customer_id IN (SELECT customer_id FROM customer WHERE email = ?)",
      [otp, email]
    );

    if (otpRecord.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid or expired OTP" });
    }

    // Mark user as VERIFIED
    await db.query("UPDATE customer SET status = 'VERIFIED' WHERE email = ?", [
      email,
    ]);

    // Delete OTP record
    await db.query("DELETE FROM email_verification WHERE otp = ?", [otp]);

    // Clear the session after successful verification
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction error:", err);
      }
    });
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    return res
      .status(200)
      .json({ status: "success", message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email);
    console.log(req.body);
    // email = email.toString();
    const trimmedEmail = email.trim();
    const [users] = await db.query("SELECT * FROM customer WHERE email = ?", [
      trimmedEmail,
    ]);
    console.log("Users from DB:", users);

<<<<<<< Updated upstream
=======
    console.log("Users from DB:", users);

>>>>>>> Stashed changes
    console.log(users);
    if (users.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "User does not exist" });
    }

    const existingUser = snakeToCamelCase(users[0]);

    // Check if user is VERIFIED
    if (
      existingUser.status !== "VERIFIED" &&
      existingUser.role === "CUSTOMER"
    ) {
      return res.status(403).json({
        status: "error",
        message: "User is not verified.",
      });
    }

    // Compare password using bcrypt.compare()
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid Email or Password" });
    }

    const token = jwt.sign(
      {
<<<<<<< Updated upstream
        firstName: existingUser.firstName,
        customerId: existingUser.customerId,
=======
        firstName: existingUser.first_name,
        customer_id: existingUser.customer_id,
>>>>>>> Stashed changes
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10d" } // Token expires in 10 days
    );
    console.log(token);

    return res.status(200).json({
      status: "success",
      message: "Login Successful",
      token,
      role: existingUser.role,
    });
    console.log("Login Successful");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const [user] = await db.query("SELECT * FROM customer WHERE email = ?", [
      email,
    ]);
    if (user.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "User with this email does not exist",
      });
    }

    // Generate a new OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    // Update the OTP in the database
    await db.query(
      "UPDATE email_verification SET otp = ?, expires_at = ? WHERE customer_id = ?",
      [otp, expiresAt, user[0].customer_id]
    );

    // Send OTP via email
    await sendOTPEmail(email, otp);

    // Respond with success
    return res.status(200).json({
      status: "success",
      message: "OTP has been resent successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
module.exports = { registerUser, verifyEmail, login, resendOtp };
