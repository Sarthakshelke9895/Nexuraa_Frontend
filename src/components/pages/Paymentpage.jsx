import React from 'react'
import Backarow from '../../assets/backarrow.png'
import './Paymentpage.css'



const Paymentpage = () => {


  const handleRedirect = () => {
    // Redirect to an external link
    var upiIntent = "intent://pay?pa=sarthakshelke044@okicici&pn=Nexura%20.co&mc=123456&tid=Txn12345&tn=App%20Upload%20Fee%20&am=1&cu=INR#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.google.android.apps.nbu.paisa.user;end";
    window.location.href = upiIntent;
    
};

    const handlebackclick = () => {
        window.history.back();
    }


    
    
  return (
    <div className='all'>
        
        <nav className='randomnav'>
            <div className="background">
            <img src={Backarow} alt="Back"  id='backarrow' onClick={handlebackclick}/>
            </div>
            
            <img src="faviconserver" alt="logo" id='website_logonav' />
            <h1 id='website_namenav'>Nexura</h1>
        </nav>

        <div className="payment-container">
      <h1 className="payment-header">Upload Your App</h1>
      <p className="payment-subtext">
        Pay just ₹21 to get your app listed on our platform.
      </p>
      <button onClick={handleRedirect} className="pay-button">
        Pay ₹21
      </button>
    </div>
        
      
    </div>
  )
}

export default Paymentpage
