const userRouter = require("express").Router();
const { createFarmer, loginFarmer, sendOTP, handleOTPVerification } = require("../controllers/userController");
const { authenticateToken } = require("../middleware/auth");

const multer = require("multer");
const upload = multer();

// Auth routes
userRouter.post("/auth/send-otp", sendOTP);
userRouter.post("/auth/verify-otp", handleOTPVerification);
userRouter.post("/auth/refresh", authenticateToken, (req, res) => {
  // Refresh token logic will be handled by the auth middleware
  res.json({ accessToken: req.newAccessToken });
});

// Farmer routes
userRouter.post("/farmer/register", upload.single("certificate"), createFarmer);
userRouter.post("/farmer/login", loginFarmer);

module.exports = userRouter;
