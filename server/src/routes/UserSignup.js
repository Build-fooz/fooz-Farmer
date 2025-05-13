const express = require("express");
const router = express.Router();
const {
  signupUser,
  sendOTP,
  verifyLoginOTP,
} = require("../controllers/UserSignup");

router.post("/signup", signupUser);         // Signup with full name, phone, email
router.post("/send-otp", sendOTP);          // Send OTP for login
router.post("/verify-otp", verifyLoginOTP); // Verify OTP and login

module.exports = router;
