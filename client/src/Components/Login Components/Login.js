import React, { useState } from "react";
import { Header, MenuBar ,Footer,End} from "../objects/objects";
import { Link } from "react-router-dom";
import './Login.css'
import { useLocation,useNavigate } from "react-router-dom";
import { useEffect, } from "react";
import axios from "axios"
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import 'animate.css';

const Login = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
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

    const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });


   async function LoginFun(e){
        e.preventDefault()
        setErrlogin("")
        seterrPwd("")
        if(LoginId===""||LoginId===null){
            setErrlogin("Please enter your LoginId")
        }

        else if(Password===""||Password===null){
            seterrPwd("Please enter your Password")
        }
        else{
            const { data } = await axios.post(
                "http://localhost:3001/authUser/login",
                {
                 email:LoginId,
                 password:Password
                },
                { withCredentials: true }
              );
              if (data) {
                if (data.errors) {
                  const { email, password } = data.errors;
                  if (email) generateError(email);
                  else if (password) generateError(password);
                } else {
                    toast.info("successfully loggedin", {
                        position: "top-center",
                      });
                      Navigate("/");
                }
              }
        }
    }
    if(cookies.jwt2||cookies.venjwt){
        alert("Already Logged in to user account or vendor account")
        window.location.href="/"
    }

    else{
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
                            <input className="Signup-Input" onChange={(e)=>{setLoginId(e.target.value)
                            setErrlogin("")}}/>
                            <p className="Error-signup">{errLogin}</p>
                            <label className="Signup-Label">Password</label>
                            <div className="Signup-Pwdbox">
                            <input type={show} className="Signup-InputPwd" onChange={(e)=>{setPassword(e.target.value)
                            seterrPwd("")}}/>
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
    
}

const VendorLogin = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
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
    const [errorMessage, setErrorMessage] = useState("");
    const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });


   async function LoginFun(e){
        e.preventDefault()
    
        if(LoginId===""||LoginId===null){
            setErrlogin("Please enter your LoginId")
        }

        else if(Password===""||Password===null){
            seterrPwd("Please enter your Password")
        }
        else{
            const response = await axios.post(
                "http://localhost:3001/vendor_Auth/login",
                {
                 Email:LoginId,
                 Password:Password
                },
                { withCredentials: true }
              );
              if (response.data.status === 'error') {
                toast.error(response.data.message, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
               
              }
              else{
                window.location.href = "VendorDashboard"; // redirect to dashboard
              }
             
             
        }
    }
   
if(cookies.jwt2||cookies.venjwt){
    alert("Already Logged in to user account or vendor account")
    window.location.href="/"
}
        else{return (
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
                            <input className="Signup-Input" onChange={(e)=>{setLoginId(e.target.value) 
                            setErrlogin("")
                        }}/>
                            <p className="Error-signup">{errLogin}</p>
                            <label className="Signup-Label">Password</label>
                            <div className="Signup-Pwdbox">
                            <input type={show} className="Signup-InputPwd" onChange={(e)=>{
                                        setPassword(e.target.value)
                                        seterrPwd("")
                             } }/>
                            <div onClick={PaswordState}>{icon}</div>
                            </div>
                            <p className="Error-signup">{errPwd}</p>
                            <div className="Login-sec2">
                                <div className="Remember">
                                    <input type="checkbox"/>
                                    <p className="Remember-ptag">Remember Me</p>
                                </div>
                                <Link to='/vendorForgetPassword'><p className="Forget">Forget Password</p></Link>
                            </div>
                            <button className="Button-Signup">Login</button>
                            <div className="Already">
                                <p className="Primary-Signup">Not a vendor</p>
                                <Link to="/Provider"><p className="Secondary-Signup">Join us</p></Link>
                            </div>
    
                        </form>
                    </div>
                    <div className="Image-div">
    
                    </div>
                </div>
                <Footer/>
                <End/>
            </div>
        )}
    }
    


