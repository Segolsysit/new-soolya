import React, { useState } from "react";
import { Header, MenuBar, Footer, End } from "../objects/objects";
import { Link } from "react-router-dom";
import './Login.css'
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, } from "react";
import axios from "axios"
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import 'animate.css';
import { Select } from "@mui/material";
axios.defaults.baseURL = 'https://backend.kooblu.com';
axios.defaults.withCredentials = true;




const Login = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const Navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const [show, setShow] = useState("password")
    const [icon, setIcon] = useState(<i class="fa-solid fa-eye"></i>)
    const PaswordState = () => {
        if (show === "password") {
            setShow("text")
            setIcon(<i class="fa-sharp fa-solid fa-eye-slash"></i>)
        }
        else {
            setShow("password")
            setIcon(<i class="fa-solid fa-eye"></i>)
        }
    }

    const [LoginId, setLoginId] = useState("")
    const [Password, setPassword] = useState("")

    const [errLogin, setErrlogin] = useState("")
    const [errPwd, seterrPwd] = useState("")

    const generateError = (error) =>
        toast.error(error, {
            position: "bottom-right",
        });


    async function LoginFun(e) {
        e.preventDefault()
        setErrlogin("")
        seterrPwd("")
        if (LoginId === "" || LoginId === null) {
            setErrlogin("Please enter your LoginId")
        }

        else if (Password === "" || Password === null) {
            seterrPwd("Please enter your Password")
        }
        else {
            const { data } = await axios.post(
                "https://backend.kooblu.com/authUser/login",
                {
                    email: LoginId,
                    password: Password
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
                    localStorage.setItem("ty", data.token)
                    Navigate("/");
                    console.log(cookies.jwt2);
                }
            }
        }
    }
    if (localStorage.getItem("ty") || localStorage.getItem("vendor")) {
        alert("Already Logged in to user account or vendor account")
        window.location.href = "/"
    }

    else {
        return (
            <div>
                <Header />
                <MenuBar />
                <div className="Login-image">
                    <h1 className="Login-heading">Welcome back! Login to Your User Account</h1>
                </div>
                <div className="Signup-card" >
                    <div className="Form-div">
                        <form className="Form" onSubmit={LoginFun}>
                            <div className="Signup-title">
                                <h1 className="Signup-heading">Login to User</h1>
                                <p className="Signup-ptag">Welcome! Login using data given while register</p>
                            </div>
                            <div className="Already" >
                                <p className="Primary-Signup">Don't have account</p>
                                <Link to="/Signup"><p className="Secondary-Signup">Signup</p></Link>
                            </div>
                            <label className="Signup-Label">Email</label>
                            <input className="Signup-Input" onChange={(e) => {
                                setLoginId(e.target.value)
                                setErrlogin("")
                            }} />
                            <p className="Error-signup">{errLogin}</p>
                            <label className="Signup-Label">Password</label>
                            <div className="Signup-Pwdbox">
                                <input type={show} className="Signup-InputPwd" onChange={(e) => {
                                    setPassword(e.target.value)
                                    seterrPwd("")
                                }} />
                                <div onClick={PaswordState}>{icon}</div>
                            </div>
                            <p className="Error-signup">{errPwd}</p>
                            <div className="Login-sec2">
                                <div className="Remember">
                                    <input type="checkbox" />
                                    <p className="Remember-ptag">Remember Me</p>
                                </div>
                                <Link to='/ForgetPassword'><p className="Forget">Forget Password</p></Link>
                            </div>
                            <button className="Button-Signup">Login</button>


                        </form>
                    </div>
                    <div className="Image-div">

                    </div>
                </div>
                <Footer />
                <End />
            </div>
        )
    }

}

const VendorLogin = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const Navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const [show, setShow] = useState("password")
    const [icon, setIcon] = useState(<i class="fa-solid fa-eye"></i>)
    const PaswordState = () => {
        if (show === "password") {
            setShow("text")
            setIcon(<i class="fa-sharp fa-solid fa-eye-slash"></i>)
        }
        else {
            setShow("password")
            setIcon(<i class="fa-solid fa-eye"></i>)
        }
    }

    const [LoginId, setLoginId] = useState("")
    const [Password, setPassword] = useState("")

    const [errLogin, setErrlogin] = useState("")
    const [errPwd, seterrPwd] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const generateError = (error) =>
        toast.error(error, {
            position: "bottom-right",
        });


    async function LoginFun(e) {
        e.preventDefault()

        if (LoginId === "" || LoginId === null) {
            setErrlogin("Please enter your LoginId")
        }

        else if (Password === "" || Password === null) {
            seterrPwd("Please enter your Password")
        }
        else {
            await axios.post(
                "https://backend.kooblu.com/vendor_Auth/login",
                {
                    Email: LoginId,
                    Password: Password
                },
                { withCredentials: true }
            )
                .then((res) => {
                    if (res.data.status === 'error') {
                        toast.error(res.data.status)
                    }
                    else if(res.data.status === 'failed'){
                        toast.error('user id is blocked contact admin')
                    }
                    else {
                        toast.info("successfully loggedin", {
                            position: "top-center",
                        });
                        console.log(res);
                        console.log(res.data.users);
                        console.log(res.users);
                        localStorage.setItem("vendor", res.data.token)
                        Navigate('/VendorDashboard')
                        console.log(res.data.token);
                        console.log(res.token);
                    }
                })

        }
    }

    if (localStorage.getItem("ty") || localStorage.getItem("vendor")) {
        alert("Already Logged in to user account or vendor account")
        window.location.href = "/"
    }
    else {
        return (
            <div>
                <Header />
                <MenuBar />
                <div className="Login-image">
                    <h1 className="Login-heading">Vendor Login</h1>
                </div>
                <div className="Signup-card">
                    <div className="Form-div">
                        <form className="Form" onSubmit={LoginFun}>
                            <div className="Signup-title">
                                <h1 className="Signup-heading">LogIn to Provider</h1>
                                <p className="Signup-ptag">Welcome! Login using data given while register</p>
                            </div>
                            <div className="Already">
                                <p className="Primary-Signup">Not a vendor</p>
                                <Link to="/Provider"><p className="Secondary-Signup">Join us</p></Link>
                            </div>
                            <label className="Signup-Label">Email</label>
                            <input className="Signup-Input" onChange={(e) => {
                                setLoginId(e.target.value)
                                setErrlogin("")
                            }} />
                            <p className="Error-signup">{errLogin}</p>
                            <label className="Signup-Label">Password</label>
                            <div className="Signup-Pwdbox">
                                <input type={show} className="Signup-InputPwd" onChange={(e) => {
                                    setPassword(e.target.value)
                                    seterrPwd("")
                                }} />
                                <div onClick={PaswordState}>{icon}</div>
                            </div>
                            <p className="Error-signup">{errPwd}</p>
                            <div className="Login-sec2">
                                <div className="Remember">
                                    <input type="checkbox" />
                                    <p className="Remember-ptag">Remember Me</p>
                                </div>
                                <Link to='/vendorForgetPassword'><p className="Forget">Forget Password</p></Link>
                            </div>
                            <button className="Button-Signup">Login</button>


                        </form>
                    </div>
                    <div className="Image-div">

                    </div>
                </div>
                <Footer />
                <End />
            </div>
        )
    }
}



