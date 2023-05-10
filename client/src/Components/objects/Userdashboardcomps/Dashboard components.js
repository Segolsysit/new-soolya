import React from "react";
import './Usercomponents.css'
import { Table, TableBody, TableCell, TableRow, TableHead, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from 'jwt-decode';
import { useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Multiselect from 'multiselect-react-dropdown';
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

//completed orders
const UserProfile = ({ State }) => {
    const [orderdetails, setorderdetails] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [myorders, setMyorders] = useState([])
    const token = cookies.jwt2;
    const [state, setState] = useState(State)
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;
    const [count, setCount] = useState(0)
   // const [dummy, setDummy] = useState(0)
    const useremail = myorders.email
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);

    }, [{ pathname }]);


    setTimeout(() => {
        setState(2)

    }, 1000)


    useEffect(() => {
        axios.get(`http://localhost:3001/authUser/fetch_email/${userId}`)
            .then((res) => {
                // console.log(res.data);
                setMyorders(res.data)
            })
        // orders1()


    }, [setMyorders])


    useEffect(() => {

        axios.get(`http://localhost:3001/booking_api/booking_data/${useremail}`)
            .then((res) => {
                // console.log(res.data);
                setorderdetails(res.data)

            })

    }, [myorders])

    useEffect(() => {
        if (count < orderdetails.length) {
            setCount(count + 1)

        }
    })

    // const orders = () => {
    //     console.log(userId);

    // }


    //   console.log(myorders);



    if (State === 1) {
        return (
            <div className="User-Screen">
                <div className="User-sec1">
                    <>
                        <img className="User-img" src="https://img.freepik.com/free-vector/digital-tools-concept-illustration_114360-7118.jpg?w=1380&t=st=1682572354~exp=1682572954~hmac=b5050378427867b9b7e204e07e4b4aa64be5c7e31bcdea1890729d172906f92a" alt="" />
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

                <div className="User-sec2" onClick={() => setState(2)}>
                    <h1 className="Count">{count}</h1>
                    <h2 className="Orders">Orders Made</h2>
                </div>

            </div>
        )
    }
    else return null

}

const VendorProfile = ({ State }) => {
    const [orderdetails, setorderdetails] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [myorders, setMyorders] = useState([])
    const token = cookies.venjwt;
    const [state, setState] = useState(State)
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;
    const [count, setCount] = useState(0)
    //const [dummy, setDummy] = useState(0)
    // const useremail = myorders.Email
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);

    }, [{ pathname }]);


    setTimeout(() => {
        setState(2)

    }, 1000)


    useEffect(() => {
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

        

    }, [setMyorders,setorderdetails])


    useEffect(() => {
        if (count < orderdetails.length) {
            setCount(count + 1)

        }
    })

    // const orders = () => {
    //     console.log(userId);

    // }





    if (State === 1) {
        return (
            <div className="User-Screen">
                <div className="Vendor-sec1">

                    <img className="User-img" src="https://img.freepik.com/free-vector/digital-tools-concept-illustration_114360-7118.jpg?w=1380&t=st=1682572354~exp=1682572954~hmac=b5050378427867b9b7e204e07e4b4aa64be5c7e31bcdea1890729d172906f92a" alt="" />

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

                <div className="vendor-sec2" onClick={() => setState(2)}>
                    <h1 className="Count">{count}</h1>
                    <h2 className="Orders">Orders Available</h2>
                </div>

            </div>
        )
    }
    else return null

}


