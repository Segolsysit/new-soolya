import React, { useEffect, useState } from "react";
import './object.css'
import './add.css'
import './footer.css'
import '../home.css'
import'./dashboard.css'
import './aboutus.css'
import { Link, useNavigate } from "react-router-dom";
import {useCookies} from 'react-cookie'
import {UserProfile,UserOrders, VendorOrders, PendingOrders} from "./Userdashboardcomps/Dashboard components";
import { useLocation } from "react-router-dom";
import jwt_decode from  "jwt-decode"
import axios from "axios";
import { VendorProfile } from "./Userdashboardcomps/Dashboard components";
import Swal from 'sweetalert2'


const Header = () => {
   
if(window.innerWidth>600){
    return (
        <div className="Header">
            <div>
                <ul className="contact">
                    <li><i class="fa-solid fa-phone "></i> 1234</li>
                    <li>|</li>
                    <li><i class="fa-solid fa-envelope"></i> abcd@gmail.com</li>
                    <li>|</li>
                    <li className="Time"><i class="fa-solid fa-clock"></i> 10.00 AM-7.00PM</li>
                </ul>
            </div>

            <div>
                <ul className="social">
                    <li><i class="fa-brands fa-facebook-f"></i></li>
                    <li><i class="fa-brands fa-twitter" ></i></li>
                    <li><i class="fa-brands fa-instagram" ></i></li>
                    <li><i class="fa-brands fa-linkedin-in"></i></li>

                </ul>
            </div>

        </div>

    )
}
else if(window.innerWidth<600){
    return (
        <div className="Header">
            <div>
                <ul className="contact">
                    <li><i class="fa-solid fa-phone "></i> 1234</li>
                    <li><i class="fa-solid fa-envelope"></i> abcd@gmail.com</li>
                </ul>
            </div>

        </div>

    )
}
    
}







const MenuBar = () => {

    const [cookies,removeCookie] = useCookies()
    const Token=cookies.jwt2
    const VendorToken=cookies.venjwt

    const [Open, setOpen] = useState(false)
    const [icon, setIcon] = useState(<i class="fa-solid fa-bars"></i>)
    var status = localStorage.getItem("Status")

    const[state,setState]=useState(false)
    const  {pathname}  = useLocation();


    

    const ProfileOpen=()=>{
        if(!state){
            setState(true)
        }
        else{
            setState(false)
        }
        
    }

    const OpenMenu = (e) => {
        e.preventDefault()
        if (!Open) {
            setOpen(true)
            setIcon("X")
        }
        else {
            setOpen(false)
            setIcon(<i class="fa-solid fa-bars"></i>)
        }
    }

   
    return (
        <div className="Menubar-outer">
        <div className="Titlebar-sticky">
            <div className="Logo">
               <Link to={"/"}><img className="LogoImage" alt="" src="https://cdn.logojoy.com/wp-content/uploads/2018/08/23155513/18927550-1024x776.png" /></Link> 
                <div className="Profile-block">
                <img onClick={ProfileOpen} alt="" src="https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className={status === "Loggedin" ? "Profileimg-res" : "Profileimgres-hide"}></img>
                <button className="BurgerBtn" onClick={OpenMenu}>{icon}</button>
                </div>
            </div>
            <div className="menubar">
                <ul className="menulist">
                    <Link to="/"><li className={pathname!=="/" ? "Menuitem":"Menuitem-active"}>Home</li></Link>
                    <Link to='/AboutUs'><li className={pathname!=="/AboutUs" ? "Menuitem":"Menuitem-active"}>About Us</li></Link>
                    <Link to="/service"><li className={pathname!=="/service" ? "Menuitem":"Menuitem-active"}>Service</li></Link>
                    
                    <Link to="/contact"><li className={pathname!=="/contact" ? "Menuitem":"Menuitem-active"}>Contact Us</li></Link>
                </ul>
            </div>
            <div className="buttonflex">
                {/* <div className="Search-block">
                    <input placeholder="Search" className="Search-box" />
                    <button className="Searchbutton"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div> */}
                <Link to="/Provider"><button className="hireButton">Provider Joining</button></Link>
                <Link to="/Login"><button className={Token||VendorToken  ? "userButton-hide" : "userButton"}><i class="fa-solid fa-user"></i></button></Link>
                <img onClick={ProfileOpen} src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=1380&t=st=1682572419~exp=1682573019~hmac=ce813aaccc4d2e8202195a8bbb9a53a4d0e5a9b057dda865cfe06a7ee5d93f9b" alt="" className={Token||VendorToken ? "Profileimg" : "Profileimg-hide"}></img>
            </div>
            <MenuList Open={Open} close={setOpen} />
            
        </div>
        <Profile open={state} close={setState}/>
        </div>
    )
}

const Category = ({Cat,setCat}) => {
//hello
const[Data,setData]=useState([])
    useEffect(()=>{
        axios.get(`http://localhost:3001/api/fetch_items`)
        .then((data)=>{
        setData(data.data)
    })},[])

    

    const[Selectindex,setIndex]=useState(null)

    useEffect(()=>{
        const Local=localStorage.getItem("SubcategoryID")
        console.log(Local);
        // console.log(typeof(Local));
        if(Local!==null||Local!==undefined){
            setIndex(parseInt(Local))
        }
        else{
            setIndex(null)
        }
        
    },[])

  
    const localpath = "http://localhost:3001/";

    
    return (
        <div className="Card-dic">
        <div className="cardouter">
            {Data.map((item,index)=> {
                return (
                     <div className={index===Selectindex ? "card-active":"Category-card"} key={index} onClick={(e)=>{
                     setCat(item.catagorySetup)
                     setIndex(index)}}>
                        <img className="icons" src={localpath + item.filename} alt="" />
                        <h3 className="main">{item.catagorySetup}</h3>
                        <p className="extras">service</p>
                    </div>

                        

                )
            })
            }
            
        </div>
        
        </div>

    )
}



