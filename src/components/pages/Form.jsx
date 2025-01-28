import React, { useState } from 'react'
import './form.css'
import Backarow from '../../assets/backarrow.png'
import  { useRef } from 'react';
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



    
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
    
        // List of refs to required fields
        const requiredFields = [nameRef, emailRef, phoneRef,addRef,appnameRef,ownerRef,apkfileRef,applogoRef,appdescRef];
        let firstEmptyField = null;
    
        // Check each field to see if it’s empty
        requiredFields.forEach((field) => {
          // Clear any previous highlights
          field.current.classList.remove("highlight");
    
          // If field is empty, mark it as the first empty field
          if (!field.current.value.trim()) {
            if (!firstEmptyField) {
              firstEmptyField = field;
            }
            field.current.classList.add("highlight"); // Highlight the empty field
          }
        });
    
        // If there’s an empty field, scroll to it and focus
        if (firstEmptyField) {
          firstEmptyField.current.scrollIntoView({ behavior: "smooth", block: "center" });
          firstEmptyField.current.focus();
        } else {
          // All fields are filled; proceed with form submission or other actions
          setShowAlert(true); // Show alert when no app is found
          setTimeout(() => setShowAlert(false), 1000); 
          sendMail();
          adddatabse();
        
          
       // Prevent page reload
          navigate("/Paymentpage"); 
         
   
        }
      };

      const [showAlert, setShowAlert] = useState(false); 

      const [email,setEmail]=useState();
      const [name,setName]=useState();
      const [contact,setContact]=useState();
      const [AppDesc,setAppDescription]=useState();
      const [AppName,setAppName]=useState();


   
      const [apkFile, setApkFile] = useState(null);
      const [image, setImage] = useState(null);



      async function adddatabse(){
        



        const formData = new FormData();
        formData.append("email", email);
        formData.append("apkFile", apkFile);
        formData.append("image", image);


        try {
          const response = await axios.post("https://server-5937.onrender.com/submit-form", formData, {
              headers: { "Content-Type": "multipart/form-data" },
          });
          console.log(response.data.message);
      } catch (err) {
          console.error(err);
          alert("Failed to submit the form.");
      }
      }

      function sendMail() {
        axios
      .get("https://server-5937.onrender.com/", {
        params: {
          email,name,contact,AppDesc,AppName
        },
      })
      .then(() => {
        //success
        console.log("success");
      })
      .catch(() => {
        console.log("failure");
      });

      }
    
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
            <img src={Backarow} alt="Back"  id='backarrow' onClick={handlebackclick}/>
            </div>
            
            <img src="faviconserver" alt="logo" id='website_logonav' />
            <h1 id='website_namenav'>Nexuraa</h1>
        </nav>
<div class="custom-form-container">
<h2 id='onehead'>*Fill out the form with correct details to proceed your app upload</h2>

    <form action="" method="POST" enctype="multipart/form-data" class="custom-form">
        <div class="custom-form-group">
            <input 
            type="text" id="name" 
            name="name" required 
            class="custom-input" 
            ref={nameRef}
            onChange={(e)=>setName(e.target.value)}
           />
            <label for="name" class="custom-label">Name</label>
            <span class="custom-underline"></span>
        </div>
        
        <div class="custom-form-group">
            <input type="email" id="email" name="email" required class="custom-input" onChange={(e)=>setEmail(e.target.value)} ref={emailRef}/>
            <label for="email" class="custom-label">Email</label>
            <span class="custom-underline"></span>
        </div>

        <div class="custom-form-group">
            <input type="tel" id="contactNo" name="contactNo" required class="custom-input"  onChange={(e)=>setContact(e.target.value)}ref={phoneRef}/>
            <label for="contactNo" class="custom-label">Contact Number</label>
            <span class="custom-underline"></span>
        </div>

        <div class="custom-form-group">
            <input type="text" id="address" name="address"  required class="custom-input"  ref={addRef}/>
            <label for="address" class="custom-label">Address</label>
            <span class="custom-underline"></span>
        </div>
        <div class="custom-form-group">
            <input type="text" id="app-name" name="app-name"  required class="custom-input"  onChange={(e)=>setAppName(e.target.value)}ref={appnameRef}/>
            <label for="app-name" class="custom-label">App-Name</label>
            <span class="custom-underline"></span>
        </div>
        <div class="custom-form-group">
            <input type="text" id="address" name="appslogan"  class="custom-input"  ref={sloganRef}/>
            <label for="appslogan" class="custom-label">App-Slogan (if-any)</label>
            <span class="custom-underline"></span>
        </div>
        <div class="custom-form-group">
            <input type="text" id="address" name="appowner"  class="custom-input"  ref={ownerRef}/>
            <label for="appowner" class="custom-label">Owned-By</label>
            <span class="custom-underline"></span>
        </div>

        <div class="custom-form-group">
        <div class="form-group">
            <label for="apkFile" className='hello'>APK File</label>
            <input type="file" id="apkFile" name="apkFile" accept=".apk"      onChange={(e) => setApkFile(e.target.files[0]) }required ref={apkfileRef}/>
        </div>
        </div>

        <div class="custom-form-group">
        
            <label for="appImage" className='hello'>App Image</label>
            <input type="file" id="appImage" name="appImage" accept="image/*"   onChange={(e) => setImage(e.target.files[0])} required ref={applogoRef}/>
      
        </div>

        <div class="custom-form-group">
            <textarea id="appDescription" name="appDescription" required class="custom-input" onChange={(e)=>setAppDescription(e.target.value)} ref={appdescRef}></textarea>
            <label for="appDescription" class="custom-label">App Description</label>
            <span class="custom-underline"></span>
        </div>

        <button type="submit" class="custom-submit-btn" onClick={handleSubmit}>Submit</button>
    </form>
</div>
    </div>


  )
}

export default Form;