const VendorOrders = ({ State }) => {
    // const [style, setstyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
    const [orderdetails, setorderdetails] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies([]);
    //const [notificationCount, setNotificationCount] = useState(0);
    const [vendorDetails, setVendorDetails] = useState(null);
    //  const [otpSent, setOTPSent] = useState(false);
    const [orders, setOrderId] = useState('');
    const [veriyfyOtp, setVerifyOtp] = useState('');
    const [open, setOpen] = useState(false);
    const[pending_order,setPendingorders]=useState([])



    //   const [token, setToken] = useState('');
    const [error, setError] = useState('');
    //const nav = useNavigate()

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
    // const [options2, setoptions2] = useState([]);
    // const [selected, setSelected] = useState([]);

//    function onSelect1(selectedList, selectedItem) {
//         setSelected(selectedList)
//         console.log(selectedList);
//         listofwork()
//     };
    
//     function onRemove(selectedList, removedItem) {
//         setSelected(selectedList)
//         console.log(selectedList);
//         listofwork()

//     }
    //console.log(selected);
    // const options1 = [

    function get_vendor() {

        axios.get(`http://localhost:3001/vendor_Auth/fetch_vendor/${vendorId}`)
            .then((res) => {
                setVendorDetails(res.data)
            })
    }

    const handleOpen = () => {
        setOpen(true)
    }
    // const handleOpen2 = () => {
    //     setOpen2(true)
    // }
    const handleClose = () => {
        setOpen(false)
    }
    // const handleClose2 = () => {
    //     setOpen2(false)
    // }
    const acceptOrder = async (order) => {

        try {

            console.log(order.number);
            const response = await axios.post('http://localhost:3001/OTP/sendotp', { phoneNumber: order.number }, { withCredentials: true })
            console.log(response.data.message);
            setOrderId(order)
            handleOpen()

        } catch (err) {
            console.log(err.response.data.message);
        }


    }



    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3001/OTP/verifyotp', { phoneNumber: orders.number, otp: veriyfyOtp }, { withCredentials: true })
            console.log(response.data.message)
            setError('');
            if (response.data.message === "OTP verified successfully") {

                await axios.post(`http://localhost:3001/booking_api/pending_orders/${orders._id}`, {
                    vendor_email: vendorDetails.Email,
                    user_email: orders.user_email,
                    address: orders.address,
                    street: orders.street,
                    city: orders.city,
                    zip: orders.zip,
                    person: orders.person,
                    number: orders.number,
                    Service: orders.Service,
                    Category: orders.Category,
                    price: orders.price,
                    paymentMethod: orders.paymentMethod
                })
                axios.delete(`http://localhost:3001/booking_api/delete_item/${orders._id}`)
                    .then(() => {
                        alert("posted")
                        getdata()
                        handleClose()
                    })

            } else {
                console.log("invalid token");

            }


        } catch (error) {
            console.log(error.response.data.message);
            // setError('Invalid or expired OTP');
        }

    }



    const getdata = () => {
        axios.get("http://localhost:3001/booking_api/booking_data").then((res) => {
            setorderdetails(res.data)
        })
    }
    let a = 1;

    // const listofwork = () => {
    //     axios.get("http://localhost:3001/sub_api/new_fetch_items").then((res) => {
    //         setoptions2(res.data)
    //         console.log(res.data);
    //     })
    // }

    useEffect(() => {
        getdata()
        get_vendor()
        // listofwork()
    }, [])

    // function resetNoti() {
    //     setNotificationCount("")
    // }

    useEffect(() => {
        if (State === 2) {
            window.scroll(0, 100000)
        }
    }, [State])

    // const value1 = ()=>{
    //     console.log(selected);
    // }
    // const [resendOTP, setResendOTP] = useState(false);
    // const [timer, setTimer] = useState(null);
    // const [timeRemaining, setTimeRemaining] = useState(0);
    // const [otpSent, setOTPSent] = useState(false);
    // const [open2, setOpen2] = useState(false);
    // const [error, setError] = useState('');
  
    // const completeOtp = async() => {
    //     setResendOTP(false);
    //     clearInterval(timer);
    //     try {
    //         // console.log(orders.number);
    //       const response = await axios.post('http://localhost:3001/doneOtp/service-done-otp', {
    //         phoneNumber: orders.number
    //       });
    //       console.log(response.data.message);
    //       handleOpen2()
    //       setOTPSent(true);
    //       setTimeRemaining(120);
    //       setTimer(setInterval(() => {
    //         setTimeRemaining(prevTime => prevTime - 1);
    //       }, 1000));
    //     } catch (error) {
    //         console.log(error.response.data.message);
    //     //   setError(error.response.data.message);
    //     }
    // }

    // const total = selected.reduce((acc,curr)=> acc + curr.Price, 0)
    if (State === 2) {
        return (
            <div className="container-fluid vendor-container">
                <h1>Order Details</h1>
                <TableContainer component={Paper} style={{ padding: "20px", alignItems: "center", justifyContent: "center" }}>
                    <Table className='table-cat' style={{ margin: "0px" }}>
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
                                        <StyledTableCell align="center"><button className="Action-btn" onClick={() => acceptOrder(data)}>Accept</button></StyledTableCell>
                                    </StyledTableRow>


                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description"
                    >
                        <Box sx={{ ...style, width: 400 }}>

                            <form onSubmit={handleVerifyOtp}>

                                <div >
                                    <TextField
                                        type='text'
                                        id="outlined-basic"
                                        label="otp"
                                        value={veriyfyOtp}
                                        variant="outlined"
                                        autoComplete="off"
                                        onChange={e => setVerifyOtp(e.target.value)}
                                    /><br /><br />

                                    <Button type="submit">verifyOtp</Button>
                                    <Button type="submit" onClick={handleClose}>cancel</Button>

                                </div>



                            </form>


                            {/* <ChildModal /> */}
                        </Box>
                    </Modal>
                </div>

            </div>



        )
    }

    // if (State === 4) {

    //     return (
    //         <div className="container-fluid vendor-container">
    //             <h1>List of Works</h1>
    //             <div>
    //             <Multiselect 
    //                 options={options2} // Options to display in the dropdown
    //                 // selectedValues={options2.selectedValue} // Preselected value to persist in dropdown
    //                 onSelect={onSelect1} // Function will trigger on select event
    //                 onRemove={onRemove} // Function will trigger on remove event
    //                 displayValue={"Subcategory"} // Property name to display in the dropdown options
    //                 // displayValue={"Price"}
    //             />
    //             </div>
                
    //             <TableContainer component={Paper} style={{ padding: "20px", alignItems: "center", justifyContent: "center" }}>
    //                 <Table className='table-cat' style={{ margin: "0px" }}>
    //                     <TableHead>
    //                         <TableRow>
    //                             <StyledTableCell align="center">SN</StyledTableCell>
    //                             <StyledTableCell align="center">Work</StyledTableCell>
    //                             <StyledTableCell align="center">Price</StyledTableCell>
    //                         </TableRow>
    //                     </TableHead>
    //                     <TableBody>
    //                         {selected.map((data, index) => (
    //                                 <StyledTableRow key={index}>
    //                                     <StyledTableCell align="center">{a++}</StyledTableCell>

    //                                     <StyledTableCell align="center"><p>{data.Subcategory}</p></StyledTableCell>
    //                                     <StyledTableCell align="center"><p>{data.Price}</p></StyledTableCell>
    //                                 </StyledTableRow>
    //                             ))
    //                         }
    //                         <StyledTableRow>
    //                             <StyledTableCell align="center" colspan="2">Total</StyledTableCell>
    //                             {/* <StyledTableCell align="center">{total}<br/><button>confirm</button></StyledTableCell> */}
    //                         </StyledTableRow>
                            
    //                     </TableBody>
    //                 </Table>
    //             </TableContainer>
    //             {/*                    
    //                     <MultiSelect
    //                      {...options2.map((data)=>(
    //                     options={data.Subcategory} ))}
    //                     value={selected}
    //                     onChange={setSelected}
    //                     labelledBy="Select"
                       
    //                 /> */}

    //         </div>
    //     )
    // }
    else if (State === 5) {
        return (
            <div className="container-fluid">
                <h1>Completed Orders</h1>
                <Table className='table-cat' style={{ margin: "40px 0px 0px 0px" }}>
                    <TableHead>
                        <TableRow style={{ border: "2px solid black", margin: "0px", textAlign: "center" }}>
                            <StyledTableCell style={{ textAlign: "center", fontWeight: '600' }}>SN</StyledTableCell>
                            {/* <TableCell>Service</TableCell> */}
                            <StyledTableCell style={{ textAlign: "center", fontWeight: '600' }}>Category</StyledTableCell>
                            <StyledTableCell style={{ textAlign: "center", fontWeight: '600' }}>Price</StyledTableCell>
                            <StyledTableCell style={{ textAlign: "center", fontWeight: '600' }}>Address</StyledTableCell>
                            <StyledTableCell style={{ textAlign: "center", fontWeight: '600' }}>Number</StyledTableCell>
                            <StyledTableCell style={{ textAlign: "center", fontWeight: '600' }}>paymentMethod</StyledTableCell>



                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                pending_order.map((data, index) => (


                                    <TableRow key={index} style={{ backgroundColor: "white" }}>
                                        <StyledTableCell>{a++}</StyledTableCell>

                                        {/* <TableCell><p>{data.Service}</p></TableCell> */}
                                        <StyledTableCell><p>{data.Category}</p> </StyledTableCell>
                                        <StyledTableCell><p>{data.price}</p></StyledTableCell>
                                        <StyledTableCell><p>{data.address}</p></StyledTableCell>
                                        <StyledTableCell><p>{data.number}</p></StyledTableCell>
                                        <StyledTableCell><p>{data.paymentMethod}</p></StyledTableCell>
                                    </TableRow>


                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
                
        )
    }

}


const PendingOrders = ({ State ,setState }) => {

    const [options2, setoptions2] = useState([]);
    const [selected, setSelected] = useState([]);



   function onSelect1(selectedList, selectedItem) {
        setSelected(selectedList)
        console.log(selectedList);
        listofwork()
    };
    
    function onRemove(selectedList, removedItem) {
        setSelected(selectedList)
        console.log(selectedList);
        listofwork()

    }


    const value1 = ()=>{
        console.log(selected);
    }
    const [resendOTP, setResendOTP] = useState(false);
    const [timer, setTimer] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [otpSent, setOTPSent] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [error, setError] = useState('');
    const[Phonenumber,setPhone]=useState("")
    // const total = selected.reduce((acc,curr)=> acc + curr.Price, 0)


    const [orderdetails, setorderdetails] = useState([])

    const [notificationCount, setNotificationCount] = useState(0);
   // const nav = useNavigate()

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
    let a = 1;
    const handleClose2 = () => {
        setOpen2(false)
    }
    const handleOpen2 = () => {
        setOpen2(true)
    }
    const completeOtp = async() => {
        setResendOTP(false);
        clearInterval(timer);
        try {
            // console.log(orders.number);
          const response = await axios.post('http://localhost:3001/doneOtp/service-done-otp', {
            phoneNumber: Phonenumber
          });
          console.log(response.data.message);
          handleOpen2()
          setOTPSent(true);
          setTimeRemaining(120);
          setTimer(setInterval(() => {
            setTimeRemaining(prevTime => prevTime - 1);
          }, 1000));
        } catch (error) {
            console.log(error.response.data.message);
        //   setError(error.response.data.message);
        }
    }
    function get_vendor() {
        axios.get(`http://localhost:3001/vendor_Auth/fetch_vendor/${vendorId}`)
            .then((res) => {
                setVendorDetails(res.data)
            })
    }
    function vendor_orders() {
        axios.get(`http://localhost:3001/booking_api/pending_booking_data/${vendorDetails.Email}`)
            .then((res) => {
                setPendingorders(res.data)
            })
    }
    const listofwork = () => {
        axios.get("http://localhost:3001/sub_api/new_fetch_items").then((res) => {
            setoptions2(res.data)
            console.log(res.data);
        })
    }
    const total = selected.reduce((acc,curr)=> acc + curr.Price, 0)
    useEffect(() => {
        get_vendor()
        vendor_orders()
        listofwork()
    }, [vendorDetails.Email])



    const[OTP,setOTP]=useState("")




    useEffect(() => {
        if (State === 3) {
            window.scroll(0, 100000)
        }
    }, [State])

    const[visibility,setvisibility]=useState(true)



    //confirmation otp api

    const VerifiyOTP=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:3001/doneOtp/verifyotp",{
            phoneNumber:Phonenumber,
            otp:OTP
        }
        )
        .then((res)=>{
            console.log(res.data.message);
            handleClose2()
        })
        .catch((err)=>{
            console.log(err.response.data.message);
        })
    

    }


    if (State === 3) {
        return (
            <div className="container-fluid vendor-container">
                <h1>Pending order Details</h1>
                <TableContainer component={Paper} style={{ padding: "20px", alignItems: "center", justifyContent: "center" }}>
                    <Table className='table-cat' style={{ margin: "0px" }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">SN</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                {/* <StyledTableCell align="center">Email</StyledTableCell> */}
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
                                        <StyledTableCell align="center"><p>{data.Category}</p> </StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.price}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.address}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.number}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.paymentMethod}</p></StyledTableCell>
                                        <StyledTableCell align="center"><button onClick={() => {setState(4)
                                        setPhone(data.number)}} className="Action-btn">completed</button></StyledTableCell>
                                    </StyledTableRow>


                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>



        )
    }
    if (State === 4) {
        return (
                    <div className="container-fluid vendor-container">

                        
                <div>
                    <Modal
                        open={open2}
                        onClose={handleClose2}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description"
                    >
                        <Box sx={{ ...style, width: 400 }}>

                            <form onSubmit={VerifiyOTP}>

                                <div >
                                    <TextField
                                        type='text'
                                        id="outlined-basic"
                                        label="otp"
                                        value={OTP}
                                        variant="outlined"
                                        autoComplete="off"
                                       onChange={e => setOTP(e.target.value)}
                                    /><br /><br />

                                    <Button type="submit">verifyOtp</Button>
                                    <Button type="submit" onClick={handleClose2}>cancel</Button>

                                </div>



                            </form>


                            {/* <ChildModal /> */}
                        </Box>
                    </Modal>
                </div>
                        <h1>List of Works</h1>
                        <div>
                        <Multiselect 
                            options={options2} // Options to display in the dropdown
                            // selectedValues={options2.selectedValue} // Preselected value to persist in dropdown
                            onSelect={onSelect1} // Function will trigger on select event
                            onRemove={onRemove} // Function will trigger on remove event
                            displayValue={"Subcategory"} // Property name to display in the dropdown options
                            // displayValue={"Price"}
                        />
                        </div>
                        
                        <TableContainer component={Paper} style={{ padding: "20px", alignItems: "center", justifyContent: "center" }}>
                            <Table className='table-cat' style={{ margin: "0px" }}>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">SN</StyledTableCell>
                                        <StyledTableCell align="center">Work</StyledTableCell>
                                        <StyledTableCell align="center">Price</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selected.map((data, index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell align="center">{a++}</StyledTableCell>
        
                                                <StyledTableCell align="center"><p>{data.Subcategory}</p></StyledTableCell>
                                                <StyledTableCell align="center"><p>{data.Price}</p></StyledTableCell>
                                            </StyledTableRow>
                                        ))
                                    }
                                    <StyledTableRow>
                                        <StyledTableCell align="center" colspan="2">Total</StyledTableCell>
                                        <StyledTableCell align="center">{total}<br/><button onClick={()=>{completeOtp()
                                            handleOpen2()}}>confirm</button></StyledTableCell>
                                    </StyledTableRow>
                                    
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/*                    
                                <MultiSelect
                                 {...options2.map((data)=>(
                                options={data.Subcategory} ))}
                                value={selected}
                                onChange={setSelected}
                                labelledBy="Select"
                               
                            /> */}
        
                    </div>
                )
}
}


