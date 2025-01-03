import React, { useEffect, useState } from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu-icon.png';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {

  const handleLogoClick = () => {
    window.location.reload(); // Reload the page
  };

  const navigate = useNavigate();

  const handleUploadClick = () => {
      // Navigate to the Uploadapp page
      navigate('/Uploadapp');
  };
  const handleUploadClick2 = () => {
    // Navigate to the Uploadapp page
    navigate('/Uploadapp');
};

  const [sticky,setSticky] = useState(false);

  useEffect(()=>{
    window.addEventListener('scroll',()=>{
    window.scrollY > 40 ? setSticky(true): setSticky(false);
    })
  },[]);

  const [mobileMenu,setMobileMenu] = useState(false);
  const togglemenu = ()=>{
       mobileMenu? setMobileMenu(false):setMobileMenu(true);
  }
  return (
    <nav className={`container ${sticky ? 'dark_nav':''}`}>
      <div className="logo_and_website_name" >
      <img  id='website_logo' src="faviconserver" alt=''  />
      <h1 id='website_name' onClick={handleLogoClick}>Nexura</h1>
      </div>
    


      <ul className={mobileMenu?"":"hide_mobile_menu"}>
      <li  className='nav-link' onClick={handleUploadClick2} >
         
         <div className="search-bar" id='navbarsearch'>
         <span className="search-icon">
           <i className="fas fa-search"></i>
         </span>
     
         <input
           type="text"
           className="search-input"
           placeholder="Search Your App"
         
         />
        
       </div>
         
           
         </li>
        <li>
        <Link  className='nav-link'
         to="homeSection" 
          smooth={true} 
          offset={-350} 
          duration={500} 
         
          >
          Home
          <span className="underline"></span>
          </Link>
        </li>
        <li>
        <Link className='nav-link'
         to="uploadsection" 
          smooth={true} 
          offset={-300} 
          duration={500} 
          >
          Projects
          <span className="underline"></span>
          
          </Link>
        </li>
        <li  className='nav-link' onClick={handleUploadClick} >
         
         Uploads
         <span className="underline"></span>
          
        </li>
        <li id='contactbutton'>
        <Link className='nav-link'
         to="contactSection" 
          smooth={true} 
          offset={-250} 
          duration={500} 
         
          >
           Contact us
           <span className="underline"></span>
          </Link>
        </li>

      </ul>
    
    
       
     
      <img src={menu_icon} alt=""  className='menu-icon' onClick={togglemenu}/>
      
    </nav>
  )
}


export default Navbar
