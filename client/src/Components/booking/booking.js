import React, { useEffect, useState } from "react";
import {Page1,Page2,Page3,Page4} from "./page1";


const BookingPage=()=>{
    const [Page,setPage]=useState(1)
    const[Name,setName]=useState("")
    const[Phone,setPhone]=useState("")
    const[Location,setLocation]=useState("")
    const [state,setState]=useState(true)
    const[Time,settime]=useState(0)

    const nextPage=()=>{
        setPage(Page+1)
    }
    const PreviousPage=()=>{
        setPage(Page-1)
    }
    console.log(Name);

    const ConfirmBooking=()=>{
    setState(false)
    localStorage.removeItem("Name")
    localStorage.removeItem("Phone")
    localStorage.removeItem("Address")
    localStorage.removeItem("Post")
    localStorage.removeItem("Street")
    localStorage.removeItem("City")
    console.log(Time);
    
    setTimeout(()=>window.location.href="/Myorder",3000)        
    
    }

    return(
        <div className="Screen">
            <div className="Confirm-popup" hidden={state} >
            <i class="fa-sharp fa-solid fa-circle-check"></i>
            <h3>Booking Confirmed!!</h3>
            </div> 
        <div className="Main-form">
            <h1 className="BookingForm-heading">Booking Details</h1>
            <p>Fill all the form field to go to next step</p>
            <div className="Progress-bar">
                <ul className="Formmain-ul">
                    <li className={Page==1? "Formmain-liactive":"Formmain-li"}><i class="fa-solid fa-lock"></i></li>
                    <li className={Page==2? "Formmain-liactive":"Formmain-li"}><i class="fa-solid fa-user"></i></li>
                    <li className={Page==3? "Formmain-liactive":"Formmain-li"}><i class="fa-solid fa-credit-card"></i></li>
                    <li className={Page==4? "Formmain-liactive":"Formmain-li"}><i class="fa-solid fa-check"></i></li>
                </ul>
            </div>
       {
       Page==1?<Page1 Page={Page} setPage={setPage}/>:Page==2?<Page2/>:Page==3?<Page3 Page={Page} setPage={setPage}/>:<Page4/>
        }
        <div className="Button-divform">
        <button className={Page!=1 ? "PreBookingForm-btn":"BookingForm-btnhide"} onClick={PreviousPage}>Previous</button>   
        <button className={Page==2  ? "BookingForm-btn":"BookingForm-btnhide"} onClick={nextPage}>Next</button>
        <button className={Page==4  ? "BookingForm-btn":"BookingForm-btnhide"} onClick={ConfirmBooking}>Confirm Booking</button>
        
        </div>
        </div>
        </div>
    )
}





export default BookingPage