import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Servicecard.css"

const Pagination=({TotalPost,postPer,Navigate,Color,currentPage})=>{

    const [Bg,setBg]=useState("dorgerBlue")

    const ratio=(TotalPost/postPer)

    const Pagenumber=[]
    for(let i=1;i<=Math.ceil(ratio);i++){
        if((ratio)>1){
            Pagenumber.push(i)
        }
        else if((TotalPost/postPer)<1){
            Pagenumber.push(1)
        }
    }

    // console.log(Pagenumber);

    return(
        <div className="PaginateDiv">
            {Pagenumber.map((item,index)=>{
                return(
                    
                        <button className={item===currentPage ?'active':'' } key={index}  onClick={()=>Navigate(item)}>{item}</button>
                )
            })}
        </div>
    )
}


export default Pagination