import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../object.css"
import Pagination from "./Pagination";
import "./Servicecard.css"
import { End, Footer, Header, MenuBar } from "../objects";




const ServiceCard=({service})=>{


    const Post=[
        
            {
                "mainImage":"https://images.pexels.com/photos/4099471/pexels-photo-4099471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Category":"Cleaning",
                "Price":"$10",
                "desc":"Home Cleaning Service",
                "dp":"https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Name":"Gilbert"
        
            },
            {
                "mainImage":"https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Category":"Plumbing",
                "Price":"$12",
                "desc":"Plumbing Service",
                "dp":"https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Name":"Gilbert"
        
            },
            {
                "mainImage":"https://images.pexels.com/photos/3356170/pexels-photo-3356170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Category":"AC Repair",
                "Price":"$8",
                "desc":"Hair cutting Service at reasonable price",
                "dp":"https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Name":"Gilbert"
        
            },
            {
                "mainImage":"https://images.pexels.com/photos/5798978/pexels-photo-5798978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Category":"Painting",
                "Price":"$12",
                "desc":"Painting Service at low price",
                "dp":"https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Name":"Gilbert"
        
            },
            {
                "mainImage":"https://clareservices.com/wp-content/uploads/2021/05/technician-service-removing-air-filter-air-conditioner-cleaning_35076-3617-640x426.jpg",
                "Category":"AC Repair",
                "Price":"$20",
                "desc":"Winter AC master cleaning and service",
                "dp":"https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Name":"Gilbert"
        
            },
            {
                "mainImage":"https://images.pexels.com/photos/4099471/pexels-photo-4099471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Category":"Cleaning",
                "Price":"$10",
                "desc":"Home Cleaning Service",
                "dp":"https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Name":"Gilbert"
        
            },
            {
                "mainImage":"https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Category":"Plumbing",
                "Price":"$12",
                "desc":"Plumbing Service",
                "dp":"https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Name":"Gilbert"
        
            },
            {
                "mainImage":"https://images.pexels.com/photos/3356170/pexels-photo-3356170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Category":"Saloon",
                "Price":"$8",
                "desc":"Hair cutting Service at reasonable price",
                "dp":"https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Name":"Gilbert"
        
            },
            {
                "mainImage":"https://images.pexels.com/photos/5798978/pexels-photo-5798978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Category":"Painting",
                "Price":"$12",
                "desc":"Painting service",
                "dp":"https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Name":"Gilbert"
        
            },
            {
                "mainImage":"https://clareservices.com/wp-content/uploads/2021/05/technician-service-removing-air-filter-air-conditioner-cleaning_35076-3617-640x426.jpg",
                "Category":"AC Repair",
                "Price":"$20",
                "desc":"Winter AC master cleaning and service",
                "dp":"https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Name":"Gilbert"
        
            },
            {
                "mainImage":"https://images.pexels.com/photos/5798978/pexels-photo-5798978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Category":"Painting",
                "Price":"$12",
                "desc":"Painting Service",
                "dp":"https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Name":"Gilbert"
        
            },
            {
                "mainImage":"https://clareservices.com/wp-content/uploads/2021/05/technician-service-removing-air-filter-air-conditioner-cleaning_35076-3617-640x426.jpg",
                "Category":"AC Repair",
                "Price":"$20",
                "desc":"Winter AC master cleaning and service",
                "dp":"https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "Name":"Gilbert"
        
            },
        
    ]

const[currentPage,setCurrent]=useState(1)
const[postPer,setpostPer]=useState(6)
const[Color,setColor]=useState("")

const Lastpost=currentPage*postPer
const Firstpost=Lastpost-postPer

const Navigate=(Number)=>{
    setCurrent(Number)
    setColor(Number)
}
const CurerntPost=Post.slice(Firstpost,Lastpost)

const [serviceName,setServiceName]=useState("")

useEffect(()=>{
    localStorage.setItem("Category",serviceName)
    if(localStorage.getItem("Category")!=""){
        window.location.href="/ServiceDetails"
    }
},[serviceName])





    return(
        <div>
            <div className="CaroselCard-block">
                <div className="CaroselService-block">
                {CurerntPost.map(item=>{
                    if(service==="Select"||service===""){
                        return(
                            <div onClick={()=>{setServiceName(item.desc)} } className="Carosel-card">
                                    <img className="Carosel-img" src={item.mainImage}/>
                                    <div className="Card-body">
                                        <div className="Carosel-sec">
                                            <p className="Category-carosel">{item.Category}</p>
                                            <h2 className="Carosel-price">{item.Price}</h2>
                                        </div>
                                        <h1 className="Carosel-desc">{item.desc}</h1>
                                        <div className="Carosel-third">
                                            <div className="Profile">
                                                <img className="profile-img" src={item.dp}/>
                                                <p className="Profile-Name">{item.Name}</p>
                                            </div>
                                        </div>
                                    <button className="Carosel-btn">Book Now</button>
                                </div>
                    </div>
    
                        )
                    }
                    else{
                        if(item.Category===service){
                            return(
                                <div onClick={()=>{setServiceName(item.desc)} } className="Carosel-card">
                                        <img className="Carosel-img" src={item.mainImage}/>
                                        <div className="Card-body">
                                            <div className="Carosel-sec">
                                                <p className="Category-carosel">{item.Category}</p>
                                                <h2 className="Carosel-price">{item.Price}</h2>
                                            </div>
                                            <h1 className="Carosel-desc">{item.desc}</h1>
                                            <div className="Carosel-third">
                                                <div className="Profile">
                                                    <img className="profile-img" src={item.dp}/>
                                                    <p className="Profile-Name">{item.Name}</p>
                                                </div>
                                            </div>
                                        <button className="Carosel-btn">Book Now</button>
                                    </div>
                        </div>
        
                            )
                        }
                    }
                    
                })}
                                </div>
                                
            </div>
            <Pagination TotalPost={Post.length} postPer={postPer} Navigate={Navigate} Color={Color} currentPage={currentPage}/>
            </div>
        )
    
}


