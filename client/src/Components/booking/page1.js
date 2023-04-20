import React from "react";
import './booking.css'
import { useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha";


const Page1 = ({ Page, setPage }) => {


    const defaultName = localStorage.getItem("Name")
    const defaultPhone = localStorage.getItem("Phone")
    const defaultAddress = localStorage.getItem("Address")
    const defaultcity = localStorage.getItem("City")
    const defaultPost = localStorage.getItem("Post")
    const defaultStreet = localStorage.getItem("Street")



    const [Name, setName] = useState(defaultName)
    const [Phone, setPhone] = useState(defaultPhone)
    const [Street, setStreet] = useState(defaultStreet)
    const [city, setCity] = useState(defaultcity)
    const [Post, setPost] = useState(defaultPost)
    const [address, setAddress] = useState(defaultAddress)


    const [ErrName, setErrName] = useState("")
    const [ErrPhone, setErrPhone] = useState("")
    const [ErrPost, setErrPost] = useState("")
    const [ErrCity, setErrCity] = useState("")
    const [ErrStreet, setErrStreet] = useState("")
    const [ErrAddress, setErrAddress] = useState("")

    const [Err1, setErr1] = useState(true)
    const [err2, setErr2] = useState(true)
    const [err3, setErr3] = useState(true)
    const [err4, setErr4] = useState(true)
    const [err5, setErr5] = useState(true)
    const [err6, setErr6] = useState(true)

    const SubmitForm = (e) => {
        e.preventDefault()
        setErrName("")
        setErrPhone("")
        setErrPost("")
        setErrCity("")
        setErrStreet("")
        setErrAddress("")
        setErr1(true)
        setErr2(true)
        setErr3(true)
        setErr4(true)
        setErr5(true)
        setErr6(true)
        var error = false




        if (Name === "" || Name === null) {
            setErrName("Please enter your name")
            error = true
            setErr5(false)
        }








        if (Phone === "" || Phone === null) {
            setErrPhone("Enter phone number")
            error = true
            setErr6(false)
        }
        else if (Phone.length < 10 || Phone.length > 10) {
            setErrPhone("Enter correct Phone number")
            error = true
            setErr6(false)
        }


        if (Post === "" || Post === null) {
            setErrPost("Enter your postal code")
            error = true
            setErr4(false)
        }

        else if (Post.length < 6 || Post.length > 6) {
            setErrPost("Enter correct postalcode")
            error = true
            setErr4(false)
        }






        if (city === "" || city === null) {
            setErrCity("Enter the city")
            error = true
            setErr3(false)
        }
        else {
            setErrCity("")
            setErr3(true)
        }

        if (Street === "" || Street === null) {
            setErrStreet("Enter your street")
            error = true
            setErr2(false)
        }
        else {
            setErrStreet("")
        }

        if (address === "" || address === null) {
            setErrAddress("Enter your Address")
            error = true
            setErr1(false)
        }
        else {
            setErrAddress("")
        }

        if (!error) {
            localStorage.setItem("Name", Name)
            localStorage.setItem("Phone", Phone)
            localStorage.setItem("Address", address)
            localStorage.setItem("Post", Post)
            localStorage.setItem("Street", Street)
            localStorage.setItem("City", city)
            setPage(2)
        }


    }

    return (
        <div className="Form-outerdiv">
            <div className="Form1">
                <h1 className="Form1-heading">Billing Address</h1>
                <div className="Form1-textdiv">
                    <label className="Form1-subheading">Service Address</label>
                    <input className="Form1-textbox" onChange={(e) => setAddress(e.target.value)} defaultValue={defaultAddress} />
                    <p style={{ color: "red" }}><i class="fa-solid fa-circle-exclamation" hidden={Err1} />{ErrAddress}</p>
                </div>
                <div className="Form1-textdiv">
                    <label className="Form1-subheading" >Street</label>
                    <input className="Form1-textbox" defaultValue={Street} onChange={(e) => setStreet(e.target.value)} />
                    <p style={{ color: "red" }}><i class="fa-solid fa-circle-exclamation" hidden={err2} />{ErrStreet}</p>
                </div>
                <div className="Form1-textdiv">
                    <label className="Form1-subheading">City</label>
                    <input className="Form1-textbox" defaultValue={city} onChange={(e) => setCity(e.target.value)} />
                    <p style={{ color: "red" }}><i class="fa-solid fa-circle-exclamation" hidden={err3} />{ErrCity}</p>
                </div>
                <div className="Form1-textdiv">
                    <label className="Form1-subheading">Postal Code</label>
                    <input className="Form1-textbox" defaultValue={Post} onChange={(e) => setPost(e.target.value)} />
                    <p style={{ color: "red" }}><i class="fa-solid fa-circle-exclamation" hidden={err4} />{ErrPost}</p>
                </div>
                <div className="Form1-textdiv">
                    <label className="Form1-subheading">Contact Person</label>
                    <input className="Form1-textbox " defaultValue={defaultName} onChange={(e) => setName(e.target.value)} />
                    <p style={{ color: "red" }}><i class="fa-solid fa-circle-exclamation" hidden={err5} />{ErrName}</p>
                </div>
                <div className="Form1-textdiv">
                    <label className="Form1-subheading">Phone Number</label>
                    <input className="Form1-textbox" defaultValue={defaultPhone} onChange={(e) => setPhone(e.target.value)} />
                    <p style={{ color: "red" }}><i class="fa-solid fa-circle-exclamation" hidden={err6} />{ErrPhone}</p>
                </div>

            </div>
            <button className="Form1-btn" onClick={SubmitForm}>Next</button>
        </div>
    )
}


const Page2 = () => {
    const Name = localStorage.getItem("Name")
    const Number = localStorage.getItem("Phone")
    const Address = localStorage.getItem("Address")
    return (
        <div className="Form-outerdiv">
            <div className="Form1">
                <h2 className="Form2-heading">Billing Summary</h2>
                <div className="Form2-contactdiv">
                    <ul className="Form2-ul">
                        <li className="Form2-li"><i class="fa-solid fa-user"></i>{Name}</li>
                        <li className="Form2-li"><i class="fa-solid fa-phone"></i>{Number}</li>
                        <li className="Form2-li"><i class="fa-solid fa-location-dot"></i>{Address}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}


const Page3 = ({ Page, setPage }) => {
    return (
        <div className="Form-outerdiv">
            <div className="Form1">
                <h2 className="Form2-heading">Payment Option</h2>
                <div className="Form2-contactdiv">
                    <ul className="Form2-ul">
                        <li className="Form2-li"><input type='radio' name="pay" />
                            <label className="form3-label">Cash on delivery</label></li>
                        <li className="Form2-li"><input type='radio' name="pay" />
                            <label className="form3-label">Online Payment</label></li>
                    </ul>
                    <button className="Form3-btn" onClick={() => setPage(4)}>Continue</button>
                </div>
            </div>
        </div>
    )
}

const Page4 = ({ Page, setPage }) => {
    const onChange = (value) => {
        localStorage.setItem("captcha", value)
    }
    return (
        <div className="Form-outerdiv">
            <div className="Form1">
                <h2 className="Form2-heading">Confirm here</h2>
                {/* <ReCAPTCHA
                                    sitekey="6LdyhYIkAAAAAJj04Umnf4rQ427h49pItJtiBJ_l"
                                    onChange={onChange}
                                /> */}
            </div>
        </div>
    )
}



export { Page1, Page2, Page3, Page4 }