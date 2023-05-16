import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableRow, TableHead } from '@mui/material';
import { toast } from "react-toastify"
//import { useNavigate } from 'react-router-dom';
import {
    TextField,
    FormHelperText,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    
  //  useStepContext,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';



const ServiceList=({formNumber})=>{
    //const [style, setstyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")

    // const [catagortSetup, setCatagortSetup] = useState("");
    // const [img, setImg] = useState("");
    const [getData, setgetData] = useState([]);
    let a = 1;

    //const aemail = localStorage.getItem("adminemail")
    // const apassword = localStorage.getItem("adminpassword")
    // const nav = useNavigate()


    // const verify = ()=>{
    //     if(aemail === null && apassword === null){
    //         nav("/admin")
    //     }
    // }

    // const adminlogout = ()=>{
    //     localStorage.removeItem("adminemail")
    //     localStorage.removeItem("adminpassword")
    //     nav("/admin")
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

    const getdata = ()=>{
        axios.get("http://localhost:3001/api/fetch_items").then((res) => {
            setgetData(res.data);
        })
    }

    // const [orderdetails, setorderdetails] = useState([])


    // const getdata2 = () => {
    //     axios.get("http://localhost:3001/booking_api/booking_data").then((res) => {
    //         setorderdetails(res.data)
    //     })}
 
    useEffect(() => {
      //  getdata2()
       //verify()
       getdata() 
    }, [])

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
        })
    }

    const localpath = "http://localhost:3001/"
    if(formNumber===6){
        return(
            <div className="container-fluid" >
                                <h1>Service List</h1>
                                <Table className='table-cat'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>SN</TableCell>
                                            <TableCell>Category</TableCell>
                                            <TableCell>Image</TableCell>
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
                                                    <TableCell><Button><i class="fa-solid fa-pencil"></i></Button></TableCell>
                                                    <TableCell><Button onClick={() => delete_item(data._id)}><i class="fa-regular fa-trash-can"></i></Button></TableCell>
                                                </TableRow>
    
    
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </div>
                 
        )
    }
    else{
        return null
    }
    
}


