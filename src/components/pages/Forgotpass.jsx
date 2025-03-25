import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import './forgotpass.css';
import { motion } from "framer-motion";
import Backarow from '../../assets/backarrow.png';

const Forgotpass = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetRequest = async () => {
    try {
      const res = await axios.post("http://localhost:5000/forgot-password", {
        email,
      });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(
        "Error: " + (error.response?.data?.message || "Something went wrong")
      );
    }
  };
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
        Forgot Password?
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Enter your email and we'll send you a reset link.
      </p>
      <input
        type="email"
        className="w-full"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <motion.button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-4 transition"
        whileTap={{ scale: 0.95 }}
        onClick={handleResetRequest}
      >
        Send Reset Link
      </motion.button>
      {message && (
        <p className="text-center mt-4 text-sm text-green-500">{message}</p>
      )}
      <div className="mt-6 text-center">
        <a href="/Login_signup" className="a">
          Back to Login
        </a>
      </div>
    </motion.div>
  </div>
  )
}

export default Forgotpass
