import React, { useState } from 'react';
import "./uploadapp.css";
import Applogo1 from '../../assets/Assets/leafylogo.jpg';
import Applogo2 from '../../assets/Assets/drfruitslogo.jpeg';
import Downloadpng from '../../assets/download.png';
import Backarow from '../../assets/backarrow.png';

const Uploadapp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility

  const handlebackclick = () => {
    window.history.back();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const normalizedSearchId = searchTerm.trim().toLowerCase().replace(/\s+/g, '');
      const targetElement = document.querySelector(`[id="${normalizedSearchId}"]`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Scale up effect on desktop only
        if (window.innerWidth > 768) {
          targetElement.classList.add('scale-up');
          setTimeout(() => {
            targetElement.classList.remove('scale-up');
          }, 1500);
        }
      } else {
        setShowAlert(true); // Show alert when no app is found
        setTimeout(() => setShowAlert(false), 3000); // Auto-hide after 3 seconds
      }
    }
  };



  

  return (
    <div className="containerforapps">
      <nav className='randomnav'>
        <div className="background">
          <img src={Backarow} alt="Back" id='backarrow' onClick={handlebackclick} />
        </div>
        <img src="faviconserver" alt="logo" id='website_logonav' />
        <h1 id='website_namenav'>Nexura</h1>
      </nav>

      {/* Custom Alert */}
      {showAlert && (
        <div className="custom-alert">
          <span>No App found.</span>
          
          <button onClick={() => setShowAlert(false)} className="close-alert">&times;</button>
        </div>
      )}

      <div className="search-bar">
        <span className="search-icon">
          <i className="fas fa-search"></i>
        </span>
        <input
          type="text"
          className="search-input"
          placeholder="Search Your App"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      <h1 id='heading'>Our Uploads :</h1>

      <div className="all2">
        <div className="app-card" id='leafycare'>
          <div className="app-image">
            <img src={Applogo1} alt="App logo"  className='app_logo'/>
            <div className="nameandco">
              <h2 className="app-name"><h4 id='appname'>LeafyCare</h4>Your Plant's Best Friend, Every Day</h2>
              <p className="app-owner">By: Parth Shinde & Co Developers</p>
            </div>
          </div>
          <div className="app-details">
            <p className="app-description">
              A brief, engaging description of the app goes here, highlighting key features and attracting users to download it.
            </p>
            <a href="path/to/your-app.apk" download className="download-btn">
              <span className="download-icon"><img src={Downloadpng} alt="logo" id='downloadicon' /></span>Get App
            </a>
          </div>
        </div>

        {/* Second app */}
        <div className="app-card" id='ssdryfruits'>
          <div className="app-image">
            <img src={Applogo2} alt="App logo"  className='app_logo'/>
            <div className="nameandco">
              <h2 className="app-name"><h4 id='appname'>SS DryFruits</h4>Online Retail Store for Dry Fruits</h2>
              <p className="app-owner">By: Sarthak Shelke & Co Developers</p>
            </div>
          </div>
          <div className="app-details">
            <p className="app-description">
              A brief, engaging description of the app goes here, highlighting key features and attracting users to download it.
            </p>
            <a href="/ssdryfruits.apk" download className="download-btn">
              <span className="download-icon"><img src={Downloadpng} alt="logo" id='downloadicon' /></span>Get App
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Uploadapp;
