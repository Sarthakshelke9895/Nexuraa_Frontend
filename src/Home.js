import React from 'react'
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Uploads from './components/Uploads/Uploads'; 
import Title from './components/Title/Title';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

const Home = () => {
  return (
    <div>
      <Navbar/>
            <Hero/>
            <Title subtitle='Our Uploads' title='Android Apps'/>
            <Uploads/>
            <Title subtitle='Contact us' title='Get In Touch'/>
            <Contact/>
            <Footer/>

    </div>
  )
}

export default Home