const Signup=()=>{
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
     const Navigate=useNavigate();
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

        //  function passverfi(){
        //     if(Password.length<8){
        //         setPwd("Your password should have at least 8 characters")
        //     }
        //     else if(!passwordPattern.test(Password)){
        //         setPwd("Your password must have atleast one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).")
        //     }
        //  }
         

const Register= async(e)=>{
    e.preventDefault()
    setF("")
    setL("")
    seterrP("")
    setEE("")
    setPwd("")
    
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;


    if(First===""||First===null){
        setF("Enter your First Name")
    }
    else if(Last===""||Last===null){
        setL("Enter your Last Name")
    }
    else if(Phone===""||Phone===null){
        seterrP("Enter your phone number")
    }
    else if(Phone.length<10||Phone.length>10){
        seterrP("Enter your correct phone number")
    }
    else if(Email===""||Email===null){
        setEE("Enter your Email")
    }
   else if(Password===""||Password===null){
        setPwd("Enter your password")
    }
    
    else if(Password.length<8){
        setPwd("Your password should have at least 8 characters")
    }
    else if(!passwordPattern.test(Password)){
        setPwd("Your password must have atleast one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).")
    }
    

    else{

        const { data } = await axios.post(
            "http://localhost:3001/authUser/register",
            {
              firstName:First,
              lastName:Last,
              phoneNumber:Phone,
              email:Email,
              password:Password
  
            },
            { withCredentials: true }
          )
          if (data) {
            if (data.errors) {
              const { email, password } = data.errors;
              if (email){
                  toast.error(email, {
                      position: "bottom-right",
                    });
                 }
              else if (password) {
                  toast.error(password, {
                      position: "bottom-right",
                    });
              }
                  
            } else {
              toast.info("successfully registerd", {
                  position: "top-center",
                });
                Navigate("/sign_in");
            }
          }
    }
}

if(cookies.jwt2){
    alert("already loggedin")
    window.location.href='/'
}
else{

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
                        <input className="Signup-Input" onChange={(e)=>{setFName(e.target.value) 
                            setF("")}}/>
                        <p className="Error-signup">{errF}</p>
                        <label className="Signup-Label">Last Name</label>
                        <input className="Signup-Input" onChange={(e)=>{setLame(e.target.value)
                        setL("")}}/>
                        <p className="Error-signup">{errL}</p>
                        <label className="Signup-Label">Phone Number</label>
                        <input type="number" className="Signup-Input" onChange={(e)=>{setP(e.target.value)
                        seterrP("")}}/>
                        <p className="Error-signup">{errP}</p>
                        <label className="Signup-Label">Email</label>
                        <input type="email" className="Signup-Input" onChange={(e)=>{setEmail(e.target.value)
                            setEE("")}}/>
                        <p className="Error-signup">{errEmail}</p>
                        <label className="Signup-Label">Password</label>
                        <input type="password" className="Signup-Input"  onChange={(e)=>{setPassword(e.target.value);
                        setPwd("")}}/>
                        <p className="Error-signup">{errPwd}</p>
                        <button className="Button-Signup" type="submit">Create Account</button>
                        <div className="Already">
                            <p className="Primary-Signup">Already have an account</p>
                            <Link to="/Login"><p className="Secondary-Signup">Login</p></Link>
                        </div>

                    </form>
                </div>
                <div className="Image-signup">

                </div>
            </div>
            <Footer/>
            <End/>
        </div>
    )
}
    
}


