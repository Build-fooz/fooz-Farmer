import React, { useState } from 'react';
import axios from 'axios';

const  UserLogin = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');

  const sendOtp = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/user/send-otp', { phone });
      setOtpSent(true);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/user/verify-otp', { phone, otp });
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setMessage('Login successful');
      window.location.href = '/dashboard'; // Or use React Router's useNavigate()
    } catch (err) {
      setMessage(err.response?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <input
          type="text"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {otpSent && (
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        )}

        {!otpSent ? (
          <button
            onClick={sendOtp}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Send OTP
          </button>
        ) : (
          <button
            onClick={verifyOtp}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            Verify OTP & Login
          </button>
        )}

        {message && <p className="text-center text-sm text-blue-600 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default UserLogin;