const Signup = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const Navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const [First, setFName] = useState("")
    const [Last, setLame] = useState("")
    const [Phone, setP] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")


    const [errF, setF] = useState("")
    const [errL, setL] = useState("")
    const [errP, seterrP] = useState("")
    const [errEmail, setEE] = useState("")
    const [errPwd, setPwd] = useState("")
    const [errconfPwd, setConfPwd] = useState("")


    const [show, setShow] = useState("password")
    const [icon, setIcon] = useState(<i class="fa-solid fa-eye"></i>)

    const PaswordState = () => {
        if (show === "password") {
            setShow("text")
            setIcon(<i class="fa-sharp fa-solid fa-eye-slash"></i>)
        }
        else {
            setShow("password")
            setIcon(<i class="fa-solid fa-eye"></i>)
        }
    }
    //  function passverfi(){
    //     if(Password.length<8){
    //         setPwd("Your password should have at least 8 characters")
    //     }
    //     else if(!passwordPattern.test(Password)){
    //         setPwd("Your password must have atleast one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).")
    //     }
    //  }


    const Register = async (e) => {
        e.preventDefault()
        setF("")
        setL("")
        seterrP("")
        setEE("")
        setPwd("")

        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;


        if (First === "" || First === null) {
            setF("Enter your First Name")
        }
        else if (Last === "" || Last === null) {
            setL("Enter your Last Name")
        }
        else if (Phone === "" || Phone === null) {
            seterrP("Enter your phone number")
        }
        else if (Phone.length < 10 || Phone.length > 10) {
            seterrP("Enter your correct phone number")
        }
        else if (Email === "" || Email === null) {
            setEE("Enter your Email")
        }
        else if (Password === "" || Password === null) {
            setPwd("Enter your password")
        }

        else if (Password.length < 8) {
            setPwd("Your password should have at least 8 characters")
        }
        else if (!passwordPattern.test(Password)) {
            setPwd("Your password must have atleast one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).")
        }
        else if (ConfirmPassword !== Password) {
            setConfPwd("password and confirm password must be same!")
        }

        else {

            const { data } = await axios.post(
                "https://backend.kooblu.com/authUser/register",
                {
                    firstName: First,
                    lastName: Last,
                    phoneNumber: Phone,
                    email: Email,
                    password: Password

                },
                { withCredentials: true }
            )
            if (data) {
                if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) {
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
                    Navigate("/Login");
                }
            }
        }
    }

    if (cookies.jwt2) {
        alert("already loggedin")
        window.location.href = '/'
    }
    else {

        return (
            <div>
                <Header />
                <MenuBar />
                <div className="Login-image">
                    <h1 className="Login-heading">Register as User Account!</h1>
                </div>
                <div className="Signup-card">
                    <div className="Form-div">
                        <form className="Form-signup" onSubmit={Register}>
                            <div className="Signup-title">
                                <h1 className="Signup-heading">SignUp to User</h1>
                                <p className="Signup-ptag">Welcome! Register with valid data</p>
                            </div>
                            <div className="Already">
                                <p className="Primary-Signup">Already have an account</p>
                                <Link to="/Login"><p className="Secondary-Signup">Login</p></Link>
                            </div>

                            <label className="Signup-Label">First Name</label>
                            <input className="Signup-Input" onChange={(e) => {
                                setFName(e.target.value)
                                setF("")
                            }} />
                            <p className="Error-signup">{errF}</p>
                            <label className="Signup-Label">Last Name</label>
                            <input className="Signup-Input" onChange={(e) => {
                                setLame(e.target.value)
                                setL("")
                            }} />
                            <p className="Error-signup">{errL}</p>
                            <label className="Signup-Label">Phone Number</label>
                            <input type="number" className="Signup-Input" onWheel={(e) => {
                                e.target.blur();
                            }} onChange={(e) => {
                                setP(e.target.value)
                                seterrP("")
                            }} />
                            <p className="Error-signup">{errP}</p>
                            <label className="Signup-Label">Email</label>
                            <input type="email" className="Signup-Input" onChange={(e) => {
                                setEmail(e.target.value)
                                setEE("")
                            }} />
                            <p className="Error-signup">{errEmail}</p>
                            <label className="Signup-Label">Password</label>

                            <div className="Signup-Pwdbox">
                                <input type={show} className="Signup-InputPwd" onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPwd("")
                                }} />
                                <div onClick={PaswordState}>{icon}</div>
                            </div>
                            <p className="Error-signup">{errPwd}</p>

                            <label className="Signup-Label">Confirm Password</label>

                            <div className="Signup-Pwdbox">
                                <input type={show} className="Signup-InputPwd" onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setConfPwd("")
                                }} />
                                <div onClick={PaswordState}>{icon}</div>
                            </div>
                            <p className="Error-signup">{errconfPwd}</p>

                            <button className="Button-Signup" type="submit">Create Account</button>

                        </form>
                    </div>
                    <div className="Image-signup">

                    </div>
                </div>
                <Footer />
                <End />
            </div>
        )
    }

}