const AddNewService=({formNumber})=>{
  //  const [style, setstyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
    const [getData, setgetData] = useState([]);

    const [service, setservice] = useState("");
    const [category, setCatagory] = useState("");
    const [subcategory, setsubCatagory] = useState("");
    const [discription, setdiscription] = useState("");
    const [price, setprice] = useState("");
    const [img, setImg] = useState("");
    const [subcatlist, setsubcatlist] = useState([]);
    const [servicelist, setServicelist] = useState([]);
    const [getByIdList, setgetByIdList] = useState([]);
    const [Editservice, setEditservice] = useState("");
    const [Editcategory, setEditcategory] = useState("");
    const [Editsubcategory, setEditsubcategory] = useState("");
    // const [discription, setdiscription] = useState("");
    const [Editprice, setEditprice] = useState("");
    const [Editimg, setEditimg] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let a = 1;

    // const aemail = localStorage.getItem("adminemail")
    // const apassword = localStorage.getItem("adminpassword")
    //const nav = useNavigate()


    // const verify = ()=>{
    //     if(aemail === null && apassword === null){
    //         nav("/admin")
    //     }
    // }

   // const [orderdetails, setorderdetails] = useState([])


    // const getdata2 = () => {
    //     axios.get("http://localhost:3001/booking_api/booking_data").then((res) => {
    //         setorderdetails(res.data)
    //     })}


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

        if (service.length === 0) {
            toast.error("enter service", {
                position: "top-right",
                theme: "colored"

            })
        }
        else if (category.length === 0) {
            toast.error("enter category", {
                position: "top-right",
                theme: "colored"
            })
        }
        else if (subcategory.length === 0) {
            toast.error("enter sub category", {
                position: "top-right",
                theme: "colored"
            })
        }
        else if (discription.length === 0) {
            toast.error("enter discription", {
                position: "top-right",
                theme: "colored"
            })
        }
        else if (price.length === 0) {
            toast.error("enter price amount", {
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
        else if (img.type !== "image/jpeg" ) {

            toast.error("jpeg,jpg,png can upload", {
                position: "top-center"
            })
        }

        else {
            const formdata = new FormData()
            formdata.append("Service", service);
            formdata.append("Category", category);
            formdata.append("Subcategory", subcategory);
            formdata.append("Discription", discription);
            formdata.append("price", price);
            formdata.append("file", img)
            axios.post("http://localhost:3001/service_api/new_service/", formdata).then((res) => {

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

                setservice("")
                setCatagory("")
                setsubCatagory("")
                setdiscription("")
                setprice("")
                setImg("")
                // file.current.value = null
            })
        }
    }

    const EditList = (id) => {
        handleOpen()
        axios.get(`http://localhost:3001/service_api/new_fetch_service_items/${id}`).then((res) => {
            setgetByIdList(res.data)
            console.log(res.data);
        })
    }

    const saveChangeList = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("Service", Editservice)
        formData.append("Category", Editcategory)
        formData.append("Subcategory", Editsubcategory)
        formData.append("price", Editprice)
        formData.append("file", Editimg)

        axios.patch(`http://localhost:3001/service_api/update_service/${getByIdList._id}`, formData).then(() => {
            alert("ListUpdated")
        })

        handleClose()

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

    useEffect(() => {
       // verify()
        axios.get("http://localhost:3001/api/fetch_items").then((res) => {
            setgetData(res.data);
            // console.log(res.data);
        })
        axios.get("http://localhost:3001/sub_api/new_fetch_items").then((res) => {
            setsubcatlist(res.data);
            // console.log(res.data);
        })

        axios.get("http://localhost:3001/service_api/new_fetch_service_items").then((res) => {
            setServicelist(res.data)
            // console.log(servicelist);

        })
    // getdata2()
    }, [servicelist])

    const delete_list = (id) => {
        axios.delete(`http://localhost:3001/service_api/delete_item/${id}`).then(() => {

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
    }

    const localpath = "http://localhost:3001/"

    if(formNumber===7){
        return(
            <div>
            <div className="container-fluid">
                                <h1>Add New Service</h1>
                                <div className="category_form_div">
                                    <form className="category_form" id="category_form"
                                        onSubmit={AddService} >
                                        <TextField type="text" label="Service"
                                            value={service}
                                            onChange={(e) => setservice(e.target.value)}
                                        /><br></br>
                                        <FormControl sx={{ minWidth: 100 }}>
                                            <InputLabel id="demo-simple-select-label"
                                            >Select Category</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Select Category"
                                                value={category}
                                                onChange={(e) => setCatagory(e.target.value)}>
                                                {getData.map((data) => (
                                                    <MenuItem value={data.catagorySetup}>{data.catagorySetup}</MenuItem>
                                                ))
                                                }
                                            </Select>
                                            <FormHelperText></FormHelperText>
                                        </FormControl><br></br>
                                        <FormControl sx={{ minWidth: 100 }}>
                                            <InputLabel id="demo-simple-select-label"
                                            >Select Sub Category</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Select Category"
                                                value={subcategory}
                                                onChange={(e) => setsubCatagory(e.target.value)}>
                                                <MenuItem value="sub" selected disabled>Select Sub Category</MenuItem>

                                                {subcatlist.map((subcatlist) => (
                                                    <MenuItem value={subcatlist.Subcategory}>{subcatlist.Subcategory}</MenuItem>
                                                ))
                                                }
                                            </Select>
                                            <FormHelperText></FormHelperText>
                                        </FormControl><br></br>
                                        <TextField rows={3} multiline type="text" label="Short Discription*"
                                            value={discription}
                                            onChange={(e) => setdiscription(e.target.value)}
                                        /><br></br>
                                        <TextField type="number" label="Price*"
                                            onChange={(e) => setprice(e.target.value)}
                                            value={price}
                                        /><br></br>
                                        <TextField type="file" id="file" onChange={handleImgChange} /><br></br>
                                        <Button type='submit' variant='contained'>Addservice</Button><br></br>
                                        <Button type='reset' variant='contained'>clear</Button>

                                    </form>
                                </div>
                            </div>
                            <div className='Addservice_list'>
                                <Table className='table-cat'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>SN</TableCell>
                                            <TableCell>service</TableCell>
                                            <TableCell>category</TableCell>
                                            <TableCell>subCategory</TableCell>
                                            <TableCell>price</TableCell>
                                            <TableCell>Image</TableCell>

                                            <TableCell>Edit</TableCell>
                                            <TableCell>Delete</TableCell>




                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            servicelist.map((data, index) => (


                                                <TableRow key={index}>
                                                    <TableCell>{a++}</TableCell>
                                                    <TableCell><p>{data.Service}</p></TableCell>
                                                    <TableCell><p>{data.Category}</p></TableCell>
                                                    <TableCell><p>{data.Subcategory}</p></TableCell>
                                                    <TableCell><p><i class="fa-solid fa-indian-rupee-sign"></i>{data.price}</p></TableCell>
                                                    <TableCell><img src={localpath + data.filename} style={{ width: "5em", height: "5em" }} alt=".........."></img> </TableCell>
                                                    <TableCell><Button onClick={() => EditList(data._id)}><i class="fa-solid fa-pencil"></i></Button></TableCell>
                                                    <TableCell><Button onClick={() => delete_list(data._id)}><i class="fa-regular fa-trash-can" style={{ color: "red" }}></i></Button></TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>

                            </div>
                            <div>
                                {/* <Button onClick={handleOpen}>Open modal</Button> */}
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={modelstyle}>
                                        <form className="category_form" id="category_form" onSubmit={saveChangeList}>
                                            <TextField type="text" label="Service" onChange={(e) => setEditservice(e.target.value)} /><br></br>
                                            <FormControl sx={{ minWidth: 100 }}>
                                                <InputLabel id="demo-simple-select-label"
                                                >Select Category</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Select Category"
                                                    value={Editcategory}
                                                    onChange={(e) => setEditcategory(e.target.value)}>
                                                    {getData.map((data) => (
                                                        <MenuItem value={data.catagorySetup}>{data.catagorySetup}</MenuItem>
                                                    ))
                                                    }
                                                </Select>
                                                <FormHelperText></FormHelperText>
                                            </FormControl><br></br>
                                            <FormControl sx={{ minWidth: 100 }}>
                                                <InputLabel id="demo-simple-select-label">Select Sub Category</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Select Category"
                                                    value={Editsubcategory}
                                                    onChange={(e) => setEditsubcategory(e.target.value)}>

                                                    {/* <MenuItem value="sub" selected disabled>Select Sub Category</MenuItem> */}

                                                    {subcatlist.map((subcatlist) => (
                                                        <MenuItem value={subcatlist.Subcategory}>{subcatlist.Subcategory}</MenuItem>
                                                    ))
                                                    }
                                                </Select>
                                                <FormHelperText></FormHelperText>
                                            </FormControl><br></br>
                                            <TextField type="text" label="price" onChange={(e) => setEditprice(e.target.value)} /><br></br>
                                            <TextField type="file" onChange={(e) => setEditimg(e.target.files[0])} /><br></br>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" onClick={() => handleClose()}>Close</button>
                                                <button type="submit" class="btn btn-primary" >Save changes</button>
                                            </div>
                                        </form>
                                    </Box>
                                </Modal>
                            </div>

                        </div>
        )
    }
}


export {ServiceList,AddNewService} 


