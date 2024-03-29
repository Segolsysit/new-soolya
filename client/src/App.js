

import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Service from './Components/objects/servicepage/service';
import { Login, Signup, Provider, AdminLogin, ForgetPassword, VendorLogin, ForgetPasswordVendor } from './Components/Login Components/Login';
import Admin from './Components/admin/Admin';
import { ServiceDetails } from './Components/objects/servicepage/ServiceCard';
import BookingPage from './Components/booking/booking';
import Myorder from './Components/booking/myOrder';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
// import Servicemanlist from './Components/admin/Servicemanlist';
import { UserDashboard, VendorDashboard, AboutUs } from './Components/objects/objects';

import Contact from './Components/objects/contactpage/contact';
import Cart from './Components/Cart/Cart';
import Edit from './Edit';


const Home = lazy(() => import('./Components/Home'));
const Service = lazy(() => import('./Components/objects/servicepage/service'));








function App() {

  setTimeout(() => {
    localStorage.removeItem("vendor")
  }, 1000 * 7200)


  return (
    <div className="App">
      <ToastContainer />
      <Suspense fallback={<h1>Loading...</h1>}>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            {/* <Component2 /> */}
            <Route path='/service' element={<Service />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/Admin' element={<Admin />} />
            <Route path='/Provider' element={<Provider />} />
            <Route path='/ServiceDetails' element={<ServiceDetails />} />
            <Route path='/AdminLogin' element={<AdminLogin />} />
            <Route path='/booking' element={<BookingPage />} />
            <Route path='/Myorder' element={<Myorder />} />
            <Route path='/Mydashboard' element={<UserDashboard />} />
            <Route path='/ForgetPassword' element={<ForgetPassword />} />
            <Route path='/vendorForgetPassword' element={<ForgetPasswordVendor />} />
            <Route path='/VendorLogin' element={<VendorLogin />}></Route>
            <Route path='/VendorDashboard' element={<VendorDashboard />} />
            <Route path="/contact" element={<Contact></Contact>}></Route>
            <Route path='/AboutUs' element={<AboutUs />} />
            <Route path='/Cart' element={<Cart />} />
            <Route path='/edit' element={<Edit></Edit>}></Route>
          </Routes>
        </BrowserRouter>
      </Suspense>


    </div>
  );
}

export default App;
