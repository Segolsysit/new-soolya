import React from "react";
import './Usercomponents.css'
import { Table, TableBody, TableCell, TableRow, TableHead, Button } from '@mui/material';
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
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


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
           // orders1()
           
            
        },[])

                       
       useEffect(()=>{
      
            axios.get(`http://localhost:3001/booking_api/booking_data/${useremail}`)
            .then((res) => {
                // console.log(res.data);
                setorderdetails(res.data)
            
            }) 
           
       },[myorders])

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
    // const useremail = myorders.Email
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
            
        },[state,token])
       

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
                    
                    <img className="User-img" src="https://img.freepik.com/free-vector/digital-tools-concept-illustration_114360-7118.jpg?w=1380&t=st=1682572354~exp=1682572954~hmac=b5050378427867b9b7e204e07e4b4aa64be5c7e31bcdea1890729d172906f92a" alt=""/>
                    
                    <div className="Vendor-sec1Data">
                        <div>
                    <h2 className="Vendor-data"><i class="fa-solid fa-user"></i></h2>
                    <h2 className="Vendor-data"><i class="fa-solid fa-envelope"></i></h2>
                    </div>
                    <div>
                    
                        
                            <h2 className="Vendor-data">{myorders.Username}</h2>
                            <h2 className="Vendor-data">{myorders.Email}</h2>
                            
                      
                    
                    </div>
                    </div>
                </div>

                <div className="vendor-sec2" onClick={()=>setState(2)}>
                    <h1 className="Count">{count}</h1>
                    <h2 className="Orders">Orders Available</h2>
                </div>

            </div>
        )
    }
    else return null
    
}