const CategoryHome = ({Cat,setCat}) => {
    //hello
    const[Data,setData]=useState([])
        useEffect(()=>{
            axios.get(`http://localhost:3001/api/fetch_items`)
            .then((data)=>{
            setData(data.data)
        })},[])
    
    const Navigate=useNavigate()
        const RemoveFilter=()=>{
            setIndex(null)
            setCat("Select")
        }
        const localpath = "http://localhost:3001/";

        const[Selectindex,setIndex]=useState(null)

        const ServiceRoute=(index,Category)=>{
            localStorage.setItem("SubcategoryID",index)
            localStorage.setItem("SubCategory",Category)
            Navigate('/Service')
        }

        
    
 
        
        
        return (
            <div className="Card-dic">
            <div className="cardouter">
                {Data.map((item,index)=> {
                    return (
                         <div className="Category-card" key={index} onClick={()=>{
                            ServiceRoute(index,item.catagorySetup)}}>
                            <img className="icons" src={localpath + item.filename} alt="" />
                            <h3 className="main">{item.catagorySetup}</h3>
                            <p className="extras">service</p>
                        </div>
    
                            
    
                    )
                })
                }
                
            </div>
            <div className="Filterbtn-div">
            <button className="Filter-button" hidden={Selectindex===null?true:false} onClick={RemoveFilter}><i class="fa-sharp fa-solid fa-filter-circle-xmark"></i></button>
            </div>
            </div>
    
        )
    }



const Carosel = () => {
    const [pos, setPos] = useState(0)
    const [Name, setName] = useState()
    const Screenwidth = window.innerWidth
    const data = [
        {
            "mainImage": "https://images.pexels.com/photos/4099471/pexels-photo-4099471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Category": "Cleaning",
            "Price": "$10",
            "desc": "Clean your households from our experts",
            "dp": "https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Name": "Gilbert"

        },
        {
            "mainImage": "https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Category": "Plumbing",
            "Price": "$12",
            "desc": "Grow your business from us with ladies working as team",
            "dp": "https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Name": "Gilbert"

        },
        {
            "mainImage": "https://images.pexels.com/photos/3356170/pexels-photo-3356170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Category": "AC Repair",
            "Price": "$8",
            "desc": "Hair cutting Service at reasonable price",
            "dp": "https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Name": "Gilbert"

        },
        {
            "mainImage": "https://images.pexels.com/photos/5798978/pexels-photo-5798978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Category": "Painting",
            "Price": "$12",
            "desc": "Our cool painting service only for you",
            "dp": "https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Name": "Gilbert"

        },
        {
            "mainImage": "https://clareservices.com/wp-content/uploads/2021/05/technician-service-removing-air-filter-air-conditioner-cleaning_35076-3617-640x426.jpg",
            "Category": "AC Repair",
            "Price": "$20",
            "desc": "Winter AC master cleaning and service",
            "dp": "https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Name": "Gilbert"

        },
    ]

    useEffect(() => {
        localStorage.removeItem("Category")
        localStorage.setItem("Category", Name)
        console.log(Name);
        if (localStorage.getItem("Category") !=="" && localStorage.getItem("Category") !== "undefined") {
            window.location.href = "/ServiceDetails"
        }
    }, [Name])



    const CaroselRight = () => {
        if (Screenwidth >= 600 && Screenwidth < 1500) {
            if (pos > -50) {
                setPos(pos - 25)
            }
        }
        if (Screenwidth > 1500) {
            if (pos > -30) {
                setPos(pos - 18)
            }
        }

        if (Screenwidth < 600) {
            if (pos > -70) {
                setPos(pos - 20)
            }
        }



    }

    const CaroselLeft = () => {
        if (Screenwidth >= 600 && Screenwidth < 1500) {
            if (pos < 0) {
                setPos(pos + 25)
            }
        }
        if (Screenwidth > 1500) {
            if (pos < 0) {
                setPos(pos + 18)
            }
        }
        if (Screenwidth < 600) {
            if (pos < 0) {
                setPos(pos + 20)
            }
        }


    }


    return (
        <div className="Carosel-block">
            <button className="Arrow-Left" onClick={CaroselLeft} >&larr;</button>
            <div className="Caroselcard-block" style={{ transform: `translateX(${pos}rem)` }} >
                {data.map((item,index)=> {
                    return (
                        <div className="Carosel-card" onClick={(e) => { setName(item.desc) }} key={index}>
                            <img className="Carosel-img" src={item.mainImage} alt=""/>
                            <div className="Card-body">
                                <div className="Carosel-sec">
                                    <p className="Category-carosel">{item.Category}</p>
                                    <h2 className="Carosel-price">{item.Price}</h2>
                                </div>
                                <h1 className="Carosel-desc">{item.desc}</h1>
                                <div className="Carosel-third">
                                    <div className="Profile">
                                        <img className="profile-img" src={item.dp} alt=""/>
                                        <p className="Profile-Name">{item.Name}</p>
                                    </div>
                                </div>
                                <button className="Carosel-btn">Book Now</button>
                            </div>
                        </div>

                    )
                })}
            </div>
            <button className="Arrow-Right" onClick={CaroselRight}>&rarr;</button>
        </div>
    )
}

