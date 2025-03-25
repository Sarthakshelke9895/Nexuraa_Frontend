import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
import Backarow from '../../assets/backarrow.png';

import axios from 'axios';
import './resetPassword.css'
import { motion } from "framer-motion";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token"); // Get token from URL

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (!token || !password) {
      setMessage("Token and password are required.");
      return;
    }

    try {
      setMessage("Processing...");

      const res = await axios.post("https://server-5937.onrender.com/reset-password", {
        token,
        password,
      });

      setMessage(res.data.message);

      // Redirect after success
      setTimeout(() => navigate("/Login_signup"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <nav className='randomnav'>
        <div className="background">
          <img src={Backarow} alt="Back" id='backarrow' onClick={() => window.history.back()} />
        </div>
        <img src="faviconserver" alt="logo" id='website_logonav' />
        <h1 id='website_namenav'>Nexuraa</h1>
      </nav>
    <motion.div
      className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Reset Password
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Enter your new password below.
      </p>
      <input
        type={showPassword ? "text" : "password"}
        className="input-field"
        placeholder="Enter new password"
        onChange={(e) => setPassword(e.target.value)}
      />

<label className='label'>
        <input
        className='checkbox'
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        Show Password
      </label>
      <motion.button
        className="bg-green-600 hover:bg-green-700"
        whileTap={{ scale: 0.95 }}
        onClick={handleReset}
      >
        Reset Password
      </motion.button>
      {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
    </motion.div>
  </div>
  );
};

export default ResetPassword;
