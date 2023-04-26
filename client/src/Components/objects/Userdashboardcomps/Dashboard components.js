import React from "react";
import './Usercomponents.css'
import { Button, Table, TableBody, TableCell, TableRow, TableHead } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";

const UserProfile=({State})=>{
    const Navigate=useNavigate();
    const { pathname } = useLocation();
        useEffect(() => {
        window.scrollTo(0, 0);
         }, [pathname]);
    if(State===1){
        return(
            <div className="User-Screen">
                <div className="User-sec1">
                    <img className="User-img" src="https://images.pexels.com/photos/1586996/pexels-photo-1586996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt=""/>
                    <div className="User-sec1Data">
                        <div>
                    <h2 className="User-data">Name:</h2>
                    <h2 className="User-data">Phone:</h2>
                    <h2 className="User-data">Mail_id:</h2>
                    </div>
                    <div>
                    <h2 className="User-data">Human</h2>
                    <h2 className="User-data">1234567890</h2>
                    <h2 className="User-data">human@gmail.com</h2>
                    </div>
                    </div>
                </div>

            </div>
        )
    }
    else return null
    
}

const UserOrders=({State})=>{
    const [style, setstyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
    const [orderdetails,setorderdetails] = useState([])
    const aemail = localStorage.getItem("adminemail")
    const apassword = localStorage.getItem("adminpassword");
    const [notificationCount, setNotificationCount] = useState(0);
    const nav = useNavigate()


    const verify = ()=>{
        if(aemail === null || apassword === null){
            nav("/admin")
        }
    }

    const changeStyle = () => {
        if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setstyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled")
        }
        else {
            setstyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    }

    const changeStyle1 = () => {
        if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setstyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1")
        }
        else {
            setstyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    }

    // const getdata = () => {
    //     axios.get("http://localhost:3001/booking_api/booking_data").then((res)=>{
    //             setorderdetails(res.data)
    //             setNotificationCount(orderdetails.length)
    //         })
    // }
    let a = 1;


    // useEffect(()=>{
    //     getdata()
    //     verify()

      
    // })

    // function resetNoti() {
    //     setNotificationCount("")
    // }
if(State===2){
    return(
        <div className="container-fluid">
                                <Table className='table-cat'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>SN</TableCell>
                                            <TableCell>Service</TableCell>
                                            <TableCell>Category</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Address</TableCell>
                                            <TableCell>Number</TableCell>
                                            <TableCell>paymentMethod</TableCell>



                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            orderdetails.map((data, index) => (


                                                <TableRow key={index}>
                                                    <TableCell>{a++}</TableCell>

                                                    <TableCell><p>{data.Service}</p></TableCell>
                                                    <TableCell><p>{data.Category}</p> </TableCell>
                                                    <TableCell><p>{data.price}</p></TableCell>
                                                    <TableCell><p>{data.address}</p></TableCell>
                                                    <TableCell><p>{data.number}</p></TableCell>
                                                    <TableCell><p>{data.paymentMethod}</p></TableCell>
                                                </TableRow>


                                            ))
                                         }
                                    </TableBody>
                                </Table>

                            </div>


                    
    )
}
else return null
    
}

export  {UserProfile,UserOrders}