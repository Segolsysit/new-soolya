import { Button, Table, TableBody, TableCell, TableRow, TableHead,Switch,TextField  } from '@mui/material';
import axios from 'axios';
import React,{ useEffect, useState } from 'react';
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
  


const RecivedApplication = ({formNumber}) => {
    let serialNumber=1;
    const [viewdata, setviewdata] = useState([]);
    const [vendorName, setVendorName] = useState('');
    const [vendorEmail, setVendorEmail] = useState('');
    const [vendorPwd, setVendorPwd] = useState('');

    const [open, setOpen1] = useState(false);
    const [openModel2, setOpenModel2] = useState(false);
    const handleOpen = (id) => {

        axios.get(`http://localhost:3001/vendor_Applications/fetchVendor_id/${id}`).then((response) => {
            setviewdata(response.data);
            // console.log(response.data);
        })
      setOpen1(true);
    };
    const handleOpenModel2 = () => {
        setOpenModel2(true)
        setOpen1(false)
    }
    const handleClose = () => {
      setOpen1(false);
      setOpenModel2(false)
    };

    const handleVendorAuth = (e) => {
      e.preventDefault()
      const { data } = axios.post("http://localhost:3001/vendor_Auth/register",{
        UserName:vendorName,
        Email:vendorEmail,
        Password:vendorPwd
      },{ withCredentials: true }).then(()=>{

      })
      if (data) {
        if (data.errors) {
            const { Email, Password } = data.errors;
            if (Email) {
                toast.error(Email, {
                    position: "bottom-right",
                });
            }
            else if (Password) {
                toast.error(Password, {
                    position: "bottom-right",
                });
            }
        } else {
            // nav("/")
        }
    }

    }

const [application,setApplication] = useState()
    useEffect(() => {
        axios.get("http://localhost:3001/vendor_Applications/vendor_application").then((res) => {
            console.log(res.data);
            setApplication(res.data)
        })
    },[])

    if(formNumber === 10){
        return(
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

                                        {application.map((data) =>
                                            <TableRow >
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
                       {/* <ChildModal close={setOpen1}/> */}
                       <Button onClick={handleOpenModel2}>hire</Button>
                       <Button type="button" >Reject</Button>

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
                      <TextField
                      type='text'
                      id="outlined-basic"
                      label="username"
                      variant="outlined"
                      onChange={(e) => setVendorName(e.target.value)}
                      /><br/><br/>

                      <TextField 
                      type='email' 
                      id="outlined-basic" 
                      label="Email" 
                      variant="outlined"
                      onChange={(e) => setVendorEmail(e.target.value)}
                      /><br/><br/>

                      <TextField 
                      type='password' 
                      id="outlined-basic" 
                      label="password" 
                      variant="outlined" 
                      onChange={(e) => setVendorPwd(e.target.value)}
                      /><br/><br/>

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