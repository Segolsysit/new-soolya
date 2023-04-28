import React, { useState } from "react";
import { End, Footer, Header, MenuBar } from "../objects";
import './service.css'
import {ServiceCard} from "./ServiceCard";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Service=()=>{
    const { pathname } = useLocation();
        useEffect(() => {
        window.scrollTo(0, 0);
         }, [pathname]);

         
const[Data,setData]=useState([])







var SearchCategory=localStorage.getItem("SearchCategory")
var searchLocation=localStorage.getItem("Location")

const[Service,setService]=useState("")
const[PriceRange,setPricerange]=useState("")

useEffect(()=>{
    axios.get("http://localhost:3001/api/fetch_items")
    .then((data)=>{
        setData(data.data)
    })
    
},[])

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
                    <select className="Service-select" defaultValue={SearchCategory!=="Select" ? SearchCategory : "Select"} onChange={(e)=>setService(e.target.value)} >
                    <option>Select</option>

                        {
                            Data.map((item,index)=>{

                                return(
                                    
                                    <option key={index}>{item.catagorySetup}</option>
    
                                )

 
                            })
                        }
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