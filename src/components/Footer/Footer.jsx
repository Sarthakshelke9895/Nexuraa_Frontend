import React from 'react'
import './Footer.css'
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const handleclick = (e) => {
    navigate("/Terms")
  };
  return (
    <div className='foooter '>
      <p>@ 2024 Nexura. All rights reserved </p>
      <ul>
        <li onClick={handleclick}> Terms of Services</li>
        <li onClick={handleclick}>Privacy Policy</li>
      </ul>
    </div>
  )
}

export default Footer
