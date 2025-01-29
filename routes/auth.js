const express = require("express");
const authController = require("../controllers/authController");
// const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/verify-email", authController.verifyEmail);
router.post("/resend-otp", authController.resendOtp);
router.post("/login", authController.login);

module.exports = router;
