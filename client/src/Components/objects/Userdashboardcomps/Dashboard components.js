import React from "react";
import './Usercomponents.css'
import { Table, TableBody, TableCell, TableRow, TableHead } from '@mui/material';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from 'jwt-decode';
import { useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import  { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';




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
                // console.log(res.data);
                setMyorders(res.data)
            })
            axios.get(`http://localhost:3001/booking_api/booking_data/${useremail}`)
            .then((res) => {
                // console.log(res.data);
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


            //   console.log(myorders);
    
    

    if(State===1){
        return(
            <div className="User-Screen">
                <div className="User-sec1">
                    <>
                    <img className="User-img" src="https://img.freepik.com/free-vector/digital-tools-concept-illustration_114360-7118.jpg?w=1380&t=st=1682572354~exp=1682572954~hmac=b5050378427867b9b7e204e07e4b4aa64be5c7e31bcdea1890729d172906f92a" alt=""/>
                    </>
                    <div className="User-sec1Data">
                        <div>
                    <h2 className="User-data"><i class="fa-solid fa-user"></i></h2>
                    <h2 className="User-data"><i class="fa-solid fa-phone"></i></h2>
                    <h2 className="User-data"><i class="fa-solid fa-envelope"></i></h2>
                    </div>
                    <div>
                    
                        
                            <h2 className="User-data">{myorders.firstName}  {myorders.lastName}</h2>
                            <h2 className="User-data">{myorders.phoneNumber}</h2>
                            <h2 className="User-data">{myorders.email}</h2>
                            
                      
                    
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

const VendorProfile=({State})=>{
    const [orderdetails,setorderdetails] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [myorders,setMyorders] = useState([])
    const token = cookies.venjwt;
    const[state,setState]=useState(State)
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;
    const[count,setCount]=useState(0)
    const[dummy,setDummy]=useState(0)
    const useremail = myorders.Email
    const { pathname } = useLocation();
        useEffect(() => {
        window.scrollTo(0, 0);
        
         }, [{pathname}]);

        
        setTimeout(()=>{
            setState(2)

        },1000)
        
        
        useEffect(()=>{
            axios.get(`http://localhost:3001/vendor_Auth/fetch_vendor/${userId}`)
            .then((res) => {
                console.log(res.data);
                setMyorders(res.data)
            })
            
                axios.get("http://localhost:3001/booking_api/booking_data")
                .then((res) => {
                        console.log(res.data);
                        setorderdetails(res.data)
                    })
                 // orders1()
            
        },[state])
       

        useEffect(()=>{
            if(count<orderdetails.length){
                setCount(count+1)

            }
        })
    
        const orders = () => {
            console.log(userId);
           
          }


              console.log(myorders);
    
    

    if(State===1){
        return(
            <div className="User-Screen">
                <div className="Vendor-sec1">
                    <>
                    <img className="User-img" src="https://img.freepik.com/free-vector/digital-tools-concept-illustration_114360-7118.jpg?w=1380&t=st=1682572354~exp=1682572954~hmac=b5050378427867b9b7e204e07e4b4aa64be5c7e31bcdea1890729d172906f92a" alt=""/>
                    </>
                    <div className="Vendor-sec1Data">
                        <div>
                    <h2 className="User-data"><i class="fa-solid fa-user"></i></h2>
                    <h2 className="User-data"><i class="fa-solid fa-envelope"></i></h2>
                    </div>
                    <div>
                    
                        
                            <h2 className="User-data">{myorders.Username}</h2>
                            <h2 className="User-data">{myorders.Email}</h2>
                            
                      
                    
                    </div>
                    </div>
                </div>

                <div className="vendor-sec2" onClick={()=>setState(2)}>
                    <h1 className="Count">{count}</h1>
                    <h2 className="Orders">Orders available</h2>
                </div>

            </div>
        )
    }
    else return null
    
}


const VendorOrders=({State})=>{
     // const [style, setstyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
     const [orderdetails, setorderdetails] = useState([])
     
     const [notificationCount, setNotificationCount] = useState(0);
     const nav = useNavigate()
 
     const StyledTableCell = styled(TableCell)(({ theme }) => ({
         [`&.${tableCellClasses.head}`]: {
             backgroundColor: theme.palette.common.black,
             color: theme.palette.common.white,
         },
         [`&.${tableCellClasses.body}`]: {
             fontSize: 14,
             border: 0,
         },
     }));
 
     const StyledTableRow = styled(TableRow)(({ theme }) => ({
         '&:nth-of-type(odd)': {
             backgroundColor: theme.palette.action.hover,
         },
         // hide last border
         // '&:last-child td, &:last-child th': {
         //     border: 0,
         // },
     }));
 
 
     
 
    
 
     const getdata = () => {
         axios.get("http://localhost:3001/booking_api/booking_data").then((res) => {
             setorderdetails(res.data)
         })
     }
     let a = 1;
 
 
     useEffect(() => {
         getdata()
         
     },[])
 
     // function resetNoti() {
     //     setNotificationCount("")
     // }
 
     if(State===2){
        return (
            <div className="container-fluid">
                <h1>Order Deatails</h1>
                <TableContainer component={Paper} style={{padding:"20px",alignItems:"center",justifyContent:"center"}}>
                    <Table className='table-cat' style={{margin:"0px"}}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">SN</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">Category</StyledTableCell>
                                <StyledTableCell align="center">Price</StyledTableCell>
                                <StyledTableCell align="center">Address</StyledTableCell>
                                <StyledTableCell align="center">Number</StyledTableCell>
                                <StyledTableCell align="center">paymentMethod</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>



                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                orderdetails.map((data, index) => (


                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{a++}</StyledTableCell>

                                        <StyledTableCell align="center"><p>{data.person}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.user_email}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.Category}</p> </StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.price}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.address}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.number}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.paymentMethod}</p></StyledTableCell>
                                        <StyledTableCell align="center"><button className="Action-btn">Accept</button></StyledTableCell>
                                    </StyledTableRow>


                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>



        )
     }
         
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
            // console.log(res.data);
            setMyorders(res.data);
            orders1()
        })
      }

    const orders1 = ()=>{
        axios.get(`http://localhost:3001/booking_api/booking_data/${useremail}`)
        .then((res) => {
            // console.log(res.data);
            setorderdetails(res.data)

        })
    }

    
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
                                <Table className='table-cat' style={{margin:"40px 0px 0px 0px"}}>
                                    <TableHead>
                                        <TableRow style={{border:"2px solid black"}}>
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

export  {UserProfile,UserOrders,VendorProfile,VendorOrders}