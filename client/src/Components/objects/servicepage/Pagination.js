import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Servicecard.css"

const Pagination=({TotalPost,postPer,Navigate,Color,currentPage})=>{

    const [Bg,setBg]=useState("dorgerBlue")



    const PageNumber=[]
    for(let i=1;i<=Math.ceil(TotalPost/postPer);i++){
        PageNumber.push(i)
    }

    console.log(PageNumber);

    return(
        <div className="PaginateDiv">
            {PageNumber.map((item,index)=>{
                return(
                    
                        <button className={item==currentPage ?'active':'' } key={index}  onClick={()=>Navigate(item)}>{item}</button>
                )
            })}
        </div>
    )
}


export default Pagination