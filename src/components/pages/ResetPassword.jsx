import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './resetPassword.css'
import { motion } from "framer-motion";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    try {
      const res = await axios.post('http://localhost:5000/reset-password', { token, password });
      setMessage(res.data.message);
      setTimeout(() => navigate('/Login_signup'), 2000);
    } catch (error) {
      setMessage('Error: ' + error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
        type="password"
        className="input-field"
        placeholder="Enter new password"
        onChange={(e) => setPassword(e.target.value)}
      />
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
