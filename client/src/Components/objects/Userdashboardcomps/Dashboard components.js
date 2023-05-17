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
import {toast} from 'react-toastify';
import useRazorpay, {Razorpay} from 'react-razorpay'




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

    }, [pathname]);


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


    }, [setMyorders, userId])


    useEffect(() => {

        axios.get(`http://localhost:3001/booking_api/booking_data/${useremail}`)
            .then((res) => {
                // console.log(res.data);
                setorderdetails(res.data)

            })

    }, [myorders, useremail])

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
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;
    const [count, setCount] = useState(0)
    //const [dummy, setDummy] = useState(0)
    // const useremail = myorders.Email
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);

    }, [pathname]);


    // setTimeout(() => {
    //     setState(2)

    // }, 1000)


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

    }, [])


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

                <div className="vendor-sec2" >
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
    const [completedOrderdetails, setcompletedOrderdetails] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies([]);
    //const [notificationCount, setNotificationCount] = useState(0);
    const [vendorDetails, setVendorDetails] = useState(null);
    //  const [otpSent, setOTPSent] = useState(false);
    const [orders, setOrderId] = useState('');
    const [veriyfyOtp, setVerifyOtp] = useState('');
    const [open, setOpen] = useState(false);
    const [completedbill, setCompletedbill] = useState([])
    const [confirm, setconfirm] = useState([])
    const [open4, setOpen4] = useState(true);
    const { pathname } = useLocation();



    const [pending_order, setPendingorder] = useState([])




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
                axios.get(`http://localhost:3001/booking_api/Completed_vendor_order/${res.data.Email}`)
                    .then((res) => {
                        setcompletedOrderdetails(res.data)
                        console.log(res.data);
                        const totalearnings = completedOrderdetails.reduce((acc,curr)=> acc + parseInt(curr.total), 0)
                        // console.log(total);
                    })
            })
    }
    // const Vemail = vendorDetails.Email

    const totalearnings = completedOrderdetails.reduce((acc,curr)=> acc + parseInt(curr.total), 0)

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
            try{
                const respons = axios.get(`http://localhost:3001/booking_api/booking_data/${order._id}`).then((res)=>{
                    setconfirm(res.data)
                    console.log(res.data._id);
                })
            }catch(err){
console.log(err.response.data);
            }
           
            //console.log(order.number);
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
                    vendor_name:vendorDetails.Username,
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
                        toast.success("Successfully verified",{
                            position:'top-center'
                        })
                        getdata()
                        handleClose()
                        get_vendor()
                    })

            } else {
                console.log("invalid token");

            }


        } catch (error) {
            console.log(error.response.data.message);
            // setError('Invalid or expired OTP');
            toast.error(error.response.data.message,{
                position:'top-center'
            })
        }
    }


    const handleOpen4 = (id) => {
        axios.get(`http://localhost:3001/booking_api/Completed_billing/${id}`)
            .then((res) => {
                console.log(res.data);
                setCompletedbill([res.data])
            
               // setSubcategory(res.data.workLists)
                
            })
            .then(()=>{
                    setOpen4(false)
                
            })
            
        console.log(open4);
    }

    const handleClose4 = () => {
        setOpen4(true)
    }

    const getdata = () => {
        axios.get("http://localhost:3001/booking_api/booking_data").then((res) => {
            setorderdetails(res.data)
            // console.log(vendorDetails.Username);
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
            <div style={{ width: "100%" }}>
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
            <div style={{ width: "100%" }}>
            <div className="container-fluid">
                <h1>Completed Orders</h1><br/>
                <div className="Earnings">
                    <h3>Total Earnings : <span className="Pay-button">{totalearnings}</span></h3><br/>
                    <h3>Total Orders : {completedOrderdetails.length}</h3>
                </div>
                <Table className='table-cat' style={{ margin: "40px 0px 0px 0px" }}>
                    <TableHead>
                        <TableRow style={{ border: "2px solid black", margin: "0px", textAlign: "center" }}>
                            <StyledTableCell style={{ textAlign: "center", fontWeight: '600' }}>SN</StyledTableCell>
                            {/* <TableCell>Service</TableCell> */}
                            <StyledTableCell style={{ textAlign: "center", fontWeight: '600' }}>Category</StyledTableCell>
                            <StyledTableCell style={{ textAlign: "center", fontWeight: '600' }}>Completed By</StyledTableCell>
                            <StyledTableCell style={{ textAlign: "center", fontWeight: '600' }}>Address</StyledTableCell>
                            <StyledTableCell style={{ textAlign: "center", fontWeight: '600' }}>Number</StyledTableCell>
                            <StyledTableCell style={{ textAlign: "center", fontWeight: '600' }}>paymentMethod</StyledTableCell>
                            <StyledTableCell style={{ textAlign: "center", fontWeight: '600' }}>Bills</StyledTableCell>



                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            completedOrderdetails.map((data, index) => (


                                <TableRow key={index} style={{ backgroundColor: "white" }}>
                                    <StyledTableCell>{a++}</StyledTableCell>

                                    {/* <TableCell><p>{data.Service}</p></TableCell> */}
                                    <StyledTableCell><p>{data.Category}</p> </StyledTableCell>
                                    <StyledTableCell><p>{data.vendor_name}</p></StyledTableCell>
                                    <StyledTableCell><p>{data.address}</p></StyledTableCell>
                                    <StyledTableCell><p>{data.number}</p></StyledTableCell>
                                    <StyledTableCell><p>{data.paymentMethod}</p></StyledTableCell>
                                    <StyledTableCell style={{ textAlign: "center" }}><button onClick={()=>handleOpen4(data._id)} className="Pay-button">View Bill</button></StyledTableCell>

                                </TableRow>


                            ))
                        }
                    </TableBody>
                </Table>
                <div className="Bill-modal" hidden={open4}>
                    <h2 className="Bills-heading">Bill</h2>
                    <div className="Bill-sec2">
                    <div style={{height:"15rem",overflow:'scroll',width:'100%'}}>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ backgroundColor:'White',textAlign: "center", fontWeight: '600',border:'none' }}>Work Done</TableCell>
                                    <TableCell style={{ backgroundColor:'White',textAlign: "center", fontWeight: '600',border:'none' }}>Charges</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody style={{width:'100%'}}>

                            {
                            completedbill.map((data) => (
                                data.workLists.map((Sub,secondindex)=>(
                                    //console.log(Sub.subCategory)

                                        <TableRow key={secondindex} >
                                            <TableCell style={{ backgroundColor: "white",border:'none' }}><p>{Sub.subCategory}</p></TableCell>
                                            <TableCell style={{ backgroundColor: "white",border:'none',textAlign:'center' }}><p>{Sub.price}</p></TableCell>
                                        </TableRow>
                                ))
                            ))
                            }

                            <TableRow>
                                <TableCell style={{ backgroundColor: "grey", display: 'flex', alignItems: 'center',border:'none' }}><p style={{ margin: '0px',fontWeight:'600',color:'white' }}>Total</p></TableCell>
                                {
                                    completedbill.map((data,index)=>(
                                        <TableCell key={index} style={{ backgroundColor: "white" }}><p style={{margin:'0px',textAlign:'center'}}>{data.total}</p></TableCell>
                                    )
                                    )
                                }
                            </TableRow>
                            
                            </TableBody>

                        </Table>
                        </div>

                    </div>
                    <div style={{ display: "flex", gap: "5px" }}>
                        
                        <button className="Bill-btn2" onClick={handleClose4}>Close</button>
                    </div>

                </div>
            </div>
                        </div>
        )
    }

}



