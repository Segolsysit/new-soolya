import React from "react";
import './css/Categoryform.css'
import  { useRef } from 'react'
import "./Admin.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableRow, TableHead, TextField } from '@mui/material';
import { toast } from "react-toastify";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';


import { Toast } from "bootstrap";

const CategoryForm=({FormNumber,setNumber})=>{

    const [categorySetup, setCatagorySetup] = useState("");
    const [img, setImg] = useState("");
    const[Desc,setDesc]=useState("")
    const[Price,setPrice]=useState("")
    const [getData, setgetData] = useState([]);
    const [getbyid, setgetbyid] = useState('');
    const nav = useNavigate()

    const [Editservice, setEditservice] = useState('');
    const [EditDesc, setEditDesc] = useState('');
    const [EditPrice, setEditPrice] = useState('');

    const [EditImage, setEditImage] = useState('');

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let a = 1;

    const aemail = localStorage.getItem("adminemail")
    const apassword = localStorage.getItem("adminpassword")

    const verify = ()=>{
        if(aemail === null && apassword === null){
            nav("/admin")
        }
    }

    // const [orderdetails, setorderdetails] = useState([])


    // const getdata2 = () => {
    //     axios.get("http://localhost:3001/booking_api/booking_data").then((res) => {
    //         setorderdetails(res.data)
    //     })}

    useEffect(() => {
        // getdata2()
        categorydata()
        verify()
    }, [])

    // const adminlogout = ()=>{
    //     localStorage.removeItem("adminemail")
    //     localStorage.removeItem("adminpassword")
    //     nav("/admin")
    // }

    const categorydata = () => {
        axios.get("http://localhost:3001/api/fetch_items").then((res) => {
            setgetData(res.data);
        })

    }
    const modelstyle = {
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
    const AddService = (e) => {

        e.preventDefault();

        if (categorySetup.length === 0) {
            toast.error("enter service category", {
                position: "top-right",
                theme: "colored"

            })
        }
        else if (img.length === 0) {
            if (img.size > 2000000) {


                toast.error("file size should be less than 2MB", {
                    position: "top-center",
                    theme: "colored"
                })
            }


            toast.error("please upload service image", {
                position: "top-right",
                theme: "colored"
            })
        }
        else if (img.type !== "image/jpeg") {

            toast.error("jpeg,jpg,png can upload", {
                position: "top-center"
            })
        }

        else if(Desc===""){
            toast.error("Enter Description", {
                position: "top-center"
            })
        }

        else if(Price===""){
            toast.error("Enter Price", {
                position: "top-center"
            })
        }

        else {
            const formdata = new FormData()
            formdata.append("catagorySetup", categorySetup);
            formdata.append("file", img)
            formdata.append("Desc",Desc)
            formdata.append("Price",Price)
            axios.post("http://localhost:3001/api/new_catagory/", formdata).then((res) => {

                toast.success(' uploaded Successed!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",

                });

                setCatagorySetup("")
                categorydata()
                setCatagorySetup("")
                setImg("")
                setDesc("")
                setPrice("")


            })
        }


    }
    const handleImgChange = (e) => {
        let file = e.target.files[0]
        if (file.size > 2000000) {


            toast.error("file size should be less than 2MB", {
                position: "top-center",
                theme: "colored"
            })

        }
        else if (file.type !== "image/jpeg" && file.type !== "image/jpg") {

            toast.error("jpeg,jpg,png can upload", {
                position: "top-center"
            })

        }

        else {
            setImg(file)
        }
    }
    const delete_item = (id) => {
        axios.delete(`http://localhost:3001/api/delete_item/${id}`).then(() => {
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
            categorydata()
        })
        
    }

    const localpath = "http://localhost:3001/"

    // const [style, setstyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")

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

    const EditFun = (id) => {
        axios.get(`http://localhost:3001/api/fetch_items_id/${id}`).then((res) => {
            setgetbyid(res.data)
            console.log(res.data)
        })
        handleOpen()
        console.log(getbyid);
    }

    const saveChange = (e) => {
        const formdata = new FormData();
        formdata.append("catagorySetup", Editservice);
        formdata.append("file", EditImage)
        formdata.append("Desc",EditDesc)
        formdata.append("Price",EditPrice)
        axios.patch(`http://localhost:3001/api//update_items/${getbyid._id}`, formdata).then(() => {
            // alert("updated")
            categorydata();
        })
        // console.log(formdata);
        handleClose();
    }

  


    
    if(FormNumber===1) {
        return(
        <div className="Category-Screen">
            <h1>Service Category</h1>
            <div className="Category-Outer">
                <form className="Category-left" onSubmit={AddService}>
                    <label className="Category-Label">Category</label>
                    <input type="text" value={categorySetup} className="Category-input" onChange={(e) => setCatagorySetup(e.target.value)} />
                    
                    <label className="Category-Label">Description</label>
                    <textarea className="Categorydesc-input" value={Desc} onChange={(e) => setDesc(e.target.value)}/>
                    <label className="Category-Label">Price</label>
                    <input value={Price} className="Category-input" onChange={(e) => setPrice(e.target.value)} />
                    <label className="Category-Label">Image</label>
                    <div className="Categoryfile-div">
                    <input type="file" className="Category-input" onChange={handleImgChange}/>
                    </div>
                    <button type="Submit" className="Category-button">Add</button>
                </form>
                <img className="Category-Right" src="https://cdn.pixabay.com/photo/2018/07/25/15/52/design-3561661_1280.jpg"/>
            </div>
            <div >
                                <Table className='table-cat'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>SN</TableCell>
                                            <TableCell>Category</TableCell>
                                            <TableCell>Image</TableCell>
                                            <TableCell>Desc</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Edit</TableCell>
                                            <TableCell>Delete</TableCell>



                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            getData.map((data, index) => (


                                                <TableRow key={index}>
                                                    <TableCell>{a++}</TableCell>

                                                    <TableCell><p>{data.catagorySetup}</p></TableCell>
                                                    <TableCell><img src={localpath + data.filename} style={{ width: "5em", height: "5em" }} alt=".........."></img> </TableCell>
                                                    
                                                    <TableCell><p>{data.Desc}</p></TableCell>
                                                    <TableCell><p>{data.Price}</p></TableCell>
                                                    <TableCell><Button data-bs-toggle="modal" onClick={() => EditFun(data._id)} data-bs-target="#EditCategory"><i class="fa-solid fa-pencil"></i></Button></TableCell>
                                                    <TableCell><Button onClick={() => delete_item(data._id)}><i class="fa-regular fa-trash-can"></i></Button></TableCell>
                                                </TableRow>


                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </div>
                            <div>
                                {/* <Button onClick={handleOpen}>Open modal</Button> */}
                                {/* <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={modelstyle}>
                                        <form className="category_form" id="category_form" onSubmit={saveChange}>
                                            <TextField type="text" placeholder={getbyid.catagorySetup} onChange={(e) => setEditservice(e.target.value)} label="Service" /><br></br>
                                            <TextField type="file" onChange={(e) => setEditImage(e.target.files[0])} /><br></br>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" onClick={() => handleClose()}>Close</button>
                                                <button type="submit" class="btn btn-primary">Save changes</button>
                                            </div>

                                        </form>
                                    </Box>
                                </Modal> */}
                                 <div class="modal fade" id="EditCategory" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Edit</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form className="category_form" id="category_form" onSubmit={()=>saveChange(getbyid._id)}>
                                                <TextField type="text" placeholder={getbyid.catagorySetup} onChange={(e) =>setEditservice(e.target.value) } label="Service"/><br></br>
                                                <TextField type="text" placeholder={getbyid.Desc} onChange={(e) =>setEditDesc(e.target.value) } label="Description"/><br></br>
                                                <TextField type="text" placeholder={getbyid.Price} onChange={(e) =>setEditPrice(e.target.value) } label="Price"/><br></br>
                                                <TextField type="file" onChange={(e) =>setEditImage(e.target.files[0]) }  /><br></br>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" class="btn btn-primary">Save changes</button>
                                                </div>

                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            </div>
            </div>
        )
    }
if(FormNumber===2){
    return(
        <div >
                <h1> Service Man List</h1>
                <Table className='table-cat'>
                  <TableHead>
                    <TableRow>
                      <TableCell>SN</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Contact info</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {/* {getServiceManData.map((data) => */}
                    <TableRow >
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <p></p>
                        <p></p>
                      </TableCell>
                      <TableCell>
                        <Switch color="primary" /></TableCell>
                      <TableCell>
                        <Button><i class="fa-solid fa-pencil"></i></Button>
                        <Button><i class="fa-solid fa-eye"></i></Button>
                        <Button><i class="fa-solid fa-trash"></i></Button>
                      </TableCell>
                    </TableRow>
                    {/* )} */}
                  </TableBody>
                </Table>
              </div>
    )
}
    
    
}


const Rejected_list = ({formNumber}) => {

    let serialNumber = 1;

    const [style, setstyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
    const [rejected,setregected] = useState([])
    const [viewdata,setviewdata] = useState([]);

    const aemail = localStorage.getItem("adminemail")
    const apassword = localStorage.getItem("adminpassword")
    const nav = useNavigate()


    const verify = ()=>{
        if(aemail === null && apassword === null){
            nav("/admin")
        }
    }


    const changeStyle = () => {
        if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setstyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled")
        }
        else{
            setstyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    }

    const changeStyle1 = () => {
        if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setstyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1")
        }
        else{
            setstyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    }

    const getrejected_list = ()=>{
        axios.get("http://localhost:3001/reject_api/rejected_data").then((res)=>{
            setregected(res.data)
        })
    }

    const [orderdetails, setorderdetails] = useState([])


    const getdata2 = () => {
        axios.get("http://localhost:3001/booking_api/booking_data").then((res) => {
            setorderdetails(res.data)
        })}

    // useEffect(()=>{
    //     getdata2()
    //     getrejected_list()
    //     verify()
    // })

    const viewdeatils = (id) => {
        axios.get(`http://localhost:3001/reject_api/rejected_data/${id}`).then((response) => {
         setviewdata(response.data);
         console.log(response.data);
        })
    }
if(formNumber===4){
    return(
        <div className="container-fluid">
                                <h1>Rejected List</h1>
                                <Table className='table-cat'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>SN</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Contact info</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {rejected.map((data) =>
                                        <TableRow >
                                            <TableCell>{serialNumber++}</TableCell>
                                            <TableCell>{data.FirstName} {data.LastName}</TableCell>
                                            <TableCell>
                                                <p>{data.Email}</p>
                                                <p>{data.MobilePhoneNumber}</p>
                                            </TableCell>
                                            <TableCell>
                                                <Switch color="primary" /></TableCell>
                                            <TableCell>
                                                <Button
                                                    type="button"  data-toggle="modal" data-target="#exampleModalCenter"
                                                    onClick={()=> viewdeatils(data._id)}
                                                ><i class="fa-solid fa-eye"></i></Button>
                                            </TableCell>
                                        </TableRow>
                                    )}



                                </TableBody>
                            </Table>

                            </div>
    )
}

}


const Orders = ({formNumber}) => {

    // const [style, setstyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
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

    // function resetNoti() {
    //     setNotificationCount("")
    // }

if(formNumber===5){
    return(
        <div className="container-fluid">
                                <h1>Order Deatails</h1>
                                <Table className='table-cat'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>SN</TableCell>
                                            <TableCell>Service</TableCell>
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

                                                    <TableCell><p>{data.Service}</p></TableCell>
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

}

 


export {CategoryForm,Rejected_list,Orders} 