import { Button, Table, TableBody, TableCell, TableRow, TableHead, Switch, TextField, FormHelperText } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { toast } from "react-toastify";
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



const RecivedApplication = ({ formNumber }) => {
    let serialNumber = 1;
    const [viewdata, setviewdata] = useState([]);
    const [reject, setreject] = useState([]);
    const [vendorName, setVendorName] = useState('');
    const [vendorEmail, setVendorEmail] = useState('');
    const [vendorPwd, setVendorPwd] = useState('');
    const [nameErr, setNameErr] = useState(false);
    const [Emailerror, setEmailerror] = useState(false);
    const [pwderror, setpwderror] = useState(false);
    const [nameerr, setnameErr] = useState('');
    const [emailerr, setemailerr] = useState('');
    const [success, setSuccess] = useState('');
    const [pwderr, setpwderr] = useState('');
    const [open, setOpen1] = useState(false);
    const [openModel2, setOpenModel2] = useState(false);


    const handleOpen = (_id) => {
        // console.log("hii")
        axios.get(`http://localhost:3001/vendor_Applications/fetchVendor_id/${_id}`).then((res) => {
            setviewdata(res.data);
            setreject(res.data)
        })
        setOpen1(true);
    };
    const handleOpenModel2 = () => {
        setOpenModel2(true)
        setVendorName(viewdata.FirstName)
        setVendorEmail(viewdata.Email)
        setOpen1(false)
    }
    const handleClose = () => {
        setOpen1(false);
        setOpenModel2(false)
    };

    const handleVendorAuth = async (e) => {
        e.preventDefault()


        if (vendorName === "") {
            setNameErr(true)
            setnameErr("Name is required")
        }
        if (vendorEmail === '') {
            setEmailerror(true)
            setemailerr("Email is required")
        }
        if (vendorPwd === '') {
            setpwderror(true)
            setpwderr("password is required")
        }
        else {
            const response = await axios.post("http://localhost:3001/vendor_Auth/register", {
                Username: vendorName,
                Email: vendorEmail,
                Password: vendorPwd,
            }, { withCredentials: true })

            if (response.data.status === 'error') {
                console.log(response.data.message);
                setEmailerror(true)
                setemailerr(response.data.message);
            } else {
                setSuccess(response.data.message)
                deleteapplication()
                getdata()
                toast.info("Registration Completed", {
                    position: "top-center",
                });
                setTimeout(() => {
                    setVendorName("")
                    setVendorEmail("")
                    setVendorPwd("")
                    setSuccess("")
                    handleClose()

                }, 3000);
            }
        }


    }

    const deleteapplication = () => {
        axios.delete(`http://localhost:3001/vendor_Applications/delete_item/${viewdata._id}`)
    }

    const reject_data = () => {
        // e.preventDefault()
        // console.log(viewdata)
        axios.post("http://localhost:3001/reject_api/new_rejection", {
            Category: reject.Category,
            Location: reject.Location,
            FirstName: reject.FirstName,
            LastName: reject.LastName,
            Phone: reject.Phone,
            Address: reject.Address,
            Email: reject.Email

        })
            .then(() => {
                axios.delete(`http://localhost:3001/vendor_Applications/delete_item/${viewdata._id}`).then(() => {
                    toast.error('😈 Deleted Successed!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",

                    });
                })
            })
        setOpen1(false)
        getdata()

    }

    const getdata = () => {
        axios.get("http://localhost:3001/vendor_Applications/vendor_application").then((res) => {
            console.log(res.data);
            setApplication(res.data)
        })
    }

    const [application, setApplication] = useState([])
    useEffect(() => {
        getdata()
    })

    if (formNumber === 10) {
        return (
            <div>
                <h5>RecivedApplications</h5>

                <div >
                    <Table className='table-cat'>
                        <TableHead>
                            <TableRow>
                                <TableCell>SN</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Contact</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>View</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {application.map((data, index) =>
                                <TableRow key={index}>
                                    <TableCell>{serialNumber++}</TableCell>
                                    <TableCell>{data.FirstName} {data.LastName}</TableCell>
                                    <TableCell>
                                        <p>{data.Email}</p></TableCell>
                                    <TableCell><p>{data.Phone}</p></TableCell>
                                    <TableCell><p>{data.Address}</p></TableCell>
                                    <TableCell>
                                        <p>{data.Location}</p>
                                    </TableCell>
                                    <TableCell>
                                        <Button type="button" onClick={() => handleOpen(data._id)}><i class="fa-solid fa-eye"></i></Button>
                                    </TableCell>
                                </TableRow>
                            )}



                        </TableBody>
                    </Table>
                </div>

                <div>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Box sx={{ ...style, width: 400 }}>
                            <p><b>Name</b> : {viewdata.FirstName}</p>
                            <p>Email    : {viewdata.Email}</p>
                            <p>phone    : {viewdata.Phone}</p>
                            <p>Address  : {viewdata.Address}</p>
                            <p>Location : {viewdata.Location}</p>
                            <p>Category : {viewdata.Category}</p>
                            {/* <ChildModal close={setOpen1}/> */}
                            <Button onClick={handleOpenModel2}>hire</Button>
                            <Button onClick={reject_data}>Reject</Button>

                            {/* <ChildModal /> */}
                        </Box>
                    </Modal>
                </div>
                <div>
                    <Modal
                        open={openModel2}
                        onClose={handleClose}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description"
                    >
                        <Box sx={{ ...style, width: 400 }}>

                            <form onSubmit={handleVendorAuth}>
                                <p style={{ color: "green" }}>{success}</p>
                                <TextField
                                    type='text'
                                    id="outlined-basic"
                                    label="username"
                                    variant="outlined"
                                    value={vendorName}
                                    error={nameErr}
                                    helperText={nameErr ? nameerr : ''}
                                    onChange={
                                        (e) => {
                                            setVendorName(e.target.value)
                                            setNameErr(false)
                                        }


                                    }
                                /><br /><br />

                                <TextField

                                    type='email'
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    value={vendorEmail}
                                    error={Emailerror}
                                    helperText={Emailerror ? emailerr : ""}
                                    onChange={(e) => {
                                        setVendorEmail(e.target.value)
                                        setEmailerror(false)
                                    }

                                    }
                                /><br /><br />

                                <TextField
                                    type='password'
                                    id="outlined-basic"
                                    label="password"
                                    variant="outlined"
                                    value={vendorPwd}
                                    error={pwderror}
                                    helperText={pwderror ? pwderr : ''}
                                    onChange={(e) => {
                                        setVendorPwd(e.target.value)
                                        setpwderror(false)
                                    }
                                    }
                                /><br /><br />

                                <Button type="submit">submit</Button>
                                <Button type="button" onClick={handleClose} >close</Button>

                            </form>


                            {/* <ChildModal /> */}
                        </Box>
                    </Modal>
                </div>
            </div>
        )
    }
    else return null;


}



export default RecivedApplication;