const PendingOrders = ({ State, setState }) => {

    const [options2, setoptions2] = useState([]);
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);



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
    const handleClose = () => {
        setOpen(false)
    }

    const value1 = () => {
        console.log(selected);
    }
    const [resendOTP, setResendOTP] = useState(false);
    const [timer, setTimer] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [otpSent, setOTPSent] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [error, setError] = useState('');
    const [Phonenumber, setPhone] = useState("")
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

    const [open3, setOpen3] = useState(false);




    const [cookies, setCookie, removeCookie] = useCookies([]);

    const [vendorDetails, setVendorDetails] = useState([]);
    const [pendingorders, setPendingorders] = useState([]);
    const [completePendingorders, setCompletePendingorders] = useState([]);

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
    const completeOtp = async () => {
        if(selected.length===0){
            toast.error("Select the work done",{
                position:'top-center'
            })
        }
        else{
        setResendOTP(false);
        clearInterval(timer);
        console.log(selected);
        try {
            // console.log(orders.number);
            const response = await axios.post('http://localhost:3001/doneOtp/service-done-otp', {
                phoneNumber: Phonenumber
            });
            console.log(response.data.message);
            toast.success(response.data.message,{
                position:'top-center'
            })
            handleOpen2()
            setOTPSent(true);
            setTimeRemaining(120);
            setTimer(setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
            }, 1000));
        } catch (error) {
            console.log(error.response.data.message);
            //   setError(error.response.data.message);
            toast.error(error.response.data.message,{
                position:'top-center'
            })
        }}
    }
    function get_vendor() {
        axios.get(`http://localhost:3001/vendor_Auth/fetch_vendor/${vendorId}`)
            .then((res) => {
                setVendorDetails(res.data)
                console.log(res.data);
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
    const total = selected.reduce((acc, curr) => acc + curr.Price, 0)
    useEffect(() => {
        get_vendor()
        vendor_orders()
        listofwork()
    }, [vendorDetails.Email])



    const [OTP, setOTP] = useState("")




    useEffect(() => {
        if (State === 3) {
            window.scroll(0, 100000)
        }
    }, [State])

    //const [visibility, setvisibility] = useState(true)

    console.log(vendorDetails);


    //confirmation otp api

    const VerifiyOTP = (e) => {
        e.preventDefault()
        const workListsData = selected.map((data) => ({
            subCategory: data.Subcategory,
            price: data.Price
          }));
        axios.post("http://localhost:3001/doneOtp/verifyotp", {
            phoneNumber: Phonenumber,
            otp: OTP
        }
        )
            .then((res) => {
                console.log(res.data.message);
                handleClose2()
                if (res.data.message === "OTP verified successfully") {
                 console.log(completePendingorders._id);
                 axios.post(`http://localhost:3001/booking_api/Completed_orders/${completePendingorders._id}`, {
                    vendor_email: vendorDetails.Email,
                    vendor_name: vendorDetails.Username,
                    user_email: completePendingorders.user_email,
                    address: completePendingorders.address,
                    street: completePendingorders.street,
                    city: completePendingorders.city,
                    zip: completePendingorders.zip,
                    person: completePendingorders.person,
                    number: completePendingorders.number,
                    Service: completePendingorders.Service,
                    Category: completePendingorders.Category,
                    price: completePendingorders.price,
                    paymentMethod: completePendingorders.paymentMethod,
                    workLists:workListsData,
                    total:total
                }).then(() => {
                    axios.delete(`http://localhost:3001/booking_api/delete_pending_item/${completePendingorders._id}`)
                        toast.success("OTP verified",{
                            position:'top-center'
                        })
                        // getdata()
                        handleClose()
                        vendor_orders()
                    })

                } else {
                    console.log("invalid token");

                }
            })
            .catch((err) => {
                //console.log(err.response.data.message);
                toast.error(err.response.data.message,{
                    position:'top-center'
                })
            })


    }

    if (State === 3) {
        return (
            <div style={{ width: "100%" }}>
            <div className="container-fluid">
                <h1>Pending order Details</h1>
                <TableContainer component={Paper} style={{ padding: "20px", alignItems: "center", justifyContent: "center" }}>
                    <Table className='table-cat' style={{ margin: "0px" }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">SN</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Accepted By</StyledTableCell>
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
                               pendingorders.length > 0 ?( pendingorders.map((data, index) => (

                                
                                    <StyledTableRow key={index}>
                                     
                                        <StyledTableCell>{a++}</StyledTableCell>

                                        <StyledTableCell align="center"><p>{data.person}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.vendor_name}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.Category}</p> </StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.price}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.address}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.number}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.paymentMethod}</p></StyledTableCell>
                                        <StyledTableCell align="center"><button onClick={() => {
                                            setState(4)
                                            setPhone(data.number);
                                            setCompletePendingorders(data)
                                        }} className="Action-btn">completed </button></StyledTableCell>
                                    </StyledTableRow>

                                ))
                               ):(
   

    <p>No pending orders</p>
  )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
