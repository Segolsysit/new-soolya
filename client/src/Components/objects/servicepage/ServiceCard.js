import React, { useEffect, useState } from "react";
import "../object.css"
import Pagination from "./Pagination";
import "./Servicecard.css"
import { End, Footer, Header, MenuBar } from "../objects";
import axios from "axios";
import { useCookies } from "react-cookie";

import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";




const ServiceCard = ({ service, Range }) => {

    const Token = localStorage.getItem("ty")
    const decodedToken = Token ? jwtDecode(Token) : null
    const UserId = Token ? decodedToken.id : null

    const [Data, setData] = useState([])
    const [count, setCount] = useState(0)
    const Nav = useNavigate()



    const [Category, setCategory] = useState("")


    // console.log(Category);




    useEffect(() => {
        setCategory(localStorage.getItem("SubCategory"))
        if ((Category !== "" && (Category !== null || Category !== undefined)) && (service === "Select" || service === null || service === undefined) && count < 1) {
            axios.get(`https://backend.kooblu.com/sub_api/new_fetch_items/${Category}`)
                .then((data) => {
                    setData(data.data)
                    setCount(count + 1)


                    console.log(Data);
                })


        }

    }, [Category])

    // console.log(pathname);
    useEffect(() => {
        if (service !== "Select" && service !== null) {
            axios.get(`https://backend.kooblu.com/sub_api/new_fetch_items/${service}`)
                .then((data) => {

                    setData(data.data)
                    setCount(count + 1)


                }
                )
        }
    }, [service])

    useEffect(() => {
        if (count > 0) {
            localStorage.removeItem("SubCategory")
        }
    }, [service])




    // console.log(Data);

    const [currentPage, setCurrent] = useState(1)
    const [postPer, setpostPer] = useState(6)
    const [Color, setColor] = useState("")
    const [cookies, setCookie] = useCookies(['cookie-name']);

    const Lastpost = currentPage * postPer
    const Firstpost = Lastpost - postPer

    const Booking = (_id) => {
        localStorage.setItem("order_id", _id)
        if (localStorage.getItem("ty")) {
            window.location.href = "/booking"
        }
        else {
            window.location.href = "/Login"
        }
    }

    const Navigate = (Number) => {
        setCurrent(Number)
        setColor(Number)
    }
    const CurerntPost = Data.slice(Firstpost, Lastpost)
    // console.log(CurerntPost);
    const [serviceName, setServiceName] = useState("")

    useEffect(() => {
        localStorage.setItem("Category", serviceName)
        if (localStorage.getItem("Category") !== "") {
            // window.location.href="/ServiceDetails"
        }
    }, [serviceName])


    const AddtoCart = async (id, Subcategory, Price) => {
        if (Token) {
            await axios.post("https://backend.kooblu.com/Cart/AddtoCart", {
                ProductId: id,
                UserID: UserId,
                Name: Subcategory,
                Price: Price
            })
                .then(res => {
                    if (res.data.status === 'ok') {
                        toast.success('Item added')
                    }
                    else {
                        toast.error('Error')
                    }
                })
        }
        else {
            Nav('/Login')
        }

    }



    const localpath = "https://backend.kooblu.com/";



    if ((Category === "" || Category === null) && (service === "Select" || service === null || service === undefined)) {
        return (
            <div>
                <h1 style={{ marginBottom: "10rem" }}>Select a category to display!!!</h1>
            </div>
        )
    }

    else if (Data.length !== 0 && count > 0) {
        return (
            <div>
                <div className="CaroselCard-block">
                    <div className="CaroselService-block">
                        {CurerntPost.map(item => {

                            return (

                                <div onClick={() => localStorage.setItem("order_id", item._id)} className="Carosel-cardService">
                                    <img className="Ser-Image" src={localpath + item.filename} alt="" />
                                    <div className="Card-body">
                                        <div className="Carosel-sec">
                                            <p className="Category-carosel">{item.Subcategory}</p>
                                            <h2 className="Carosel-price">₹{item.Price}</h2>
                                        </div>
                                        <h1 className="Carosel-desc">{item.Discription}</h1>
                                        <div className="Carosel-third">

                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                                            <button onClick={Booking} className="Carosel-btn">Book Now</button>
                                            <button onClick={() => AddtoCart(item._id, item.Subcategory, item.Price)} className="Carosel-btn">Add to cart</button>
                                        </div>
                                    </div>
                                </div>

                            )

                        })}
                    </div>

                </div>
                <Pagination
                    TotalPost={Data.length}
                    postPer={postPer} Navigate={Navigate} Color={Color} currentPage={currentPage} />
            </div>
        )
    }


    else if (Data.length === 0 && count > 0) {
        return (
            <h1 className="NoService">No Service Available Currently!!!</h1>
        )
    }



}





