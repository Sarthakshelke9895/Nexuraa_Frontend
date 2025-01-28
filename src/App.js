import React from 'react';
import './App.css'; // Optional, for global styles
import Home from './Home'
import Uploadapp from "../src/components/pages/Uploadapp";
import Form from './components/pages/Form';
import Paymentpage from './components/pages/Paymentpage'
import Terms from './components/Terms-conditions_Privacy policy/Terms'



import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";


function App(){
    return (
        <div > 
          


           <Router>
           
            <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Uploadapp" element={<Uploadapp />} />
                    <Route path="/Form" element={<Form />} />
                    <Route path="/Paymentpage" element={<Paymentpage />} />
                    <Route path="/Terms" element={<Terms/>} />
                  

            </Routes>

           </Router>

            
        </div>
       
    );
};

export default App;