const Provider=()=>{

const[FirstName,setFName]=useState("")
const[LName,setLName]=useState("")
const[Location,setLocation]=useState("")
const[Email,setEmail]=useState("")
const[Phone,setPhone]=useState("")
const[Address,setAddress]=useState("")
const[Category,setCategory]=useState("")
const[File,setFile]=useState("")
const Navigate=useNavigate();

const[Pno,setPno]=useState(1)//page number

const[ErrFN,setErrFN]=useState("")
const[ErrLN,setErrLN]=useState("")
const[ErrC,setErrC]=useState("")
const[ErrL,setErrL]=useState("")
const [Error,setError]=useState(false)
const[ErrE,setErrE]=useState("")
const[ErrP,setErrP]=useState("")
const[ErrA,setErrA]=useState("")
const[FileErr,setFileErr]=useState("")


const Form1=(e)=>{
    e.preventDefault()
     
    // console.log(dotposition);
    setErrFN("")
    setErrLN("")
    
    setErrC("")
    setErrL("")
    setError(false)

    

    if(FirstName===""||FirstName===null){
        setErrFN("Enter your First name")
        setError(true)
    }
    else if(LName===""||LName===null){
        setErrLN("Enter your Last name")
        setError(true)
    }
    else if(Location===""||Location===null){
        setErrL("Enter your Location")
        setError(true)
    }

    else if(Category==="Name of service"||Category===""||Category===null){
        setErrC("Enter your service category")
        setError(true)
    }
    
    else if(!Error){
        
        setPno(Pno+1)
    }



    
   
}


if(Pno===1){
    return(
        <div>
        <Header />
        <MenuBar />
        <div className="Login-image">
            <h1 className="Login-heading">Register as Provider</h1>
        </div>
        <div className="Signup-card">
            <div className="Form-div">
                <form className="Form-Provider" >
                    <div className="Signup-title">
                        <h1 className="Signup-heading">Register as provider in ABC</h1>
                        <p className="Signup-ptag">Welcome! Register with valid data</p>
                    </div>
                    <>
                    <label className="Join-Label">First Name</label>
                    <input className="Signup-Input" defaultValue={FirstName} onChange={(e)=>{setFName(e.target.value)
                    setErrFN("")}}/>
                    <p className="Error-signup">{ErrFN}</p>
                    <label className="Join-Label">Last Name</label>
                    <input className="Signup-Input" defaultValue={LName} onChange={(e)=>{setLName(e.target.value)
                    setErrLN("")}}/>
                    <p className="Error-signup">{ErrLN}</p>
                    <label className="Join-Label">Location</label>
                    <input  className="Signup-Input" defaultValue={Location} onChange={(e)=>{setLocation(e.target.value)
                    setErrL("")}}/>
                    <p className="Error-signup">{ErrL}</p>
                    <select className="Service-type" defaultValue={Category} onChange={(e)=>{setCategory(e.target.value)
                    setErrC("")}} >
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
                    <button type="button" className="Button-Signup" onClick={Form1}>Next</button>
                    </>
                    <div className="Already">
                        <p className="Primary-Signup">Already have an account</p>
                        <Link to="/VendorLogin"><p className="Secondary-Signup">Login</p></Link>
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




var atposition=Email.indexOf("@")
var dotposition=Email.indexOf(".")

const Form2=(e)=>{
    e.preventDefault()
    setError(false)
    setErrP("")
    setErrE("")
    setErrA("")

    if(Phone===""||Phone===null){
        setErrP("Enter your phone number")
        setError(true)
    }
    else if(Phone.length<10||Phone.length>10){
        setErrP("Enter your 10 digit phone number")
        setError(true)
    }
    else if(atposition<1||dotposition<atposition){
        setErrE("Enter proper emailid")
        setError(true)
    }
    else if(Address===""||Address===null){
        setErrA("Enter your address")
        setError(true)
    }

    else if(!Error){
        setPno(3)
    }

}

if(Pno===2){
    return(
        
            <div>
            <Header />
            <MenuBar />
            <div className="Login-image">
                <h1 className="Login-heading">Register as Provider</h1>
            </div>
            <div className="Signup-card">
                <div className="Form-div">
                    <form className="Form-Provider" onSubmit={Form2}>
                        <div className="Signup-title">
                            <h1 className="Signup-heading">Register as provider in ABC</h1>
                            <p className="Signup-ptag">Welcome! Register with valid data</p>
                        </div>
                        <label className="Join-Label">Phone Number</label>
                        <input type='number' defaultValue={Phone} className="Signup-Input" onChange={(e)=>{setPhone(e.target.value)
                        setErrP("")}}/>
                        <p style={{color:"red"}}>{ErrP}</p>
                        <label className="Join-Label">Email</label>
                        <input  className="Signup-Input" type='email' defaultValue={Email} onChange={(e)=>{setEmail(e.target.value)
                        setErrE("")}}/>
                        <p style={{color:"red"}}>{ErrE}</p>
                        <label className="Join-Label">Residential Address</label>
                        <textarea  className="Signup-Input" defaultValue={Address} onChange={(e)=>{setAddress(e.target.value)
                        setErrA("")}}/>
                        <p style={{color:"red"}}>{ErrA}</p>
                        <div className="Toggle-btns">
                        <button  className="Button-Toggle"onClick={()=>{setPno(Pno-1)
                            
                            console.log(FirstName);}}>Previous</button>
                        <button className="Button-Toggle">Next</button>
                        </div>
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

const Form3=(e)=>{
    e.preventDefault()
    setFileErr("")
    setError(false)
    if(File===""||File===null||File==="No file"){
        setFileErr("Upload your photo")
        setError(true)
    }
    else if(!Error){
        const formdata=new FormData()
        formdata.append("FirstName",FirstName)
        formdata.append("LastName",LName)
        formdata.append("Email",Email)
        formdata.append("Phone",Phone)
        formdata.append("file",File)
        formdata.append("Location",Location)
        formdata.append("Address",Address)
        formdata.append("Category",Category)
        axios.post("http://localhost:3001/vendor_Applications/Applications",formdata)
        .then(()=>{
            Swal.fire({
                title: 'Your Application is recived We will contact you soon...',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              });Navigate("/")
        })
    }
}
   

if(Pno===3){
    return(
        
            <div>
            <Header />
            <MenuBar />
            <div className="Login-image">
                <h1 className="Login-heading">Register as Provider</h1>
            </div>
            <div className="Signup-card">
                <div className="Form-div">
                    <form className="Form-Provider" onSubmit={Form3}>
                        <div className="Signup-title">
                            <h1 className="Signup-heading">Register as provider in ABC</h1>
                            <p className="Signup-ptag">Welcome! Register with valid data</p>
                        </div>
                        <label className="Join-Label">Photo</label>
                        <input type='file' className="Signup-Input" onChange={(e)=>{setFile(e.target.files[0])
                        setFileErr("")}}/>
                        <p style={{color:"red"}}>{FileErr}</p>
                        <div className="Toggle-btns">
                        <button  className="Button-Toggle"onClick={()=>{setPno(Pno-1); console.log(FirstName);}}>Previous</button>
                        <button className="Button-Toggle">Submit</button>
                        </div>
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
                        <input className="Signup-Input" onChange={(e)=>{setEmail(e.target.value)
                        setErrlogin("")}}/>
                        <p style={{color:"red"}}>{errLogin}</p>
                        <label className="AdminSignup-Label">Password</label>
                        <div className="Signup-Pwdbox" onChange={(e)=>{setPassword(e.target.value)
                        seterrPwd("")}}>
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
const[Email,setEmail]=useState("")
const[err,setErr]=useState("")
const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

const [ForgetEmail,setForgetEmail] = useState("")

    
    
const ForgetPwd=(event)=>{
    event.preventDefault();
    setErr("")

    var atposition=Email.indexOf("@")
    var dotposition=Email.lastIndexOf("."); 
    if(Email===""||Email===null){
        setErr("Enter your Mail_id")
    }
     else if (atposition<1 || dotposition<atposition+2 || dotposition+2>=Email.length){  
        setErr("Please enter a valid e-mail address");  
        return false;  
        }  
      

    axios.post("http://localhost:3001/authUser/forgot_password",{
        email: ForgetEmail
     },{
         method:"POST",
         crossDomain:true,
         withCredentials : true  
           })
           .then((res) =>
           { 
             console.log(res ,"userRegister")
           alert(res.data.status)
         }
           )
}

useEffect(() =>{
    if(cookies.jwt2){
        window.location.href="/"
    }
},[cookies])

if(cookies.jwt2){
    alert("already loggedin")
    window.location.href='/'
}
else{
    return(
        <div>
            <Header />
            <MenuBar />
            <div className="Forget-screen">
            <div className="forget-card">
                <div className="Form-div">
                    <form className="Form-forget" onSubmit={ForgetPwd}>
                    <div className="Signup-title">
                            <h1 className="Signup-heading">Forget Password</h1>
                        </div>
                        
                        <label className="Forgrt-Label">Enter your Email_id</label>
                        <input className="Signup-Input" type='email' onChange={(e)=>{setEmail(e.target.value)
                        setErr("")}}/>
                        <p style={{color:"red",margin:'0px',padding:'0px'}}>{err}</p>
                        
                        <button className="Button-Signup" type="submit">Change Password</button> 

                    </form>
                </div>
                <div className="Image-forget">

                </div>
            </div>
            </div>
            <Footer/>
            <End/>
        </div>
    )
}
    
}

const ForgetPasswordVendor=()=>{
    const[Email,setEmail]=useState("")
    const[err,setErr]=useState("")
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    
    const [ForgetEmail,setForgetEmail] = useState("")
    
        
        
    const ForgetPwd=(event)=>{
        event.preventDefault();
        setErr("")
    
        var atposition=Email.indexOf("@")
        var dotposition=Email.lastIndexOf("."); 
        if(Email===""||Email===null){
            setErr("Enter your Mail_id")
        }
         else if (atposition<1 || dotposition<atposition+2 || dotposition+2>=Email.length){  
            setErr("Please enter a valid e-mail address");  
            return false;  
            }  
          
    
        axios.post("http://localhost:3001/vendor_Auth/forgot_password",{
            Email: Email
         },{
             method:"POST",
             crossDomain:true,
             withCredentials : true  
               })
               .then((res) =>
               { 
                 console.log(res ,"userRegister")
               alert(res.data.status)
             }
               )
    }
    
    useEffect(() =>{
        if(cookies.jwt2){
            window.location.href="/"
        }
    },[cookies])
    
    if(cookies.jwt2){
        alert("already loggedin")
        window.location.href='/'
    }
    else{
        return(
            <div>
                <Header />
                <MenuBar />
                <div className="Forget-screen">
                <div className="forget-card">
                    <div className="Form-div">
                        <form className="Form-forget" onSubmit={ForgetPwd}>
                        <div className="Signup-title">
                                <h1 className="Signup-heading">Forget Password</h1>
                            </div>
                            
                            <label className="Forgrt-Label">Enter your Email_id</label>
                            <input className="Signup-Input" type='email' onChange={(e)=>{setEmail(e.target.value)
                            setErr("")}}/>
                            <p style={{color:"red",margin:'0px',padding:'0px'}}>{err}</p>
                            
                            <button className="Button-Signup" type="submit">Change Password</button> 
    
                        </form>
                    </div>
                    <div className="Image-forget">
    
                    </div>
                </div>
                </div>
                <Footer/>
                <End/>
            </div>
        )
    }
        
    }



export {Login,Signup,Provider,AdminLogin,ForgetPassword,VendorLogin,ForgetPasswordVendor} 