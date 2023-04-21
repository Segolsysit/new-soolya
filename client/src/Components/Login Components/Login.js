import React, { useState } from "react";
import { Header, MenuBar ,Footer,End} from "../objects/objects";
import { Link } from "react-router-dom";
import './Login.css'
import { useLocation,useNavigate } from "react-router-dom";
import { useEffect, } from "react";
import iou from "./dummy.jpg"


const Login = () => {
    var UserId="kumar@gmail.com"
    var Pwd="Kumar@123"
    const Navigate=useNavigate();
    const { pathname } = useLocation();
        useEffect(() => {
        window.scrollTo(0, 0);
         }, [pathname]);

    const [show,setShow]=useState("password")
    const [icon,setIcon]=useState(<i class="fa-solid fa-eye"></i>)
    const PaswordState=()=>{
        if(show==="password"){
            setShow("text")
            setIcon(<i class="fa-sharp fa-solid fa-eye-slash"></i>)
        }
        else{
            setShow("password")
            setIcon(<i class="fa-solid fa-eye"></i>)
        }
    }

    const[LoginId,setLoginId]=useState("")
    const[Password,setPassword]=useState("")

    const [errLogin,setErrlogin]=useState("")
    const [errPwd,seterrPwd]=useState("")

    

    function LoginFun(e){
        e.preventDefault()
        setErrlogin("")
        seterrPwd("")
        if(LoginId===""||LoginId===null){
            setErrlogin("Please enter your LoginId")
        }

        if(Password===""||Password===null){
            seterrPwd("Please enter your Password")
        }

        if(LoginId===UserId&&Password===Pwd){
            localStorage.setItem("Status","Loggedin")
            localStorage.setItem("UserId",LoginId)
            return Navigate(-1)
        }

        if(LoginId!==UserId&&LoginId!==""){
            setErrlogin("No user found")
        }
        if(Password!==Pwd&&Password!==""){
            seterrPwd("Incorrect Password")
        }
    }


    return (
        <div>
            <Header />
            <MenuBar />
           <div className="Login-image">
                <h1 className="Login-heading">SignIn</h1>
            </div>
            <div className="Signup-card">
                <div className="Form-div">
                    <form className="Form" onSubmit={LoginFun}>
                        <div className="Signup-title">
                            <h1 className="Signup-heading">LogIn to ABC</h1>
                            <p className="Signup-ptag">Welcome! Login using data given while register</p>
                        </div>
                        <label className="Signup-Label">Email</label>
                        <input className="Signup-Input" onChange={(e)=>setLoginId(e.target.value)}/>
                        <p className="Error-signup">{errLogin}</p>
                        <label className="Signup-Label">Password</label>
                        <div className="Signup-Pwdbox">
                        <input type={show} className="Signup-InputPwd" onChange={(e)=>setPassword(e.target.value)}/>
                        <div onClick={PaswordState}>{icon}</div>
                        </div>
                        <p className="Error-signup">{errPwd}</p>
                        <div className="Login-sec2">
                            <div className="Remember">
                                <input type="checkbox"/>
                                <p className="Remember-ptag">Remember Me</p>
                            </div>
                            <Link to='/ForgetPassword'><p className="Forget">Forget Password</p></Link>
                        </div>
                        <button className="Button-Signup">Login</button>
                        <div className="Already">
                            <p className="Primary-Signup">Don't have account</p>
                            <Link to="/Signup"><p className="Secondary-Signup">Signup</p></Link>
                        </div>

                    </form>
                </div>
                <div className="Image-div">

                </div>
            </div>
            <Footer/>
            <End/>
        </div>
    )
}