const ServiceDetails = () => {
    const [cookies, setCookie] = useCookies(['cookie-name']);
    var FetchName = localStorage.getItem("Category")
    const [err, setErr] = useState(0)
    const data = [
        {
            "Image": "https://images.pexels.com/photos/3768910/pexels-photo-3768910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Name": "Home Cleaning Service",
            "Desc": "Clean your home at low cost",
            "Get": ["Room Cleaning", "Toilet Cleaning", "Gardening"],
            "Benifits": ["Service Gurantee", "Quality service", "Timely work"],
            "BookCard": ["Service Gurantee", "Quality service", "Timely work", "Certified Experts", "24/7 Customer Care"],
            "Price": "$15",
            "vendorimg": "https://images.pexels.com/photos/9950569/pexels-photo-9950569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "vendorName": "Popoyee",
            "Joiningyear": "JUN 2020",
            "orderscompleted": "5",
            "Rating": 3,
            "contactnum": "123-456-789",
            "Mail": "popoyee@123.com",
            "Availability": ["8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM"]
        },
        {
            "Image": "https://img.freepik.com/premium-photo/technician-service-removing-air-filter-air-conditioner-cleaning_35076-3618.jpg",
            "Name": "Winter AC master cleaning and service",
            "Desc": "Clean your home at low cost",
            "Get": ["AC Cleaning", "AC Service", "Gas Refilling"],
            "Benifits": ["Service Gurantee", "Quality service", "Timely work"],
            "BookCard": ["Service Gurantee", "Quality service", "Timely work", "Certified Experts", "24/7 Customer Care"],
            "Price": "$20",
            "vendorimg": "https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_1280.jpg",
            "vendorName": "Mr Bean",
            "Joiningyear": "OCT 2022",
            "orderscompleted": "20",
            "Rating": 4,
            "contactnum": "123-456-789",
            "Mail": "mrbean@abc.com",
            "Availability": ["8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM"]


        },
        {
            "Image": "https://cdn.pixabay.com/photo/2013/12/13/21/13/plumber-228010_1280.jpg",
            "Name": "Plumbing Service",
            "Desc": "Any leak we are here to fix it",
            "Get": ["New waterlining", "Industrial plumbing", "Leak assresting"],
            "Benifits": ["Service Gurantee", "Quality service", "Timely work"],
            "BookCard": ["Service Gurantee", "Quality service", "Timely work", "Certified Experts", "24/7 Customer Care"],
            "Price": "$18",
            "vendorimg": "https://images.pexels.com/photos/936019/pexels-photo-936019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "vendorName": "Kumar",
            "Joiningyear": "sep 2021",
            "orderscompleted": "8",
            "Rating": 3,
            "contactnum": "123-456-789",
            "Mail": "kumar@123.com",
            "Availability": ["8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM"]

        },
        {
            "Image": "https://cdn.pixabay.com/photo/2015/07/07/11/36/haircut-834280_1280.jpg",
            "Name": "Hair cutting Service at reasonable price",
            "Desc": "We provide saloon service since 1980s",
            "Get": ["Trendy hair cut", "Facial", "Hair dyeing"],
            "Benifits": ["Friendly professionals", "Quality service", "Timely work"],
            "BookCard": ["Service Gurantee", "Quality service", "Timely work", "Certified Experts", "At your place"],
            "Price": "$18",
            "vendorimg": "https://images.pexels.com/photos/10002812/pexels-photo-10002812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "vendorName": "Saloon Shanmugam",
            "Joiningyear": "Aug 2022",
            "orderscompleted": "12",
            "Rating": 5,
            "contactnum": "123-456-789",
            "Mail": "shanmugam@123.com",
            "Availability": ["8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM"]

        },
        {
            "Image": "https://images.pexels.com/photos/3768910/pexels-photo-3768910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Name": "Cleaning in low cost",
            "Desc": "Clean your home at low cost",
            "Get": ["Room Cleaning", "Toilet Cleaning", "Gardening"],
            "Benifits": ["Service Gurantee", "Quality service", "Timely work"],
            "BookCard": ["Service Gurantee", "Quality service", "Timely work", "Certified Experts", "24/7 Customer Care"],
            "Price": "$15",
            "vendorimg": "https://images.pexels.com/photos/9950569/pexels-photo-9950569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "vendorName": "Popoyee",
            "Joiningyear": "JUN 2020",
            "orderscompleted": "5",
            "Rating": 3,
            "contactnum": "123-456-789",
            "Mail": "popoyee@123.com",
            "Availability": ["8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM", "8:00 AM - 2:00 PM"]
        },

    ]
    const [rating, setRating] = useState([])
    const [index, setIndex] = useState(0)


    var [Num, setNum] = useState(1)


    const Booking = () => {
        if (cookies.jwt2) {
            window.location.href = "/booking"
        }
        else {
            window.location.href = "/Login"
        }
    }
    const Exist = data.find(item => {
        return item.Name === FetchName;
    })

    if (!Exist) {
        return (
            <div className="Not-available">
                <Header />
                <MenuBar />
                <h1 className="Err-msg">Service Not Available!!!!</h1>
                <Footer />
                <End />
            </div>
        )
    }

    else {
        return (
            <div>
                <Header />
                <MenuBar />
                <div className="Service-image">
                    <h1 className="Service-heading">Service</h1>
                </div>

                {data.map(item => {
                    if (item.Name === FetchName) {
                        if (Num === 1) {
                            for (var i = 1; i <= item.Rating; i++) {
                                console.log(item.Rating);
                                rating.push(<i class="fa-solid fa-star" />)
                                setNum(2)
                            }
                        }



                        return (
                            <div className="Main-panel">
                                <div className="left-panel">
                                    <img className="Ser-Image" src={item.Image} alt="" />
                                    <div className="Content-div">
                                        <h1 className="Heading">{item.Name}</h1>
                                        <div className="Button-flex">
                                            <p className={index === 0 ? "active" : "Details-button"} onClick={() => setIndex(0)}>Description</p>
                                            <p className={index === 1 ? "active" : "Details-button"} onClick={() => setIndex(1)}>Availability</p>
                                            <p className={index === 2 ? "active" : "Details-button"} onClick={() => setIndex(2)}>Client review</p>
                                        </div>
                                        {/* section 1 */}
                                        <div hidden={index !== 0} >
                                            <div className="Section1">
                                                <p className="subHeading">{item.Desc}</p>
                                                <h3 className="Side-heading">What you will get</h3>
                                                <ul className="points-list">
                                                    {item.Get.map(subitem => {
                                                        return (
                                                            <li className="List-items"><i class="fa-solid fa-circle-check" ></i> {subitem}</li>
                                                        )
                                                    })}
                                                </ul>
                                                <h3 className="Side-heading">Benifits of package</h3>
                                                <ul className="points-list">
                                                    {item.Benifits.map(subitem => {
                                                        return (
                                                            <li className="List-items"><i class="fa-solid fa-circle-check" ></i> {subitem}</li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                        {/* section 2 */}
                                        <div hidden={index !== 1}>
                                            <h2 className="Side-heading">Service Availability</h2>
                                            <div className="Availability">
                                                <ul className="Section2-days">
                                                    <li className="Points-days"><i class="fa-solid fa-circle"></i> Monday</li>
                                                    <li className="Points-days"><i class="fa-solid fa-circle"></i> Tuesday</li>
                                                    <li className="Points-days"><i class="fa-solid fa-circle"></i> Wednesday</li>
                                                    <li className="Points-days"><i class="fa-solid fa-circle"></i> Thursday</li>
                                                    <li className="Points-days"><i class="fa-solid fa-circle"></i> Friday</li>
                                                    <li className="Points-days"><i class="fa-solid fa-circle"></i> Saturday</li>
                                                    <li className="Points-days"><i class="fa-solid fa-circle"></i> Sunday</li>
                                                </ul>
                                                <ul className="Timing-section2">
                                                    {item.Availability.map(item => {
                                                        return (
                                                            <li className="Points-days">{item}</li>
                                                        )
                                                    })}

                                                </ul>
                                            </div>
                                        </div>

                                        {/* section 3 */}

                                        <div hidden={index !== 2}>
                                            <div className="Review-section">
                                                <h2 className="Side-heading">Write your Review</h2>
                                                <p>Review</p>
                                                <textarea placeholder="Write a comment" className="Text-area"></textarea>
                                                <button className="Submit-btn">Submit Review</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Right-panel">
                                    <div className="Book-card">
                                        <div className="Price-section">
                                            <h1 className="My-price">My Price</h1>
                                            <h1 className="My-price">{item.Price}</h1>
                                        </div>
                                        <ul className="points-list">
                                            {item.BookCard.map(subitem => {
                                                return (
                                                    <li className="Book-items"><i class="fa-solid fa-check"></i> {subitem}</li>
                                                )
                                            })}
                                        </ul>
                                        <button className="Book-btn" onClick={Booking}>Book Now</button>
                                    </div>
                                    <div className="Vendor-detail">
                                        <img className="vendorimage" src={item.vendorimg} alt="" />
                                        <h2 className="Vendor-name">{item.vendorName}</h2>
                                        <p className="vendor-date">Member since {item.Joiningyear}</p>
                                        <div className="Contacts-div">
                                            <div className="sub-div">
                                                <p>Orders completed</p>
                                                <p>{item.orderscompleted}</p>
                                            </div>
                                            <div className="sub-div">
                                                <p>Provider Rating</p>
                                                <div className="stars-div">
                                                    {
                                                        rating.map(item => {
                                                            return (
                                                                <p className="stars">{item}</p>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <hr className="hr"></hr>
                                            <div className="Call">
                                                <p><i class="fa-solid fa-phone"></i>  {item.contactnum}</p>

                                                <p><i class="fa-solid fa-envelope"></i>  {item.Mail}</p>
                                            </div>
                                            <button className="contacts-btn">Contact Here</button>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        )

                    }


                })

                }
                <Footer />
                <End />
            </div>
        )
    }
}


export { ServiceCard, ServiceDetails }