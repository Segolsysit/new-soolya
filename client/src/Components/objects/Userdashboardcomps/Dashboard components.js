import React from "react";
import './Usercomponents.css'
import { Table, TableBody, TableCell, TableRow, TableHead } from '@mui/material';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from 'jwt-decode';
import { useLocation } from "react-router-dom";

const UserProfile=({State})=>{
    const [orderdetails,setorderdetails] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [myorders,setMyorders] = useState([])
    const token = cookies.jwt2;
    const[state,setState]=useState(State)
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;
    const[count,setCount]=useState(0)
    const[dummy,setDummy]=useState(0)
    const useremail = myorders.email
    const { pathname } = useLocation();
        useEffect(() => {
        window.scrollTo(0, 0);
        
         }, [{pathname}]);

        
        setTimeout(()=>{
            setState(2)

        },1000)
        
        
        useEffect(()=>{
            axios.get(`http://localhost:3001/authUser/fetch_email/${userId}`)
            .then((res) => {
                console.log(res.data);
                setMyorders(res.data)
            })
            axios.get(`http://localhost:3001/booking_api/booking_data/${useremail}`)
            .then((res) => {
                console.log(res.data);
                setorderdetails(res.data)
            
            })            // orders1()
            
        },[state])
       

        useEffect(()=>{
            if(count<orderdetails.length){
                setCount(count+1)

            }
        })
    
        const orders = () => {
            console.log(userId);
           
          }


              
    
    

    if(State===1){
        return(
            <div className="User-Screen">
                <div className="User-sec1">
                    <img className="User-img" src="https://images.pexels.com/photos/1586996/pexels-photo-1586996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt=""/>
                    <div className="User-sec1Data">
                        <div>
                    <h2 className="User-data"><i class="fa-solid fa-user"></i></h2>
                    <h2 className="User-data"><i class="fa-solid fa-phone"></i></h2>
                    <h2 className="User-data"><i class="fa-solid fa-envelope"></i></h2>
                    </div>
                    <div>
                    <h2 className="User-data">Human</h2>
                    <h2 className="User-data">1234567890</h2>
                    <h2 className="User-data">human@gmail.com</h2>
                    </div>
                    </div>
                </div>

                <div className="User-sec2" onClick={()=>setState(2)}>
                    <h1 className="Count">{count}</h1>
                    <h2 className="Orders">Orders Made</h2>
                </div>

            </div>
        )
    }
    else return null
    
}

const UserOrders=({State})=>{
    const [orderdetails,setorderdetails] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [myorders,setMyorders] = useState([])

    const token = cookies.jwt2;
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;

    const useremail = myorders.email
    
    useEffect(()=>{
        orders()
        // orders1()
    },[State])

    const orders = () => {
        console.log(userId);
        axios.get(`http://localhost:3001/authUser/fetch_email/${userId}`)
        .then((res) => {
            console.log(res.data);
            setMyorders(res.data)
        })
        axios.get(`http://localhost:3001/booking_api/booking_data/${useremail}`)
        .then((res) => {
            console.log(res.data);
            setorderdetails(res.data)

        })
      }

    //  console.log(orderdetails);

    // const orders1 = ()=>{
    //     axios.get(`http://localhost:3001/booking_api/booking_data/${useremail}`)
    //     .then((res) => {
    //         console.log(res.data);
    //         setorderdetails(res.data)
    //     })
    // }

    
    // const verify = ()=>{
    //     if(aemail === null || apassword === null){
    //         nav("/admin")
    //     }
    // }

    // const changeStyle = () => {
    //     if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
    //         setstyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled")
    //     }
    //     else {
    //         setstyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
    //     }
    // }

    // const changeStyle1 = () => {
    //     if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
    //         setstyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1")
    //     }
    //     else {
    //         setstyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
    //     }
    // }

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
                                            {/* <TableCell>Service</TableCell> */}
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

                                                    {/* <TableCell><p>{data.Service}</p></TableCell> */}
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