const Signup=()=>{
    const { pathname } = useLocation();
        useEffect(() => {
        window.scrollTo(0, 0);
         }, [pathname]);

         const[First,setFName]=useState("")
         const[Last,setLame]=useState("")
         const[Phone,setP]=useState("")
         const[Email,setEmail]=useState("")
         const[Password,setPassword]=useState("")


         const[errF,setF]=useState("")
         const[errL,setL]=useState("")
         const[errP,seterrP]=useState("")
         const[errEmail,setEE]=useState("")
         const[errPwd,setPwd]=useState("")



const Register=(e)=>{
    e.preventDefault()
    setF("")
    setL("")
    seterrP("")
    setEE("")
    setPwd("")


    if(First===""||First===null){
        setF("Enter your First Name")
    }
    if(Last===""||Last===null){
        setL("Enter your Last Name")
    }
    if(Phone===""||Phone===null){
        seterrP("Enter your phone number")
    }
    else if(Phone.length<10||Phone.length>10){
        seterrP("Enter your correct phone number")
    }
    if(Email===""||Email===null){
        setEE("Enter your Email")
    }
    if(Password===""||Password===null){
        setPwd("Enter your password")
    }
}


    return(
        <div>
            <Header />
            <MenuBar />
            <div className="Login-image">
                <h1 className="Login-heading">Register</h1>
            </div>
            <div className="Signup-card">
                <div className="Form-div">
                    <form className="Form-signup" onSubmit={Register}>
                        <div className="Signup-title">
                            <h1 className="Signup-heading">SignUp to ABC</h1>
                            <p className="Signup-ptag">Welcome! Register with valid data</p>
                        </div>
                        <label className="Signup-Label">First Name</label>
                        <input className="Signup-Input" onChange={(e)=>setFName(e.target.value)}/>
                        <p className="Error-signup">{errF}</p>
                        <label className="Signup-Label">Last Name</label>
                        <input className="Signup-Input" onChange={(e)=>setLame(e.target.value)}/>
                        <p className="Error-signup">{errL}</p>
                        <label className="Signup-Label">Phone Number</label>
                        <input type="number" className="Signup-Input" onChange={(e)=>setP(e.target.value)}/>
                        <p className="Error-signup">{errP}</p>
                        <label className="Signup-Label">Email</label>
                        <input type="email" className="Signup-Input" onChange={(e)=>setEmail(e.target.value)}/>
                        <p className="Error-signup">{errEmail}</p>
                        <label className="Signup-Label">Password</label>
                        <input type="password" className="Signup-Input" onChange={(e)=>setPassword(e.target.value)}/>
                        <p className="Error-signup">{errPwd}</p>
                        <button className="Button-Signup" type="submit">Create Account</button>
                        <div className="Already">
                            <p className="Primary-Signup">Already have an account</p>
                            <Link to="/Login"><p className="Secondary-Signup">Login</p></Link>
                        </div>

                    </form>
                </div>
                <div className="Image-div">

                </div>
            </div>
            <Footer/>
            <End/>
        </div>
    )
}


const Provider=()=>{

const[Name,setName]=useState("")
const[Email,setEmail]=useState("")
const[Password,setPassword]=useState("")
const[Category,setCategory]=useState("")

const[ErrN,setErrN]=useState("")
const[ErrE,setErrE]=useState("")
const[ErrP,setErrP]=useState("")
const[ErrC,setErrC]=useState("")

const ProviderSubmit=(e)=>{

    e.preventDefault()
    setErrN("")
    setErrE("")
    setErrP("")
    setErrC("")

    if(Name===""||Name===null){
        setErrN("Enter your name")
    }
    if(Email===""||Email===null){
        setErrE("Enter your Email")
    }
    if(Password===""||Password===null){
        setErrP("Enter your Password")
    }
    if(Category==="Name of service"||Category===null||Category===""){
        setErrC("Enter your service category")
    }
}

    return(
        <div>
        <Header />
        <MenuBar />
        <div className="Login-image">
            <h1 className="Login-heading">Register as Provider</h1>
        </div>
        <div className="Signup-card">
            <div className="Form-div">
                <form className="Form-Provider" onSubmit={ProviderSubmit}>
                    <div className="Signup-title">
                        <h1 className="Signup-heading">Register as provider in ABC</h1>
                        <p className="Signup-ptag">Welcome! Register with valid data</p>
                    </div>
                    <label className="Join-Label">Name</label>
                    <input className="Signup-Input" onChange={(e)=>{setName(e.target.value)}}/>
                    <p className="Error-signup">{ErrN}</p>
                    <label className="Join-Label">Email</label>
                    <input type="email" className="Signup-Input" onChange={(e)=>{setEmail(e.target.value)}}/>
                    <p className="Error-signup">{ErrE}</p>
                    <label className="Join-Label">Password</label>
                    <input type="password" className="Signup-Input" onChange={(e)=>{setPassword(e.target.value)}}/>
                    <p className="Error-signup">{ErrP}</p>
                    <select className="Service-type" placeholder="" onChange={(e)=>{setCategory(e.target.value)}}>
                        <option>Name of service</option>
                        <option>Car wash</option>
                        <option>Car Service</option>
                        <option>Ac Repair</option>
                        <option>Pest control</option>
                        <option>Painting</option>
                        <option>Cleaning</option>
                        <option>Plumbing</option>
                    </select>
                    <p className="Error-signup">{ErrC}</p>
                    <button className="Button-Signup">Submit</button>
                    <div className="Already">
                        <p className="Primary-Signup">Already have an account</p>
                        <Link to="/Login"><p className="Secondary-Signup">Login</p></Link>
                    </div>

                </form>
            </div>
            <div className="Image-divProvider">

            </div>
        </div>
        <Footer/>
        <End/>
    </div>
    )
}