const UserOrders = ({ State, Loader, setLoader }) => {
    const [orderdetails, setorderdetails] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [myorders, setMyorders] = useState([])
    const [pending_order, setpending_order] = useState([])


    const token = cookies.jwt2;
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;

    const useremail = myorders.email

    useEffect(() => {
        orders()
        // pending_orderss()
        // orders1()
    }, [])



    const orders = () => {
        console.log(userId);
        axios.get(`http://localhost:3001/authUser/fetch_email/${userId}`)
            .then((res) => {
                // console.log(res.data);
                setMyorders(res.data);

            })
    }

    // const pending_orderss = () => {

    // }

    useEffect(() => {
        axios.get(`http://localhost:3001/booking_api/booking_data/${useremail}`)
            .then((res) => {
                console.log(res.data);
                setorderdetails(res.data)

            })

        axios.get(`http://localhost:3001/booking_api/pending_book/${useremail}`)
            .then((res) => {
                setpending_order(res.data)
                console.log(res.data);
            })
    }, [myorders,useremail])





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



    if (State === 3) {
        return (
            <div className="container-fluid">
                <h1>Pending Orders</h1>
                <Table className='table-cat' style={{ margin: "40px 0px 0px 0px" }}>
                    <TableHead>
                        <TableRow style={{ border: "2px solid black", margin: "0px", textAlign: "center" }}>
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>SN</TableCell>
                            {/* <TableCell>Service</TableCell> */}
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Category</TableCell>
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Price</TableCell>
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Address</TableCell>
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Number</TableCell>
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>paymentMethod</TableCell>



                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                pending_order.map((data, index) => (


                                    <TableRow key={index} style={{ backgroundColor: "white" }}>
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

    else if(State===2){
        return(
        
                <div className="container-fluid">   
                <h1>My Orders</h1>
                <Table className='table-cat' style={{ margin: "40px 0px 0px 0px" }}>
                    <TableHead>
                        <TableRow style={{ border: "2px solid black", margin: "0px", textAlign: "center" }}>
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>SN</TableCell>
                            {/* <TableCell>Service</TableCell> */}
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Category</TableCell>
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Price</TableCell>
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Address</TableCell>
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Number</TableCell>
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>paymentMethod</TableCell>



                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                orderdetails.map((data, index) => (


                                    <TableRow key={index} style={{ backgroundColor: "white" }}>
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

    else if(State===4){
        return(
        
            <div className="container-fluid">   
            <h1>Completed Orders</h1>
            <Table className='table-cat' style={{ margin: "40px 0px 0px 0px" }}>
                <TableHead>
                    <TableRow style={{ border: "2px solid black", margin: "0px", textAlign: "center" }}>
                        <TableCell style={{ textAlign: "center", fontWeight: '600' }}>SN</TableCell>
                        {/* <TableCell>Service</TableCell> */}
                        <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Category</TableCell>
                        <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Price</TableCell>
                        <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Address</TableCell>
                        <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Number</TableCell>
                        <TableCell style={{ textAlign: "center", fontWeight: '600' }}>paymentMethod</TableCell>



                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orderdetails.map((data, index) => (


                                <TableRow key={index} style={{ backgroundColor: "white" }}>
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

export { UserProfile, UserOrders, VendorProfile, VendorOrders, PendingOrders }