import React, { useState, useRef } from 'react';
import './form.css';
import Backarow from '../../assets/backarrow.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Form = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(''); // Declaring email state

  const handleBackClick = () => {
    window.history.back();
  };

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addRef = useRef();
  const appnameRef = useRef();
  const ownerRef = useRef();
  const apkfileRef = useRef();
  const applogoRef = useRef();
  const appdescRef = useRef();
  const sloganRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // List of refs to required fields
    const requiredFields = [nameRef, emailRef, phoneRef, addRef, appnameRef, ownerRef, apkfileRef, applogoRef, appdescRef];
    let firstEmptyField = null;

    // Check each field to see if it’s empty
    requiredFields.forEach((field) => {
      // Clear any previous highlights
      field.current.classList.remove('highlight');

      // If field is empty, mark it as the first empty field
      if (!field.current.value.trim()) {
        if (!firstEmptyField) {
          firstEmptyField = field;
        }
        field.current.classList.add('highlight'); // Highlight the empty field
      }
    });

    // If there’s an empty field, scroll to it and focus
    if (firstEmptyField) {
      firstEmptyField.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstEmptyField.current.focus();
    } else {
      // All fields are filled; proceed with form submission or other actions
      setShowAlert(true); // Show alert when no app is found
      setTimeout(() => setShowAlert(false), 3000);
      sendMail();

      // Prevent page reload
      navigate('/Paymentpage');
    }
  };

  const [showAlert, setShowAlert] = useState(false);

  const sendMail = () => {
    // Prepare form data to send via POST
    const formData = new FormData();
    formData.append('email', email);
    formData.append('name', nameRef.current.value);
    formData.append('phone', phoneRef.current.value);
    formData.append('address', addRef.current.value);
    formData.append('appname', appnameRef.current.value);
    formData.append('owner', ownerRef.current.value);
    formData.append('slogan', sloganRef.current.value);
    formData.append('apkfile', apkfileRef.current.files[0]); // Attach APK file
    formData.append('applogo', applogoRef.current.files[0]); // Attach app logo
    formData.append('appdesc', appdescRef.current.value);

    // Make API call to send form data
    axios
      .post('https://nexuraa-backend-iy8wjpe2n-sarthakshelke9895s-projects.vercel.app/send-email', formData)
      .then(() => {
        // Success
        console.log('Form submitted successfully');
      })
      .catch((error) => {
        // Error
        console.error('Error submitting form:', error);
      });
  };

  return (
    <div className="all">
      {showAlert && (
        <div className="custom-alert">
          <span>Your form has been Submitted.</span>
          <button onClick={() => setShowAlert(false)} className="close-alert">
            &times;
          </button>
        </div>
      )}

      <nav className="randomnav">
        <div className="background">
          <img src={Backarow} alt="Back" id="backarrow" onClick={handleBackClick} />
        </div>
        <img src="faviconserver" alt="logo" id="website_logonav" />
        <h1 id="website_namenav">Nexura</h1>
      </nav>

      <div className="custom-form-container">
        <h2 id="onehead">
          *Fill out the form with correct details to proceed your app upload
        </h2>

        <form className="custom-form" onSubmit={handleSubmit}>
          <div className="custom-form-group">
            <input
              type="text"
              id="name"
              name="name"
              required
              className="custom-input"
              ref={nameRef}
            />
            <label htmlFor="name" className="custom-label">
              Name
            </label>
            <span className="custom-underline"></span>
          </div>

          <div className="custom-form-group">
            <input
              type="email"
              id="email"
              name="email"
              required
              className="custom-input"
              value={email} // Bind email state to input field
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
              ref={emailRef}
            />
            <label htmlFor="email" className="custom-label">
              Email
            </label>
            <span className="custom-underline"></span>
          </div>

          <div className="custom-form-group">
            <input
              type="tel"
              id="contactNo"
              name="contactNo"
              required
              className="custom-input"
              ref={phoneRef}
            />
            <label htmlFor="contactNo" className="custom-label">
              Contact Number
            </label>
            <span className="custom-underline"></span>
          </div>

          <div className="custom-form-group">
            <input
              type="text"
              id="address"
              name="address"
              required
              className="custom-input"
              ref={addRef}
            />
            <label htmlFor="address" className="custom-label">
              Address
            </label>
            <span className="custom-underline"></span>
          </div>

          <div className="custom-form-group">
            <input
              type="text"
              id="app-name"
              name="app-name"
              required
              className="custom-input"
              ref={appnameRef}
            />
            <label htmlFor="app-name" className="custom-label">
              App-Name
            </label>
            <span className="custom-underline"></span>
          </div>

          <div className="custom-form-group">
            <input
              type="text"
              id="appslogan"
              name="appslogan"
              className="custom-input"
              ref={sloganRef}
            />
            <label htmlFor="appslogan" className="custom-label">
              App-Slogan (if any)
            </label>
            <span className="custom-underline"></span>
          </div>

          <div className="custom-form-group">
            <input
              type="text"
              id="appowner"
              name="appowner"
              className="custom-input"
              ref={ownerRef}
            />
            <label htmlFor="appowner" className="custom-label">
              Owned-By
            </label>
            <span className="custom-underline"></span>
          </div>

          <div className="custom-form-group">
            <label htmlFor="apkFile" className="hello">
              APK File
            </label>
            <input
              type="file"
              id="apkFile"
              name="apkFile"
              accept=".apk"
              required
              ref={apkfileRef}
            />
          </div>

          <div className="custom-form-group">
            <label htmlFor="appImage" className="hello">
              App Image
            </label>
            <input
              type="file"
              id="appImage"
              name="appImage"
              accept="image/*"
              required
              ref={applogoRef}
            />
          </div>

          <div className="custom-form-group">
            <textarea
              id="appDescription"
              name="appDescription"
              required
              className="custom-input"
              ref={appdescRef}
            ></textarea>
            <label htmlFor="appDescription" className="custom-label">
              App Description
            </label>
            <span className="custom-underline"></span>
          </div>

          <button type="submit" className="custom-submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
