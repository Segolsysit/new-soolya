import React, { useEffect, useState } from "react";
import './object.css'
import './add.css'
import './footer.css'
import '../home.css'
import { Link } from "react-router-dom";



const Header = () => {

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

const MenuBar = () => {

    const [Open, setOpen] = useState(false)
    const [icon, setIcon] = useState(<i class="fa-solid fa-bars"></i>)
    var status = localStorage.getItem("Status")
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

    const Logout = () => {
        localStorage.clear()
        window.location.href = "/login"
    }
    return (
        <div className="Titlebar-sticky">
            <div className="Logo">
                <img className="LogoImage" src="https://cdn.logojoy.com/wp-content/uploads/2018/08/23155513/18927550-1024x776.png" />
                <button className="BurgerBtn" onClick={OpenMenu}>{icon}</button>
            </div>
            <div className="menubar">
                <ul className="menulist">
                    <Link to="/"><li className="Menuitem">Home</li></Link>
                    <li className="Menuitem">About Us</li>
                    <Link to="/service"><li className="Menuitem">Service</li></Link>
                    <li className="Menuitem">Pages</li>
                    <li className="Menuitem">Blog</li>
                    <li className="Menuitem">Contact Us</li>
                </ul>
            </div>
            <div className="buttonflex">
                <div className="Search-block">
                    <input placeholder="Search" className="Search-box" />
                    <button className="Searchbutton"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <Link to="/Provider"><button className="hireButton">Provider Joining</button></Link>
                <button className="hireButton">Hire Now</button>
                <Link to="/Login"><button className={status === "Loggedin" ? "userButton-hide" : "userButton"}><i class="fa-solid fa-user"></i></button></Link>
                <button onClick={Logout} className={status === "Loggedin" ? "LogoutBtn" : "LogoutBtn-hide"}><i class="fa-solid fa-right-from-bracket"></i></button>
            </div>
            <MenuList Open={Open} close={setOpen} />

        </div>
    )
}

const Category = () => {

    const data = [{
        "Name": "Ac Repair",
        "Extras": "5+service",
        "src": "https://cdn-icons-png.flaticon.com/512/2554/2554117.png"
    },
    {
        "Name": "Car Service",
        "Extras": "5+service",
        "src": "https://png.pngtree.com/png-clipart/20191120/original/pngtree-car-repair-line-icon-vector-png-image_5079274.jpg"
    },
    {
        "Name": "Cleaning",
        "Extras": "3+service",
        "src": "https://cdn-icons-png.flaticon.com/512/995/995053.png"
    },
    {
        "Name": "Painting",
        "Extras": "1+service",
        "src": "https://www.pngkey.com/png/full/30-300638_paint-brush-vector-png-painting-icon.png"
    },
    {
        "Name": "Pest Control",
        "Extras": "2+service",
        "src": "https://cdn-icons-png.flaticon.com/512/4295/4295647.png"
    },
    {
        "Name": "Plumbing",
        "Extras": "5+service",
        "src": "https://e7.pngegg.com/pngimages/464/476/png-clipart-plumber-computer-icons-plumbing-home-repair-others-miscellaneous-text.png"
    },

    ]
    return (
        <div className="cardouter">
            {data.map(item => {
                return (
                    <Link to="/service"><div className="card">
                        <img className="icons" src={item.src} />
                        <h3 className="main">{item.Name}</h3>
                        <p className="extras">{item.Extras}</p>
                    </div></Link>



                )
            })
            }
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
        if (localStorage.getItem("Category") != "" && localStorage.getItem("Category") != "undefined") {
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
                {data.map(item => {
                    return (
                        <div className="Carosel-card" onClick={(e) => { setName(item.desc) }}>
                            <img className="Carosel-img" src={item.mainImage} />
                            <div className="Card-body">
                                <div className="Carosel-sec">
                                    <p className="Category-carosel">{item.Category}</p>
                                    <h2 className="Carosel-price">{item.Price}</h2>
                                </div>
                                <h1 className="Carosel-desc">{item.desc}</h1>
                                <div className="Carosel-third">
                                    <div className="Profile">
                                        <img className="profile-img" src={item.dp} />
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
    })

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
        {data.map(item => {
            return (
                <div className="inner-ad">
                    <img className="Ad-img" src={item.image} />
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
            {data.map(item => {
                return (
                    <div className="Carosel-card">
                        <img className="Carosel-img" src={item.mainImage} />
                        <div className="Card-body">
                            <div className="Carosel-sec">
                                <p className="Category-carosel">{item.Category}</p>
                                <h2 className="Carosel-price">{item.Price}</h2>
                            </div>
                            <h1 className="Carosel-desc">{item.desc}</h1>
                            <div className="Carosel-third">
                                <div className="Profile">
                                    <img className="profile-img" src={item.dp} />
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
                <button className="Store-button"><img src="https://www.freepnglogos.com/uploads/google-play-png-logo/google-play-arrow-png-logo-8.png" className="Platform-logo" /><div className="Btn-inside"><h4 className="h4btn">Available on</h4><h2 className="h2btn">Google Play</h2></div></button>
                <button className="Store-button"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/1024px-App_Store_%28iOS%29.svg.png" className="Platform-logo" /><div className="Btn-inside"><h4 className="h4btn">Available on</h4><h2 className="h2btn">App Store</h2></div></button>
            </div>
        </div>
        <div className="Store-img">
            <img className="Store-img" src="https://static.vecteezy.com/system/resources/previews/008/850/474/original/3d-render-mobile-phone-png.png" />
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
                {data.map(item => {
                    return (
                        <div className="Tesi-card">
                            <div className="Testi-reviewbox">
                                <p className="Testi-Review">{item.Review}</p>
                            </div>
                            <div className="Testi-profile">
                                <img src={item.img} className="Profile-img" />
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
                {data.map(item => {
                    return (
                        <div className="Tesi-card">
                            <div className="Testi-reviewbox">
                                <p className="Testi-Review">{item.Review}</p>
                            </div>
                            <div className="Testi-profile">
                                <img src={item.img} className="Profile-img" />
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
                    data.map(item => {
                        return (
                            <div className="NewsCard">
                                <img src={item.img} className="Carosel-img" />
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
                <img className="Subscribe-img" src="https://starpng.com/public/uploads/preview/beautiful-young-woman-pointing-up-over-white-background-21549976882v9zwah5emx.png" />
            </div>
        </div>
    )
}



const Footer = () => {
    return (

        <div className="Footer-outer">
            <div className="Footer-sec1">
                <img className="Footer-Image" src="https://cdn.logojoy.com/wp-content/uploads/2018/08/23155513/18927550-1024x776.png" />
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
                    <li>Our Service</li>
                    <li>Why Choose Us</li>
                    <li>My Profile</li>
                    <li>About Us</li>
                    <li>Join as a provider</li>
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
                <li><img className="End-icon" src="https://entrackr.com/storage/2019/04/Mastercard-1200x600.jpg" /></li>
                <li><img className="End-icon" src="https://www.investopedia.com/thmb/3H96L9iC_VUhvsqmnypxfEQW4UA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/full-color-800x450-cee226a48bed4177b90351075b332227.jpg" /></li>
                <li><img className="End-icon" src="https://i0.wp.com/theintactone.com/wp-content/uploads/2019/04/paypal-logo.png?ssl=1" /></li>
                <li><img className="End-icon" src="data:image/png;base64,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" /></li>
            </ul>
        </div>
    )
}



const MenuList = ({ Open, Close }) => {
    if (!Open) return null
    else {
        return (
            <div className="Responsive-menu">
                <ul className="Res">
                    <Link to="/"><li className="ResItem">Home</li></Link>
                    <li className="ResItem">About Us</li>
                    <Link to="/Service"><li className="ResItem">Service</li></Link>
                    <li className="ResItem">Pages</li>
                    <li className="ResItem">Blog</li>
                    <li className="ResItem">Contact Us</li>
                </ul>
                <div className="buttonflex2">
                    <div className="Search-block">
                        <input placeholder="Search" className="Search-box2" />
                        <button className="Searchbutton"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div >
                    <button className="hireButton">Hire Now</button>
                    <Link to="/Login"><button className="userButton"><i class="fa-solid fa-user"></i></button></Link>
                </div>
            </div>
        )
    }

}

export { Category, Carosel, Ad, Popular, Join, Store, Testimonials, LatestNews, Subscribe, Footer, End, MenuList, Header, MenuBar }