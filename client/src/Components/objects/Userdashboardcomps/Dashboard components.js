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
import { toast } from 'react-toastify';
import useRazorpay, { Razorpay } from 'react-razorpay'




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
    // const token = cookies.jwt2;
    const token = localStorage.getItem("ty");
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
        axios.get(`https://backend.kooblu.com/authUser/fetch_email/${userId}`)
            .then((res) => {
                // console.log(res.data);
                setMyorders(res.data)
            })
        // orders1()


    }, [setMyorders, userId])


    useEffect(() => {

        axios.get(`https://backend.kooblu.com/booking_api/booking_data/${useremail}`)
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

const EditForm = ({ State }) => {
    const token = localStorage.getItem("vendor");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;
    const [VendorProfile, setVendorProfile] = useState([])


    //Edit States
    const [Name, setName] = useState("null")
    const [mail, setMail] = useState("null")
    const [Phone, setPhone] = useState("null")
    const [Location, setLocation] = useState("null")
    const [Gender, setGender] = useState("null")
    const [Language, setLanguage] = useState("null")
    const [DoB, setDob] = useState("null")
    const [Aadhar, setAadhar] = useState("null")
    const [Accn, setAccn] = useState("null")
    const [BnkName, setBnkName] = useState("null")
    const [IFSC, setIfsc] = useState("null")
    const [Education, setEducation] = useState("null")
    const [JobTitle, setJobTitle] = useState("null")
    const [WorkExp, setWorkExp] = useState("null")
    const [Zone, setZone] = useState("null")
    const [AltPhone, setAltPhone] = useState("null")
    const [Lang, setLang] = useState("null")
    const [Picture, setPicture] = useState([])
    const [Pan, setPan] = useState([])
    const [AadharCard, setAadharCard] = useState([])


    const PostData = async (id) => {
        const formData = new FormData()
        formData.append("Username", Name)
        formData.append("mail", mail)
        formData.append("Phone", Phone)
        formData.append("Location", Location)
        formData.append("Gender", Gender)
        formData.append("Language", Language)
        formData.append("DoB", DoB)
        formData.append("Aadhar", Aadhar)
        formData.append("Accn", Accn)
        formData.append("BnkName", BnkName)
        formData.append("IFSC", IFSC)
        formData.append("Education", Education)
        formData.append("JobTitle", JobTitle)
        formData.append("WorkExp", WorkExp)
        formData.append("Zone", Zone)
        formData.append("AltPhone", AltPhone)
        formData.append("Lang", Lang)
        formData.append("AadharFiles", AadharCard)
        formData.append("PhotoFiles", Picture)
        formData.append("PanFiles", Pan)
        await axios.patch(`https://backend.kooblu.com/vendor_Auth/Edit/${id}`, formData)

    }



    useEffect(() => {
        axios.get(`https://backend.kooblu.com/vendor_Auth/fetch_vendor/${userId}`)
            .then((res) => {
                console.log(res.data)
                setVendorProfile(res.data)
                setName(res.data.Username)
                setMail(res.data.Email)
                setPhone(res.data.Phonenumber)
                setLocation(res.data.Location)
                setGender(res.data.Gender)
                setLanguage(res.data.Language)
                setDob(res.data.DOB)
                setAadhar(res.data.AAdhar)
                setAccn(res.data.AccNo)
                setBnkName(res.data.BnkName)
                setIfsc(res.data.Ifsc)
                setEducation(res.data.Education)
                setJobTitle(res.data.JobTitle)
                setWorkExp(res.data.WorkExp)
                setZone(res.data.Zone)
                setAltPhone(res.data.AltPH)
                setLang(res.data.KnownL)
                setPicture(res.data.PhotoFiles)
                setPan(res.data.PanFiles)
                setAadharCard(res.data.AadharFiles)
            })
    }, [])
    if (State == 6) {
        return (
            <div className="edit_table_div">
                <div>
                    <table className="edit_table">
                        <tbody>
                            <tr>
                                <td>User Name</td>
                                <td><input defaultValue={VendorProfile.Username} onChange={(e) => { setName(e.target.value) }} /></td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td><input defaultValue={VendorProfile.Email} onChange={(e) => { setMail(e.target.value) }} /></td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td><input defaultValue={VendorProfile.Phonenumber} onChange={(e) => { setPhone(e.target.value) }} /></td>
                            </tr>
                            <tr>
                                <td>Location</td>
                                <td><input defaultValue={VendorProfile.Location} onChange={(e) => { setLocation(e.target.value) }} /></td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td><select onChange={(e) => { setGender(e.target.value) }}>
                                    <option>{VendorProfile.Gender}</option>
                                    <option>{VendorProfile.Gender === "Male" ? "Female" : "Male"}</option>

                                </select></td>
                            </tr>
                            <tr>
                                <td>Language</td>
                                <td><input defaultValue={VendorProfile.Language} onChange={(e) => { setLanguage(e.target.value) }} /></td>
                            </tr>
                            <tr>
                                <td>DOB</td>
                                <td><input type={'date'} defaultValue={VendorProfile.DOB} onChange={(e) => { setDob(e.target.value) }} /></td>
                            </tr>
                            <tr>
                                <td>Aadhar</td>
                                <td><input defaultValue={VendorProfile.AAdhar} onChange={(e) => { setAadhar(e.target.value) }} /></td>
                            </tr>
                            <tr>
                                <td>AccNo</td>
                                <td><input defaultValue={VendorProfile.AccNo} onChange={(e) => { setAccn(e.target.value) }} /></td>
                            </tr>
                            <tr>
                                <td>Bank Name</td>
                                <td><input defaultValue={VendorProfile.BnkName} onChange={(e) => { setBnkName(e.target.value) }} /></td>
                            </tr>
                            <tr>
                                <td>IFSC</td>
                                <td><input defaultValue={VendorProfile.Ifsc} onChange={(e) => { setIfsc(e.target.value) }} /></td>
                            </tr>

                            <tr>
                                <td>Education</td>
                                <td><input defaultValue={VendorProfile.Education} onChange={(e) => { setEducation(e.target.value) }} /></td>
                            </tr>
                            <tr>
                                <td>Job Title</td>
                                <td><input defaultValue={VendorProfile.JobTitle} onChange={(e) => { setJobTitle(e.target.value) }} /></td>
                            </tr>
                            <tr>
                                <td>Work Experience</td>
                                <td><input defaultValue={VendorProfile.WorkExp} onChange={(e) => { setWorkExp(e.target.value) }} /></td>
                            </tr>
                            <tr>
                                <td>Zone</td>
                                <td><input defaultValue={VendorProfile.Zone} onChange={(e) => { setZone(e.target.value) }} /></td>
                            </tr>
                            <tr>
                                <td>Alternate Phone</td>
                                <td><input defaultValue={VendorProfile.AltPH} onChange={(e) => { setAltPhone(e.target.value) }} /></td>
                            </tr>
                            <tr>
                                <td>Languages Known</td>
                                <td><input defaultValue={VendorProfile.KnownL} onChange={(e) => { setLang(e.target.value) }} /></td>
                            </tr>
                            <tr>
                                <td>Profile Picture</td>
                                <td><input type={'file'} onChange={(e) => setPicture(e.target.files[0])} /></td>
                            </tr>
                            <tr>
                                <td>Pan Card</td>
                                <td><input type={'file'} onChange={(e) => setPan(e.target.files[0])} /></td>
                            </tr>
                            <tr>
                                <td>Aadhar Card</td>
                                <td><input type={'file'} onChange={(e) => setAadharCard(e.target.files[0])} /></td>
                            </tr>

                        </tbody>
                    </table>
                    <div className="edit_submit_btn_div">
                        <button className="edit_submit_btn" onClick={() => PostData(VendorProfile._id)}>Submit</button>
                    </div>
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
    // const token = cookies.venjwt;
    const token = localStorage.getItem("vendor");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;
    const [count, setCount] = useState(0)
    //const [dummy, setDummy] = useState(0)
    // const useremail = myorders.Email
    const { pathname } = useLocation();
    const [vendorDetails, setVendorDetails] = useState(null);
    const [completedOrderdetails, setcompletedOrderdetails] = useState([])


    useEffect(() => {
        window.scrollTo(0, 0);

    }, [pathname]);


    // setTimeout(() => {
    //     setState(2)

    // }, 1000)

    function get_vendor() {

        axios.get(`https://backend.kooblu.com/vendor_Auth/fetch_vendor/${userId}`)
            .then((res) => {
                setVendorDetails(res.data)
                axios.get(`https://backend.kooblu.com/booking_api/Completed_vendor_order/${res.data.Email}`)
                    .then((res) => {
                        setcompletedOrderdetails(res.data)
                        console.log(res.data);
                        // const totalearnings = completedOrderdetails.reduce((acc, curr) => acc + parseInt(curr.total), 0)
                        // console.log(total);
                    })
            })
    }


    useEffect(() => {
        axios.get(`https://backend.kooblu.com/vendor_Auth/fetch_vendor/${userId}`)
            .then((res) => {
                console.log(res.data);
                setMyorders(res.data)
            })

        axios.get("https://backend.kooblu.com/booking_api/booking_data")
            .then((res) => {
                console.log(res.data);
                setorderdetails(res.data)
            })
        // orders1()


        get_vendor()

    }, [])


    // const Vemail = vendorDetails.Email

    const totalearnings = Math.round(((completedOrderdetails.reduce((acc, curr) => acc + parseInt(curr.total), 0)) * (15 / 100)))


    useEffect(() => {
        if (count < orderdetails.length) {
            setCount(count + 1)

        }
    })

    // const orders = () => {
    //     console.log(userId);

    // }


    const localpath = "https://backend.kooblu.com"


    if (State === 1) {
        return (
            <div className="Dashboard-MainDiv">
                <div className="User-Screen">
                    <div id="Vendor-Details" className="Vendor-sec1">
                        {Array.isArray(myorders.PhotoFiles) && myorders.PhotoFiles.map((item, index) => (
                            <img key={index} className="User-img" src={localpath + item.filename} alt="" />

                        ))}

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



                </div>
                <div className="User-Screen">
                    <div className="vendor-sec2" >
                        <h1 className="Count">{count}</h1>
                        <h2 className="Orders">Orders Available</h2>
                    </div>

                    <div className="Vendor-sec1" style={{ backgroundColor: "#e3a5f0" }}>

                        <img className="User-img" src="https://img.freepik.com/free-vector/happy-rich-banker-celebrating-income-growth_74855-5867.jpg?w=2000&t=st=1688534814~exp=1688535414~hmac=a9a55492da7c5b15131b76f834629e922261d35d6ce566f85b7d97540d42e006" alt="" />

                        <div className="Vendor-sec2Data" style={{ color: 'white' }}>
                            <div>
                                <h2 className="Vendor-data">Completed Orders</h2>


                            </div>
                            <div>

                                <h1 className="Vendor-data" style={{ fontSize: '30px' }}>{completedOrderdetails.length}</h1>




                            </div>
                        </div>
                    </div>
                    <div className="Vendor-sec1" style={{ backgroundColor: 'dodgerblue' }}>

                        <img className="User-img" src="https://img.freepik.com/free-vector/happy-rich-banker-celebrating-income-growth_74855-5867.jpg?w=2000&t=st=1688534814~exp=1688535414~hmac=a9a55492da7c5b15131b76f834629e922261d35d6ce566f85b7d97540d42e006" alt="" />

                        <div className="Vendor-sec2Data">
                            <div>
                                <h2 className="Vendor-data">Total Earnings</h2>

                            </div>
                            <div>
                                <h1 className="Vendor-data" style={{ fontSize: '30px' }}>₹ {totalearnings}</h1>


                            </div>
                        </div>
                    </div>

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

    // const token = cookies.venjwt;
    const token = localStorage.getItem("vendor");

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

        axios.get(`https://backend.kooblu.com/vendor_Auth/fetch_vendor/${vendorId}`)
            .then((res) => {
                setVendorDetails(res.data)
                axios.get(`https://backend.kooblu.com/booking_api/Completed_vendor_order/${res.data.Email}`)
                    .then((res) => {
                        setcompletedOrderdetails(res.data)
                        console.log(res.data);
                        const totalearnings = completedOrderdetails.reduce((acc, curr) => acc + parseInt(curr.total), 0)
                        // console.log(total);
                    })
            })
    }
    // const Vemail = vendorDetails.Email

    const totalearnings = completedOrderdetails.reduce((acc, curr) => acc + parseInt(curr.total), 0)

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
            axios.get(`https://backend.kooblu.com/booking_api/booking/${order._id}`).then(async (res) => {
                console.log(confirm);
                if (res.data === null) {
                    toast.error("Order was already accepted", {
                        position: 'top-center'
                    })
                    getdata()
                }
                else {
                    try {
                        //console.log(order.number);
                        const response = await axios.post('https://backend.kooblu.com/OTP/sendotp', { phoneNumber: order.number }, { withCredentials: true })
                        console.log(response.data.message);

                        setOrderId(order)
                        handleOpen()

                    } catch (err) {

                        console.log(err.response.data.message);
                        toast.error(err.response.data.message, {
                            position: 'top-center'
                        })

                    }
                }
            })
        }
        catch (err) {
            console.log(err.response.data);
        }



    }
    const Buttonclick = () => {

    }





    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://backend.kooblu.com/OTP/verifyotp', { phoneNumber: orders.number, otp: veriyfyOtp }, { withCredentials: true })
            console.log(response.data.message)
            setError('');
            if (response.data.message === "OTP verified successfully") {

                await axios.post(`https://backend.kooblu.com/booking_api/pending_orders/${orders._id}`, {
                    vendor_email: vendorDetails.Email,
                    vendor_name: vendorDetails.Username,
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
                axios.delete(`https://backend.kooblu.com/booking_api/delete_item/${orders._id}`)
                    .then(() => {
                        toast.success("Successfully verified", {
                            position: 'top-center'
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
            toast.error(error.response.data.message, {
                position: 'top-center'
            })
        }
    }


    const handleOpen4 = (id) => {
        axios.get(`https://backend.kooblu.com/booking_api/Completed_billing/${id}`)
            .then((res) => {
                console.log(res.data);
                setCompletedbill([res.data])

                // setSubcategory(res.data.workLists)

            })
            .then(() => {
                setOpen4(false)

            })

        console.log(open4);
    }

    const handleClose4 = () => {
        setOpen4(true)
    }

    const getdata = () => {
        axios.get("https://backend.kooblu.com/booking_api/booking_data").then((res) => {
            setorderdetails(res.data)
            // console.log(vendorDetails.Username);
        })


    }
    let a = 1;

    // const listofwork = () => {
    //     axios.get("https://backend.kooblu.com/sub_api/new_fetch_items").then((res) => {
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
    //       const response = await axios.post('https://backend.kooblu.com/doneOtp/service-done-otp', {
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
                    <h2>Order Details</h2>
                    <TableContainer component={Paper} style={{ padding: "20px", marginTop:"30px"}}>
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
                            {orderdetails.length < 0 ? 
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
                            </TableBody> : (
                          <TableBody>
                          <StyledTableCell colSpan={8}>
                              <div>
                                  <p className="center_content">No Orders Available</p>
                              </div>
                          </StyledTableCell>

                      </TableBody>
                            )}
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
                    <h2>Completed Orders</h2><br />
                    <div className="Earnings" >
                        <h4>Total Earnings : <span className="Pay-button">{totalearnings}</span></h4><br />
                        <h4>Total Orders : {completedOrderdetails.length}</h4>
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
                        {completedOrderdetails.length < 0 ?
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
                                        <StyledTableCell style={{ textAlign: "center" }}><button onClick={() => handleOpen4(data._id)} className="Pay-button">View Bill</button></StyledTableCell>

                                    </TableRow>


                                ))
                            }
                        </TableBody> :  (
                          <TableBody>
                          <StyledTableCell colSpan={7}>
                              <div>
                                  <p className="center_content">No Completed Orders</p>
                              </div>
                          </StyledTableCell>

                      </TableBody>
                            )}

                    </Table>
                    <div className="Bill-modal" hidden={open4}>
                        <h2 className="Bills-heading">Bill</h2>
                        <div className="Bill-sec2">
                            <div style={{ height: "15rem", overflow: 'scroll', width: '100%' }}>

                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ backgroundColor: 'White', textAlign: "center", fontWeight: '600', border: 'none' }}>Work Done</TableCell>
                                            <TableCell style={{ backgroundColor: 'White', textAlign: "center", fontWeight: '600', border: 'none' }}>Charges</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody style={{ width: '100%' }}>

                                        {
                                            completedbill.map((data) => (
                                                data.workLists.map((Sub, secondindex) => (
                                                    //console.log(Sub.subCategory)

                                                    <TableRow key={secondindex} >
                                                        <TableCell style={{ backgroundColor: "white", border: 'none' }}><p>{Sub.subCategory}</p></TableCell>
                                                        <TableCell style={{ backgroundColor: "white", border: 'none', textAlign: 'center' }}><p>{Sub.price}</p></TableCell>
                                                    </TableRow>
                                                ))
                                            ))
                                        }

                                        <TableRow>
                                            <TableCell style={{ backgroundColor: "grey", display: 'flex', alignItems: 'center', border: 'none' }}><p style={{ margin: '0px', fontWeight: '600', color: 'white' }}>Total</p></TableCell>
                                            {
                                                completedbill.map((data, index) => (
                                                    <TableCell key={index} style={{ backgroundColor: "white" }}><p style={{ margin: '0px', textAlign: 'center' }}>{data.total}</p></TableCell>
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

    // const token = cookies.venjwt;
    const token = localStorage.getItem("vendor");
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
        if (selected.length === 0) {
            toast.error("Select the work done", {
                position: 'top-center'
            })
        }
        else {
            setResendOTP(false);
            clearInterval(timer);
            console.log(selected);
            try {
                // console.log(orders.number);
                const response = await axios.post('https://backend.kooblu.com/doneOtp/service-done-otp', {
                    phoneNumber: Phonenumber
                });
                console.log(response.data.message);
                toast.success(response.data.message, {
                    position: 'top-center'
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
                toast.error(error.response.data.message, {
                    position: 'top-center'
                })
            }
        }
    }
    function get_vendor() {
        axios.get(`https://backend.kooblu.com/vendor_Auth/fetch_vendor/${vendorId}`)
            .then((res) => {
                setVendorDetails(res.data)
                console.log(res.data);
            })
    }
    function vendor_orders() {
        axios.get(`https://backend.kooblu.com/booking_api/pending_booking_data/${vendorDetails.Email}`)
            .then((res) => {
                setPendingorders(res.data)
            })
    }
    const listofwork = () => {
        axios.get("https://backend.kooblu.com/sub_api/new_fetch_items").then((res) => {
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
        axios.post("https://backend.kooblu.com/doneOtp/verifyotp", {
            phoneNumber: Phonenumber,
            otp: OTP
        }
        )
            .then((res) => {
                console.log(res.data.message);
                handleClose2()
                if (res.data.message === "OTP verified successfully") {
                    console.log(completePendingorders._id);
                    axios.post(`https://backend.kooblu.com/booking_api/Completed_orders/${completePendingorders._id}`, {
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
                        workLists: workListsData,
                        total: total
                    }).then(() => {
                        axios.delete(`https://backend.kooblu.com/booking_api/delete_pending_item/${completePendingorders._id}`)
                        toast.success("OTP verified", {
                            position: 'top-center'
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
                toast.error(err.response.data.message, {
                    position: 'top-center'
                })
            })


    }

    if (State === 3) {
        return (
            <div style={{ width: "100%" }}>
                <div className="container-fluid">
                    <h2>Pending order Details</h2>
                    <TableContainer component={Paper} style={{ padding: "20px", marginTop:"30px" }}>
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
                            {pendingorders.length > 0 ? <TableBody>
                                {
                                    pendingorders.map((data, index) => (


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

                                }
                            </TableBody> : (
                                <TableBody>
                                    <StyledTableCell colSpan={8}>
                                        <div>
                                            <p className="center_content">No pending orders</p>
                                        </div>
                                    </StyledTableCell>

                                </TableBody>

                            )}
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
                                    <StyledTableCell align="center">{total}<br /><button onClick={() => { completeOtp() }}>confirm</button></StyledTableCell>
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

    // const token = cookies.jwt2;
    const token = localStorage.getItem("ty");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;

    const useremail = myorders.email

    const [open4, setOpen4] = useState(true);

    console.log(completedbill);
    const handleClose4 = () => {
        setOpen4(true)
    }
    const handleOpen4 = (id) => {
        axios.get(`https://backend.kooblu.com/booking_api/Completed_billing/${id}`)
            .then((res) => {
                console.log(res.data);
                setCompletedbill([res.data])

                setSubcategory(res.data.workLists)

            })
            .then(() => {
                setOpen4(false)

            })

        console.log(open4);
    }
    const Razorpay = useRazorpay()
    const Total = completedbill.map((data) => data.total)


    function pay(data) {

        var amount = parseInt(Total);

        var options = {
            key: "rzp_test_1SnQnLm783h5Op",
            key_secret: "W3x1XiUXiyqIKQJrSBqaXGmE",
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
        var propay = new Razorpay(options);
        propay.open()
        // .then(()=>{
        function completePayment() {
            axios.patch(`https://backend.kooblu.com/booking_api/edit_Completed_orders/${data._id}`, {
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
                total: data.total

            })
        }
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
        axios.get(`https://backend.kooblu.com/authUser/fetch_email/${userId}`)
            .then((res) => {
                // console.log(res.data);
                setMyorders(res.data);

            })
    }

    // const pending_orderss = () => {

    // }

    useEffect(() => {
        axios.get(`https://backend.kooblu.com/booking_api/booking_data/${useremail}`)
            .then((res) => {
                console.log(res.data);
                setorderdetails(res.data)

            })

        axios.get(`https://backend.kooblu.com/booking_api/pending_book/${useremail}`)
            .then((res) => {
                setpending_order(res.data)
                console.log(res.data);
            })

        axios.get(`https://backend.kooblu.com/booking_api/Completed_order/${useremail}`)
            .then((res) => {
                setCompleted_order(res.data)
                setSubcategory(res.data.workLists)
                console.log(res.data);
            })

    }, [useremail])

    const [subCategory, setSubcategory] = useState([])



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
    //     axios.get("https://backend.kooblu.com/booking_api/booking_data").then((res)=>{
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
                    <h2>Pending Orders</h2>
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
                        {pending_order.length < 0 ?
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
                        </TableBody>: (
                            <TableBody>
                            <TableRow>
                                <TableCell colSpan={7}>
                                <div>
                                    <p className="center_content">No pending orders</p>
                                </div>
                                </TableCell>
                               
                            </TableRow>

                        </TableBody>
                        )}
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
                        {orderdetails.length < 0 ?
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
                        </TableBody> : (
                            <TableBody>
                            <TableRow>
                                <TableCell colSpan={7}>
                                <div>
                                    <p className="center_content">No Orders Available</p>
                                </div>
                                </TableCell>
                               
                            </TableRow>

                        </TableBody>
                        )}
                    </Table>

                </div>
            </div>
        )
    }

    else if (State === 4) {
        return (
            <div style={{ width: "100%" }}>
                <div className="container-fluid">
                    <h2>Completed Orders</h2>
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
                       {completed_order.length < 0 ?
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
                        </TableBody>: (
                            <TableBody>
                            <TableRow>
                                <TableCell colSpan={7}>
                                <div>
                                    <p className="center_content">No Completed orders</p>
                                </div>
                                </TableCell>
                               
                            </TableRow>

                        </TableBody>
                        )}
                    </Table>

                </div>
            </div>

        )
    }

    else if (State === 5) {
        return (
            <div style={{ width: "100%" }}>

                <div className="container-fluid" >
                    <h2>Bills & Payment</h2>


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
                       {completed_order.length < 0 ?
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
                                        <TableCell style={{ textAlign: "center" }}><button onClick={() => handleOpen4(data._id)} className="Pay-button">View Bill</button></TableCell>
                                    </TableRow>





                                ))
                            }
                        </TableBody>:(
                            <TableBody>
                            <TableRow>
                                <TableCell colSpan={6}>
                                <div>
                                    <p className="center_content">No Bills Generated</p>
                                </div>
                                </TableCell>
                               
                            </TableRow>

                        </TableBody>
                        )}
                    </Table>



                </div>
                <div className="Bill-modal" hidden={open4}>
                    <h2 className="Bills-heading">Your bill</h2>
                    <div className="Bill-sec2">
                        <div style={{ height: "15rem", overflow: 'scroll', width: '100%' }}>

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ backgroundColor: 'White', textAlign: "center", fontWeight: '600', border: 'none' }}>Work Done</TableCell>
                                        <TableCell style={{ backgroundColor: 'White', textAlign: "center", fontWeight: '600', border: 'none' }}>Charges</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody style={{ width: '100%' }}>

                                    {
                                        completedbill.map((data) => (
                                            data.workLists.map((Sub, secondindex) => (
                                                //console.log(Sub.subCategory)

                                                <TableRow key={secondindex} >
                                                    <TableCell style={{ backgroundColor: "white", border: 'none' }}><p>{Sub.subCategory}</p></TableCell>
                                                    <TableCell style={{ backgroundColor: "white", border: 'none', textAlign: 'center' }}><p>{Sub.price}</p></TableCell>
                                                </TableRow>
                                            ))
                                        ))
                                    }

                                    <TableRow>
                                        <TableCell style={{ backgroundColor: "grey", display: 'flex', alignItems: 'center', border: 'none' }}><p style={{ margin: '0px', fontWeight: '600', color: 'white' }}>Total</p></TableCell>
                                        {
                                            completedbill.map((data, index) => (
                                                <TableCell key={index} style={{ backgroundColor: "white" }}><p style={{ margin: '0px', textAlign: 'center' }}>{data.total}</p></TableCell>
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
                            completedbill.map((data, index) => (
                                <button hidden={data.paymentMethod === "onlinePayment" ? false : true} onClick={() => pay(data)} className="Bill-btn1">Pay</button>
                            ))

                        }
                        <button className="Bill-btn2" onClick={handleClose4}>Cancel</button>
                    </div>

                </div>
            </div>


        )
    }


    else return null

}

export { UserProfile, UserOrders, VendorProfile, VendorOrders, PendingOrders, EditForm }