const Ad = () => {
    const [count1, setCount1] = useState(0)
    const [count2, setCount2] = useState(0)
    const [count3, setCount3] = useState(0)
    const [count4, setCount4] = useState(0)

    useEffect(() => {
        if (count1 < 2547) {
            setCount1(count1 + 1)
        }
        if (count2 < 1532) {
            setCount2(count2 + 1)
        }
        if (count3 < 2103) {
            setCount3(count3 + 1)
        }
        if (count4 < 25) {
            setCount4(count4 + 1)
        }
    },[count1,count2,count3,count4])

    const data = [{
        "image": "https://cdn5.vectorstock.com/i/1000x1000/85/69/complete-order-icon-in-blue-style-for-any-projects-vector-35418569.jpg",
        "count": count1,
        "desc": "Total Orders",
    },
    {
        "image": "https://img.freepik.com/free-vector/business-meeting-icon_23-2147495186.jpg?w=2000",
        "count": count2,
        "desc": "Active Clients",
    },
    {
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLTghTFepm_0fY22Wlt5XQ-_LIqdP_0g1GEQ&usqp=CAU",
        "count": count3,
        "desc": "Team Members",
    },
    {
        "image": "https://cdn-icons-png.flaticon.com/512/1869/1869397.png",
        "count": count4,
        "desc": "Years of Experience",
    },]

    return (<div className="Adblock">
        {data.map((item,index)=> {
            return (
                <div className="inner-ad" key={index}>
                    <img className="Ad-img" src={item.image} alt=""/>
                    <h2 className="Ad-count">{item.count}+</h2>
                    <h3 className="Ad-desc">{item.desc}</h3>
                </div>
            )
        })}

    </div>)
}


const Popular = () => {
    const data = [
        {
            "mainImage": "https://images.pexels.com/photos/4099471/pexels-photo-4099471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Category": "Cleaning",
            "Price": "$10",
            "desc": "Clean your households from our experts",
            "dp": "https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Name": "Gilbert"

        },
        {
            "mainImage": "https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Category": "Plumbing",
            "Price": "$12",
            "desc": "Grow your business from us with ladies working as team",
            "dp": "https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Name": "Gilbert"

        },
        {
            "mainImage": "https://images.pexels.com/photos/3356170/pexels-photo-3356170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Category": "AC Repair",
            "Price": "$8",
            "desc": "Hair cutting Service at reasonable price",
            "dp": "https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Name": "Gilbert"

        },
        {
            "mainImage": "https://images.pexels.com/photos/6872580/pexels-photo-6872580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Category": "Car Service",
            "Price": "$24",
            "desc": "Car cleaning service from best cleaners",
            "dp": "https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Name": "Gilbert"

        },
        {
            "mainImage": "https://images.pexels.com/photos/4246189/pexels-photo-4246189.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Category": "AC Repair",
            "Price": "$12",
            "desc": "Home moving service from one city to another",
            "dp": "https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Name": "Gilbert"

        },
        {
            "mainImage": "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Category": "Car Service",
            "Price": "$60",
            "desc": "Car service at home or office with our experts",
            "dp": "https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "Name": "Gilbert"

        },
    ]

    return (
        <div className="Popular-block">
            {data.map((item,index)=> {
                return (
                    <div className="Carosel-card" key={index}>
                        <img className="Carosel-img" src={item.mainImage} alt=""/>
                        <div className="Card-body">
                            <div className="Carosel-sec">
                                <p className="Category-carosel">{item.Category}</p>
                                <h2 className="Carosel-price">{item.Price}</h2>
                            </div>
                            <h1 className="Carosel-desc">{item.desc}</h1>
                            <div className="Carosel-third">
                                <div className="Profile">
                                    <img className="profile-img" src={item.dp} alt=""/>
                                    <p className="Profile-Name">{item.Name}</p>
                                </div>
                            </div>
                            <button className="Carosel-btn">Book Now</button>
                        </div>
                    </div>

                )
            })}

        </div>
    )
}


const Join = () => {
    return (
        <div className="JoinBlock">
            <h1 className="joindesc">Join us to sale your service & grow your Expertice</h1>
            <Link to="/Provider"><button className="Joinbtn">Provider Joining</button></Link>
        </div>
    )
}

const Store = () => {
    return (<div className="Store-Block">
        <div className="Store-desc">
            <h4 className="Store-download">Download Now</h4>
            <h1 className="Store-h1">App is available for free on Playstore & Appstore </h1>
            <p className="Store-p">Get the latest resources for downloading and enjoy your life</p>
            <div className="Store-btn">
                <button className="Store-button"><img src="https://www.freepnglogos.com/uploads/google-play-png-logo/google-play-arrow-png-logo-8.png" className="Platform-logo" alt=""/><div className="Btn-inside"><h4 className="h4btn">Available on</h4><h2 className="h2btn">Google Play</h2></div></button>
                <button className="Store-button"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/1024px-App_Store_%28iOS%29.svg.png" alt="" className="Platform-logo" /><div className="Btn-inside"><h4 className="h4btn">Available on</h4><h2 className="h2btn">App Store</h2></div></button>
            </div>
        </div>
        <div className="Store-img">
            <img className="Store-img" src="https://static.vecteezy.com/system/resources/previews/008/850/474/original/3d-render-mobile-phone-png.png" alt=""/>
        </div>
    </div>)
}

//css in add.css

