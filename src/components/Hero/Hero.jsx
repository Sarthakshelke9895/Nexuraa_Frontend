import React from 'react'
import './Hero.css'
import { useNavigate } from 'react-router-dom';

const Hero = () => {

  
  const navigate = useNavigate();

  const handleUploadClick = () => {
      // Navigate to the Uploadapp page
      navigate('/form');
  };
  return (
         <div className="hero container" >
          <div className="hero_text" id='homeSection'>
         
            <h1>Host your Mobile Application Online for Free</h1>
            <p>Providing a User-Friendly Hosting Platform to Host your Apps Free of Cost</p>
            <button id='upload_btn' onClick={handleUploadClick}>Uplaod App</button>
          </div>
         </div> 
  )
}

export default Hero
