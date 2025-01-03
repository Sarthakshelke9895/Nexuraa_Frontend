import React from 'react'
import Backarow from '../../assets/backarrow.png'
import './Paymentpage.css'



const Paymentpage = () => {


  const handleRedirect = () => {
    // Redirect to an external link
    var upiIntent = "https://razorpay.me/@nexura?amount=c9yvgMVo3UALiywjEnuNsQ%3D%3D";
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
        Pay <strong>21.00</strong> INR to get your app listed on our platform.<br></br>Also Check the Email for Further Proceedings. <br></br>If E-mail does not pop up kindly check your spam folder. 
      </p>
      <button onClick={handleRedirect} className="pay-button">
        Pay <strong>21.00</strong> INR
      </button>
    </div>
        
      
    </div>
  )
}

export default Paymentpage
