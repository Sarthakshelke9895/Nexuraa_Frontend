import React, { useRef } from 'react'
import './Uploads.css'
import back_btn from '../../assets/back-icon.png';
import next_btn from '../../assets/next-icon.png';

import u1 from '../../assets/user-1.png';
import u2 from '../../assets/user-2.png';
import u3 from '../../assets/user-3.png';
import u4 from '../../assets/user-4.png';


const Uploads = () => {

    const slider= useRef();
    let tx = 0;

  const slideForward = ()=>{
    if(tx > -50){
      tx -= 25;
    }

    slider.current.style.transform = `translateX(${tx}%)`

  }
  const slideBackward = ()=>{
    if(tx <0){
      tx += 25;
    }

    slider.current.style.transform = `translateX(${tx}%)`

    
  }

  return (
 
    <div className="programs" id='uploadsection'>
       <img src={back_btn} alt='' className='back_btn' onClick={slideBackward}/>
      <img src={next_btn}  alt='' className='next_btn' onClick={slideForward}/>
     <div className="slider">

      <ul ref={slider}>
        <li>
          <div className="slide">
            <div className="user_info">
              <img src={u2} alt='' />
              <div>
                <h3>Parth Shinde</h3>
                <span>Zeal,Pune</span>
              </div>
            </div>
            <p>"I’m thrilled to announce that I’ve uploaded TaskMasterto this amazing platform! It’s incredible to see how it’s helping people organize their daily routines effortlessly. The feedback I’ve received has been fantastic, and I’m committed to making the app even better. This platform has made the whole process smooth and enjoyable!"</p>
          </div>
        </li>




        <li>
        <div className="slide ">
            <div className="user_info">
              <img src={u4} alt='' />
              <div>
                <h3>Nilesh Mungare</h3>
                <span>Zeal,Pune</span>
              </div>
            </div>
            <p>"Uploading FitTrack on this platform has been such a rewarding experience! It’s amazing to see people using the app to achieve their fitness goals. The encouragement and feedback I’ve received inspire me to keep refining it. I’m grateful for this platform for providing such a great opportunity to showcase my work!"</p>
          </div>
        </li>


        <li>
        <div className="slide">
            <div className="user_info">
              <img src={u3}  alt=''/>
              <div>
                <h3>Shraddha Patil</h3>
                <span>IIITP</span>
              </div>
            </div>
            <p> "I’ve uploaded BudgetBuddy, and I couldn’t be more excited about the response! It’s designed to simplify managing finances, and seeing it help so many users already is truly rewarding. Thanks to this platform, I’ve been able to connect with a wider audience and gather valuable feedback for improvements."</p>
          </div>
        </li>


        <li>
        <div className="slide">
            <div className="user_info">
              <img src={u1} alt='' />
              <div>
                <h3>Sanika Patil</h3>
                <span>DYP,Pune</span>
              </div>
            </div>
            <p>"I’m so excited to share that I’ve uploaded PhotoSpark here! It’s been my dream project, and the positive response has exceeded my expectations. This platform has made it easy to reach more users, and I’m eager to bring new updates based on their suggestions. Thank you for making this journey so special!"</p>
          </div>
        </li>
      </ul>
     </div>
     
    </div>
  )
}

export default Uploads