const ServiceDetails=()=>{
    var FetchName=localStorage.getItem("Category")
    const[err,setErr]=useState(0)
    const data=[
        {
            "Image":"https://images.pexels.com/photos/3768910/pexels-photo-3768910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Name":"Home Cleaning Service",
            "Desc":"Clean your home at low cost",
            "Get":["Room Cleaning","Toilet Cleaning","Gardening"],
            "Benifits":["Service Gurantee","Quality service","Timely work"],
            "BookCard":["Service Gurantee","Quality service","Timely work","Certified Experts","24/7 Customer Care"],
            "Price":"$15",
            "vendorimg":"https://images.pexels.com/photos/9950569/pexels-photo-9950569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "vendorName":"Popoyee",
            "Joiningyear":"JUN 2020",
            "orderscompleted":"5",
            "Rating":3,
            "contactnum":"123-456-789",
            "Mail":"popoyee@123.com",
            "Availability":["8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM"]
        },
        {
            "Image":"https://img.freepik.com/premium-photo/technician-service-removing-air-filter-air-conditioner-cleaning_35076-3618.jpg",
            "Name":"Winter AC master cleaning and service",
            "Desc":"Clean your home at low cost",
            "Get":["AC Cleaning","AC Service","Gas Refilling"],
            "Benifits":["Service Gurantee","Quality service","Timely work"],
            "BookCard":["Service Gurantee","Quality service","Timely work","Certified Experts","24/7 Customer Care"],
            "Price":"$20",
            "vendorimg":"https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_1280.jpg",
            "vendorName":"Mr Bean",
            "Joiningyear":"OCT 2022",
            "orderscompleted":"20",
            "Rating":4,
            "contactnum":"123-456-789",
            "Mail":"mrbean@abc.com",
            "Availability":["8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM"]


        },
        {
            "Image":"https://cdn.pixabay.com/photo/2013/12/13/21/13/plumber-228010_1280.jpg",
            "Name":"Plumbing Service",
            "Desc":"Any leak we are here to fix it",
            "Get":["New waterlining","Industrial plumbing","Leak assresting"],
            "Benifits":["Service Gurantee","Quality service","Timely work"],
            "BookCard":["Service Gurantee","Quality service","Timely work","Certified Experts","24/7 Customer Care"],
            "Price":"$18",
            "vendorimg":"https://images.pexels.com/photos/936019/pexels-photo-936019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "vendorName":"Kumar",
            "Joiningyear":"sep 2021",
            "orderscompleted":"8",
            "Rating":3,
            "contactnum":"123-456-789",
            "Mail":"kumar@123.com",
            "Availability":["8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM"]

        },
        {
            "Image":"https://cdn.pixabay.com/photo/2015/07/07/11/36/haircut-834280_1280.jpg",
            "Name":"Hair cutting Service at reasonable price",
            "Desc":"We provide saloon service since 1980s",
            "Get":["Trendy hair cut","Facial","Hair dyeing"],
            "Benifits":["Friendly professionals","Quality service","Timely work"],
            "BookCard":["Service Gurantee","Quality service","Timely work","Certified Experts","At your place"],
            "Price":"$18",
            "vendorimg":"https://images.pexels.com/photos/10002812/pexels-photo-10002812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "vendorName":"Saloon Shanmugam",
            "Joiningyear":"Aug 2022",
            "orderscompleted":"12",
            "Rating":5,
            "contactnum":"123-456-789",
            "Mail":"shanmugam@123.com",
            "Availability":["8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM"]

        },
        {
            "Image":"https://images.pexels.com/photos/3768910/pexels-photo-3768910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Name":"Clean your households from our experts",
            "Desc":"Clean your home at low cost",
            "Get":["Room Cleaning","Toilet Cleaning","Gardening"],
            "Benifits":["Service Gurantee","Quality service","Timely work"],
            "BookCard":["Service Gurantee","Quality service","Timely work","Certified Experts","24/7 Customer Care"],
            "Price":"$15",
            "vendorimg":"https://images.pexels.com/photos/9950569/pexels-photo-9950569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "vendorName":"Popoyee",
            "Joiningyear":"JUN 2020",
            "orderscompleted":"5",
            "Rating":3,
            "contactnum":"123-456-789",
            "Mail":"popoyee@123.com",
            "Availability":["8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM","8:00 AM - 2:00 PM"]
        },
        
    ]
    const[rating,setRating]=useState([])
    const [index,setIndex]=useState(0)
    
    
var [Num,setNum]=useState(1)


const Booking=()=>{
    var status=localStorage.getItem("Status")
    if(status==="Loggedin"){
        window.location.href="/booking"
    }
    else{
        window.location.href="/Login"
    }
}
    const Exist=data.find(item=>{
        return item.Name===FetchName;
    })

    if(!Exist){
        return(
            <div className="Not-available">
            <Header/>
            <MenuBar/>
            <h1 className="Err-msg">Service Not Available!!!!</h1>
            <Footer/>
             <End/>
        </div>
        )
    }

    else{return(
        <div>
            <Header/>
            <MenuBar/>
            <div className="Service-image">
                <h1 className="Service-heading">Service</h1>
            </div>
            
        {data.map(item=>{
            if(item.Name===FetchName){
                 if(Num==1){
                    for(var i=1;i<=item.Rating;i++){
                        console.log(item.Rating);
                        rating.push(<i class="fa-solid fa-star"/>)
                        setNum(2)
                    }
                 }  
                
            
                
                return(
            <div className="Main-panel">
            <div className="left-panel">
                <img className="Ser-Image" src={item.Image}/>
                <div className="Content-div">
                    <h1 className="Heading">{item.Name}</h1>
                    <div className="Button-flex">
                        <p className={index==0 ? "active":"Details-button" } onClick={()=>setIndex(0)}>Description</p>
                        <p className={index==1 ? "active":"Details-button" } onClick={()=>setIndex(1)}>Availability</p>
                        <p className={index==2 ? "active":"Details-button" } onClick={()=>setIndex(2)}>Client review</p>
                    </div>
                    {/* section 1 */}
                    <div hidden={index!=0} >
                        <div className="Section1">
                    <p className="subHeading">{item.Desc}</p>
                    <h3 className="Side-heading">What you will get</h3>
                    <ul className="points-list">
                        {item.Get.map(subitem=>{
                            return(
                                <li className="List-items"><i class="fa-solid fa-circle-check" ></i> {subitem}</li>
                            )
                        })}
                    </ul>
                    <h3 className="Side-heading">Benifits of package</h3>
                    <ul className="points-list">
                        {item.Benifits.map(subitem=>{
                            return(
                                <li className="List-items"><i class="fa-solid fa-circle-check" ></i> {subitem}</li>
                            )
                        })}
                    </ul>
                    </div>
                    </div>
                    {/* section 2 */}
                    <div hidden={index!=1}>
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
                            {item.Availability.map(item=>{
                                return(
                                    <li className="Points-days">{item}</li>
                                )
                            })}
                            
                        </ul>
                        </div>
                    </div>

                            {/* section 3 */}

                    <div hidden={index!=2}>
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
                        {item.BookCard.map(subitem=>{
                            return(
                                <li className="Book-items"><i class="fa-solid fa-check"></i> {subitem}</li>
                            )
                        })}
                        </ul>
                        <button className="Book-btn" onClick={Booking}>Book Now</button>
                </div>
                <div className="Vendor-detail">
                    <img className="vendorimage" src={item.vendorimg}/>
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
                                rating.map(item=>{           
                                    return(
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
        <Footer/>
             <End/>
        </div>
    )}
}


export  {ServiceCard,ServiceDetails}