const VendorOrders=({State})=>{
     // const [style, setstyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
     const [orderdetails, setorderdetails] = useState([])
     const [cookies, setCookie, removeCookie] = useCookies([]);
     const [notificationCount, setNotificationCount] = useState(0);
     const [vendorDetails, setVendorDetails] = useState(null);
    //  const [otpSent, setOTPSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [open, setOpen] = useState(false);

//   const [token, setToken] = useState('');
  const [error, setError] = useState('');
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
 
     const token = cookies.venjwt;
     const decodedToken = jwt_decode(token);
     const vendorId = decodedToken.id;

     function get_vendor(){

        axios.get(`http://localhost:3001/vendor_Auth/fetch_vendor/${vendorId}`)
        .then((res)=>{
         setVendorDetails(res.data)
        })
     }
 
     const handleOpen = () => {
        setOpen(true)
    }

     const acceptOrder = async(order) => {

        try {
            const res = await axios.post('http://localhost:3001/twilioOtp/send-otp', { mobile:`+91${8220669541}` })
            console.log(res.data.otp);
           
          } catch (err) {
            setError(err.res.data);
          }
        
        // axios.post(`http://localhost:3001/booking_api/pending_orders/${order._id}`,{
        //     vendor_email:vendorDetails.Email,
        //     address: order.address,
        //     street:order.street,
        //     city:order.city,
        //     zip:order.zip,
        //     person:order.person,
        //     number:order.number,
        //     Service:order.Service,
        //     Category: order.Category,
        //     price:order.price,
        //     paymentMethod:order.paymentMethod
        // })
        
        
        // axios.delete(`http://localhost:3001/booking_api/delete_item/${order._id}`)
        // alert("posted")
        // getdata()
    }
 
    
    
 
     const getdata = () => {
         axios.get("http://localhost:3001/booking_api/booking_data").then((res) => {
             setorderdetails(res.data)
         })
     }
     let a = 1;
 
 
     useEffect(() => {
         getdata()
         get_vendor()
     },[])
 
     // function resetNoti() {
     //     setNotificationCount("")
     // }

     useEffect(()=>{
        if (State === 2){
            window.scroll(0,100000)
        }
    },[State])
 
     if(State===2){
        return (
            <div className="container-fluid vendor-container">
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
                                        <StyledTableCell align="center"><button className="Action-btn"  onClick={()=>acceptOrder(data)}>Accept</button></StyledTableCell>
                                    </StyledTableRow>


                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <div>
                    <Modal
                        open={open}
                        // onClose={handleClose}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description"
                    >
                        <Box sx={{ ...style, width: 400 }}>

                            <form >
                               

                                <Button type="submit">submit</Button>
                                

                            </form>


                            {/* <ChildModal /> */}
                        </Box>
                    </Modal>
                </div>

            </div>



        )
     }
         
     }
 
 
     const PendingOrders=({State})=>{
        
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
          
        }));
    
        const [cookies, setCookie, removeCookie] = useCookies([]);

        const [vendorDetails, setVendorDetails] = useState([]);
        const [pendingorders, setPendingorders] = useState([]);
    
        const token = cookies.venjwt;
        const decodedToken = jwt_decode(token);
        const vendorId = decodedToken.id;
        let a=1;
        function get_vendor(){
            axios.get(`http://localhost:3001/vendor_Auth/fetch_vendor/${vendorId}`)
            .then((res)=>{
             setVendorDetails(res.data)
            })
         }
    console.log(vendorDetails);
         function vendor_orders(){
            axios.get(`http://localhost:3001/booking_api/pending_booking_data/${vendorDetails.Email}`)
            .then((res)=>{
                setPendingorders(res.data)
            })
         }
    console.log(pendingorders);
        useEffect(() => {
            get_vendor()
            vendor_orders()
        },[vendorDetails.Email])
    
       
    
    
    
   
        useEffect(()=>{
           if (State === 3){
               window.scroll(0,100000)
           }
       },[State])
    
        if(State===3){
           return (
               <div className="container-fluid vendor-container">
                   <h1>PendingOrder Deatails</h1>
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
                                   pendingorders.map((data, index) => (
   
   
                                       <StyledTableRow key={index}>
                                           <StyledTableCell>{a++}</StyledTableCell>
   
                                           <StyledTableCell align="center"><p>{data.person}</p></StyledTableCell>
                                           <StyledTableCell align="center"><p>{data.user_email}</p></StyledTableCell>
                                           <StyledTableCell align="center"><p>{data.Category}</p> </StyledTableCell>
                                           <StyledTableCell align="center"><p>{data.price}</p></StyledTableCell>
                                           <StyledTableCell align="center"><p>{data.address}</p></StyledTableCell>
                                           <StyledTableCell align="center"><p>{data.number}</p></StyledTableCell>
                                           <StyledTableCell align="center"><p>{data.paymentMethod}</p></StyledTableCell>
                                           <StyledTableCell align="center"><button className="Action-btn">completed</button></StyledTableCell>
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
    


const UserOrders=({State,Loader,setLoader})=>{
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
    },[])

    

    const orders = () => {
        console.log(userId);
        axios.get(`http://localhost:3001/authUser/fetch_email/${userId}`)
        .then((res) => {
            // console.log(res.data);
            setMyorders(res.data);
        
        })
      }

    useEffect(()=>{
        axios.get(`http://localhost:3001/booking_api/booking_data/${useremail}`)
        .then((res) => {
            // console.log(res.data);
            setorderdetails(res.data)

        })
    },[myorders])
        
        
    

    
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
                                        <TableRow style={{border:"2px solid black" ,margin:"0px",textAlign:"center"}}>
                                            <TableCell style={{textAlign:"center",fontWeight:'600'}}>SN</TableCell>
                                            {/* <TableCell>Service</TableCell> */}
                                            <TableCell style={{textAlign:"center",fontWeight:'600'}}>Category</TableCell>
                                            <TableCell style={{textAlign:"center",fontWeight:'600'}}>Price</TableCell>
                                            <TableCell style={{textAlign:"center",fontWeight:'600'}}>Address</TableCell>
                                            <TableCell style={{textAlign:"center",fontWeight:'600'}}>Number</TableCell>
                                            <TableCell style={{textAlign:"center",fontWeight:'600'}}>paymentMethod</TableCell>



                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            orderdetails.map((data, index) => (


                                                <TableRow key={index} style={{backgroundColor:"white"}}>
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

export  {UserProfile,UserOrders,VendorProfile,VendorOrders,PendingOrders}