const Provider = () => {

    const city = [
        'Select',
        'Ariyalur',
        'Chennai',
        'Coimbatore',
        'Cuddalore',
        'Dharmapuri',
        'Dindigul',
        'Erode',
        'Kanchipuram',
        'Kanyakumari',
        'Karur',
        'Madurai',
        'Nagapattinam',
        'Nilgiris',
        'Namakkal',
        'Perambalur',
        'Pudukkottai',
        'Ramanathapuram',
        'Salem',
        'Sivaganga',
        'Tirupur',
        'Tiruchirappalli',
        'Theni',
        'Tirunelveli',
        'Thanjavur',
        'Thoothukudi',
        'Tiruvallur',
        'Tiruvarur',
        'Tiruvannamalai',
        'Vellore',
        'Viluppuram',
        'Virudhunagar',
    ]

    const Taluks={'Chennai':['Alandur','Ambattur','Aminjikarai','Ayanavaram','Egmore','Guindy','Madhavaram','Madhuravoyal','Mambalam','Mylapore','Perambur','Purasavakkam','Sholinganallur','Thiruvottriyur','Tondiarpet','Velacherry'],
                    'Coimbatore':['Aanaimalai','Annur','Coimbatore(North)','Coimbatore(South)','Kinathukadavu','Madukarai','Mettupalayam','Perur','Pollachi','Sulur','Valparai'],
                    'Cuddalore':['Cuddalore','Bhuvanagiri','Chidambaram','Kattumannarkoil','Kurinjipadi','Panruti','Srimushnam','Thittakudi','Veppur','Virudhachalam'],
                    'Dharmapuri':['Dharmapuri','Harur','Karimangalam','Nallampalli','Palacode','Pappireddipatti','Pennagaram'],
                    'Dindigul':['Atthur','Dindigul (East)','Dindigul (West)','Guziliyamparai','Kodaikanal','Natham','Nilakottai','Oddanchatram','Palani','Vedasandur'],
                    'Erode':['Anthiyur','Bhavani','Gobichettipalayam','Kodumudi','Modakurichi','Nambiyur','Perundurai','Sathiyamangalam','Thalavadi'],
                    'Kancheepuram':['Kundrathur','Sriperumbudur','Uthiramerur','Walajabad'],
                    'Kanniyakumari':['Agasteeswaram','Kalkulam','Killiyur','Thiruvatar','Thovalai','Vilavankodu'],
                    'Karur':['Karur','Aravakurichi','Kadavur','Krishnarayapuram','Kulithalai','Manmangalam','Pugalur'],
                    'Madurai':['Kallikudi','Madurai (East)','Madurai (North)','Madurai (South)','Madurai (West)','Melur','Peraiyur','Thirumangalam','Thiruparankundram','Usilampatti','Vadipatti'],
                    'Nagapattinam':['Nagapattinam','Kilvelur','Thirukkuvalai','Vedaranyam'],
                    'Namakkal':['Namakkal','Kholli Hills','Kumarapalayam','Mohanoor','Paramathi Velur','Rasipuram','Senthamangalam','Tiruchengode'],
                    'Nilgiris':['Udagamandalam','Coonoor','Gudalur','Kothagiri','Kundah','Pandalur'],
                    'Perambalur':['Perambalur','Alathur','Kunnam','Veppanthattai'],
                    'Pudukottai':['Pudukottai','Alangudi','Aranthangi','Avudiyarkoil','Gandarvakottai','Iluppur','Karambakudi','Kulathur','Manamelkudi','Ponnamaravathi','Thirumayam','Viralimalai'],
                    'Ramanathapuram':['Ramanathapuram','Kadaladi','Kamuthi','Kezhakarai','Mudukulathur','Paramakudi','Rajasingamangalam','Rameswaram','Tiruvadanai'],
                    'Salem':['Salem','Attur','Edapadi','Gangavalli','Kadaiyampatti','Mettur','Omalur','Pethanayakanpalayam','Salem South','Salem West','Sankari','Vazhapadi','Yercaud'],
                    'Sivagangai':['Sivagangai','Devakottai','Ilayankudi','Kalaiyarkovil','Karaikudi','Manamadurai','Singampunari','Thirupuvanam','Tirupathur'],
                    'Thanjavur':['Thanjavur','Boothalur','Kumbakonam','Orathanadu','Papanasam','Pattukottai','Peravurani','Thiruvaiyaru','Thiruvidaimaruthur'],
                    'Theni':['Theni','Aandipatti','Bodinayakanur','Periyakulam','Uthamapalayam']
                }


    const [FirstName, setFName] = useState("")
    const [LName, setLName] = useState("")
    const [Location, setLocation] = useState("Select")
    const [Email, setEmail] = useState("")
    const [Phone, setPhone] = useState("")
    const [Address, setAddress] = useState("")
    const [Category, setCategory] = useState("")
    const [File, setFile] = useState("")
    const [Language, setLanguage] = useState('Select')
    const [Gender, setGender] = useState("Select")
    const [DOB, setDOB] = useState('')
    const [AAdhar, setAadhar] = useState('')
    const [AadharCard, setAadharCard] = useState("")
    const [AccNo, setAccNo] = useState("")
    const [AccNoC, setAccCon] = useState("")
    const [BnkName, setBnkName] = useState('')
    const [Ifsc, setIfsc] = useState('')
    const [Education, setEducation] = useState('select')
    const [JobTitle, setJobTitle] = useState('select')
    const [WorkExp, setWorkExp] = useState('select')
    const [currently, setcurrently] = useState('select')
    const [Zone, setZone] = useState('select')
    const [AltPH, setAltPH] = useState('')
    const [KnownL, setKnownL] = useState('')
    const [SkillExp, setSkillExp] = useState('')
    const [PanCard, setPanCard] = useState('')
    const [Photo, setPhoto] = useState("")
    const Navigate = useNavigate();
    const[unique,setUnique]=useState([])

    const [Pno, setPno] = useState(1)//page number

    const [ErrFN, setErrFN] = useState("")
    const [ErrLN, setErrLN] = useState("")
    const [ErrLan, setErrLan] = useState('')
    const [ErrC, setErrC] = useState("")
    const [ErrL, setErrL] = useState("")
    const [Error, setError] = useState(false)
    const [ErrE, setErrE] = useState("")
    const [ErrP, setErrP] = useState("")
    const [ErrA, setErrA] = useState("")
    const [ErrGender, setErrGender] = useState("")
    const [FileErr, setFileErr] = useState("")
    const [ErrDOB, setErrDOB] = useState('')
    const [ErrAadhar, setErrAadhar] = useState('')
    const [ErrAadharCard, setErrAadharCard] = useState('')
    const [ErrAcc, setErrAcc] = useState("")
    const [ErrAccC, setErrAccC] = useState("")
    const [ErrNOB, setErrNOB] = useState("")
    const [ErrIFSC, setErrIfsc] = useState("")
    const [ErrEdu, setErrEdu] = useState("")
    const [ErrJT, setErrJT] = useState("")
    const [ErrWE, setWE] = useState("")
    const [ErrCurrently, setErrCurrently] = useState("")
    const [ErrZone, setErrZone] = useState("")
    const [ErrAlpH, setAlph] = useState('')
    const [ErrKnownL, setErrKnownL] = useState('')
    const [ErrSkillExp, setErrSkillExp] = useState('')
    const [ErrPan, setErrPan] = useState("")
    const [ErrPhoto, setErrPhoto] = useState('')
    const [sub1, SetSub1] = useState([]);
    const[JobT,setJobT]=useState([])
    const[ApiErr,setApiErr]=useState(false)
    const [Known,setKnown]=useState([])
    const[ErrTaluka,setErrTaluka]=useState("")
    const[SelectTaluka,setTaluka]=useState("")

    const getTaluk=()=>{
        return Taluks[Location]
    }


    useEffect(()=>{
        const a=getTaluk()
        setUnique(a)
    },[Location])


        useEffect(()=>{
            axios.get("https://backend.kooblu.com/Job/getJob")
            .then((res)=>setJobT(res.data))
        },[])

    useEffect(() => {
        axios.get("https://backend.kooblu.com/sub_api/new_fetch_items").then((res) => {
            SetSub1(res.data);
        })

    }, [])
    const Form1 = (e) => {
        e.preventDefault()

        // console.log(dotposition);
        setErrFN("")
        setErrLN("")

        setErrC("")
        setErrL("")
        setErrTaluka("")
        setError(false)



        if (Language === "Select" || Language === null) {
            setErrLan("Select your language")
            setError(true)
        }
        else if (Phone === "" || Phone === null) {
            setErrP("Enter your phone number")
            setError(true)
        }
        else if (Phone.length < 10 || Phone.length > 10) {
            setErrP("Enter your 10 digit phone number")
            setError(true)
        }
        else if (Location === "Select" || Location === null) {
            setErrL("Enter your Location")
            setError(true)
        }
        else if(SelectTaluka==="Select"||SelectTaluka===""||SelectTaluka===null){
            setErrTaluka("Select taluka")
            setError(true)
        }


        else if (!Error&&!ApiErr) {

            setPno(Pno + 1)
        }





    }

    useEffect(()=>{
       if(Phone.length>0){ axios.post("https://backend.kooblu.com/vendor_Auth/checkPhone",{
            number:Phone
        })
        .then(res=>{
            if(res.data.status==='ok'){
                setErrP('Number already exist')
                setApiErr(true)
            }
            else{
                setApiErr(false)
                setErrP('')
            }
        })}

    },[Phone])


    if (Pno === 1) {
        return (
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
                                <h1 className="Signup-heading">Register as provider </h1>
                                <p className="Signup-ptag">Welcome! Register with valid data</p>
                            </div>
                            <div className="Already">
                                <p className="Primary-Signup">Already have an account</p>
                                <Link to="/VendorLogin"><p className="Secondary-Signup">Login</p></Link>
                            </div>
                            <>
                                <label className="Join-Label">Language</label>
                                <select className="Signup-Input" defaultValue={Language} onChange={(e) => {
                                    setLanguage(e.target.value)
                                    setErrLan('')
                                }}>
                                    <option>Select</option>
                                    <option>TAMIL</option>
                                    <option>ENGLISH</option>
                                    <option>HINDI</option>
                                    <option>KANNADA</option>
                                    <option>MALAYALAM</option>
                                </select>
                                <p className="Error-signup">{ErrLan}</p>
                                <label className="Join-Label">Phone Number</label>
                                <input type='number' defaultValue={Phone} className="Signup-Input" onChange={(e) => {
                                    setPhone(e.target.value)
                                    setErrP("")
                                }} />
                                <p style={{ color: "red" }}>{ErrP}</p>
                                <label className="Join-Label">Location</label>
                                <select defaultValue={Location} className="Signup-Input" onChange={(e) => {
                                    setLocation(e.target.value)
                                    setErrL("")
                                }}>
                                    {city.map((item, index) => (
                                        <option key={index}>{item}</option>
                                    ))}

                                </select>
                                <p className="Error-signup">{ErrL}</p>

                                <label className="Join-Label">Taluka</label>
                                <select defaultValue={SelectTaluka} className="Signup-Input" onChange={(e) => {
                                    setTaluka(e.target.value)
                                    setErrTaluka("")
                                    setError(false)
                                }}>
                                    <option>Select</option>
                                    {Array.isArray(unique)&&unique.map((item, index) => (
                                        <option key={index}>{item}</option>
                                    ))}

                                </select>
                                <p className="Error-signup">{ErrTaluka}</p>



                                <button type="button" className="Button-Signup" onClick={Form1}>Next</button>
                            </>


                        </form>
                    </div>
                    <div className="Image-divProvider">

                    </div>
                </div>
                <Footer />
                <End />
            </div>
        )
    }




    var atposition = Email.indexOf("@")
    var dotposition = Email.indexOf(".")

    const Form2 = (e) => {
        e.preventDefault()
        setError(false)
        setErrP("")
        setErrE("")
        setErrA("")

        if (FirstName === "" || FirstName === null) {
            setErrFN("Enter your First Name")
            setError(true)
        }

        else if (LName === "" || LName === null) {
            setErrLN("Enter your Last Name")
            setError(true)
        }
        else if (Gender === "Select" || Gender === null) {
            setErrGender("Enter your Gender")
            setError(true)
        }


        else if (!Error) {
            setPno(Pno + 1)
        }

    }

    if (Pno === 2) {
        return (

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
                                <h1 className="Signup-heading">Register as provider </h1>
                                <p className="Signup-ptag">Welcome! Register with valid data</p>
                            </div>
                            <div className="Already">
                                <p className="Primary-Signup">Already have an account</p>
                                <Link to="/Login"><p className="Secondary-Signup">Login</p></Link>
                            </div>
                            <label className="Join-Label">First Name</label>
                            <input className="Signup-Input" type='text' defaultValue={FirstName} onChange={(e) => {
                                setFName(e.target.value)
                                setErrFN("")
                            }} />
                            <p style={{ color: "red" }}>{ErrFN}</p>
                            <label className="Join-Label">Last Name</label>
                            <input className="Signup-Input" value={LName} onChange={(e) => {
                                setLName(e.target.value)
                                setErrLN("")
                            }} />
                            <p style={{ color: "red" }}>{ErrLN}</p>
                            <label className="Join-Label">Gender</label>
                            <select className="Signup-Input" defaultValue={Gender} onChange={(e) => {
                                setGender(e.target.value)
                                setErrGender("")
                            }}>
                                <option>Select</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            <p style={{ color: "red" }}>{ErrGender}</p>
                            <div className="Toggle-btns">
                                <button className="Button-Toggle"
                                    onClick={() => {
                                        setPno(Pno - 1)

                                        console.log(FirstName);
                                    }}
                                >Previous</button>
                                <button className="Button-Toggle" type="submit">Next</button>
                            </div>


                        </form>
                    </div>
                    <div className="Image-divProvider">

                    </div>
                </div>
                <Footer />
                <End />
            </div>
        )

    }

    const Form3 = (e) => {
        e.preventDefault()
        setError(false)
        if (Address === "" || Address === null) {
            setErrA("Enter your address")
            setError(true)
        }
        else if (DOB === "" || DOB === null) {
            setErrDOB("Enter Your DOB")
            setError(true)

        }
        else if (AAdhar === "" || AAdhar === null) {
            setErrAadhar("Enter Your Aadhar Number")
            setError(true)
        }
        else if (AAdhar.length < 12 || AAdhar.length > 12) {
            setErrAadhar("Enter a valid Aadhar Number")
            setError(true)
        }
        else if (AadharCard === "" || AadharCard === null) {
            setErrAadharCard("Upload your Aadhar")
            setError(true)
        }
        else if (!Error) {

            setPno(Pno + 1)
        }
    }

    console.log(Pno);




    if (Pno === 3) {
        return (

            <div>
                <Header />
                <MenuBar />
                <div className="Login-image">
                    <h1 className="Login-heading">Register as Provider</h1>
                </div>
                <div className="Signup-card">
                    <div className="Form-div">
                        <form className="Form-Provider">
                            <div className="Signup-title">
                                <h1 className="Signup-heading">Register as provider in ABC</h1>
                                <p className="Signup-ptag">Welcome! Register with valid data</p>
                            </div>
                            <label className="Join-Label">Address</label>
                            <textarea className="Signup-Input" defaultValue={Address} onChange={(e) => {
                                setAddress(e.target.value)
                                setErrA("")
                            }} />
                            <p style={{ color: "red" }}>{ErrA}</p>
                            <label className="Join-Label">Date Of Birth</label>
                            <input type={'date'} className="Signup-Input" value={DOB} onChange={(e) => {
                                setDOB(e.target.value)
                                setErrDOB("")
                            }} />
                            <p style={{ color: "red" }}>{ErrDOB}</p>
                            <label className="Join-Label">AADHAR Number</label>
                            <input type={'number'} className="Signup-Input" value={AAdhar} onChange={(e) => {
                                setAadhar(e.target.value)
                                setErrAadhar("")
                            }} />
                            <p style={{ color: "red" }}>{ErrAadhar}</p>
                            <label className="Join-Label">AADHAR File</label>
                            <input type={'file'} className="Signup-Input" value={AadharCard.originalname} onChange={(e) => {
                                setAadharCard(e.target.files[0])
                                setErrAadharCard("")
                            }} />
                            <p style={{ color: "red" }}>{ErrAadharCard}</p>
                            <div className="Toggle-btns">
                                <button className="Button-Toggle" onClick={() => { setPno(Pno - 1); console.log(FirstName); }}>Previous</button>
                                <button className="Button-Toggle" onClick={Form3}>Next</button>
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
                <Footer />
                <End />
            </div>
        )

    }




    const Form4 = (e) => {
        e.preventDefault()
        setError(false)
        if (AccNo === "" || AccNo === null) {
            setErrAcc("Enter your Acc number")
            setError(true)
        }

        else if (AccNoC === "" || AccNoC === null) {
            setErrAccC("Enter your Acc number")
            setError(true)

        }
        else if (BnkName === "" || BnkName === null) {
            setErrNOB("Enter Your Name of Bank")
            setError(true)
        }
        else if (AAdhar.length < 12 || AAdhar.length > 12) {
            setErrAadhar("Enter a valid Aadhar Number")
            setError(true)
        }
        else if (Ifsc === "" || Ifsc === null) {
            setErrIfsc("Enter your Ifsc")
            setError(true)
        }
        else if (AccNo != AccNoC) {
            setError(true)
            toast.error('Account number not matched', {
                position: 'top-center'
            })
        }
        else if (!Error) {
            setPno(5)
        }
    }




    if (Pno === 4) {
        return (

            <div>
                <Header />
                <MenuBar />
                <div className="Login-image">
                    <h1 className="Login-heading">Register as Provider</h1>
                </div>
                <div className="Signup-card">
                    <div className="Form-div">
                        <form className="Form-Provider" onSubmit={Form4}>
                            <div className="Signup-title">
                                <h1 className="Signup-heading">Register as provider in ABC</h1>
                                <p className="Signup-ptag">Welcome! Register with valid data</p>
                            </div>
                            <label className="Join-Label">Account Number</label>
                            <input type={'number'} className="Signup-Input" defaultValue={AccNo} onWheel={(e) => {
                                e.target.blur();
                            }}
                                onChange={(e) => {
                                    setAccNo(e.target.value)
                                    setErrAcc("")
                                }} />
                            <p style={{ color: "red" }}>{ErrAcc}</p>
                            <label className="Join-Label">Confirm Account Number</label>
                            <input type={'number'} className="Signup-Input" value={AccNoC} onWheel={(e) => {
                                e.target.blur();
                            }}
                                onChange={(e) => {
                                    setAccCon(e.target.value)
                                    setErrAccC("")
                                }} />
                            <p style={{ color: "red" }}>{ErrAccC}</p>
                            <label className="Join-Label">Name of Bank</label>
                            <input type='text' className="Signup-Input" value={BnkName} onChange={(e) => {
                                setBnkName(e.target.value)
                                setErrNOB("")
                            }} />
                            <p style={{ color: "red" }}>{ErrNOB}</p>
                            <label className="Join-Label">IFSC Code</label>
                            <input type={'text'} className="Signup-Input" defaultValue={Ifsc} onChange={(e) => {
                                setIfsc(e.target.value)
                                setErrIfsc("")
                            }} />
                            <p style={{ color: "red" }}>{ErrIFSC}</p>
                            <div className="Toggle-btns">
                                <button className="Button-Toggle" onClick={(e) => { e.preventDefault(); setPno(Pno - 1); console.log(FirstName); }}>Previous</button>
                                <button className="Button-Toggle" type="submit">Next</button>
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
                <Footer />
                <End />
            </div>
        )

    }



    const Form5 = (e) => {
        e.preventDefault()
        

        setError(false)
        if (Education === "select" || Education === "") {
            setErrEdu("Select Education")
            setError(true)
        }
        else if (JobTitle === "select" || JobTitle === null) {
            setErrJT("Select Job Title")
            setError(true)

        }
        else if (WorkExp === "select" || WorkExp === null) {
            setWE("Select your experience category")
            setError(true)
        }

        else if (currently === "select" || currently === null) {
            setErrCurrently("Select your current working")
            setError(true)
        }

        else if (Zone === "select" || Zone === null) {
            setErrZone("Select your working zone")
            setError(true)
        }

        else if (!Error) {
            setPno(6)
        }
    }





    if (Pno === 5) {


        return (

            <div>
                <Header />
                <MenuBar />
                <div className="Login-image">
                    <h1 className="Login-heading">Register as Provider</h1>
                </div>
                <div className="Signup-card">
                    <div className="Form-div">
                        <form className="Form-Provider" onSubmit={Form5}>
                            <div className="Signup-title">
                                <h1 className="Signup-heading">Register as provider in ABC</h1>
                                <p className="Signup-ptag">Welcome! Register with valid data</p>
                            </div>
                            <label className="Join-Label">Education Level</label>
                            <select className="Signup-Input" value={Education} onChange={(e) => {
                                setEducation(e.target.value)
                                setErrEdu("")
                            }}>
                                <option>Select</option>
                                <option>No formal education</option>
                                <option>Below sslc</option>
                                <option>sslc</option>
                                <option>HSC</option>
                                <option>Under Graduate</option>
                                <option>Post Graduate</option>
                                <option>Doctrate</option>
                            </select>
                            <p style={{ color: "red" }}>{ErrEdu}</p>
                            <label className="Join-Label">Job Title</label>
                            <select className="Signup-Input" value={JobTitle} onChange={(e) => {
                                setJobTitle(e.target.value)
                                setErrJT("")
                            }}>
                                <option>select</option>

                                {JobT.length>0&& JobT.map((s) => (


                                    <option value={s.Job}>{s.Job}</option>


                                ))}
                                {/* <option>Select</option>
                                <option>Electrician</option>
                                <option>Plumber</option>
                                <option>Carpenter</option>
                                <option>Mechanic</option> */}
                            </select>
                            <p style={{ color: "red" }}>{ErrJT}</p>
                            <label className="Join-Label">Work Experience</label>
                            <select className="Signup-Input" value={WorkExp} onChange={(e) => {
                                setWorkExp(e.target.value)
                                setWE("")
                            }}>
                                <option>Select</option>
                                <option>Fresher</option>
                                <option>0-1 yrs</option>
                                <option>1-3 yrs</option>
                                <option>3+ yrs</option>
                            </select>
                            <p style={{ color: "red" }}>{ErrWE}</p>
                            <label className="Join-Label">Currently Working</label>
                            <select className="Signup-Input" value={currently} onChange={(e) => {
                                setcurrently(e.target.value)
                                setErrCurrently("")
                            }}>
                                <option>Select</option>
                                <option>Yes</option>
                                <option>No</option>

                            </select>
                            <p style={{ color: "red" }}>{ErrCurrently}</p>
                            <label className="Join-Label">Working Zone</label>
                            <select className="Signup-Input" value={Zone} onChange={(e) => {
                                setZone(e.target.value)
                                setErrZone("")
                            }}>
                                <option>select</option>
                                {city.map((c) => (
                                    <option value={c}>{c}</option>
                                ))}
                                {/* <option>Erode</option>
                                <option>Coimbatore</option> */}

                            </select>
                            <p style={{ color: "red" }}>{ErrZone}</p>
                            <div className="Toggle-btns">
                                <button className="Button-Toggle" onClick={(e) => { e.preventDefault(); setPno(Pno - 1); console.log(FirstName); }}>Previous</button>
                                <button className="Button-Toggle" type="submit">Next</button>
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
                <Footer />
                <End />
            </div>
        )

    }

    const getExist=(e)=>{
        console.log(e.target.value);
        let index = Known.indexOf(e.target.value)
        
        if(index>=0){
            return true
        }
        else{
            return false
        }
    }

    const changeKnownL=(e)=>{
        
        let copy=[...Known]
        let exist=getExist(e)
        console.log(exist);
        if(!exist){
            copy.push(e.target.value)
            setKnown(copy)
            console.log(Known);
        }
        else{
            toast.error("already added")
        }
        
    }



    const Form6 = (e) => {
        e.preventDefault()
        setError(false)
        console.log(Known);

        if (Email === "" || Education === "") {
            setErrE("Enter your mail Id")
            setError(true)
        }
        else if (AltPH !== "" && (AltPH.length < 10 || AltPH.length > 10)) {
            setAlph("Enter a valid phone number")
            setError(true)

        }
        else if (Known.length<=0) {
            setErrKnownL("Select your Known Language")
            setError(true)
        }

       

        else if (!Error) {
            setPno(7)
        }
    }




    if (Pno === 6) {
        return (

            <div>
                <Header />
                <MenuBar />
                <div className="Login-image">
                    <h1 className="Login-heading">Register as Provider</h1>
                </div>
                <div className="Signup-card">
                    <div className="Form-div">
                        <form className="Form-Provider" onSubmit={Form6}>
                            <div className="Signup-title">
                                <h1 className="Signup-heading">Register as provider in ABC</h1>
                                <p className="Signup-ptag">Welcome! Register with valid data</p>
                            </div>
                            <label className="Join-Label">Email</label>
                            <input type={'email'} value={Email} className="Signup-Input" onChange={(e) => {
                                setEmail(e.target.value)
                                setErrE("")
                            }} />
                            <p style={{ color: "red" }}>{ErrE}</p>
                            <label type={'number'} className="Join-Label">Alternate PH.no</label>
                            <input className="Signup-Input" value={AltPH} onChange={(e) => {
                                setAltPH(e.target.value)
                                setAlph('')
                            }} />
                            <p style={{ color: "red" }}>{ErrAlpH}</p>
                            <label className="Join-Label">Languages Known</label>
                            <select className="Signup-Input" value={KnownL} onChange={(e) => {
                                changeKnownL(e)
                                setErrKnownL('')
                            }}>
                                <option   selected >Select</option>
                                <option>Tamil</option>
                                <option>English</option>
                                <option>Hindi</option>
                                <option>Kanndada</option>
                                <option>Telugu</option>
                                <option>Malayalam</option>
                            </select>
                            <div className="KnownLanguage_box">
                                {Known.map((item,index)=>{
                                    return <p className="KnownL_text" key={index}>{item}</p>
                                })}

                            </div>
                            <p style={{ color: "red" }}>{ErrKnownL}</p>
                            <label className="Join-Label">Skill Experience</label>
                            <input className="Signup-Input" value={SkillExp} onChange={(e) => {
                                setSkillExp(e.target.value)
                                setErrSkillExp('')
                            }} />
                            <p style={{ color: "red" }}>{ErrSkillExp}</p>

                            <div className="Toggle-btns">
                                <button className="Button-Toggle" onClick={(e) => { e.preventDefault(); setPno(Pno - 1); console.log(FirstName); }}>Previous</button>
                                <button className="Button-Toggle" type="submit">Next</button>
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
                <Footer />
                <End />
            </div>
        )

    }

    const Form7 = (e) => {
        e.preventDefault()
        setError(false)
       
        if (Photo === "" || Photo === null) {
            setErrPhoto("Add Your photo")
            setError(true)

        }


        else if(!Error) {
            const Formdata = new FormData()
            Formdata.append("FirstName", FirstName)
            Formdata.append("LName", LName)
            Formdata.append("Location", Location)
            Formdata.append("Email", Email)
            Formdata.append("Phone", Phone)
            Formdata.append("Address", Address)
            Formdata.append("Language", Language)
            Formdata.append("Gender", Gender)
            Formdata.append("DOB", DOB)
            Formdata.append("AAdhar", AAdhar)
            Formdata.append("AadharCard", AadharCard)
            Formdata.append("AccNo", AccNo)
            Formdata.append("BnkName", BnkName)
            Formdata.append("Ifsc", Ifsc)
            Formdata.append("Education", Education)
            Formdata.append("JobTitle", JobTitle)
            Formdata.append("WorkExp", WorkExp)
            Formdata.append("Zone", Zone)
            Formdata.append("AltPH", AltPH)
            Formdata.append("KnownL", Known)
            Formdata.append("SkillExp", SkillExp)
            Formdata.append("PanCard", PanCard)
            Formdata.append("Photo", Photo)
            Formdata.append("taluka",SelectTaluka)
            try {
                axios.post('https://backend.kooblu.com/vendor_Applications/Applications', Formdata)
                    .then((res) => {
                        if (res.data.message === "Email/Mobilenum is already registered") {
                            toast.error("Already registered", {
                                position: 'top-center'
                            })

                        }
                        else {
                            toast.success("Application Submitted")
                            Navigate('/')
                        }
                    })
            }

            catch (error) {
                console.log(error);
            }





        }
    }




    if (Pno === 7) {
        return (

            <div>
                <Header />
                <MenuBar />
                <div className="Login-image">
                    <h1 className="Login-heading">Register as Provider</h1>
                </div>
                <div className="Signup-card">
                    <div className="Form-div">
                        <form className="Form-Provider" onSubmit={Form7}>
                            <div className="Signup-title">
                                <h1 className="Signup-heading">Register as provider in ABC</h1>
                                <p className="Signup-ptag">Welcome! Register with valid data</p>
                            </div>
                            <label className="Join-Label">Pan Card</label>
                            <input type={'file'} className="Signup-Input" onChange={(e) => {
                                setPanCard(e.target.files[0])
                                setErrPan("")
                            }} />
                            <p style={{ color: "red" }}>{ErrPan}</p>
                            <label className="Join-Label">Photo</label>
                            <input type={'file'} className="Signup-Input" onChange={(e) => {
                                setPhoto(e.target.files[0])
                                setErrPhoto('')
                            }} />
                            <p style={{ color: "red" }}>{ErrPhoto}</p>


                            <div className="Toggle-btns">
                                <button className="Button-Toggle" onClick={(e) => { e.preventDefault(); setPno(Pno - 1); console.log(FirstName); }}>Previous</button>
                                <button className="Button-Toggle" type="submit">Next</button>
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
                <Footer />
                <End />
            </div>
        )

    }

}


