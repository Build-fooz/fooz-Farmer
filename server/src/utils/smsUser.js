// utils/smsUser.js

const otpStore = new Map();

// Generate a 6-digit OTP
function generateOTP(phone) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(phone, { otp, expiresAt: Date.now() + 5 * 60 * 1000 }); // 5 mins
  return otp;
}

// Verify OTP
function verifyOTP(phone, inputOtp) {
  const data = otpStore.get(phone);
  if (!data) return false;

  const { otp, expiresAt } = data;
  if (Date.now() > expiresAt) {
    otpStore.delete(phone);
    return false;
  }

  const isMatch = otp === inputOtp;
  if (isMatch) otpStore.delete(phone);
  return isMatch;
}

module.exports = { generateOTP, verifyOTP };
