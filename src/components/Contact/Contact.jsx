import React from 'react'
import './Contact.css'
  import msg_icon from '../../assets/msg-icon.png'
  import mail_icon from '../../assets/mail-icon.png'
  import phone_icon from '../../assets/phone-icon.png'
  import location_icon from '../../assets/location-icon.png'
  import white_arrow from '../../assets/white-arrow.png'

const Contact = () => {



  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "b8e0ac71-fede-41d5-9f1f-0452b45e5eab");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className=' Contact container' id='contactSection'>
      <div className="contact_col1 ">
        <h3>Send us a message <img src={msg_icon} alt="" srcset="" /></h3>
        <p>Feel free to reach out through contact from or find our contact
          information below. Your feedback, questions,and suggestions,are important
         to us as we strive to provide exceptional service to our university community
        </p>
        <ul>
          <li><img src={mail_icon} alt="" />nexura.com@gmail.com  </li>
          <li> <img src={phone_icon} alt="" />+91 9359955164</li>
          <li><img src={location_icon} alt="" />Mystique Wonders,B-503,narhe,Pune - 411041</li>
        </ul>
      </div>
      <div className="contact_col1">
        <form onSubmit={onSubmit}>
          <label>Your Name</label>
          <input type="text" name='name' placeholder='Enter your name' required/>

          <label>Phone Number</label>
          <input type="tel" name='phone' maxlength="10" pattern="\d{5,10}"  placeholder='Enter your Mobile No.' required/>

          <label>Write your messages here</label>
          <textarea name="message" rows="6" placeholder='Enter your Message Here' required></textarea>

          <button type='submit' className='btn'>Submit <img src={white_arrow} alt="" /></button>
          
        </form>
        <span>{result}</span>
      </div>

    </div>
  )
}

export default Contact
