import React, { useState } from "react";
import { End, Footer, Header, MenuBar } from "../objects";
import './service.css'
import {ServiceCard} from "./ServiceCard";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Service=()=>{
    const { pathname } = useLocation();
        useEffect(() => {
        window.scrollTo(0, 0);
         }, [pathname]);

         

var SearchCategory=localStorage.getItem("SearchCategory")
var searchLocation=localStorage.getItem("Location")

const[Service,setService]=useState("")
const[PriceRange,setPricerange]=useState("")

    return(
        <div>
            <Header/>
            <MenuBar/>
            <div className="Service-image">
                <h1 className="Service-heading">Service</h1>
            </div>
            <div className="Service-sec2">
                <div className="Service-selection">
                    <h3 className="Service-tit">Location</h3>
                    <select className="Service-select" defaultValue={searchLocation!=="Select"?searchLocation:"Select"}>
                        <option>Select</option>
                        <option>Erode</option>
                        <option>Coimbatore</option>
                    </select>
                </div>
                <div className="Service-selection">
                    <h3 className="Service-tit">Category</h3>
                    <select className="Service-select" onChange={(e)=>setService(e.target.value)} defaultValue={SearchCategory!=="Select"?SearchCategory:"Select"}>
                        <option>Select</option>
                        <option>AC Repair</option>
                        <option>Car Service</option>
                        <option>cleaning</option>
                        <option>Painting</option>
                        <option>Pest Control</option>
                        <option>Plumbing</option>
                        <option>Car wash</option>
                    </select>
                </div>
                <div className="Service-selection" onChange={(e)=>setPricerange(e.target.value)}>
                    <h3 className="Service-tit">Price Range</h3>
                    <select className="Service-select">
                        <option>Select</option>
                        <option>High Price</option>
                        <option>Low Price</option>
                    </select>
                </div>
                <div className="Service-selection">
                    <h3 className="Service-tit">Others</h3>
                    <select className="Service-select">
                        <option>Select</option>
                        <option>Ascending</option>
                        <option>Descending</option>
                    </select>
                </div>

            </div>
            <ServiceCard service={Service} Range={PriceRange}/>
             <Footer/>
             <End/>
        </div>
        
    )
}


export default Service