const AdminLogin = () => {

    var Status=localStorage.getItem("Status")
    const[Email,setEmail]=useState("")
    const[Password,setPassword]=useState("")

    const adminEmail="admin@abc.com"
    const adminpassword="Admin@123"
    const { pathname } = useLocation();
        useEffect(() => {
        window.scrollTo(0, 0);
         }, [pathname]);

    const [show,setShow]=useState("password")
    const [icon,setIcon]=useState(<i class="fa-solid fa-eye"></i>)
    const PaswordState=()=>{
        if(show==="password"){
            setShow("text")
            setIcon(<i class="fa-sharp fa-solid fa-eye-slash"></i>)
        }
        else{
            setShow("password")
            setIcon(<i class="fa-solid fa-eye"></i>)
        }
    }

    const [errLogin,setErrlogin]=useState("")
    const [errPwd,seterrPwd]=useState("")


    function FormSubmit(e){
        setErrlogin("")
        seterrPwd("")
        e.preventDefault()
        if(Status==="Loggedin"){
            alert('already Logged in with a user account')
        }

        if(Email===""||Email===null){
            setErrlogin("Please enter your LoginId")
        }

        if(Password===""||Password===null){
            seterrPwd("Please enter your Password")
        }

        else if(Email!==adminEmail&&Email!==""){
            setErrlogin("No user found")
        }
        else if(Password!==adminpassword&&Password!==""){
            seterrPwd("Incorrect Password")
        }


        if(Email===adminEmail&&Password===adminpassword&&Status!=="Loggedin"){
            localStorage.setItem("adminemail",Email)
            localStorage.setItem("adminpassword",Password)
            window.location.href='/Admin'
        }
        else{
            alert("incorrect data")
        }
    }
    return (
        <div>
            <Header />
            <MenuBar />
           <div className="Login-image">
                <h1 className="Login-heading">Admin Login</h1>
            </div>
            <div className="Signup-card">
                <div className="Form-div">
                    <form className="Form-Admin" onSubmit={FormSubmit}>
                        <div className="Signup-title">
                            <h1 className="Signup-heading">LogIn to ABC</h1>
                            <p className="Signup-ptag">Welcome! Login using data given while register</p>
                        </div>
                        <label className="AdminSignup-Label">Email</label>
                        <input className="Signup-Input" onChange={(e)=>setEmail(e.target.value)}/>
                        <p style={{color:"red"}}>{errLogin}</p>
                        <label className="AdminSignup-Label">Password</label>
                        <div className="Signup-Pwdbox" onChange={(e)=>setPassword(e.target.value)}>
                        <input type={show} className="Signup-InputPwd"/>
                        <div onClick={PaswordState}>{icon}</div>
                        </div>
                        <p style={{color:"red"}}>{errPwd}</p>
                        <div className="Login-sec2">
                            <div className="Remember">
                                <input type="checkbox"/>
                                <p className="Remember-ptag">Remember Me</p>
                            </div>
                            <p className="Forget">Forget Password</p>
                        </div>
                        <button className="Button-Signup" type="submit">Login</button>
                        <div className="Already">
                            <p className="Primary-Signup">Don't have account</p>
                            <Link to="/Signup"><p className="Secondary-Signup">Signup</p></Link>
                        </div>

                    </form>
                </div>
                <div className="Image-divAdmin">

                </div>
            </div>
            <Footer/>
            <End/>
        </div>
    )
}

const ForgetPassword=()=>{

const ForgetPwd=()=>{
    //your fun
}

    return(
        <div>
            <Header />
            <MenuBar />
            
            <div className="forget-card">
                <div className="Form-div">
                    <form className="Form-forget" onSubmit={ForgetPwd}>
                    <div className="Signup-title">
                            <h1 className="Signup-heading">Forget Password</h1>
                        </div>
                        
                        <label className="Forgrt-Label">Enter your Email_id</label>
                        <input className="Signup-Input" type='email'/>
                        
                        <button className="Button-Signup" type="submit">Change Password</button> 

                    </form>
                </div>
                <div className="Image-div">

                </div>
            </div>
            <Footer/>
            <End/>
        </div>
    )
}


export {Login,Signup,Provider,AdminLogin,ForgetPassword} 