const AdminLogin = () => {

    var Status = localStorage.getItem("Status")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const adminEmail = "admin@abc.com"
    const adminpassword = "Admin@123"
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const [show, setShow] = useState("password")
    const [icon, setIcon] = useState(<i class="fa-solid fa-eye"></i>)
    const PaswordState = () => {
        if (show === "password") {
            setShow("text")
            setIcon(<i class="fa-sharp fa-solid fa-eye-slash"></i>)
        }
        else {
            setShow("password")
            setIcon(<i class="fa-solid fa-eye"></i>)
        }
    }

    const [errLogin, setErrlogin] = useState("")
    const [errPwd, seterrPwd] = useState("")


    function FormSubmit(e) {
        setErrlogin("")
        seterrPwd("")
        e.preventDefault()
        if (Status === "Loggedin") {
            alert('already Logged in with a user account')
        }

        if (Email === "" || Email === null) {
            setErrlogin("Please enter your LoginId")
        }

        if (Password === "" || Password === null) {
            seterrPwd("Please enter your Password")
        }

        else if (Email !== adminEmail && Email !== "") {
            setErrlogin("No user found")
        }
        else if (Password !== adminpassword && Password !== "") {
            seterrPwd("Incorrect Password")
        }


        if (Email === adminEmail && Password === adminpassword && Status !== "Loggedin") {
            localStorage.setItem("adminemail", Email)
            window.location.href = '/Admin'
        }
        else {
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
                        <input className="Signup-Input" onChange={(e) => {
                            setEmail(e.target.value)
                            setErrlogin("")
                        }} />
                        <p style={{ color: "red" }}>{errLogin}</p>
                        <label className="AdminSignup-Label">Password</label>
                        <div className="Signup-Pwdbox" onChange={(e) => {
                            setPassword(e.target.value)
                            seterrPwd("")
                        }}>
                            <input type={show} className="Signup-InputPwd" />
                            <div onClick={PaswordState}>{icon}</div>
                        </div>
                        <p style={{ color: "red" }}>{errPwd}</p>
                        <div className="Login-sec2">
                            <div className="Remember">
                                <input type="checkbox" />
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
            <Footer />
            <End />
        </div>
    )
}

const ForgetPassword = () => {
    const [Email, setEmail] = useState("")
    const [err, setErr] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    const [ForgetEmail, setForgetEmail] = useState("")



    const ForgetPwd = (event) => {
        event.preventDefault();
        setErr("")

        var atposition = Email.indexOf("@")
        var dotposition = Email.lastIndexOf(".");
        if (Email === "" || Email === null) {
            setErr("Enter your Mail_id")
        }
        else if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= Email.length) {
            setErr("Please enter a valid e-mail address");
            return false;
        }


        axios.post("https://backend.kooblu.com/authUser/forgot_password", {
            email: Email
        }, {
            method: "POST",
            crossDomain: true,
            withCredentials: true
        })
            .then((res) => {
                console.log(res, "userRegister")
                alert(res.data.status)
            }
            )
    }

    useEffect(() => {
        if (cookies.jwt2) {
            window.location.href = "/"
        }
    }, [cookies])

    if (cookies.jwt2) {
        alert("already loggedin")
        window.location.href = '/'
    }
    else {
        return (
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
                                <input className="Signup-Input" type='email' onChange={(e) => {
                                    setEmail(e.target.value)
                                    setErr("")
                                }} />
                                <p style={{ color: "red", margin: '0px', padding: '0px' }}>{err}</p>

                                <button className="Button-Signup" type="submit">Change Password</button>

                            </form>
                        </div>
                        <div className="Image-forget">

                        </div>
                    </div>
                </div>
                <Footer />
                <End />
            </div>
        )
    }

}

