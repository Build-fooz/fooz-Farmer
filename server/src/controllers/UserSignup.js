const UserSignup = require("../models/UserSignup");
const jwt = require("jsonwebtoken");
const { generateOTP, verifyOTP } = require("../utils/smsUser");

// ✅ Send OTP
const sendOTP = async (req, res) => {
  const { phone } = req.body;

  try {
    const user = await UserSignup.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found, please signup" });
    }

    const otp = generateOTP(phone);
    console.log(`OTP for ${phone}: ${otp}`); // In production, use SMS service
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Verify OTP and Login
const verifyLoginOTP = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const isValid = verifyOTP(phone, otp);
    if (!isValid) return res.status(400).json({ message: "Invalid or expired OTP" });

    const user = await UserSignup.findOne({ phone });
    if (!user) return res.status(404).json({ message: "User not found" });

    const accessToken = jwt.sign(
      { userId: user._id, role: "user" },
      process.env.AUTH_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    await UserSignup.findByIdAndUpdate(user._id, { refreshToken });

    const userData = user.toObject();
    delete userData.refreshToken;

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: userData,
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Signup
const signupUser = async (req, res) => {
  const { fullName, phone, email } = req.body;

  try {
    const existingUser = await UserSignup.findOne({
      $or: [{ phone }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User with phone or email already exists" });
    }

    const newUser = new UserSignup({ fullName, phone, email });
    await newUser.save();

    const otp = generateOTP(phone);
    console.log(`Signup OTP for ${phone}: ${otp}`);

    res.status(201).json({ message: "Signup successful. OTP sent to your phone." });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signupUser,
  sendOTP,
  verifyLoginOTP,
};
