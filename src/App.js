import React from 'react';
import './App.css'; // Optional, for global styles
import Home from './Home'
import Uploadapp from "../src/components/pages/Uploadapp";
import Form from './components/pages/Form';


import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";


const App = () => {
    return (
        <div > 

           <Router>
           
            <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Uploadapp" element={<Uploadapp />} />
                    <Route path="/Form" element={<Form />} />
                    
                    

        
        
            </Routes>

           </Router>

            
        </div>
       
    );
};

export default App;
