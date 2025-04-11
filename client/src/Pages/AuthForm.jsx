import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLock } from "@fortawesome/free-solid-svg-icons";
// import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import Header from "../Components/HomePage/Header";
import { useAuth } from "../context/AuthContext";

const AuthForm = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { verifyOTP } = useAuth();

  // Phone Number Validation (Only 10 Digits)
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 10) {
      setPhone(value);
      setError("");
    }
  };

  // OTP Validation (Only 6 Digits)
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 6) {
      setOtp(value);
      setError("");
    }
  };

  // Send OTP
  const handleSendOTP = async () => {
    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }

    setOtpSent(true);
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const result = await verifyOTP({ phone, otp });
      
      if (result.success) {
        navigate("/userdashboard");
    } else {
        setError(result.error || "Invalid OTP");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div>
      <Header />
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 relative">
     {/* Glassmorphism Card */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          Welcome to Farmer Connect
        </h1>
        <p className="text-center text-black mb-6">Login to continue</p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

        {/* Phone Input */}
        <div className="relative mb-4">
          <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={handlePhoneChange}
              disabled={otpSent}
            className={`w-full pl-10 p-3 border ${
              phone.length === 10 ? "border-gray-300" : "border-gray-500"
              } rounded-lg focus:ring-2 focus:ring-green-400 outline-none disabled:bg-gray-100`}
          />
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
                  otp.length === 6 ? "border-gray-300" : "border-gray-500"
              } rounded-lg focus:ring-2 focus:ring-green-400 outline-none`}
            />
          </div>
        )}

          {/* Buttons */}
          <div className="flex flex-col gap-4">
            {!otpSent ? (
        <button
                onClick={handleSendOTP}
                disabled={loading || phone.length !== 10}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
                {loading ? "Sending..." : "Send OTP"}
        </button>
            ) : (
          <button
                onClick={handleVerifyOTP}
                disabled={loading || otp.length !== 6}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
                {loading ? "Verifying..." : "Verify OTP"}
          </button>
            )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AuthForm;



