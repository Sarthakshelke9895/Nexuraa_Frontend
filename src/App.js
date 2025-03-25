import React from 'react';
import './App.css'; // Optional, for global styles
import Home from './Home'
import Uploadapp from "../src/components/pages/Uploadapp";
import Form from './components/pages/Form';
import Paymentpage from './components/pages/Paymentpage'
import Terms from './components/Terms-conditions_Privacy policy/Terms'
import Login from './components/pages/Login_signup'
import Forgotpass  from './components/pages/Forgotpass'
import Resetpass from './components/pages/ResetPassword'
 


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
                    <Route path="/Login_signup" element={<Login/>} />
                    <Route path="/Forgotpass" element={<Forgotpass/>} />
                    <Route path="/ResetPassword" element={<Resetpass/>} />


                  

            </Routes>

           </Router>

            
        </div>
       
    );
};

export default App;
