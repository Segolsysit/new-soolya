import React, { useEffect, useState } from "react";
import './home.css'
import { Carosel, Ad, Popular, Join, Store, Subscribe, Footer, End, MenuList, Header, MenuBar, CategoryHome } from "./objects/objects";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import Cookies from 'universal-cookie';

axios.defaults.baseURL = 'https://www.backend.kooblu.com';
axios.defaults.withCredentials = true;

const Home = () => {
    // console.log(window.innerWidth);
    const [count0, setCount0] = useState(0)
    const [Data, setData] = useState([])
    const Navigate = useNavigate()
    // const [cookies, setCookie, removeCookie] = useCookies(['name']);
    const cookies = new Cookies();


    // const tok = cookies.jwt2;

    useEffect(() => {
        if (count0 < 1000) {
            setCount0(count0 + 2)
        }
        else {
            setCount0(count0 + 0)
        }
    }, [count0])
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        if (pathname !== "/service") {
            localStorage.removeItem("SubcategoryID")
            localStorage.removeItem("SubCategory")
        }
    }, [pathname])


    const [ID, setID] = useState(null)
    const [SelectCategory, setCategory] = useState("Select")
    const search = () => {
        // localStorage.setItem("Location",Location)
        if (SelectCategory === "Select") {
            toast.error("Select a category", {
                position: "top-center",
            })
        }
        else {
            localStorage.setItem("SubCategory", SelectCategory)
            localStorage.setItem("SubcategoryID", ID)
            Navigate("/service")
            if (window.innerWidth < 600) {
                window.scroll(0, 600)
            }
        }
    }

    useEffect(() => {
        axios.get("https://www.backend.kooblu.com/api/fetch_items")
            .then((data) => {
                setData(data.data)
            })
        //    console.log(cookies.jwt2);
        console.log(cookies.get('jwt2'));
    }, [])
    // console.log(cookies.jwt2);/
    return (
        <div>

            <Header />
            <MenuBar />
            <MenuList />
            <div className="cover">
                <div className="covercontent">
                    <div className="Covertitle">
                        <h4 className="secondaryTitle1">Premium Service 24/7</h4>
                        <h1 className="Primarytitle">We Provide High Quality Professional Services</h1>
                        <h4 className="secondaryTitle2">There are many variations to</h4>
                        {/* <div className="Div-select"> */}
                        <div className="serchblock">

                            {/* <div className="selection">
                        <p className="ptagforsearchbox">I'm looking to..</p>
                        <select className="SelectionBox">
                            <option>Select Location</option>
                            <option>America</option>
                            <option>India</option>
                        </select>
                        </div> */}


                            <hr className="solid"></hr>
                            <div className="selection">
                                <p className="ptagforsearchbox">I'm looking to..</p>
                                <select className="SelectionBox" onChange={(e) => {
                                    setCategory(e.target.value)
                                    setID(e.target.options.selectedIndex - 1)
                                }}>
                                    <option value="Find Category">Find Category</option>

                                    {
                                        Data.map((item, index) => {
                                            return (

                                                <option key={index}>{item.catagorySetup}</option>

                                            )


                                        })
                                    }
                                </select>
                            </div>
                            <hr className="solid" />
                            <button className="SearchBtn" onClick={search}>search</button>

                        </div>
                        {/* </div> */}

                    </div>
                    <div className="CoverPhoto">
                        <img src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="coverimage1" />
                        
                        <img src="https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="coverimage2" />
                        <img src="https://images.pexels.com/photos/3438708/pexels-photo-3438708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="coverimage3" />
                        <div className="secondarycontent">
                            <h2 className="secondary">{count0}</h2>
                            <h4 className="teriary">Service Sold</h4>
                        </div>

                    </div>

                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,96L120,117.3C240,139,480,181,720,181.3C960,181,1200,139,1320,117.3L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
                </div>
                <div className="Body">
                <div className="category">
                    <>
                        <h1 className="SubHead">Our Categories</h1>
                        <p>There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration</p>
                    </>
                    <CategoryHome />
                </div>
                <div className="Featured">
                    <>
                        <h1 className="SubHead">Featured Services</h1>
                        <p>There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration</p>
                    </>
                    <Carosel />
                </div>
                <Ad />
                <div className="Popular-services">
                    <>
                        <h1 className="SubHead">Popular Services</h1>
                        <p>There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration</p>
                    </>
                    <Popular />
                </div>

                <div className="joinus">
                    <Join />
                </div>
                <Store />
                <Subscribe />
                <Footer />
                <End />
            </div>


        </div>
    )
}




export default Home