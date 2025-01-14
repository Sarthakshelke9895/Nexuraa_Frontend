import React, { useState, useRef } from 'react';
import "./uploadapp.css";
import Applogo1 from '../../assets/Assets/leafylogo.jpg';
import Applogo2 from '../../assets/Assets/drfruitslogo.jpeg';
import Downloadpng from '../../assets/download.png';
import Backarow from '../../assets/backarrow.png';

const Uploadapp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const [showSuggestions, setShowSuggestions] = useState(false); // Control suggestion dropdown visibility
  const inputRef = useRef(null);  // Ref for the input field

  // Function to get suggestions based on search input
  const getSuggestions = (searchTerm) => {
    const availableSuggestions = ["LeafyCare", "SS DryFruits"]; // Example apps, replace with your actual logic
    return availableSuggestions.filter((app) =>
      app.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Handle input changes and filter suggestions
  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // If the search term is empty, hide the suggestions
    if (newSearchTerm.trim() === '') {
      setShowSuggestions(false); // Hide suggestions when search is cleared
    } else {
      const filteredSuggestions = getSuggestions(newSearchTerm);
      setSuggestions(filteredSuggestions);

      // Show suggestions only when there are matching results
      if (filteredSuggestions.length > 0) {
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false); // Hide suggestions if no matches
      }
    }
  };

  // Show suggestions when input field is clicked
  const handleInputClick = () => {
    if (searchTerm.trim() !== '') {
      setShowSuggestions(true);  // Show suggestions if user has typed something
    }
  };

  // Handle suggestion click (hide suggestions, keep input focused)
  const handleSuggestionClick = (suggestion, event) => {
    // Prevent the default behavior to keep the input active and the keyboard visible
    event.preventDefault();

    // Prevent input field from losing focus by focusing it programmatically
    inputRef.current.focus();

    // Update the search term with the clicked suggestion
    setSearchTerm(suggestion);

    // Hide the suggestion dropdown after selection
    setShowSuggestions(false);

    // Optional: Scroll to the relevant section or item based on the suggestion
    const normalizedSearchId = suggestion.trim().toLowerCase().replace(/\s+/g, '');
    const targetElement = document.querySelector(`#${normalizedSearchId}`);
    if (targetElement) {
     
    }
  };

  // Handle pressing Enter key to scroll to the desired app
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const normalizedSearchId = searchTerm.trim().toLowerCase().replace(/\s+/g, '');
      const targetElement = document.querySelector(`#${normalizedSearchId}`);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth', 
          block: 'center'
        });

        // Optional: Scale-up effect on desktop
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

  const handlebackclick = () => {
    window.history.back();
  };

  return (
    <div className="containerforapps">
      <nav className='randomnav'>
        <div className="background">
          <img src={Backarow} alt="Back" id='backarrow' onClick={handlebackclick} />
        </div>
        <img src="faviconserver" alt="logo" id='website_logonav' />
        <h1 id='website_namenav'>Nexuraa</h1>
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
          ref={inputRef}  // Attach ref to the input field
          type="text"
          className="search-input"
          placeholder="Search Your App"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          onClick={handleInputClick}  // Show suggestions when clicked
        />
      </div>

      {/* Conditionally render the suggestion dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={(event) => handleSuggestionClick(suggestion, event)} // Pass the event to prevent default action
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}

      <h1 id='heading'>Our Uploads :</h1>

      <div className="all2">
        <div className="app-card" id='leafycare'>
          <div className="app-image">
            <img src={Applogo1} alt="App logo" className='app_logo' />
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
            <img src={Applogo2} alt="App logo" className='app_logo' />
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
};

export default Uploadapp;
