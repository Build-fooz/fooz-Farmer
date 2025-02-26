
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLock } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/image/logo.png";


import { useNavigate } from "react-router-dom";


const AuthForm = () => {
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 relative">
      
      {/* Logo at Top Left */}
      <div className="absolute top-4 left-4">
        <img src={logo} alt="Farmer Connect Logo" className="w-24" />
      </div>

      {/* Glassmorphism Card */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          Welcome to Farmer Connect
        </h1>
        <p className="text-center text-gray-500 mb-6">Login to continue</p>

        {/* Phone Input */}
        <div className="relative mb-4">
          <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>

        {/* OTP Input (Shown After Clicking "Send OTP") */}
        {otpSent && (
          <div className="relative mb-4">
            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
  onClick={() => setOtpSent(true)}
  className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
>
  {otpSent ? "Verify OTP" : "Send OTP"}
</button>

{/* Register Button at Bottom */}
<div className="mt-4 text-center">
  <p className="text-gray-600">Don't have an account?</p>
  <button
    onClick={() => navigate("/Register")}
    className="mt-2 text-black font-semibold hover:text-gray-700"
  >
    Register
  </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;






