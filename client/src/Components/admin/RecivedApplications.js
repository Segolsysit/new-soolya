import { Button, Table, TableBody, TableCell, TableRow, TableHead, Switch, TextField, FormHelperText } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { toast } from "react-toastify";
import './css/Categoryform.css'
// import { get } from '../../../../server/RouteFiles/subcategory_router';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
};


const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    bgcolor: 'background.paper',
    border: 'none',
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
    const [Phone, setPhone] = useState("")
    const [ImageState, setImageState] = useState(false)
    const [ImgUrl, setImgUrl] = useState("")



    const handleImgOpen=(name)=>{
        setImageState(true)
        setImgUrl(name)
    }

    const handleImgClose=()=>{
        setImageState(false)

    }

    const handleOpen = (_id) => {
        // console.log("hii")
        axios.get(`https://backend.kooblu.com/vendor_Applications/fetchVendor_id/${_id}`).then((res) => {
            setviewdata(res.data);
            setreject(res.data)
        })
        setOpen1(true);
    };
    const handleOpenModel2 = () => {
        setOpenModel2(true)
        setVendorName(viewdata.FirstName)
        setVendorEmail(viewdata.Email)
        setPhone(viewdata.Phone)
        setOpen1(false)
    }
    const handleClose = () => {
        setOpen1(false);
        setOpenModel2(false)
    };

    const deleteapplication = () => {
        axios.delete(`https://backend.kooblu.com/vendor_Applications/delete_item/${viewdata._id}`)
    }

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
            const response = await axios.post("https://backend.kooblu.com/vendor_Auth/register", {
                Username: vendorName,
                Email: vendorEmail,
                Password: vendorPwd,
                Phonenumber: Phone,
                Location: viewdata.Location,
                Gender: viewdata.Gender,
                Language: viewdata.Language,
                DOB: viewdata.DOB,
                AAdhar: viewdata.AAdhar,
                AccNo: viewdata.AccNo,
                BnkName: viewdata.BnkName,
                Ifsc: viewdata.Ifsc,
                Education: viewdata.Education,
                JobTitle: viewdata.JobTitle,
                WorkExp: viewdata.WorkExp,
                Zone: viewdata.Zone,
                AltPH: viewdata.AltPH,
                KnownL: viewdata.KnownL,
                AadharCard: viewdata.AadharFiles,
                PanCard: viewdata.PanFiles,
                Photo: viewdata.PhotoFiles
            }, { withCredentials: true })
                .then(console.log(Phone))

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



    const reject_data = () => {
        // e.preventDefault()
        // console.log(viewdata)
        axios.post("https://backend.kooblu.com/reject_api/new_rejection", {
            Category: reject.Category,
            Location: reject.Location,
            FirstName: reject.FirstName,
            LastName: reject.LastName,
            Phone: reject.Phone,
            Address: reject.Address,
            Email: reject.Email

        })
            .then(() => {
                axios.delete(`https://backend.kooblu.com/vendor_Applications/delete_item/${viewdata._id}`).then(() => {
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

    const OpenImage = (name) => {
        setImageState(false)
        setImgUrl(name)
    }

    const getdata = () => {
        axios.get("https://backend.kooblu.com/vendor_Applications/vendor_application").then((res) => {
            console.log(res.data);
            setApplication(res.data)
        })
    }

    const [application, setApplication] = useState([])
    useEffect(() => {
        getdata()
    }, [])

    const localpath = 'https://backend.kooblu.com/'

    if (formNumber === 10) {
        return (
            <div>
                <h5>RecivedApplications</h5>

                <div className="padd" >
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
                        {application.length != 0 ?
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
                                )
                                }
                            </TableBody> :
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={8}>
                                        <h3 className="no_data">No Application Received</h3>
                                    </TableCell>
                                </TableRow>
                            </TableBody>}
                    </Table>
                </div>

                <div>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >

                        <Box sx={{ ...style, height: '100%', overflowY: 'scroll' }}>
                            <div >
                                {/* style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }} */}
                                <div >
                                    {/* style={{ width: 'fit-content' }} */}

                                    <div>
                                        {Array.isArray(viewdata.PhotoFiles) && viewdata.PhotoFiles.map(item => {
                                            if (item.fieldName === "Photo") {
                                                return <img style={{ aspectRatio: 3 / 4, width: '100px', marginLeft: "90px" }} src={localpath + item.filename} alt='' onClick={()=>handleImgOpen(item.filename)}/>

                                            }


                                        })}
                                    </div>
                                    <p><b>First Name</b> : {viewdata.FirstName}</p>
                                    <p><b>Last Name</b>: {viewdata.LName}</p>
                                    <p><b>Email</b>   : {viewdata.Email}</p>
                                    <p><b>phone</b>    : {viewdata.Phone}</p>
                                    <p><b>Address </b> : {viewdata.Address}</p>
                                    <p><b>Location</b> : {viewdata.Location}</p>
                                    <p><b>Gender</b> : {viewdata.Gender}</p>
                                    <p><b>Language</b> : {viewdata.Language}</p>
                                    <p><b>DOB</b> : {viewdata.DOB}</p>
                                    <p><b>AAdhar Number</b> : {viewdata.AAdhar}</p>
                                    <p><b>Account Number</b> : {viewdata.AccNo}</p>
                                    <p><b>IFSC Code</b> : {viewdata.Ifsc}</p>
                                    <p><b>Education Level</b> : {viewdata.Education}</p>
                                    <p><b>Job Title</b> : {viewdata.JobTitle}</p>
                                    <p><b>Work Experience</b>   : {viewdata.WorkExp}</p>
                                    <p><b>Work Zone</b>   : {viewdata.Zone}</p>
                                    <p><b>Alternate Ph.No</b>   : {viewdata.AltPH}</p>
                                    <p><b>Languages Known</b>   : {viewdata.KnownL}</p>
                                    <div style={{ display: 'flex', gap: '20px' }}>
                                        {Array.isArray(viewdata.AadharFiles) && viewdata.AadharFiles.map(item => {
                                            if (item.fieldName === "AadharCard") {
                                                return (
                                                    <img style={{ aspectRatio: 16 / 9, width: '200px', }} src={localpath + item.filename} alt='' onClick={() => handleImgOpen(item.filename)} />
                                                )

                                            }


                                        })}
                                        {Array.isArray(viewdata.PanFiles) && viewdata.PanFiles.map(item => {
                                            if (item.fieldName === "PanCard") {
                                                return (
                                                    <img style={{ aspectRatio: 16 / 9, width: '200px', }} src={localpath + item.filename} alt='' onClick={()=>handleImgOpen(item.filename)}/>
                                                )

                                            }


                                        })}
                                    </div>




                                </div>

                            </div>
                            {/* <ChildModal close={setOpen1}/> */}
                            <Button onClick={handleOpenModel2}>hire</Button>
                            <Button onClick={reject_data}>Reject</Button>

                            {/* <ChildModal /> */}
                        </Box>
                    </Modal>
                </div>
                <div>
                    <div>
                        {/* <Button onClick={handleOpen}>Open modal</Button> */}
                        <Modal
                            open={ImageState}
                            onClose={handleImgClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style2}>
                                <img src={localpath + ImgUrl} alt="img"/>
                            </Box>
                        </Modal>
                    </div>
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