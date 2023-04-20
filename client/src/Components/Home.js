import React, { useEffect, useState } from "react";
import './home.css'
import {Category,  Carosel,Ad,Popular, Join, Store,Testimonials, LatestNews ,Subscribe,Footer,End,MenuList, Header, MenuBar} from "./objects/objects";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Home=()=>{
    const[count0,setCount0]=useState(0)
    useEffect(()=>{
        if(count0<43434){
        setCount0(count0+2)}
        else{
            setCount0(count0+0)
        }
    })
    const { pathname } = useLocation();
        useEffect(() => {
        window.scrollTo(0, 0);
         }, [pathname]);


    
    return(
        <div>

            <Header/>
            <MenuBar/>
            <MenuList />
            <div className="cover">
        <div className="covercontent">
            <div className="Covertitle">
                <h4 className="secondaryTitle1">Premium Service 24/7</h4>
                <h1 className="Primarytitle">We Provide High Quality Professional Services</h1>
                <h4 className="secondaryTitle2">There are many variations to</h4>
                    <div className="serchblock">
                        <div className="selection">
                        <p className="ptagforsearchbox">I'm looking to..</p>
                        <select className="SelectionBox" >
                            <option>Select Location</option>
                            <option>America</option>
                            <option>India</option>
                        </select>
                        
                        </div>
                        <hr className="solid"></hr>
                        <div className="selection">
                        <p className="ptagforsearchbox">I'm looking to..</p>
                        <select className="SelectionBox">
                            <option>Find Category</option>
                            <option>Cleaning</option>
                            <option>AC Repair</option>
                        </select>
                        </div>
                        <hr className="solid"/>
                        <div>
                            <button className="SearchBtn">search</button>
                        </div>
                    </div>

            </div>
            <div className="CoverPhoto">
                <img src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="coverimage1"/>
                <img src="https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="coverimage2"/>
                <img src="https://images.pexels.com/photos/3438708/pexels-photo-3438708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="coverimage3"/>
                <div className="secondarycontent">
                    <h2 className="secondary">{count0}</h2>
                    <h4 className="teriary">Service Sold</h4>
                </div>
            </div>
        </div>
    </div>

    <div className="Body">
        <div className="category">
            <>
            <h1 className="SubHead">Our Categories</h1>
            <p>There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration</p>
            </>
            <Category/>
        </div>
        <div className="Featured">
            <>
            <h1 className="SubHead">Featured Services</h1>
            <p>There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration</p>
            </>
            <Carosel/>
        </div>
        <Ad/>
        <div className="Popular-services">
        <>
            <h1 className="SubHead">Popular Services</h1>
            <p>There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration</p>
            </>
            <Popular/>
        </div>
        
        <div className="joinus">
            <Join/>
        </div>
        <Store/>
        <Testimonials/>
        <LatestNews/>
        <Subscribe/>
        <Footer/>
        <End/>
    </div>
   
    
    </div>
    )
}




export default Home