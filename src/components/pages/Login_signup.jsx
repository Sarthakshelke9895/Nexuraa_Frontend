import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './login_signup.css';
import Backarow from '../../assets/backarrow.png';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUploadClick = () => {
      // Navigate to the Uploadapp page
      navigate('/Forgotpass');
  };


  const showAlert = (message, type) => {
    setAlert({ message, type });


    // Hide alert after 1 second
    setTimeout(() => {
      setAlert({ message: '', type: '' });
    }, 2000);
  };

  const validateInputs = () => {
    if (!email) {
      showAlert(' Email is required!', 'error');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      showAlert('Invalid email format!', 'error');
      return false;
    }

    if (!password) {
      showAlert('Password is required!', 'error');
      return false;
    } else if (password.length < 6) {
      showAlert('Password must be at least 6 characters!', 'error');
      return false;
    }

    if (!isLogin && !name) {
      showAlert('Name is required!', 'error');
      return false;
    }

    if (!isLogin && !agreed) {
      showAlert('You must agree to the terms!', 'error');
      return false;
    }

    return true;
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleAuth = async () => {
    if (!validateInputs()) return;

    try {
      setLoading(true);
      const endpoint = isLogin ? 'login' : 'signup';
      const data = isLogin ? { email, password } : { name, email, password };
      const res = await axios.post(`http://localhost:5000/${endpoint}`, data);

      console.log(res);
      showAlert(isLogin ? 'Login successful!' : 'Signup successful!', 'success');

      // Redirect after a delay
      setTimeout(() => {
        
        navigate("/user");
      }, 1000);
    } catch (error) {
      if (error.response) {
        showAlert(`${error.response.data.error || 'Something went wrong!'}`, 'error');
      } else {
        showAlert('Server error! Try again later.', 'error');
      }
    } finally {
      setLoading(false);
    }
  
  };

  return (
    <div className="auth-container">
      <nav className='randomnav'>
        <div className="background">
          <img src={Backarow} alt="Back" id='backarrow' onClick={() => window.history.back()} />
        </div>
        <img src="faviconserver" alt="logo" id='website_logonav' />
        <h1 id='website_namenav'>Nexuraa</h1>
      </nav>

      {alert.message && (
        <motion.div 
          className={`custom-alert ${alert.type}`} 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -20 }} 
          transition={{ duration: 0.5 }}
        >
          {alert.message}
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="auth-box"
      >
        <h2 id='toggleid'>{isLogin ? 'Login' : 'Sign Up'}</h2>

        {!isLogin && (
          <input type='text' className='input' placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
        )}
        <input type='email' className='input' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
        <input type={showPassword ? "text" : "password"} className='input' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />

        <label className='label'>
        <input
        className='checkbox'
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        Show Password
      </label>

        {isLogin && (
        <p className="forgot-password" onClick={handleUploadClick} >Forgot Password?</p>
      )}

        {!isLogin && (
          <div className="checkbox-container">
            <input type="checkbox" id="terms" checked={agreed} onChange={() => setAgreed(!agreed)} />
            <label htmlFor="terms">
              I agree to the <a href="./Terms">Terms & Policies</a>
            </label>
          </div>
        )}

        <motion.button 
          className='button' 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.9 }} 
          onClick={handleAuth} 
          disabled={loading || (!isLogin && !agreed)}
        >
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
        </motion.button>

        <p onClick={() => setIsLogin(!isLogin)} className="toggle">
          {isLogin ? 'Create an account' : 'Already have an account? Login'}
        </p>
      </motion.div>
    </div>
  );
};

export default LoginSignup;
