import React, { useEffect, useState } from "react";
import { Page1, Page2, Page3, Page4 } from "./page1";
import axios from "axios";
import { useCookies } from "react-cookie";
import jwt_decode from 'jwt-decode';
import { useLocation } from "react-router-dom";

const BookingPage = () => {
    const [Page, setPage] = useState(1)
    const [Bookstate, setBookState] = useState(false)
    const [state, setState] = useState(true)
    const [booking_service, setbooking_service] = useState({})
    const [myorders, setMyorders] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const id = localStorage.getItem("order_id")
    const { pathname } = useLocation();

    const token = cookies.jwt2;
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;

    const selectedNumber = localStorage.getItem("NumberOfService")

    const Price = selectedNumber*booking_service.Price
    // console.log(Price);

    useEffect(() => {
        orders()
        get()
    }, [])

    const orders = () => {
        // console.log(userId);
        axios.get(`http://localhost:3001/authUser/fetch_email/${userId}`)
            .then((res) => {
                console.log(res.data);
                setMyorders(res.data)
            })
    }

    function get() {
        axios.get(`http://localhost:3001/sub_api/Book_new_fetch_items/${id}`)
            .then((res) => setbooking_service(res.data))
    }

    const nextPage = () => {
        setPage(Page + 1)
    }
    const PreviousPage = () => {
        setPage(Page - 1)
    }

    const ConfirmBooking = (e) => {
        e.preventDefault()
        setState(false)
        // const id = localStorage.getItem("order_id")
        const person = localStorage.getItem("Name")
        const number = localStorage.getItem("Phone")
        const address = localStorage.getItem("Address")
        const zip = localStorage.getItem("Post")
        const street = localStorage.getItem("Street")
        const city = localStorage.getItem("City")

        localStorage.removeItem("Name")
        localStorage.removeItem("Phone")
        localStorage.removeItem("Address")
        localStorage.removeItem("Post")
        localStorage.removeItem("Street")
        localStorage.removeItem("City")
        localStorage.removeItem("captcha")



        // console.log(Time);
        axios.post("http://localhost:3001/booking_api/new_booking", {
            user_email: myorders.email,
            address,
            street,
            city,
            zip,
            person,
            number,
            // Service:booking_service.Service,
            Category: booking_service.Subcategory,
            price:Price,
            paymentMethod: localStorage.getItem("paymentType")
        }
        ).then(() => {
            axios.post("http://localhost:3001/vendororder_api/new_booking", {
                user_email: myorders.email,
                address,
                street,
                city,
                zip,
                person,
                number,
                // Service:booking_service.Service,
                Category: booking_service.Subcategory,
                price: Price,
                paymentMethod: localStorage.getItem("paymentType")
            })
        })

        setTimeout(() => window.location.href = "/Mydashboard", 3000)

    }

    useEffect(() => {
        if (pathname !== "/service") {
            localStorage.removeItem("SubcategoryID")
            localStorage.removeItem("SubCategory")
        }
    }, [pathname])

    return (
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
                        <li className={Page === 1 ? "Formmain-liactive" : "Formmain-li"}><i class="fa-solid fa-lock"></i></li>
                        <li className={Page === 2 ? "Formmain-liactive" : "Formmain-li"}><i class="fa-solid fa-user"></i></li>
                        <li className={Page === 3 ? "Formmain-liactive" : "Formmain-li"}><i class="fa-solid fa-credit-card"></i></li>
                        <li className={Page === 4 ? "Formmain-liactive" : "Formmain-li"}><i class="fa-solid fa-check"></i></li>
                    </ul>
                </div>
                {
                    Page === 1 ? <Page1 Page={Page} setPage={setPage} /> : Page === 2 ? <Page2 /> : Page === 3 ? <Page3 Page={Page} setPage={setPage} /> : <Page4 Bookstate={Bookstate} setBookState={setBookState} />
                }
                <div className="Button-divform">
                    <button className={Page !== 1 ? "PreBookingForm-btn" : "BookingForm-btnhide"} onClick={PreviousPage}>Previous</button>
                    <button className={Page === 2 ? "BookingForm-btn" : "BookingForm-btnhide"} onClick={nextPage}>Next</button>
                    <button className={Page === 4 && Bookstate !== false ? "BookingForm-btn" : "BookingForm-btnhide"} onClick={ConfirmBooking}>Confirm Booking</button>

                </div>
            </div>
        </div>
    )
}





export default BookingPage