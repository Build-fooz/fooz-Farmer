
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLock } from "@fortawesome/free-solid-svg-icons";
// import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import Header from "../Components/HomePage/Header";


const AuthForm = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const navigate = useNavigate();

  // Phone Number Validation (Only 10 Digits)
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  // OTP Validation (Only 6 Digits)
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  // Generate and Send OTP
  const generateAndSendOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    setGeneratedOtp(otp);
    setOtpSent(true);

    // Simulate sending OTP to the user's phone
    console.log(`OTP sent to ${phone}: ${otp}`);
  };

  // Verify OTP
  const verifyOtp = () => {
    if (otp === generatedOtp) {
      console.log("OTP verified successfully!");
      navigate("/dashboard"); // Redirect to dashboard or another page
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (

      <div>
        <Header/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 relative">
     
  
     {/* Glassmorphism Card */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          Welcome to Farmer Connect
        </h1>
        <p className="text-center text-black mb-6">Login to continue</p>

        {/* Phone Input */}
        <div className="relative mb-4">
          <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={handlePhoneChange}
            className={`w-full pl-10 p-3 border ${
              phone.length === 10 ? "border-gray-300" : "border-gray-500"
            } rounded-lg focus:ring-2 focus:ring-green-400 outline-none`}
          />
          {phone.length > 0 && phone.length < 10 && (
            <p className="text-red-500 text-sm mt-1">Enter a valid 10-digit phone number</p>
          )}
        </div>

        {/* OTP Input (Shown After Clicking "Send OTP") */}
        {otpSent && (
          <div className="relative mb-4">
            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
              className={`w-full pl-10 p-3 border ${
                otp.length === 6 ? "border-gray-300" : "border-red-500"
              } rounded-lg focus:ring-2 focus:ring-green-400 outline-none`}
            />
            {otp.length > 0 && otp.length < 6 && (
              <p className="text-red-500 text-sm mt-1">Enter a valid 6-digit OTP</p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={() => {
            if (phone.length === 10 && !otpSent) {
              generateAndSendOtp(); // Generate and send OTP
            } else if (otpSent) {
              verifyOtp(); // Verify OTP
            }
          }}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
        >
          {otpSent ? "Verify OTP" : "Send OTP"}
        </button>

        {/* Register Button at Bottom */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <button
            onClick={() => navigate("/register")}
            className="mt-2 text-black font-semibold hover:text-gray-700"
          >
            Register
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AuthForm;



