import React, { useState } from "react";
import { Category, End, Footer, Header, MenuBar } from "../objects";
import './service.css'
import {ServiceCard} from "./ServiceCard";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Service=()=>{
    const { pathname } = useLocation();
        useEffect(() => {
            if(window.innerWidth<600&&localStorage.getItem("SubCategory")){
                window.scroll(0,200)
            }
            else{window.scrollTo(0, 0);}
         }, [pathname]);

         
const[Data,setData]=useState([])









const[Service,setService]=useState("Select")
const[PriceRange,setPricerange]=useState("")

useEffect(()=>{
    axios.get("https://backend.kooblu.com/api/fetch_items")
    .then((data)=>{
        setData(data.data)
    })
    
},[])

const[Cat,setCat]=useState("Select")

useEffect(()=>{
    console.log(Cat);
    setService(Cat)
    if(Cat!=="Select"){
        window.scroll(0,400)
    }
    
},[Cat])

    return(
        <div>
            <Header/>
            <MenuBar/>
            <div className="Service-image">
                <h1 className="Service-heading">Service</h1>
            </div>
            <div className="Service-body">
            <Category Cat={Cat} setCat={setCat}/>
            </div>
            <div className="Service-sec2">
                

                
                

            </div>
            <ServiceCard service={Service} Range={PriceRange}/>
             <Footer/>
             <End/>
        </div>
        
    )
}


export default Service