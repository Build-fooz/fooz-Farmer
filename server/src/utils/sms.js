const OTP_EXPIRY = 5 * 60 * 1000; // 5 minutes

const otpStore = new Map();

const generateOTP = (phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(phone, {
    otp,
    expiry: Date.now() + OTP_EXPIRY
  });
  
  // TODO: Implement actual SMS sending
  console.log(`OTP for ${phone}: ${otp}`);
  return otp;
};

const verifyOTP = (phone, otp) => {
  const stored = otpStore.get(phone);
  if (!stored) return false;
  
  if (Date.now() > stored.expiry) {
    otpStore.delete(phone);
    return false;
  }
  
  const isValid = stored.otp === otp;
  if (isValid) {
    otpStore.delete(phone);
}
  
  return isValid;
};

module.exports = { generateOTP, verifyOTP };
