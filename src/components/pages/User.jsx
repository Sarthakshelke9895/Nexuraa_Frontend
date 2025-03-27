import React, { useState } from "react";
import "./user.css";
import img from "../../assets/weblogo.PNG";
import Backarow from '../../assets/backarrow.png';
import { useNavigate } from "react-router-dom";

const User = () => {
  const user = {
    name: "Your Name",
    email: "youremail@example.com",
    profilePic: img,
  };
// eslint-disable-next-line 
  const [projects, setProjects] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navi = useNavigate();
  
 const  handlemanualclick = () => {
  navi('/Form');
 };
 const  handlelogoutclick = () => {
  setTimeout(() => {
    localStorage.clear(); // Clear any stored authentication data
    sessionStorage.clear(); // Clear session storage if used

    window.location.replace("/Login_signup"); // Redirect to login page without saving history
  },0);
 };

  // Function to show alert
  const triggerAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);

    // Auto-close after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return (
    <div className="user-dashboard">
      <nav className='randomnav'>
        <div className="background">
          <img src={Backarow} alt="Back" id='backarrow' onClick={() => window.history.back()} />
        </div>
        <img src="faviconserver" alt="logo" id='website_logonav' />
        <h1 id='website_namenav'>Nexuraa</h1>
      </nav>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="user-info">
          <img src={user.profilePic} alt="User Profile" className="profile-pic" />
          <h3 className="user-name">{user.name}</h3>
          <p className="user-email">{user.email}</p>
        </div>

        <button className="logout-button"onClick={handlelogoutclick} >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="heading">Projects</h1>

        <div className="buttons-container">
          <button  onClick={() => triggerAlert("Feature will be implemented soon!")} className="import-button">
            Import from GitHub
          </button>
          <button onClick={handlemanualclick} className="add-button">
            Add Manually
          </button>
        </div>

        <div className="projects-list">
          {projects.length === 0 ? (
            <p className="no-projects">No projects yet.</p>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="project-item">
                {project.name}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Custom Alert */}
      <div className={`custom-alert ${showAlert ? "show" : ""}`}>
        {alertMessage}
        <button className="close-btn" onClick={() => setShowAlert(false)}>×</button>
      </div>
    </div>
  );
};

export default User;