const Testimonials = () => {

    const [Res, setRes] = useState(30)
    const [Pos, setPos] = useState(47)
    const [Col1, setCol1] = useState("dodgerblue")
    const [Col2, setCol2] = useState("rgb(171, 207, 239)")
    const [Col3, setCol3] = useState("rgb(171, 207, 239)")

    const btn1 = () => {

        if (Pos <= 10) {
            setPos(47)
            setRes(30)
            setCol1("dodgerblue")
            setCol2("rgb(171, 207, 239)")
            setCol3("rgb(171, 207, 239)")
        }



    }

    const btn2 = () => {
        {
            setPos(-0)
            setRes(10)
            setCol1("rgb(171, 207, 239)")
            setCol3("rgb(171, 207, 239)")
            setCol2("dodgerblue")
        }




    }

    const btn3 = () => {
        setPos(-43)
        setRes(-9.9)
        setCol1("rgb(171, 207, 239)")
        setCol2("rgb(171, 207, 239)")
        setCol3("dodgerblue")

    }

    const data = [{
        "Review": "Good",
        "Name": "Kumar",
        "Work": "Designer",
        "img": "https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"

    },
    {
        "Review": "I am glad to work with this company",
        "Name": "Rajesh",
        "Work": "Mechanic",
        "img": "https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"

    },
    {
        "Review": "Great service",
        "Name": "Ram",
        "Work": "Scientist",
        "img": "https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"

    },
    {
        "Review": "Average service",
        "Name": "Francis",
        "Work": "Software Developer",
        "img": "https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"

    }]
    return (
        <div className="Testi-block">
            <h1 className="Testi-h1">Testimonial</h1>
            <p className="Testi-p">There are many variations of Lorem Imposem Available</p>
            <div className="Testi-Outer" style={{ transform: `translateX(${Pos}rem)` }}>
                {data.map((item,index)=> {
                    return (
                        <div className="Tesi-card" key={index}>
                            <div className="Testi-reviewbox">
                                <p className="Testi-Review">{item.Review}</p>
                            </div>
                            <div className="Testi-profile">
                                <img src={item.img} className="Profile-img" alt=""/>
                                <div className="Profile-info">
                                    <h3 className="Testi-name">{item.Name}</h3>
                                    <p className="Testi-work">{item.Work}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
            <div className="ResTesti-Outer" style={{ transform: `translateX(${Res}rem)` }}>
                {data.map((item,index)=> {
                    return (
                        <div className="Tesi-card" key={index}>
                            <div className="Testi-reviewbox">
                                <p className="Testi-Review">{item.Review}</p>
                            </div>
                            <div className="Testi-profile">
                                <img src={item.img} className="Profile-img" alt=""/>
                                <div className="Profile-info">
                                    <h3 className="Testi-name">{item.Name}</h3>
                                    <p className="Testi-work">{item.Work}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
            <ul className="Ul-Btns">
                <button style={{ backgroundColor: Col1 }} className="li-Btns" onClick={btn1}></button>
                <button style={{ backgroundColor: Col2 }} className="li-Btns" onClick={btn2}></button>
                <button style={{ backgroundColor: Col3 }} className="li-Btns" onClick={btn3}></button>
            </ul>

        </div>
    )
}


const LatestNews = () => {

    const data = [{
        "img": "https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "User": "Admin",
        "News": "Best Elecrtician"
    },
    {
        "img": "https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "User": "Admin",
        "News": "Best Elecrtician"
    },
    {
        "img": "https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "User": "Admin",
        "News": "Best Elecrtician"
    },]

    return (
        <div className="News-block">
            <h1 className="Testi-h1">Latest News</h1>
            <p>There are many variations of lorem</p>
            <div className="News-inner">
                {
                    data.map((item,index)=> {
                        return (
                            <div className="NewsCard" key={index}>
                                <img src={item.img} className="Carosel-img" alt=""/>
                                <div className="Newscard-body">
                                    <div className="News-card2">
                                        <p><i class="fa-light fa-user"> {item.User}</i></p>
                                        <p><i class="fa-light fa-comment"></i> Comments</p>
                                    </div>
                                    <h2 className="News-news">{item.News}</h2>
                                    <hr className="Horizontal"></hr>
                                    <div className="News-card3">
                                        <p>Learn More</p>
                                        <p>&rarr;</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const Subscribe = () => {
    return (
        <div className="Subscribe-block">
            <div className="Subscribe-desc">
                <h1 className="Subscribe-h1">Subscribe Now</h1>
                <h3 className="Subscribe-h3">Get the updates, offers, tips and enhance your page building experience</h3>
                <div className="Input-subscribe">
                    <input className="Subscribe-Input" placeholder="Your Email"></input>
                    <button className="Subscribe-button">Subscribe</button>
                </div>

            </div>
            <div className="Subscribe-photo">
                <img className="Subscribe-img" src="https://starpng.com/public/uploads/preview/beautiful-young-woman-pointing-up-over-white-background-21549976882v9zwah5emx.png" alt="" />
            </div>
        </div>
    )
}



const Footer = () => {
    return (

        <div className="Footer-outer">
            <div className="Footer-sec1">
                <img className="Footer-Image" src="https://cdn.logojoy.com/wp-content/uploads/2018/08/23155513/18927550-1024x776.png" alt="" />
                <p className="Footer-desc">We are edicated to work with all dynamic features like larvel, customized websites, PHP, SEO etc </p>
                <ul className="Social-footer">
                    <li className="Social-icon"><i class="fa-brands fa-facebook-f"></i></li>
                    <li className="Social-icon"><i class="fa-brands fa-twitter" ></i></li>
                    <li className="Social-icon"><i class="fa-brands fa-instagram" ></i></li>
                    <li className="Social-icon"><i class="fa-brands fa-linkedin-in "></i></li>
                </ul>
            </div>
            <div className="Footer-sec2">
                <ul className="Sec2-ul">
                    <li><h1 className="Sec2-head">Important Links</h1></li>
                    <li>Contact Us</li>
                    <li>Our Blog</li>
                    <li>FAQ</li>
                    <li>Terms & Conditions</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="Footer-sec2">
                <ul className="Sec2-ul">
                    <li><h1 className="Sec2-head">Quick Links</h1></li>
                    <Link to="/Service"><li>Our Service</li></Link>
                    <li>Why Choose Us</li>
                    <Link to="/Mydashboard"><li>My Profile</li></Link>
                    <li>About Us</li>
                    <Link to="/Provider"><li>Join as a provider</li></Link>
                </ul>
            </div>

            <div className="Footer-sec2">
                <ul className="Sec2-ul">
                    <li><h1 className="Sec2-head">Contact info</h1></li>
                    <li><i class="fa-solid fa-phone"></i> 1234</li>
                    <li><i class="fa-solid fa-envelope"></i> abc@abc.com</li>
                    <li><i class="fa-solid fa-location-dot"></i> xyz</li>

                </ul>
            </div>
        </div>
    )
}


const End = () => {
    return (
        <div className="End-card">
            <p className="EndP">Copyright 2022, Websolutions.All Rights Reserved</p>
            <ul className="End-ul">
                <li><img className="End-icon" src="https://entrackr.com/storage/2019/04/Mastercard-1200x600.jpg" alt=""/></li>
                <li><img className="End-icon" src="https://www.investopedia.com/thmb/3H96L9iC_VUhvsqmnypxfEQW4UA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/full-color-800x450-cee226a48bed4177b90351075b332227.jpg" alt=""/></li>
                <li><img className="End-icon" src="https://i0.wp.com/theintactone.com/wp-content/uploads/2019/04/paypal-logo.png?ssl=1" alt=""/></li>
                <li><img className="End-icon" src="data:image/png;base64,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" alt=""/></li>
            </ul>
        </div>
    )
}



const MenuList = ({ Open, Close }) => {
    const [cookies,removeCookie] = useCookies()
    const Token=cookies.jwt2
    const VendorToken=cookies.venjwt
    const[state,setState]=useState(false)
    const ProfileOpen=()=>{
        if(!state){
            setState(true)
        }
        else{
            setState(false)
        }
        
    }
    if (!Open) return null
    else {
        return (
            <div className="Responsive-menu">
                <ul className="Res">
                    <Link to="/"><li className="ResItem">Home</li></Link>
                    <Link to='/AboutUs'><li className="ResItem">About Us</li></Link>
                    <Link to="/Service"><li className="ResItem">Service</li></Link>
                    
                    <Link to="/contact"><li className="ResItem">Contact Us</li></Link>
                </ul>
                <div className="buttonflex2">
                    {/* <div className="Search-block">
                        <input placeholder="Search" className="Search-box2" />
                        <button className="Searchbutton"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div > */}
                    <Link to="/Provider"><button className="hireButton">Provider Joining</button></Link>
                    <Link to="/Login"><button className={Token||VendorToken  ? "userButton-hide" : "userButton"}><i class="fa-solid fa-user"></i></button></Link>
                <img onClick={ProfileOpen} src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=1380&t=st=1682572419~exp=1682573019~hmac=ce813aaccc4d2e8202195a8bbb9a53a4d0e5a9b057dda865cfe06a7ee5d93f9b" alt="" className={Token||VendorToken ? "Profileimg" : "Profileimg-hide"}></img>
                </div>
                <Profile open={state} close={setState}/>

            </div>
        )
    }

}

const Profile=({open,close})=>{
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const Logout=()=>{
        removeCookie("jwt2")
        removeCookie("venjwt")
        window.location.href='/'
    }
    if(!open) return null
    else{
        return(
            <div className="Profile-menu">
                <ul className="Profile-ul">
                    <Link to={cookies.jwt2 ? '/Mydashboard' : '/VendorDashboard'}><li className="Profile-li">My Dashboard</li></Link>
                    <li className="Profile-li2" onClick={Logout}><>Logout</><i class="fa-solid fa-right-from-bracket"></i></li>
                </ul>
            </div>
        )
    }
    
}

const UserDashboard=()=>{
    const[state,setState]=useState(1)
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const[myorders1,setMyorders1]=useState([])
    const[orderdetails1,setorderdetails1]=useState([])
    const[not,setnot]=useState()

    const[Loader,setLoader]=useState(false)

    const token = cookies.jwt2;
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;

    const useremail = myorders1.email

    
    
    useEffect(()=>{ 
        orderss()
    },[])

    const orderss = () => {
        axios.get(`http://localhost:3001/authUser/fetch_email/${userId}`)
        .then((res) => {
            setMyorders1(res.data);
            
        })
      }

    useEffect(()=>{
        const notification = parseInt(localStorage.getItem("userordercount"))
        axios.get(`http://localhost:3001/booking_api/booking_data/${useremail}`)
        .then((res) => {
            setorderdetails1(res.data)
            if(notification  ===  res.data.length || isNaN(notification) || notification >= res.data.length){
                setnot(0)
                console.log(res.data.length);
            }
                else{
                    setnot(res.data.length - notification)
                console.log(res.data.length);}
    })

        },[myorders1,useremail])
   

    const Div=document.querySelector('.Dashboard-right')

    useEffect(()=>{

        if (state === 2){
            setTimeout(()=>{
                Div.scroll(0,10000000)
            },600)
            
        }
        
    },[state,Div])


    if(token){
        return(
            <div>
                <MenuBar/>
                
                <div className="Dashboard-body">
                    <div className="Sidebar">
                        <ul className="Sidebar-ul">
                            <li className={state===1? "Sidebar-liactive":"Sidebar-li"} onClick={()=>setState(1)}><i class="fa-solid fa-user"/><p className="Sidebar-lable">My Profile</p></li>
                            <li className={state===2? "Sidebar-liactive":"Sidebar-li"} onClick={()=>{setState(2);localStorage.setItem("userordercount", orderdetails1.length);setnot(0) }}><i class="fa-solid fa-list"></i><p className="Sidebar-lable">My Orders</p>{not === 0 ? <span/> :<span className="badge badge-danger badge-counter">{not}</span> }</li>
                            <li className={state===3? "Sidebar-liactive":"Sidebar-li"} onClick={()=>setState(3)}><i class="fa-solid fa-clock"></i><p className="Sidebar-lable">Pending Orders</p></li>
                            <li className={state===5? "Sidebar-liactive":"Sidebar-li"} onClick={()=>setState(5)}><i class="fa-solid fa-money-bill"></i><p className="Sidebar-lable">Bills & Payment</p></li>
                            <li className={state===4? "Sidebar-liactive":"Sidebar-li"} onClick={()=>setState(4)}><i class="fa-solid fa-check"></i><p className="Sidebar-lable">Completed Orders</p></li>
                        </ul>
                    </div>
                    <div className="Dashboard-right">
                        <UserProfile State={state}/>
                        <UserOrders State={state} Loader={Loader} setLoader={setLoader}/> 
                    
                    </div>
    
                </div>
            </div>
        )
        
    }
   
    else{
        window.location.href='/Login'
    }
    
}


const VendorDashboard=()=>{
    const { pathname } = useLocation();
    const[state,setState]=useState(1)
    const[vendorName,setVendorName]=useState("")
    const[loading,setLoading]=useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const [not, setnot] = useState(0)
    const [orderdetails, setorderdetails] = useState([])

    const getdata2 = () => {
        const notification = parseInt(localStorage.getItem("ordercount"))
        axios.get("http://localhost:3001/booking_api/booking_data").then((res) => {
            setorderdetails(res.data)
            console.log(res.data.length);
            console.log(notification);
            if (notification === res.data.length ||  isNaN(notification) || notification >= res.data.length) {
                setnot(0)
                console.log(res.data.length);
            }
            else {
                setnot( res.data.length - notification)
                console.log(res.data.length);
            }
        })
    }

    useEffect(() => {
        getdata2()
    }, [])

    useEffect(()=>{
        if(pathname!=="/service"){
            localStorage.removeItem("SearchCategory")
        }
        const fetchData = async() => {
            if(!cookies.venjwt){
              
            Swal.fire({
                title: 'Access denied?',
                text: "Please login!",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok!'
              }).then((result) => {
                if (result.isConfirmed) {
                    
                        window.location.href='/VendorLogin'
                 
                }
              })
            
            }else{
                const response = await axios.get("http://localhost:3001/vendor_Auth",{
                    withCredentials:true
                });

                if(!response.status){
                    removeCookie("venjwt")
                    window.location.href='/VendorLogin'
                }else{
                    setVendorName(response.data.users)
                    setLoading(false)
                }
            }
        }
       fetchData()
    },[pathname,cookies.venjwt,removeCookie])
    if(!loading){
        return(
            <div>
                <h1 className="Welcome-block">Welcome, {vendorName}</h1>
                <MenuBar/>
                
                <div className="Dashboard-body">
                    <div className="Sidebar">
                        <ul className="Sidebar-ul">
                            <li className={state===1? "Sidebar-liactive":"Sidebar-li"} onClick={()=>setState(1)}><i class="fa-solid fa-user"/><p className="Sidebar-lable">My Profile</p></li>
                            <li className={state===2? "Sidebar-liactive":"Sidebar-li"} onClick={() => { localStorage.setItem("ordercount", orderdetails.length); setnot(0);setState(2)}}><i class="fa-solid fa-list"></i><p className="Sidebar-lable">Orders
                            {not === 0 ? <span></span> : <span className="badge badge-danger badge-counter">{not}</span>}</p></li>
                            <li className={state===3? "Sidebar-liactive":"Sidebar-li"} onClick={()=>setState(3)}><i class="fa-solid fa-clock"></i><p className="Sidebar-lable">Pending Orders</p></li>
                            <li className={state===5? "Sidebar-liactive":"Sidebar-li"} onClick={()=>setState(5)}><i class="fa-solid fa-check"></i><p className="Sidebar-lable">Completed Orders</p></li>
                        </ul>
                    </div>
                    <div className="Dashboard-right" >
                        <VendorProfile State={state}/>
                        <VendorOrders State={state}/>
                        <PendingOrders State={state} setState={setState}/>
                    </div>
    
                </div>
                
            </div>
        )
        
    }
    else{
         
    <h2>Loading...</h2>
        
    }
    
}


const AboutUs=()=>{
  
    return(
        <div>
        <Header />
            <MenuBar />
            <MenuList />
            <div className="Service-image">
                <h1 className="Service-heading">About Us</h1>
            </div>
            <div className="Aboutus-body">
                <h1 className="About-us-Heading1">How it works</h1>
                <div className="AboutUs-Sec2">
                    <div className="Aboutus-sec2-1">
                        <img className="Aboutus-sec2-img" src="https://www.nicepng.com/png/detail/299-2992860_completed-order-comments-order-completed-icon.png" alt=""/>
                        <h2 className="Aboutus-sec2-h2">Online Booking</h2>
                        <p className="Aboutus-sec2-p">Order will be placed by users</p>
                    </div>
                    <div className="Aboutus-sec2-1">
                        <img className="Aboutus-sec2-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOMAAADeCAMAAAD4tEcNAAAAgVBMVEX///8AAAD4+Pjy8vL7+/vl5eXw8PDW1tbu7u7R0dHOzs7r6+t8fHzHx8fa2trDw8MXFxeioqJqamqXl5eoqKiKioq1tbWLi4u7u7tJSUk3Nzeurq5RUVGamppwcHBXV1c/Pz9/f39gYGAMDAwmJiYrKyseHh4xMTFsbGxDQ0NTU1NNmln/AAAL2UlEQVR4nN1da2OqPAw+4G0TrxN13jbcdGfb//+B7wFECjRpmkJr3+fjJpBAm3vSP3+sIZzN4/UkxTqez0J7D7aF6ToJqkjWU9dEtYnRJJDjPHNNWkuY1r+giN3YNXktYLRHOEzx4/23fFNwmK1Y10QaYXAhsBgE+8g1oXxMSRym8Ha9zsksBsHINbE8PGuwGAQD1+Ry0NNiMVi4ppeDox6PwbdrgvVx0GQxCLwz7fraLAYX1zTrYqXPY/DqmmhNMFgMEtdE64Gu/UX4pT8gZwrHyTXZWmCxGBxdk62DiMdj4JpuHYyZPPq0IWMmj8+uCdcARzum8ElDcnmMXROuAS6PPimPE5PHpWvCNbBk8ujTWtV3rHL4JHM2TB59ciG5PPoUNOeu1blrwjXA1R0+ydVfJo8vrgmn44nJYhD0XJNOBiWRI8eba9KpGLBZ9CcnwAt05Hh3TTwRBiwGwZNr6knQy+XU4Yc5xw0C5Fi7Jp8Ek+3oS2rnxYjHX9fkk/BhxOPONfkkmH1HP5QH38pJ4YelszXiceuafBK4DnIOP/TjzIhHT9IBJix+uSaeCBPBOnFNPBE69VV1eBO14rP46Zp0MripAJ8C5YziHN8+Iz++enBNuAZCJo9914TrgOdD+mHHFeCF5jzra+F8SH+Eag7NCt0U3tU9MnSkT4UrNyw0WfTFUhWhW/roml4W3rVY9Cm9WkKrMNCjzGMFOoEdz1RjCbrY2bgmlQ2ys+xVcW4NOyKPHvfNUUN0K9d0GoEWvnJNpRlI/odPFZ0yUJJY/hSsyPGqZtFnoZqB0CHgRzYOAUGyfrim0RSE6JXfrfMpfpQ8+pGNw6AOtXoVcJTjS8GiXwFHORRSx79IlQx40GPomrx2gBTQXXz2OCroQ+UsfhTHETGQOSATT+obIDTs7HDzIoY+vr6batGvmE74Jk3sR9PNaj3ZxpupzNWYBS8ecZm1lOn2FWWSaeWJQRB/5stRr0SjUKM+OMyC7aYz3EgIGKwee8X2l5+i4KQrv2oqb/24kYFBPbFKt9PqA9reHnPA1VSSw6G6v9/NS3cP53INT59NMskSRN5J8Ll6JENvDEffKGsODlD+PsjHHKyw1A1lFNcVuT5YOzf4+hvVaC612a1qCN1tXBoGz5TyeNV3oKRiv12VfB5owxxV4VNaO8jCRSndQS5IJcBrUujV57ZLlMaqSJQAvPNGozJiYXV8gF6lGKY/9Arr7DW4hKrRuDVgrXCadXVXSy2gQ90KKqRoQ79i2Q6TGlvxBrhqg5C6q2FhQ1lK7GcVYNOc0QpioVqJNXIMvBvnZt1LV3UeSgKo65/VmvXTNYu86XjQrBHevKSuXS5eVwOk13il9V2bdWsWVXvgbtiUfRhdZxB4bx7yIrU1bYaurZ0ziyqgBIfZ6tI1j8xm41Z57HqtmjUbt4OuZY7JbJy20HnslScmWkXXLBp2/7eB7muW3C9WC2kCs5Ej5uigTLIROjQbcWCOhn1v/F03zTYohgPZIpq+6MQwLXuQKFz+hLw20Ix1bM1q7mNpORt3gmwbkHhpK6Oau5QZ2Tti+cmtIAGoZOuTLNki45E7Rt4cMvc4y16q7HQg+55re6kL78pqlaYjc7cdCOIWvG2PsmvP+W3lWYazExblDsctfikL/r0ei52aBnLf6tmvwhkGYqO6JwK1ASBxUtSO1pkcpyzco7H5qtyK6v4e+ASy1X39SLIpFkC4/V4fK1pAs22WVyulSVEds18W2qc02KBopn25A4Xjyohv8aGj09/bXwRRU0aijlliWkiYgRFbs9GV+gBNNoGQNDbWO5SqTdzAlTKn77GYE4Sz1CbjjvQBR8dHwq+SecVlqGgMONyGZIH1EzJ8IEUssJNQtQzg3YUN77WnJrF+Zdijre1gsEID9VzMRq3SgUapwO9Tt33Al4GXnthhEh/NDo4/aZAOZQIVZZbcqU46UE2fBy5rJiqhnbtW5G27FzyqcCoURZPsMrCIRPEauec8UaEoCwR3i8x+HUE/Dj7xKQzdRurwaM0GDvdKL0TM7C90KkrYnc+8R9uxpkg1m7yEDTXOftAh92ajc2Ggnu8MnSIht10UgdN3TIt0Yw1gW3GgIFdaS6IeQPWG6JEn6mgOOhKk3KinXjmSiCRJPK6R1ou2NSUizkNS0qXhTVBnpSEm+rDNLMEO2RnUSH192VGqD/Yrxeka87aCA58KpThaUehNqhedlRd8HCjVePzJqyIoce/hRl2HVvGtFAbZdU2u5+5zj0QqMSF3Io3Xf/FbCcsBtVSOsV73QWjG5VmveDOK0ULmknR4GyVTRhNbf8ndl19LRuVmOIX11n0UOLKwuRmhKUfGfnArGpEk04vyFwbT+4axnlWwi/kNgZhuz9Ss6G8sdudThWWjRqAeQfTleD8YdTwOK0ydJonYlzEqlP/14xzPB/mDRDPJ5MkZRifVqn0/mZ9pJdwuz+0MZ6+H9UcudXt/VuvDOIKuaOdQlGi6ekskjt71ezVvpxZVkK21R48Pa6lMKZc3OhNVc3n1otl8c1ieVqf4cHgdDyI9EYo6kmWcnyy27hFltP3H6piGJ7Rta0P6KFUUexZtlfqyOU/0DRUNdytd446FrMUWyMBKxVP5MOx9F0WiWi2Ea/VriW1OhntXmCO5YaVZ+ZBdhLaFH3XfmwHSdXXFfpDpO0pfcP2uaNlL1imVaN6Vi8xkwoz1k1J6yJCGEzBLLs8+2pnUnGfDsXh5+gtGCfYVt+Ry/aK7PHjIw6jYzol4pw0NcJFzc59stAkX2g/7DVPIr/4i/yw0ko2TUwozEJNwCbNZAJPW98BN9/Nu7o4QxkYX44bLFEfnPZf3J1k+30sIx3bdUSLEi+2OtRADed12CIvBbbsTAkQ/+p5cCnu9pygajKZ8p3c0n45Hsyh6GvbCfBOIVTV2J+4GIo4/+7/Xy6IMMPBnOPbFjOLn1+VabdNvkQMVhmgqbmESm+mjg2ZWAxtd5bPN9qhoR6rvTzSe8VS3BkPFHJD9JH7ubHBZNF9+K0LvGRrC7xlJsy2bin1IGHay+Fi9tixkZ/GZnPKXPDoI/sql0GwvU6/kqtHkHLfnpffoowpkzPz++/ukub7650DeCE8vFPlocxAdtY5T6sLldl+9ACZXsVIbjMpky55dSEpgyCN/t4KRSmo4ulXKyO1suFZIwEf7oodQNAa81/twlTKucM/fAXQSipw7Gcs2VPUCgOVY9wtvk4zGd00PzqVQnY713tVISLySE3aXhazrPykhSjA4YoRLgA5d8whRIYgjWcmdVSZFIKF7ZG/sup3YARY1oFF4kFpMbIBFOJ27HwPA1kmwi6DPD83xwC5KbHiRwPvFHg2VQWD+NaAk7ZyhBNha2MOhZDamxIH3YifHAkg8LNoCDebAFABQm2rn1DZIg2Dev3xvYdsRKopTFdC3A6inB5Os8oWHbccz8BQ7owLBwibkGrnKwXJG0EN+22ZHCrCIG1bo0IQoOGEI2nJ2jjQXn1hZt+BcR9hnAfM0ose6qGirbpiqQtRbo3Jyfgp5QCnEIiRX5YSkyz9JOhMeYkN5lLouyekrp81K5fpAEZ+R2g73wN8ld6HC0uexMYT1rjrKzbS5bVFZfYD6CGGZIXCrtUvK/93Xqw3lUTys4qO+5mHRZlqAMveiSXVuSiWVT1aYHjbOp8kFyKW+xKY/Mmpp4+gamjVVNcd6GCTK97WNhED2xWTycPwT1LOy1GHHdaV3CX5lVlMmbC0ciNWXr64M431F6D2hcf0KqjOAR0dAeGayoPt0QLpVYMtU9Hn1BibNgLtUkQbsuj8p4TnY0WJ+us2ftDhbuNMvw9FGTC0tDPu92Xi+WW7PLzvI/LvsXs7b5WY+nvX61GjppPtMKze32Iuqa3cWcaOHD31CnWiD+nrOvApi8Lv7TeUIpS5Bixi9RhklsX2Ggz2UHtNjH9NlhKLkxd75DfZR5BXNu1YeGHm5DZoC8B55Y7aLs3HsIU8pe3LIIxfn4P9wQDmO1Gh9zDMBW8RP92dTOMfGUubJKWwWaLqCff3/H6A4lImBk7h/AAAAAElFTkSuQmCC" alt=""/>
                        <h2 className="Aboutus-sec2-h2">Get our experts</h2>
                        <p className="Aboutus-sec2-p">Our experts will reach you to deliver our service</p>
                    </div>
                    <div className="Aboutus-sec2-1">
                        <img className="Aboutus-sec2-img" src="https://cdn-icons-png.flaticon.com/512/1356/1356648.png" alt=""/>
                        <h2 className="Aboutus-sec2-h2">Enjoy our service</h2>
                        <p className="Aboutus-sec2-p">Hope you enjoy our service</p>
                    </div>
                </div>
                <Ad/>
                <div className="Aboutus-content">
                    <img className="Aboutus-content-img" src="https://img.freepik.com/free-vector/hand-drawn-business-communication-illustration_23-2149158973.jpg?w=2000&t=st=1683548764~exp=1683549364~hmac=088755ecc9b08abe2d94f1dd5a45e949b10acd7cee5255f42f3f800c06c04372" alt=""/>
                    <div className="Aboutus-right">
                        <h1 className="About-us-Heading1">Know about us</h1>
                        <p className="Aboutus-ptag">What sets Websolutionus apart, we believe in our commitment to providing actual value to our consumers. In the business, our dedication and quality are unrivaled. We're more than a technology service provider. We care as much about our customer’s achievements as we do about our own, therefore we share business risks with them so they may take chances with technological innovations. We provide the following services.</p>
                        <ul className="Aboutus-ul">
                            <li><i class="fa-solid fa-circle-check"/> Cleaning Service</li>
                            <li><i class="fa-solid fa-circle-check "/> Repair Service</li>
                            <li><i class="fa-solid fa-circle-check "/> Transport Service</li>
                            <li><i class="fa-solid fa-circle-check"/> Plumbing Service</li>
                            <li><i class="fa-solid fa-circle-check"/> AC Service</li>
                            <li><i class="fa-solid fa-circle-check"/> Home Service</li>
                        </ul>
                        <Link to='/contact'><button className="Aboutus-btn">Contact Us</button></Link>
                    </div>
                </div>
            </div>
            <Footer/>
            <End/>
            </div>
    )
}


export { Category, Carosel, Ad, Popular, Join, Store, Testimonials, LatestNews, Subscribe, Footer, End, MenuList, Header, MenuBar,UserDashboard,VendorDashboard,CategoryHome,AboutUs }