import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Service from './Components/objects/servicepage/service';
import { useEffect } from "react";
import {Login,Signup,Provider, AdminLogin} from './Components/Login Components/Login';
import Admin from './Components/admin/Admin';
import { ServiceDetails } from './Components/objects/servicepage/ServiceCard';
import BookingPage from './Components/booking/booking';
import Myorder from './Components/booking/myOrder';
import Orders from './Components/admin/Orders';




function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/service' element={<Service/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Admin' element={<Admin/>}/>
        <Route path='/Provider' element={<Provider/>}/>
        <Route path='/ServiceDetails' element={<ServiceDetails/>}/>
        <Route path='/AdminLogin' element={<AdminLogin/>}/>
        <Route path='/booking' element={<BookingPage/>}/>
        <Route path='/Myorder' element={<Myorder/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Routes>
      </BrowserRouter>
     
      
    </div>
  );
}

export default App;
