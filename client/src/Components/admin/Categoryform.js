import React from "react";
import './css/Categoryform.css'
import { useRef } from 'react'
import "./Admin.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast } from "react-toastify";
import Modal from '@mui/material/Modal';
// import { useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import Swal from "sweetalert2";



const CategoryForm = ({ FormNumber, setNumber }) => {

    const [categorySetup, setCatagorySetup] = useState("");
    const [img, setImg] = useState("");
    const [getData, setgetData] = useState([]);
    const [getbyid, setgetbyid] = useState('');
    const [filter, setFilter] = useState("")

   // const nav = useNavigate()

    let aRef = useRef(null)


    const [Editservice, setEditservice] = useState('');
    // const [EditDesc, setEditDesc] = useState('');
    // const [EditPrice, setEditPrice] = useState('');

    const [EditImage, setEditImage] = useState('');

    const [serviceman, setserviceman] = useState([])

    // const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    let a = 1;

    // const aemail = localStorage.getItem("adminemail")
    // const apassword = localStorage.getItem("adminpassword")

    // const verify = () => {
    //     if (aemail === null && apassword === null) {
    //         nav("/admin")
    //     }
    // }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
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

    // const [orderdetails, setorderdetails] = useState([])


    // const getdata2 = () => {
    //     axios.get("http://localhost:3001/booking_api/booking_data").then((res) => {
    //         setorderdetails(res.data)
    //     })}

    // useEffect(()=>{
    //     console.log(filter);
    //     if(filter!==""&&filter!==null&&filter!==NaN)
    //     {axios.get(`http://localhost:3001/vendor_Auth/fetch_vendor_bynum/${filter}`).then((res) => {
    //         setserviceman(res.data)
    //        // console.log(res.data);
    //        // console.log(serviceman.Email)
    //     })}
    //     else if(filter===""&&filter===null&&filter===NaN){

    //         axios.get("http://localhost:3001/vendor_Auth/fetch_vendor").then((res) => {
    //         setserviceman(res.data)
    //        // console.log(res.data);
    //        // console.log(serviceman.Email)
    //     })



    //     }
    // },[filter])

    const servicemandata = () => {
        axios.get("http://backend.kooblu.com/vendor_Auth/fetch_vendor").then((res) => {
            setserviceman(res.data)
            // console.log(res.data);
            // console.log(serviceman.Email)
        })
    }



    const deleteOpen1 = (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://backend.kooblu.com/vendor_Auth/delete_item/${_id}`)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                servicemandata()
            }
        })
    }

    // const verify = () => {
    //     if (aemail === null && apassword === null) {
    //         nav("/admin")
    //     }
    // }

    useEffect(() => {
        // getdata2()
        categorydata()
       
       // verify()
        servicemandata()
    }, [])

    // const adminlogout = ()=>{
    //     localStorage.removeItem("adminemail")
    //     localStorage.removeItem("adminpassword")
    //     nav("/admin")
    // }

    const categorydata = () => {
        axios.get("http://backend.kooblu.com/api/fetch_items").then((res) => {
            setgetData(res.data);
        })

    }
    // const modelstyle = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 400,
    //     bgcolor: 'background.paper',
    //     border: '2px solid #000',
    //     boxShadow: 24,
    //     p: 4,
    // };
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
        else if (img.type !== "image/jpeg" && img.type !== "image/png") {

            toast.error("jpeg,jpg,png can upload", {
                position: "top-center"
            })
        }



        else {
            const formdata = new FormData()
            formdata.append("catagorySetup", categorySetup);
            formdata.append("file", img)

            axios.post("http://backend.kooblu.com/api/new_catagory/", formdata).then((res) => {

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
                aRef.current.value = null
                categorydata()

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
        else if (file.type !== "image/jpeg" && file.type !== "image/jpg" && file.type !== "image/png") {

            toast.error("jpeg,jpg,png can upload", {
                position: "top-center"
            })

        }

        else {
            setImg(file)
        }
    }
    const delete_item = (id) => {
        axios.delete(`http://backend.kooblu.com/api/delete_item/${id}`).then(() => {
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

    const localpath = "http://backend.kooblu.com/"


    const EditFun = (id) => {
        axios.get(`http://backend.kooblu.com/api/fetch_items_id/${id}`).then((res) => {
            setgetbyid(res.data)
            // console.log(res.data)
        })
    //    handleOpen()
       // console.log(getbyid);
    }

    // const Filter=(phone)=>{
    //     if(phone!==""||phone!==null){axios.get(`http://localhost:3001/vendor_Auth/fetch_vendor/`).then((res) => {
    //         setserviceman(res.data)
    //        // console.log(res.data);
    //        // console.log(serviceman.Email)
    //     })}
    // }

    const saveChange = () => {
        const formdata = new FormData();
        formdata.append("catagorySetup", Editservice);
        formdata.append("file", EditImage)

        axios.patch(`http://backend.kooblu.com/api//update_items/${getbyid._id}`, formdata).then(() => {
            // alert("updated")
            categorydata();
        })
        // console.log(formdata);
       // handleClose();
    }





    if (FormNumber === 1) {
        return (
            <div className="Category-Screen">
                <h1>Service Category</h1>
                <div className="Category-Outer">
                    <form className="Category-left" onSubmit={AddService}>
                        <label className="Category-Label">Category</label>
                        <input type="text" value={categorySetup} className="Category-input" onChange={(e) => setCatagorySetup(e.target.value)} />


                        <label className="Category-Label">Image</label>
                        <div className="Categoryfile-div">
                            <input ref={aRef} type="file" className="Category-input" onChange={handleImgChange} />
                        </div>
                        <button type="Submit" className="Category-button">Add</button>
                    </form>
                    <img className="Category-Right" src="https://cdn.pixabay.com/photo/2018/07/25/15/52/design-3561661_1280.jpg" alt="" />
                </div>
                <div >
                    <TableContainer component={Paper} style={{ padding: "20px" }}>
                        <Table className='table-cat' aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>SN</StyledTableCell>
                                    <StyledTableCell>Category</StyledTableCell>
                                    <StyledTableCell>Image</StyledTableCell>

                                    <StyledTableCell>Edit</StyledTableCell>
                                    <StyledTableCell>Delete</StyledTableCell>



                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    getData.map((data, index) =>

                                    (<StyledTableRow key={index}>
                                        <StyledTableCell>{a++}</StyledTableCell>

                                        <StyledTableCell><p>{data.catagorySetup}</p></StyledTableCell>
                                        <StyledTableCell><img src={localpath + data.filename} style={{ width: "5em", height: "5em" }} alt=".........."></img> </StyledTableCell>


                                        <StyledTableCell><Button data-bs-toggle="modal" onClick={() => EditFun(data._id)} data-bs-target="#EditCategory"><i class="fa-solid fa-pencil"></i></Button></StyledTableCell>
                                        <StyledTableCell><Button onClick={() => delete_item(data._id)}><i class="fa-regular fa-trash-can"></i></Button></StyledTableCell>
                                    </StyledTableRow>
                                    )

                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div>

                    <div class="modal fade" id="EditCategory" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Edit</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form className="category_form" id="category_form" onSubmit={() => saveChange(getbyid._id)}>
                                        <TextField type="text" placeholder={getbyid.catagorySetup} onChange={(e) => setEditservice(e.target.value)} label="Service" /><br></br>

                                        <TextField type="file" onChange={(e) => setEditImage(e.target.files[0])} /><br></br>
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
    if (FormNumber === 2) {
        return (
            <div >
                <h1> Service Man List</h1>


                <TableContainer component={Paper} style={{ padding: "20px" }}>
                    <form
                        className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 w-75 navbar-search">
                        <div className="input-group">
                            <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                                aria-label="Search" aria-describedby="basic-addon2" onChange={(e) => setFilter(e.target.value)} />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                    <i className="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* <!-- Topbar Navbar --> */}
                    <ul className="navbar-nav ml-auto">

                        {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                        <li className="nav-item dropdown no-arrow d-sm-none">
                            <a className="nav-link dropdown-toggle" href="/" id="searchDropdown" role="button"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-search fa-fw"></i>
                            </a>
                            {/* <!-- Dropdown - Messages --> */}
                            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                aria-labelledby="searchDropdown">
                                <form className="form-inline mr-auto w-100 navbar-search">
                                    <div className="input-group">
                                        <input type="text" className="form-control bg-light border-0 small"
                                            placeholder="Search for..." aria-label="Search"
                                            aria-describedby="basic-addon2" onChange={(e) => setFilter(e.target.value)} />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="button">
                                                <i className="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>
                    </ul>
                    <Table className='table-cat'>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>SN</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Mail_id</StyledTableCell>
                                <StyledTableCell>Phone</StyledTableCell>
                                <StyledTableCell>Status</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {serviceman.map((data) =>{
                            if(filter!==""&&filter!==null&&isNaN(filter))
                                {
                                    if(String(data.Phonenumber).match(filter)||String((data.Username).toLowerCase()).match(filter.toLowerCase()))
                                    {
                                        return (<StyledTableRow>
                                            <StyledTableCell>{a++}</StyledTableCell>
                                            <StyledTableCell>{data.Username}</StyledTableCell>
                                            <StyledTableCell>{data.Email}</StyledTableCell>
                                            <StyledTableCell>{data.Phonenumber}</StyledTableCell>

                                            <StyledTableCell>
                                                <Switch color="primary" /></StyledTableCell>
                                            <StyledTableCell style={{ width: '2%' }}>
                                                <Button><i class="fa-solid fa-pencil"></i></Button>
                                                <Button><i class="fa-solid fa-eye"></i></Button>
                                                <Button type="button" onClick={() => deleteOpen1(data._id)}><i class="fa-solid fa-trash"></i></Button>
                                            </StyledTableCell>
                                        </StyledTableRow >)
                                    }
                                }
                                else {
                                    return (<StyledTableRow>
                                        <StyledTableCell>{a++}</StyledTableCell>
                                        <StyledTableCell>{data.Username}</StyledTableCell>
                                        <StyledTableCell>{data.Email}</StyledTableCell>
                                        <StyledTableCell>{data.Phonenumber}</StyledTableCell>
                                        <StyledTableCell>
                                            <Switch color="primary" /></StyledTableCell>
                                        <StyledTableCell style={{ width: '2%' }}>
                                            <Button><i class="fa-solid fa-pencil"></i></Button>
                                            <Button><i class="fa-solid fa-eye"></i></Button>
                                            <Button type="button" onClick={() => deleteOpen1(data._id)}><i class="fa-solid fa-trash"></i></Button>
                                        </StyledTableCell>
                                    </StyledTableRow >)
                                }
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }


}
const localpath = "http://backend.kooblu.com/"
const SubCategory = ({ formNumber }) => {
    const [Data, setData] = useState([])

    let a = 1

    const [Category, setCategory] = useState("Select")
    const [SubCategory, setSubCategory] = useState("")
    const [Description, setDescription] = useState("")
    const [Image, setImage] = useState("")
    const [Price, setPrice] = useState("")

    let aRef = useRef(null)

    const [ErrCat, setErrCat] = useState("")
    const [ErrSub, setErrSub] = useState("")
    const [ErrDesc, setErrDesc] = useState("")
    const [ErrImg, setErrImg] = useState("")
    const [ErrPrice, setErrPrice] = useState("")
    const [subcategorydata, setsubcategorydata] = useState([])


    const [count, setCount] = useState(1)
    useEffect(() => {
        axios.get("http://backend.kooblu.com/api/fetch_items")
            .then((data) => {
                setData(data.data)
            })

        axios.get("http://backend.kooblu.com/sub_api/new_fetch_items")
            .then((data) => {
                setsubcategorydata(data.data)
            })

    }, [count])

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
            setImage(file)
            setErrImg("")
        }
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },

    }));

    const AddSubCategory = (e) => {
        e.preventDefault()
        setErrCat("")
        setErrDesc("")
        setErrSub("")
        setErrImg("")
        setErrPrice("")
        if (Category === "Select" || Category === "") {
            setErrCat("Select a category")
        }
        else if (SubCategory === "" || SubCategory === null) {
            setErrSub("Enter SubCategory")
        }
        else if (Description === "" || Description === null) {
            setErrDesc("Enter Description")
        }
        else if (Price === "" || Price === null) {
            setErrPrice("Please enter a price")
        }
        else if (Image === "No file chosen" || Image === "" || Image === null) {
            setErrImg("Please select a file")
        }

        else {
            const formData = new FormData();
            formData.append("Category", Category);
            formData.append("Subcategory", SubCategory);
            formData.append("Discription", Description);
            formData.append("Price", Price)
            formData.append("file", Image)
            // console.log(Image.file.originalname);
            axios.post("http://backend.kooblu.com/sub_api/new_subcategory", formData).then((res) => {
                // console.log(category);

                toast.success(' uploaded Successed!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"

                })
                setCount(count + 1)
                aRef.current.value = null


            })


        }
    }

    useEffect(() => {
        setCategory("Select");
        setSubCategory("");
        setDescription("");
        setImage("");
        setPrice("")
    }, [count])

    if (formNumber === 11) {
        return (
            <div className="Subcategory-Outer">
                <form className="SubCategory" onSubmit={AddSubCategory}>
                    <label className="Category-Label">Category</label>
                    <select className="Category-input" onChange={(e) => {
                        setCategory(e.target.value)
                        setErrCat("")
                    }} value={Category}>
                        <option>Select</option>
                        {Data.map((item, index) => {
                            return (
                                <option key={index}>{item.catagorySetup}</option>
                            )

                        })}

                    </select>
                    <p style={{ color: "red" }}>{ErrCat}</p>
                    <label className="Category-Label">Sub Category</label>
                    <input className="Category-input" onChange={(e) => {
                        setSubCategory(e.target.value)
                        setErrSub("")
                    }} value={SubCategory} />
                    <p style={{ color: "red" }}>{ErrSub}</p>
                    <label className="Category-Label">Description</label>
                    <textarea className="Category-input" onChange={(e) => {
                        setDescription(e.target.value)
                        setErrDesc("")
                    }} value={Description} />
                    <p style={{ color: "red" }}>{ErrDesc}</p>
                    <label className="Category-Label">Price</label>
                    <input className="Category-input" type='number' onWheel={(e) => e.target.blur()} onChange={(e) => {
                        setPrice(e.target.value)
                        setErrPrice("")
                    }} value={Price} />
                    <p style={{ color: "red" }}>{ErrPrice}</p>
                    <label className="Category-Label">Image</label>
                    <input ref={aRef} className="Category-input" type="file" onChange={handleImgChange} />
                    <p style={{ color: "red" }}>{ErrImg}</p>
                    <button className="Category-button" type="submit">Add</button>

                </form>
                <div className="Table-subcat">
                    <TableContainer component={Paper} style={{ padding: "20px" }}>
                        <Table className='table-cat' aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>SN</StyledTableCell>
                                    <StyledTableCell>Category</StyledTableCell>
                                    <StyledTableCell>Image</StyledTableCell>
                                    <StyledTableCell>Desc</StyledTableCell>
                                    <StyledTableCell>Price</StyledTableCell>
                                    <StyledTableCell>Edit</StyledTableCell>
                                    <StyledTableCell>Delete</StyledTableCell>



                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    subcategorydata.map((data, index) => (


                                        <StyledTableRow>
                                            <StyledTableCell>{a++}</StyledTableCell>

                                            <StyledTableCell>{data.Category}</StyledTableCell>
                                            <StyledTableCell><img src={localpath + data.filename} style={{ width: "5em", height: "5em" }} alt=".........."></img> </StyledTableCell>

                                            <StyledTableCell>{data.Discription}</StyledTableCell>
                                            <StyledTableCell><p>{data.Price}</p></StyledTableCell>
                                            <StyledTableCell><Button data-bs-toggle="modal" data-bs-target="#EditCategory"><i class="fa-solid fa-pencil"></i></Button></StyledTableCell>
                                            <StyledTableCell><Button ><i class="fa-regular fa-trash-can"></i></Button></StyledTableCell>
                                        </StyledTableRow>


                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        )
    }
    else return null

}


const RejectedList = ({ formNumber }) => {

    let serialNumber = 1;

    // const style1 = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 400,
    //     bgcolor: 'background.paper',
    //     border: '2px solid #000',
    //     boxShadow: 24,
    //     p: 4,
    // };

    //const server="localhost:3001/"
    
    const [rejected, setregected] = useState([])
    //const [viewdata, setviewdata] = useState([]);
    const [open, setOpen1] = useState(false);
    //const [openModel2, setOpenModel2] = useState(false);

    // const aemail = localStorage.getItem("adminemail")
    // const apassword = localStorage.getItem("adminpassword")
    // const nav = useNavigate()

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    // const handleOpen = (_id) => {
    //     axios.get(`http://localhost:3001/reject_api/rejected_data/${_id}`).then((response) => {
    //         setviewdata(response.data);
    //         console.log(response.data);
    //     })
    //     setOpen1(true);
    // }; 

    const deleteOpen = (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://backend.kooblu.com/reject_api/delete_item/${_id}`)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
            getrejected_list()
        })

    }

    const handleClose = () => {
        setOpen1(false);
     //  setOpenModel2(false)
    };

    // const handleOpenModel2 = () => {
    //     setOpenModel2(true)
    //     setOpen1(false)
    // }
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        // '&:last-child td, &:last-child th': {
        //     border: 0,
        // },
    }));

    const getrejected_list = () => {
        axios.get("http://backend.kooblu.com/reject_api/rejected_data").then((res) => {
            setregected(res.data)
        })


    }

    useEffect(() => {
        getrejected_list()
    }, [])

    // const viewdeatils = (id) => {
    //     axios.get(`http://localhost:3001/reject_api/rejected_data/${id}`).then((response) => {
    //         setviewdata(response.data);
    //         console.log(response.data);
    //     })
    // }
    if (formNumber === 4) {
        return (
            <div className="container-fluid">
                <h1>Rejected List</h1>
                <TableContainer component={Paper} style={{ padding: "20px" }}>
                    <Table className='table-cat' aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>SN</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Contact info</StyledTableCell>
                                <StyledTableCell>Status</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {rejected.map((data, index) =>
                                <StyledTableRow>
                                    <StyledTableCell>{serialNumber++}</StyledTableCell>
                                    <StyledTableCell>{data.FirstName}</StyledTableCell>
                                    <StyledTableCell>
                                        {data.Email}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Switch color="primary" /></StyledTableCell>
                                    <StyledTableCell>

                                        <Button type="button" onClick={() => deleteOpen(data._id)}><i class="fa-solid fa-trash"></i></Button>
                                    </StyledTableCell>
                                </StyledTableRow >
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        {/* <Box className="Application-popup" sx={{ ...style1 ,width: 400 }}>
                            <p><b>Name</b> : {viewdata.FirstName}</p>
                            <p>Email    : {viewdata.Email}</p>
                            <p>phone    : {viewdata.Phone}</p>
                            <p>Address  : {viewdata.Address}</p>
                            <p>Location : {viewdata.Location}</p>
                            <img src={server + viewdata.filename} alt=''></img>
                            {/* <ChildModal close={setOpen1}/> */}
                            {/* </Modal><Button onClick={handleOpenModel2}>hire</Button> */}
                            {/* <Button onClick={() => reject_data()}>Reject</Button> */}

                            {/* <ChildModal /> */}
                        {/* </Box> */} 
                    </Modal>
                </div>

            </div>
        )
    }

}


const Orders = ({ formNumber }) => {

    // const [style, setstyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
    const [orderdetails, setorderdetails] = useState([])
    const [completed_orderdetails, setcompleted_orderdetails] = useState([])
    const [pending_orderdetails, setpending_orderdetails] = useState([])
    //const aemail = localStorage.getItem("adminemail")
    //const apassword = localStorage.getItem("adminpassword");
    const [completedbill, setCompletedbill] = useState([])
    //const[subCategory,setSubcategory]=useState([])
    const [open4, setOpen4] = useState(true);
    // const [notificationCount, setNotificationCount] = useState(0);
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
        // hide last border
        // '&:last-child td, &:last-child th': {
        //     border: 0,
        // },
    }));

    useEffect(() => {
        if (formNumber === 5) {
            window.scroll(0, 10000)
        }
    }, [formNumber])


    // const verify = () => {
    //     if (aemail === null || apassword === null) {
    //         nav("/admin")
    //     }
    // }



    const getdata = () => {
        axios.get("http://backend.kooblu.com/booking_api/booking_data").then((res) => {
            setorderdetails(res.data)
        })
        axios.get("http://backend.kooblu.com/booking_api/pending_booking_data").then((res) => {
            setpending_orderdetails(res.data)
        })
        axios.get("http://backend.kooblu.com/booking_api/completed_booking_data").then((res) => {
            setcompleted_orderdetails(res.data)
        })

    }
    let a = 1;


    useEffect(() => {
        getdata()
       // verify()

    }, [])

    const handleOpen4 = (id) => {
        axios.get(`http://backend.kooblu.com/booking_api/Completed_billing/${id}`)
            .then((res) => {
                console.log(res.data);
                setCompletedbill([res.data])
            
                //setSubcategory(res.data.workLists)
                
            })
            .then(() => {
                setOpen4(false)

            })

        console.log(open4);
    }

    const handleClose4 = () => {
        setOpen4(true)
    }

    // function resetNoti() {
    //     setNotificationCount("")
    // }

    if (formNumber === 5) {
        return (
            <div className="container-fluid">
                <h1> pending Order Deatails</h1>
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
                                <StyledTableCell align="center">Accepted By</StyledTableCell>



                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                pending_orderdetails.map((data, index) => (


                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{a++}</StyledTableCell>

                                        <StyledTableCell align="center"><p>{data.person}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.user_email}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.Category}</p> </StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.price}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.address}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.number}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.paymentMethod}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.vendor_name}</p></StyledTableCell>
                                    </StyledTableRow>


                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>



        )
    }
    else if (formNumber === 12) {
        return (
            <div className="container-fluid">
                <h1>Orders</h1>
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
                                    </StyledTableRow>


                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        )
    }

    else if (formNumber === 13) {
        return (
            <div className="container-fluid">
                <h1>Completed Orders</h1>
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
                                <StyledTableCell align="center">Completed By</StyledTableCell>
                                <StyledTableCell align="center">Bill</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                completed_orderdetails.map((data, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{a++}</StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.person}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.user_email}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.Category}</p> </StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.price}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.address}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.number}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.paymentMethod}</p></StyledTableCell>
                                        <StyledTableCell align="center"><p>{data.vendor_name}</p></StyledTableCell>
                                        <StyledTableCell align="center"><button onClick={() => handleOpen4(data._id)} className="Pay-button">View Bill</button></StyledTableCell>
                                    </StyledTableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
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
                        <button className="Bill-btn2" onClick={handleClose4}>Cancel</button>
                    </div>

                </div>

            </div>
        )
    }

}




export { CategoryForm, RejectedList, Orders, SubCategory } 