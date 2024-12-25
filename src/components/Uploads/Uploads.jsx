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
              <img src={u1} alt='' />
              <div>
                <h3>William Jackson</h3>
                <span>Edusity,USA</span>
              </div>
            </div>
            <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo libero sunt hic sapiente quod cumque, facilis minima quaerat perspiciatis quo dolorum fugit earum voluptates pariatur vero reiciendis corrupti maiores dolores!</p>
          </div>
        </li>




        <li>
        <div className="slide div1">
            <div className="user_info">
              <img src={u2} alt='' />
              <div>
                <h3>William Jackson</h3>
                <span>Edusity,USA</span>
              </div>
            </div>
            <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo libero sunt hic sapiente quod cumque, facilis minima quaerat perspiciatis quo dolorum fugit earum voluptates pariatur vero reiciendis corrupti maiores dolores!</p>
          </div>
        </li>


        <li>
        <div className="slide div2">
            <div className="user_info">
              <img src={u3}  alt=''/>
              <div>
                <h3>William Jackson</h3>
                <span>Edusity,USA</span>
              </div>
            </div>
            <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo libero sunt hic sapiente quod cumque, facilis minima quaerat perspiciatis quo dolorum fugit earum voluptates pariatur vero reiciendis corrupti maiores dolores!</p>
          </div>
        </li>


        <li>
        <div className="slide div2">
            <div className="user_info">
              <img src={u4} alt='' />
              <div>
                <h3>William Jackson</h3>
                <span>Edusity,USA</span>
              </div>
            </div>
            <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo libero sunt hic sapiente quod cumque, facilis minima quaerat perspiciatis quo dolorum fugit earum voluptates pariatur vero reiciendis corrupti maiores dolores!</p>
          </div>
        </li>
      </ul>
     </div>
     
    </div>
  )
}

export default Uploads