const ForgetPasswordVendor = () => {
    const [Email, setEmail] = useState("")
    const [err, setErr] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    const [ForgetEmail, setForgetEmail] = useState("")



    const ForgetPwd = (event) => {
        event.preventDefault();
        setErr("")

        var atposition = Email.indexOf("@")
        var dotposition = Email.lastIndexOf(".");
        if (Email === "" || Email === null) {
            setErr("Enter your Mail_id")
        }
        else if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= Email.length) {
            setErr("Please enter a valid e-mail address");
            return false;
        }


        axios.post("https://backend.kooblu.com/vendor_Auth/forgot_password", {
            Email: Email
        }, {
            method: "POST",
            crossDomain: true,
            withCredentials: true
        })
            .then((res) => {
                console.log(res, "userRegister")
                alert(res.data.status)
            }

            )
    }

    useEffect(() => {
        if (cookies.jwt2) {
            window.location.href = "/"
        }
    }, [cookies])

    if (cookies.jwt2) {
        alert("already loggedin")
        window.location.href = '/'
    }
    else {
        return (
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
                                <input className="Signup-Input" type='email' onChange={(e) => {
                                    setEmail(e.target.value)
                                    setErr("")
                                }} />
                                <p style={{ color: "red", margin: '0px', padding: '0px' }}>{err}</p>

                                <button className="Button-Signup" type="submit">Change Password</button>

                            </form>
                        </div>
                        <div className="Image-forget">

                        </div>
                    </div>
                </div>
                <Footer />
                <End />
            </div>
        )
    }

}



export { Login, Signup, Provider, AdminLogin, ForgetPassword, VendorLogin, ForgetPasswordVendor } 