</div>


        )
    }
    if (State === 4) {
        return (
            <div style={{ width: "100%" }}>
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
                                <StyledTableCell align="center">{total}<br /><button onClick={() => {completeOtp()}}>confirm</button></StyledTableCell>
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
            </div>
        )
    }
}


const UserOrders = ({ State, Loader, setLoader }) => {
    const [orderdetails, setorderdetails] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [myorders, setMyorders] = useState([])
    const [pending_order, setpending_order] = useState([])
    const [completed_order, setCompleted_order] = useState([])
    const [completedbill, setCompletedbill] = useState([])

    
    // const workListsData = completedbill.map((data) => (
    //      data.workLists.map((data)=>{
    //         subCategory = data.subCategory,
    //         price = data.price
    //     })
    //   ));

    const token = cookies.jwt2;
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;

    const useremail = myorders.email

    const [open4, setOpen4] = useState(true);

    console.log(completedbill);
    const handleClose4 = () => {
        setOpen4(true)
    }
    const handleOpen4 = (id) => {
        axios.get(`http://localhost:3001/booking_api/Completed_billing/${id}`)
            .then((res) => {
                console.log(res.data);
                setCompletedbill([res.data])
            
                setSubcategory(res.data.workLists)
                
            })
            .then(()=>{
                    setOpen4(false)
                
            })
            
        console.log(open4);
    }
const Razorpay = useRazorpay()
const Total = completedbill.map((data)=>data.total)
    function pay(data){

        var amount = parseInt(Total);
    
        var options = {
            key:"rzp_test_1SnQnLm783h5Op",
            key_secret:"W3x1XiUXiyqIKQJrSBqaXGmE",
            "amount": amount * 100, // Example: 2000 paise = INR 20
            "name": "MERCHANT name",
            "description": "description",
            "image": "img/logo.png",// COMPANY LOGO
            "handler": function (response) {
                console.log(response);
                completePayment()
                // AFTER TRANSACTION IS COMPLETE YOU WILL GET THE RESPONSE HERE.
            },
            "prefill": {
                "name": "ABC", // pass customer name
                "email": 'A@A.COM',// customer email
                "contact": '+919123456780' //customer phone no.
            },
            "notes": {
                "address": "address" //customer address 
            },
            "theme": {
                "color": "#15b8f3" // screen color
            }
        };
        console.log(options);
        console.log((data._id));
        var propay = new Razorpay (options);
        propay.open()
        // .then(()=>{
         function completePayment(){   
            axios.patch(`http://localhost:3001/booking_api/edit_Completed_orders/${data._id}`, {
                    vendor_email: data.vendor_email,
                    vendor_name: data.vendor_name,
                    user_email: data.user_email,
                    address: data.address,
                    street: data.street,
                    city: data.city,
                    zip: data.zip,
                    person: data.person,
                    number: data.number,
                    Service: data.Service,
                    Category: data.Category,
                    price: data.price,
                    paymentMethod: 'Payment Completed',
                    workLists: data.workLists,
                    total:data.total

                })}
        // })
    }


    const [Method, setMethod] = useState(true)
    const [Button, setButton] = useState(true)

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

        axios.get(`http://localhost:3001/booking_api/Completed_order/${useremail}`)
            .then((res) => {
                setCompleted_order(res.data)
                setSubcategory(res.data.workLists)
                console.log(res.data);
            })

    }, [useremail])

