import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Admin.css"
import { CategoryForm, RejectedList, Orders, SubCategory, AddJobTitle, PaymentList } from './Categoryform';
import DashBoard from './Dashboard';
import RecivedApplication from './RecivedApplications';
import { AddNewService, ServiceList } from './Servicelist';

export const Admin = () => {
    const [style, setstyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
    const nav = useNavigate()
    const aemail = localStorage.getItem("adminemail")
    const [orderdetails, setorderdetails] = useState([])
    // const [ss ,setSs] = useState(orderdetails.length);



    const [state, setState] = useState(false)
    const [FormNum, setFormnum] = useState(0)
    const [not, setnot] = useState(0)
    
    const [Visible,setVisible]=useState(false)



    const getdata2 = () => {
        const notification = parseInt(localStorage.getItem("ordercount"))
        axios.get("https://backend.kooblu.com/booking_api/booking_data").then((res) => {
            setorderdetails(res.data)
            console.log(res.data.length);
            console.log(notification);
            if (notification === res.data.length || isNaN(notification) || notification >= res.data.length) {
                setnot(0)
                console.log(res.data.length);
            }
            else {
                setnot( res.data.length - notification)
                console.log(res.data.length);
            }
        })
    }






    useEffect(() => {
        getdata2()
    }, [])

    // useEffect(()=>{
    //     notificationfun(notification)
    // },[notification])

    useEffect(() => {
        getdata2()

    }, [])

    const changeStyle = () => {
        if (style === "Sidebar navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setstyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled")
        }
        else {
            setstyle("Sidebar navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    }

    const changeStyle1 = () => {
        if (style === "Sidebar navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setstyle("Sidebar navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1")
        }
        else {
            setstyle("Sidebar navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    }
    // const isPasswordCorrect = bcrypt.compareSync(apassword, hashedPassword);

    // const verify = () => {
    //     if (aemail === null) {
    //         nav("/admin")
    //     }
    // }

    const adminlogout = () => {
        localStorage.removeItem("adminemail")
        nav("/AdminLogin")
    }

    // useEffect(() => {
    //     getdata2()
    //     verify()
    // }, [])

    if (aemail === "admin@abc.com") {
        return (
            <div>
                <body id="page-top">

                    {/* <!-- Page Wrapper --> */}
                    <div id="wrapper">

                        {/* <!-- Sidebar --> */}
                        <ul className={style} id="accordionSidebar">

                            {/* <!-- Sidebar - Brand --> */}
                            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                                <div className="sidebar-brand-icon rotate-n-15">
                                    <i className="fas fa-laugh-wink"></i>
                                </div>
                                <div className="sidebar-brand-text mx-3">Soolya</div>
                            </a>
                            <div className="text-center d-none d-md-inline">
                                <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                            </div>


                            {/* <!-- Divider --> */}
                            <hr className="sidebar-divider my-0" />

                            {/* <!-- Nav Item - Dashboard --> */}
                            <li className="nav-item active  " onClick={() => {
                                
                                    setState(true)
                                    setFormnum(3)
                                
                            }}>
                                <div className="nav-link">
                                    <i className="fas fa-fw fa-tachometer-alt"></i>
                                    <span>Dashboard</span></div>
                            </li>

                            <li className="nav-item active" onClick={() => setFormnum(10)}>
                                <div className="nav-link"  >
                                    <i className="fas fa-fw fa-tachometer-alt"></i>
                                    <span>Application</span></div>
                            </li>

                            <li className="nav-item active" onClick={() => setFormnum(15)}>
                                <div className="nav-link"  >
                                <i class="fa-solid fa-indian-rupee-sign"></i>
                                    <span>Payment</span></div>
                                    </li>

                            {/* <!-- Divider --> */}
                            <hr className="sidebar-divider" />

                            {/* <!-- Heading --> */}
                            <div className="sidebar-heading">
                                SERVICE MANAGEMENT
                            </div>

                            {/* <!-- Nav Item - Pages Collapse Menu --> */}
                            <li className="nav-item">
                                <div className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOrder"
                                    aria-expanded="true" aria-controls="collapseOrder"  onClick={() => { localStorage.setItem("ordercount", orderdetails.length); setnot(0) ;setVisible(false) }
                                    //  setorderdetails("0")
                                }>
                                    <i class="fa-regular fa-link-horizontal"></i>
                                    <span>Orders{not === 0 ? <span></span> : <span className="badge badge-danger badge-counter">{not}</span>}

                                    </span>
                                </div>
                                <div id="collapseOrder" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionSidebar">
                                    <div className="bg-white py-2 collapse-inner rounded"  hidden={Visible}>
                                        {/* <h6 className="collapse-header">Custom Components:</h6> */}
                                        <div className="collapse-item"  onClick={() => {
                                            setState(true)
                                            setFormnum(12)
                                            setVisible(true)
                                        }}>Orders</div>
                                        <div className="collapse-item" onClick={() => {
                                            setState(true)
                                            setFormnum(5)
                                            setVisible(true)
                                        }} >Pending Orders</div>
                                        <div className="collapse-item" onClick={() => {
                                            setState(true)
                                            setFormnum(13)
                                            setVisible(true)
                                        }} >Completed Orders</div>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item" >
                                <div className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                    aria-expanded="true" aria-controls="collapseTwo" onClick={()=>setVisible(false)}>
                                    <i class="fa-solid fa-shapes"></i>
                                    <span >Service Categories</span>
                                </div>
                                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionSidebar">
                                    <div className="bg-white py-2 collapse-inner rounded"  hidden={Visible}>
                                        {/* <h6 className="collapse-header">Custom Components:</h6> */}
                                        <div className="collapse-item"  onClick={() => {
                                            setState(true)
                                            setFormnum(1)
                                            setVisible(true)
                                        }}>Category Setup</div>
                                        <div className="collapse-item" onClick={() => {
                                            setState(true)
                                            setFormnum(11)
                                            setVisible(true)
                                        }} >Sub Category Setup</div>
                                        <div className="collapse-item" onClick={() => {
                                            setState(true)
                                            setFormnum(14)
                                            setVisible(true)
                                        }} >Job Title Setup</div>
                                    </div>
                                </div>
                            </li>

                            {/* <!-- Nav Item - Utilities Collapse Menu --> */}
                            <li className="nav-item">
                                <div className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseUtilities"
                                    aria-expanded="true" aria-controls="collapseUtilities" onClick={()=>setVisible(false)}>
                                    <i className="fas fa-fw fa-wrench"></i>
                                    <span>Services</span>
                                </div>
                                <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                                    data-bs-parent="#accordionSidebar" hidden={Visible}>
                                    <div className="bg-white py-2 collapse-inner rounded" >
                                        <div className="collapse-item" onClick={() => { setFormnum(6) 
                                        setVisible(true)}}>Service List</div>
                                        {/* <div className="collapse-item" onClick={() => { setFormnum(7) 
                                        setVisible(true)}}>Add New Service</div> */}
                                         </div>
                                </div>
                            </li>


                            {/* <!-- Divider --> */}
                            <hr className="sidebar-divider" />

                            {/* <!-- Heading --> */}
                            <div className="sidebar-heading">
                                SERVICE MAN MANAGEMENT
                            </div>

                            {/* <!-- Nav Item - Pages Collapse Menu --> */}
                            <li className="nav-item" >
                                <div className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapsePages1"
                                    aria-expanded="true" aria-controls="collapsePages1" onClick={()=>setVisible(false)}>
                                    <i className="fas fa-fw fa-user"></i>
                                    <span>SERVICE MAN</span>
                                </div>
                                
                                <div id="collapsePages1" className="collapse" aria-labelledby="headingPages1" data-bs-parent="#accordionSidebar" hidden={Visible}>
                                    <div className="bg-white py-2 collapse-inner rounded">
                                        {/* <h6 className="collapse-header">Login Screens:</h6> */}
                                        <div className="collapse-item" onClick={() => {
                                            setFormnum(2)
                                            setVisible(true)
                                        }}>Service Man List</div>
                                        <div className="collapse-item" onClick={() => {
                                            setFormnum(4)
                                            setVisible(true)
                                        }}>Rejected List</div>
                                    </div>
                                </div>
                            </li>
                           
                            <hr className="sidebar-divider d-none d-md-block" />

                            {/* <!-- Sidebar Toggler (Sidebar) --> */}
                            {/* <div className="text-center d-none d-md-inline">
                                <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                            </div> */}

                            {/* <!-- Sidebar Message --> */}
                            {/* <div className="sidebar-card d-none d-lg-flex">
                                <img className="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..." />
                                <p className="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
                                <a className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
                            </div> */}

                        </ul>
                        {/* <!-- End of Sidebar --> */}

                        {/* <!-- Content Wrapper --> */}
                        <div id="content-wrapper" className="d-flex flex-column">

                            {/* <!-- Main Content --> */}
                            <div id="content">

                                {/* <!-- Topbar --> */}
                                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                                    {/* <!-- Sidebar Toggle (Topbar) --> */}
                                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={changeStyle1}>
                                        <i className="fa fa-bars"></i>
                                    </button>

                                    {/* <!-- Topbar Search --> */}
                                    <form
                                        className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                        <div className="input-group">
                                            <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                                                aria-label="Search" aria-describedby="basic-addon2" />
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
                                            <a className="nav-link dropdown-toggle" id="searchDropdown" role="button"
                                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="fas fa-search fa-fw"></i>
                                            </a>
                                            {/* <!-- Dropdown - Messages --> */}
                                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                                aria-labelledby="searchDropdown">
                                                    <div className="dropdown-item">
                                                <form className="form-inline mr-auto w-100 navbar-search">
                                                    <div className="input-group">
                                                        <input type="text" className="form-control bg-light border-0 small"
                                                            placeholder="Search for..." aria-label="Search"
                                                            aria-describedby="basic-addon2" />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-primary" type="button">
                                                                <i className="fas fa-search fa-sm"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                                </div>
                                            </div>
                                        </li>

                                        {/* <!-- Nav Item - Alerts --> */}
                                        {/* <li className="nav-item dropdown no-arrow mx-1">
                                            <a className="nav-link dropdown-toggle" href="/" id="alertsDropdown" role="button"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="fas fa-bell fa-fw"></i>
                                                {/* <!-- Counter - Alerts --> */}
                                                {/* <span className="badge badge-danger badge-counter">3+</span>
                                            </a> */}
                                            {/* <!-- Dropdown - Alerts --> */}
                                            {/* <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                                aria-labelledby="alertsDropdown">
                                                <h6 className="dropdown-header">
                                                    Alerts Center
                                                </h6>
                                                <a className="dropdown-item d-flex align-items-center" href="/">
                                                    <div className="mr-3">
                                                        <div className="icon-circle bg-primary">
                                                            <i className="fas fa-file-alt text-white"></i>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="small text-gray-500">December 12, 2019</div>
                                                        <span className="font-weight-bold">A new monthly report is ready to download!</span>
                                                    </div>
                                                </a>
                                                <a className="dropdown-item d-flex align-items-center" href="/">
                                                    <div className="mr-3">
                                                        <div className="icon-circle bg-success">
                                                            <i className="fas fa-donate text-white"></i>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="small text-gray-500">December 7, 2019</div>
                                                        $290.29 has been deposited into your account!
                                                    </div>
                                                </a>
                                                <a className="dropdown-item d-flex align-items-center" href="/">
                                                    <div className="mr-3">
                                                        <div className="icon-circle bg-warning">
                                                            <i className="fas fa-exclamation-triangle text-white"></i>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="small text-gray-500">December 2, 2019</div>
                                                        Spending Alert: We've noticed unusually high spending for your account.
                                                    </div>
                                                </a>
                                                <a className="dropdown-item text-center small text-gray-500" href="/">Show All Alerts</a>
                                            </div>
                                        </li> */}

                                        {/* <!-- Nav Item - Messages --> */}
                                        {/* <li className="nav-item dropdown no-arrow mx-1">
                                            <a className="nav-link dropdown-toggle" href="/" id="messagesDropdown" role="button"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="fas fa-envelope fa-fw"></i> */}
                                                {/* <!-- Counter - Messages --> */}
                                                {/* <span className="badge badge-danger badge-counter">7</span>
                                            </a> */} 
                                            {/* <!-- Dropdown - Messages --> */}
                                            {/* <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                                aria-labelledby="messagesDropdown">
                                                <h6 className="dropdown-header">
                                                    Message Center
                                                </h6>
                                                <a className="dropdown-item d-flex align-items-center" href="/">
                                                    <div className="dropdown-list-image mr-3">
                                                        <img className="rounded-circle" src="img/undraw_profile_1.svg"
                                                            alt="..." />
                                                        <div className="status-indicator bg-success"></div>
                                                    </div>
                                                    <div className="font-weight-bold">
                                                        <div className="text-truncate">Hi there! I am wondering if you can help me with a
                                                            problem I've been having.</div>
                                                        <div className="small text-gray-500">Emily Fowler · 58m</div>
                                                    </div>
                                                </a>
                                                <a className="dropdown-item d-flex align-items-center" href="/">
                                                    <div className="dropdown-list-image mr-3">
                                                        <img className="rounded-circle" src="img/undraw_profile_2.svg"
                                                            alt="..." />
                                                        <div className="status-indicator"></div>
                                                    </div>
                                                    <div>
                                                        <div className="text-truncate">I have the photos that you ordered last month, how
                                                            would you like them sent to you?</div>
                                                        <div className="small text-gray-500">Jae Chun · 1d</div>
                                                    </div>
                                                </a>
                                                <a className="dropdown-item d-flex align-items-center" href="/">
                                                    <div className="dropdown-list-image mr-3">
                                                        <img className="rounded-circle" src="img/undraw_profile_3.svg"
                                                            alt="..." />
                                                        <div className="status-indicator bg-warning"></div>
                                                    </div>
                                                    <div>
                                                        <div className="text-truncate">Last month's report looks great, I am very happy with
                                                            the progress so far, keep up the good work!</div>
                                                        <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                                    </div>
                                                </a>
                                                <a className="dropdown-item d-flex align-items-center" href="/">
                                                    <div className="dropdown-list-image mr-3">
                                                        <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                                                            alt="..." />
                                                        <div className="status-indicator bg-success"></div>
                                                    </div>
                                                    <div>
                                                        <div className="text-truncate">Am I a good boy? The reason I ask is because someone
                                                            told me that people say this to all dogs, even if they aren't good...</div>
                                                        <div className="small text-gray-500">Chicken the Dog · 2w</div>
                                                    </div>
                                                </a>
                                                <a className="dropdown-item text-center small text-gray-500" href="/">Read More Messages</a>
                                            </div>
                                        </li> */}

                                        <div className="topbar-divider d-none d-sm-block"></div>

                                        {/* <!-- Nav Item - User Information --> */}
                                        <li className="nav-item dropdown no-arrow">
                                            <div className="nav-link dropdown-toggle" id="userDropdown" role="button"
                                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Soolya Admin</span>
                                                <img className="img-profile rounded-circle"
                                                    src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=1380&t=st=1682739237~exp=1682739837~hmac=f11f99f8519b92a3978e86098ddad8b6f27c888139ea4180a3e0339bec6a147e"
                                                    alt='...' />
                                            </div>
                                            {/* <!-- Dropdown - User Information --> */}
                                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                                aria-labelledby="userDropdown">
                                                <a className="dropdown-item" href="/">
                                                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                                    Profile
                                                </a>
                                                <a className="dropdown-item" href="/">
                                                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                                    Settings
                                                </a>
                                                <a className="dropdown-item" href="/">
                                                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                                    Activity Log
                                                </a>
                                                <div className="dropdown-divider"></div>
                                                <button className="dropdown-item" onClick={adminlogout}>
                                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" ></i>
                                                    Logout
                                                </button>
                                            </div>
                                        </li>

                                    </ul>

                                </nav>
                                {/* <!-- End of Topbar --> */}

                                <CategoryForm open={state} close={setState} FormNumber={FormNum} setNumber={setFormnum} />
                                <DashBoard open={state} close={setState} formNumber={FormNum} setForm={setFormnum}/>
                                <RejectedList formNumber={FormNum} />
                                <Orders formNumber={FormNum} />
                                <ServiceList formNumber={FormNum} />
                                <AddNewService formNumber={FormNum} />
                                <RecivedApplication formNumber={FormNum} />
                                <SubCategory formNumber={FormNum} />
                                <AddJobTitle formNumber={FormNum}/>
                                <PaymentList formNumber={FormNum}/>

                            </div>
                            {/* <!-- End of Main Content --> */}

                            {/* <!-- Footer --> */}
                            {/* <footer className="sticky-footer bg-white">
                                <div className="container my-auto">
                                    <div className="copyright text-center my-auto">
                                        <span>Copyright &copy; Your Website 2021</span>
                                    </div>
                                </div>
                            </footer> */}
                            {/* <!-- End of Footer --> */}

                        </div>
                        {/* <!-- End of Content Wrapper --> */}

                    </div>
                    {/* <!-- End of Page Wrapper --> */}

                    {/* <!-- Scroll to Top Button--> */}
                    <a className="scroll-to-top rounded" href="#page-top">
                        <i className="fas fa-angle-up"></i>
                    </a>

                    {/* <!-- Logout Modal--> */}

                </body>
            </div>
        )
    }
    else {
        window.location.href = "/AdminLogin"
    }

}

export default Admin;