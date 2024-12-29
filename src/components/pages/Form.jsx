import React, { useState, useRef } from 'react';
import './form.css';
import Backarow from '../../assets/backarrow.png';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Form = () => {
  const navigate = useNavigate();

  const handlebackclick = () => {
    window.history.back();
  }

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

  const [showAlert, setShowAlert] = useState(false); 
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Prepare the form data
    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("phone", phoneRef.current.value);
    formData.append("address", addRef.current.value);
    formData.append("appname", appnameRef.current.value);
    formData.append("slogan", sloganRef.current.value);
    formData.append("owner", ownerRef.current.value);
    formData.append("apkfile", apkfileRef.current.files[0]);
    formData.append("applogo", applogoRef.current.files[0]);
    formData.append("appdesc", appdescRef.current.value);

    // Send data to server
    axios.post("http://localhost:5000/send-email", formData)
      .then(response => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); 
        navigate("/Paymentpage"); // Navigate to payment page after submission
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="all">
      {showAlert && (
        <div className="custom-alert">
          <span>Your form has been Submitted.</span>
          <button onClick={() => setShowAlert(false)} className="close-alert">&times;</button>
        </div>
      )}

      <nav className='randomnav'>
        <div className="background">
          <img src={Backarow} alt="Back" id='backarrow' onClick={handlebackclick} />
        </div>
        <img src="faviconserver" alt="logo" id='website_logonav' />
        <h1 id='website_namenav'>Nexura</h1>
      </nav>

      <div class="custom-form-container">
        <h2 id='onehead'>*Fill out the form with correct details to proceed your app upload</h2>
        <form method="POST" encType="multipart/form-data" class="custom-form">
          <div class="custom-form-group">
            <input type="text" id="name" name="name" required class="custom-input" ref={nameRef} />
            <label for="name" class="custom-label">Name</label>
            <span class="custom-underline"></span>
          </div>

          <div class="custom-form-group">
            <input type="email" id="email" name="email" required class="custom-input" onChange={(e) => setEmail(e.target.value)} ref={emailRef} />
            <label for="email" class="custom-label">Email</label>
            <span class="custom-underline"></span>
          </div>

          <div class="custom-form-group">
            <input type="tel" id="contactNo" name="contactNo" required class="custom-input" ref={phoneRef} />
            <label for="contactNo" class="custom-label">Contact Number</label>
            <span class="custom-underline"></span>
          </div>

          <div class="custom-form-group">
            <input type="text" id="address" name="address" required class="custom-input" ref={addRef} />
            <label for="address" class="custom-label">Address</label>
            <span class="custom-underline"></span>
          </div>

          <div class="custom-form-group">
            <input type="text" id="app-name" name="app-name" required class="custom-input" ref={appnameRef} />
            <label for="app-name" class="custom-label">App-Name</label>
            <span class="custom-underline"></span>
          </div>

          <div class="custom-form-group">
            <input type="text" id="appslogan" name="appslogan" class="custom-input" ref={sloganRef} />
            <label for="appslogan" class="custom-label">App-Slogan (if-any)</label>
            <span class="custom-underline"></span>
          </div>

          <div class="custom-form-group">
            <input type="text" id="address" name="appowner" class="custom-input" ref={ownerRef} />
            <label for="appowner" class="custom-label">Owned-By</label>
            <span class="custom-underline"></span>
          </div>

          <div class="custom-form-group">
            <label for="apkFile" className='hello'>APK File</label>
            <input type="file" id="apkFile" name="apkFile" accept=".apk" required ref={apkfileRef} />
          </div>

          <div class="custom-form-group">
            <label for="appImage" className='hello'>App Image</label>
            <input type="file" id="appImage" name="appImage" accept="image/*" required ref={applogoRef} />
          </div>

          <div class="custom-form-group">
            <textarea id="appDescription" name="appDescription" required class="custom-input" ref={appdescRef}></textarea>
            <label for="appDescription" class="custom-label">App Description</label>
            <span class="custom-underline"></span>
          </div>

          <button type="submit" class="custom-submit-btn" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
