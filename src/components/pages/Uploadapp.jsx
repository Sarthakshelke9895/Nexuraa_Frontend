import React, { useState } from 'react';
import './uploadapp.css';
import Applogo1 from '../../assets/Assets/leafylogo.jpg';
import Applogo2 from '../../assets/Assets/drfruitslogo.jpeg';
import Downloadpng from '../../assets/download.png';
import Backarow from '../../assets/backarrow.png';

const Uploadapp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [filteredApps, setFilteredApps] = useState([]);
 



  const apps = [
    {
      id: 'leafycare',
      logo: Applogo1,
      name: 'LeafyCare',
      slogan: 'Your Plant\'s Best Friend, Every Day',
      owner: 'Parth Shinde & Co Developers',
      downloadLink: 'path/to/leafycare-app.apk',
      desc:"LeafyCare: Your Plant's Best Friend, Every Day. A smart gardening app to nurture your plants, providing tips, reminders, and more for a greener life!"
    },
    {
      id: 'ssdryfruits',
      logo: Applogo2,
      name: 'SS DryFruits',
      slogan: 'Online Retail Store for Dry Fruits',
      owner: 'Sarthak Shelke & Co Developers',
      downloadLink: '/ssdryfruits.apk',
      desc:"SS DryFruits: Your one-stop shop for premium dry fruits. Fresh, healthy, and delivered with care! Explore a variety of quality nuts and dried fruits to enhance your lifestyle."

    },
  ];
  

  const handlebackclick = () => {
    window.history.back();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const normalizedSearchId = searchTerm.trim().toLowerCase().replace(/\s+/g, '');
      const targetElement = document.querySelector(`[id="${normalizedSearchId}"]`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        if (window.innerWidth > 768) {
          targetElement.classList.add('scale-up');
          setTimeout(() => {
            targetElement.classList.remove('scale-up');
          }, 1500);
        }
      } else {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }
    }
  };

  const handleInputChange = (e) => {
    const searchValue = e.target.value.trim();
    setSearchTerm(searchValue);
  
    if (searchValue) {
      const filtered = apps.filter((app) =>
        app.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredApps(filtered);
    } else {
      setFilteredApps([]); // Clear suggestions when input is empty
    }
  };
  

  const handleSuggestionClick = (suggestion) => {
    
    setSearchTerm(suggestion.name);
    setFilteredApps([]); 
  
    // Scroll to the corresponding card
    const targetElement = document.getElementById(suggestion.id);
    if (targetElement) {
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
  
    // Refocus input (optional for mobile)
    const inputElement = document.querySelector('input[type="text"]');
    if (inputElement) {
      inputElement.focus();
    }
  };
  
  

  return (
    <div className="containerforapps">
      <nav className="randomnav">
        <div className="background">
          <img src={Backarow} alt="Back" id="backarrow" onClick={handlebackclick} />
        </div>
        <img src="faviconserver" alt="logo" id="website_logonav" />
        <h1 id="website_namenav">Nexuraa</h1>
      </nav>

      {/* Custom Alert */}
      {showAlert && (
        <div className="custom-alert">
          <span>No App found.</span>
          <button onClick={() => setShowAlert(false)} className="close-alert">
            &times;
          </button>
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
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>

      {/* Suggestions Dropdown */}
      {searchTerm && filteredApps.length > 0 && (
        <div
          className="suggestions-dropdown"
        >
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(app)}
            >
              {app.name}
            </div>
          ))}
        </div>
      )}

      <h1 id="heading">Our Uploads :</h1>

      <div className="all2">
        {apps.map((app) => (
          <div className="app-card" id={app.id} key={app.id}>
            <div className="app-image">
              <img src={app.logo} alt="App logo" className="app_logo" />
              <div className="nameandco">
                <h2 className="app-name">
                  <h4 id="appname">{app.name}</h4>
                  {app.slogan}
                </h2>
                <p className="app-owner">By: {app.owner}</p>
              </div>
            </div>
            <div className="app-details">
              <p className="app-description">
               {app.desc}
              </p>
              <a href={app.downloadLink} download className="download-btn">
                <span className="download-icon">
                  <img src={Downloadpng} alt="logo" id="downloadicon" />
                </span>
                Get App
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Uploadapp;
