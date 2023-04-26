import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableRow, TableHead } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Orders = () => {

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


    const getdata = () => {
        axios.get("http://localhost:3001/booking_api/booking_data").then((res)=>{
                setorderdetails(res.data)
                setNotificationCount(orderdetails.length)
            })
    }
    let a = 1;


    useEffect(()=>{
        getdata()
        verify()

      
    })

    function resetNoti() {
        setNotificationCount("")
    }


    return (
        <div>
            

               
                            {/* <!-- End of Topbar --> */}
                            <div className="container-fluid">
                                <h1>Order Deatails</h1>
                                <Table className='table-cat'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>yu</TableCell>
                                            <TableCell>Name</TableCell>
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

                                                    <TableCell><p>{data.person}</p></TableCell>
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


                        </div>
    )
}

export default Orders