const[subCategory,setSubcategory]=useState([])



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
            <div style={{ width: "100%" }}>

            <div className="container-fluid">
                <h1>Pending Orders</h1>
                <Table className='table-cat' style={{ margin: "40px 0px 0px 0px" }}>
                    <TableHead>
                        <TableRow style={{ border: "2px solid black", margin: "0px", textAlign: "center" }}>
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>SN</TableCell>
                            {/* <TableCell>Service</TableCell> */}
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Category</TableCell>
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Accepted By</TableCell>
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
                                    <TableCell><p>{data.vendor_name}</p> </TableCell>
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

    else if (State === 2) {
        return (
            <div style={{ width: "100%" }}>

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
</div>
        )
    }

    else if (State === 4) {
        return (
            <div style={{ width: "100%" }}>
            <div className="container-fluid">
                <h1>Completed Orders</h1>
                <Table className='table-cat' style={{ margin: "40px 0px 0px 0px" }}>
                    <TableHead>
                        <TableRow style={{ border: "2px solid black", margin: "0px", textAlign: "center" }}>
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>SN</TableCell>
                            {/* <TableCell>Service</TableCell> */}
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Category</TableCell>
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Completed By</TableCell>
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Price</TableCell>
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Address</TableCell>
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Number</TableCell>
                            <TableCell style={{ textAlign: "center", fontWeight: '600' }}>paymentMethod</TableCell>



                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            completed_order.map((data, index) => {

                                return (
                                    <TableRow key={index} style={{ backgroundColor: "white" }}>
                                        <TableCell>{a++}</TableCell>

                                        {/* <TableCell><p>{data.Service}</p></TableCell> */}
                                        <TableCell><p>{data.Category}</p> </TableCell>
                                        <TableCell><p>{data.vendor_name}</p> </TableCell>
                                        <TableCell><p>{data.price}</p></TableCell>
                                        <TableCell><p>{data.address}</p></TableCell>
                                        <TableCell><p>{data.number}</p></TableCell>
                                        <TableCell><p>{data.paymentMethod}</p></TableCell>
                                    </TableRow>
                                )



                            })
                        }
                    </TableBody>
                </Table>

            </div>
            </div>

        )
    }

    else if (State === 5) {
        return (
            <div style={{ width: "100%" }}>

                <div className="container-fluid" >
                    <h1>Bills & Payment</h1>


                    <Table className='table-cat' style={{ margin: "40px 0px 0px 0px" }}>
                        <TableHead>
                            <TableRow style={{ border: "2px solid black", margin: "0px", textAlign: "center" }}>
                                <TableCell style={{ textAlign: "center", fontWeight: '600' }}>SN</TableCell>
                                {/* <TableCell>Service</TableCell> */}
                                <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Category</TableCell>
                                {/* <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Price</TableCell> */}
                                <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Address</TableCell>
                                <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Number</TableCell>
                                <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Completed By</TableCell>
                                <TableCell style={{ textAlign: "center", fontWeight: '600' }}>Bill</TableCell>



                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                completed_order.map((data, index) => (

                                        <TableRow key={index} style={{ backgroundColor: "white" }}>
                                            <TableCell>{a++}</TableCell>

                                            {/* <TableCell><p>{data.Service}</p></TableCell> */}
                                            <TableCell><p>{data.Category}</p> </TableCell>
                                            {/* <TableCell><p>{data.price}</p></TableCell> */}
                                            <TableCell><p>{data.address}</p></TableCell>
                                            <TableCell><p>{data.number}</p></TableCell>
                                            <TableCell><p>{data.vendor_name}</p></TableCell>
                                            <TableCell style={{ textAlign: "center" }}><button onClick={()=>handleOpen4(data._id)} className="Pay-button">View Bill</button></TableCell>
                                        </TableRow>
                                    




                                ))
                            }
                        </TableBody>
                    </Table>



                </div>
                <div className="Bill-modal" hidden={open4}>
                    <h2 className="Bills-heading">Your bill</h2>
                    <div className="Bill-sec2">
                    <div style={{height:"15rem",overflow:'scroll',width:'100%'}}>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ backgroundColor:'White',textAlign: "center", fontWeight: '600',border:'none' }}>Work Done</TableCell>
                                    <TableCell style={{ backgroundColor:'White',textAlign: "center", fontWeight: '600',border:'none' }}>Charges</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody style={{width:'100%'}}>

                            {
                            completedbill.map((data) => (
                                data.workLists.map((Sub,secondindex)=>(
                                    //console.log(Sub.subCategory)

                                        <TableRow key={secondindex} >
                                            <TableCell style={{ backgroundColor: "white",border:'none' }}><p>{Sub.subCategory}</p></TableCell>
                                            <TableCell style={{ backgroundColor: "white",border:'none',textAlign:'center' }}><p>{Sub.price}</p></TableCell>
                                        </TableRow>
                                ))
                            ))
                            }

                            <TableRow>
                                <TableCell style={{ backgroundColor: "grey", display: 'flex', alignItems: 'center',border:'none' }}><p style={{ margin: '0px',fontWeight:'600',color:'white' }}>Total</p></TableCell>
                                {
                                    completedbill.map((data,index)=>(
                                        <TableCell key={index} style={{ backgroundColor: "white" }}><p style={{margin:'0px',textAlign:'center'}}>{data.total}</p></TableCell>
                                    )
                                    )
                                }
                            </TableRow>
                            
                            </TableBody>

                        </Table>
                        </div>

                    </div>
                    <div style={{ display: "flex", gap: "5px" }}>
                        {
                            completedbill.map((data,index)=>(
                                <button hidden={data.paymentMethod==="onlinePayment"?false:true} onClick={()=>pay(data)} className="Bill-btn1">Pay</button>
                            ))

                        }
                        <button  className="Bill-btn2" onClick={handleClose4}>Cancel</button>
                    </div>

                </div>
            </div>


        )
    }


    else return null

}

export { UserProfile, UserOrders, VendorProfile, VendorOrders, PendingOrders }