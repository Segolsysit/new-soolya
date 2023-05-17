import React, { useEffect } from "react";
import './booking.css'
import { useState } from "react";
import axios from "axios";
import { Card, Form } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";


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

    const maxNumber = 10;
    const [selectedNumber, setSelectedNumber] = useState(1);
    const numberOptions = [];
    for (let i = 1; i <= maxNumber; i++) {
      numberOptions.push(<option key={i} value={i}>{i}</option>);
    }
    const handleNumberChange = (event) => {
        const selectedNumber = parseInt(event.target.value);
        console.log(selectedNumber);
        setSelectedNumber(selectedNumber);
       
      };

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
            localStorage.setItem("NumberOfService", selectedNumber)
            setPage(2)
        }


    }

    
    return (
        <div className="Form-outerdiv">
            <div className="Form1">
                <h1 className="Form1-heading">Billing Address</h1>
                <div className="Form1-textdiv">
                    <label className="Form1-subheading">Service Address</label>
                    <input className="Form1-textbox" onChange={(e) => {setAddress(e.target.value)
                            setErrAddress("")
                            setErr1(true)}} defaultValue={defaultAddress} />
                    <p style={{ color: "red" }}><i class="fa-solid fa-circle-exclamation" hidden={Err1} />{ErrAddress}</p>
                </div>
                <div className="Form1-textdiv">
                    <label className="Form1-subheading" >Street</label>
                    <input className="Form1-textbox" defaultValue={Street} onChange={(e) => {setStreet(e.target.value)
                            setErrStreet("")
                            setErr2(true)
                        }} />
                    <p style={{ color: "red" }}><i class="fa-solid fa-circle-exclamation" hidden={err2} />{ErrStreet}</p>
                </div>
                <div className="Form1-textdiv">
                    <label className="Form1-subheading">City</label>
                    <input className="Form1-textbox" defaultValue={city} onChange={(e) => {setCity(e.target.value)
                    setErrCity("")
                    setErr3(true)}} />
                    <p style={{ color: "red" }}><i class="fa-solid fa-circle-exclamation" hidden={err3} />{ErrCity}</p>
                </div>
                <div className="Form1-textdiv">
                    <label className="Form1-subheading">Postal Code</label>
                    <input className="Form1-textbox" type='number' defaultValue={Post} onChange={(e) => {setPost(e.target.value)
                    setErrPost("")
                    setErr4(true)}} />
                    <p style={{ color: "red" }}><i class="fa-solid fa-circle-exclamation" hidden={err4} />{ErrPost}</p>
                </div>
                <div className="Form1-textdiv">
                    <label className="Form1-subheading">Contact Person</label>
                    <input className="Form1-textbox " defaultValue={defaultName} onChange={(e) => {setName(e.target.value)
                    setErrName("")
                    setErr5(true)}} />
                    <p style={{ color: "red" }}><i class="fa-solid fa-circle-exclamation" hidden={err5} />{ErrName}</p>
                </div>
                <div className="Form1-textdiv">
                    <label className="Form1-subheading">Phone Number</label>
                    <input type='number' className="Form1-textbox" defaultValue={defaultPhone} onChange={(e) => {setPhone(e.target.value)
                            setErrPhone("")
                            setErr6(true)
                        }} />
                    <p style={{ color: "red" }}><i class="fa-solid fa-circle-exclamation" hidden={err6} />{ErrPhone}</p>
                </div>
                <div className="Form1-textdiv">
                <label className="Form1-subheading">numberOfServices</label>
                <select className="Form1-textbox" value={selectedNumber} onChange={handleNumberChange}>
                    {numberOptions}
                </select>
                </div>

            </div>
            <button className="Form1-btn" onClick={SubmitForm}>Next</button>
        </div>
    )
}


const Page2 = () => {
    const [Data,setData]=useState([])
    const id=localStorage.getItem("order_id")

    function get(){
        axios.get(`http://localhost:3001/sub_api/Book_new_fetch_items/${id}`)
        .then((data)=>setData(data.data))
    }
    useEffect(()=>{
         get()
    // console.log(da;
    },[])
    console.log(Data);

    
    const Name = localStorage.getItem("Name")
    const Number = localStorage.getItem("Phone")
    const Address = localStorage.getItem("Address")
    const selectedNumber = localStorage.getItem("NumberOfService")

    const Price = selectedNumber*Data.Price
    console.log(Price);

    
    // console.log(Data.Desc);
        return (
                <div className="Bill-div" style={{width:'100%'}}>
                    <div className="Bill-sec1">
                        <div style={{textAlign:'left'}}>
                        <h1 className="Bill-Name">{Name}</h1>
                        <p className="Billp-tag" style={{margin:'0px'}}>{Address}</p>
                        <p className="Billp-tag">{Number}</p>
                        </div>
                    </div>
                    <div className="Table-div">
                        <table className="Table-body">
                            <tbody >
                                
                                <tr>
                                    <td className="Billtable-Desc">Service</td>
                                    <td className="Billtable-Content">{Data.Category}</td>
                                </tr>
                                <tr>
                                    <td className="Billtable-Desc">Qty</td>
                                    <td className="Billtable-Content">{selectedNumber}</td>
                                </tr>
                                <tr>
                                    <td className="Billtable-Desc">Total</td>
                                    <td className="Billtable-Content">₹{Price}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        )
    }

    



const Page3 = ({ Page, setPage }) => {
    const [selectedOption, setSelectedOption] = useState("");
  const [bookingdata, setbookingdata] = useState({})

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [Data,setData]=useState([])
  const Orderid=localStorage.getItem("order_id")

  function get(){
    axios.get(`http://localhost:3001/sub_api/Book_new_fetch_items/${Orderid}`)
    .then((data)=>setData(data.data))
  }
  useEffect(()=>{
       get()
      // console.log(Data);
  // console.log(da;
  },[])
  
  const Name = localStorage.getItem("Name")
  const Number = localStorage.getItem("Phone")
  const NumberOfService = localStorage.getItem("NumberOfService")

  
  const handleSubmit = (event) => {
    event.preventDefault();

    if(selectedOption === "cashOnDelivery"){
      localStorage.setItem("paymentType",selectedOption)
    }
    else{
      localStorage.setItem("paymentType",selectedOption);
    }
    console.log(selectedOption);
    // handle payment based on selected option
    return setPage((currentpage) => currentpage + 1)
  };
  const id = localStorage.getItem("service_id")
    return (
        <Card className="Card-form3">
        <Card.Header className=".Form3-heading">
          <h4>Payment Options</h4>
        </Card.Header>
        <Card.Body className="Form3-outerbody">
       <p>Amount Payable: ₹ {Data.Price*NumberOfService}</p>
          <Form onSubmit={handleSubmit} className="Form3-body">
            <Form.Check
              type="radio"
              id="cashOnDelivery"
              label="Cash on Delivery"
              value="cashOnDelivery"
              checked={selectedOption === "cashOnDelivery"}
              onChange={handleOptionChange}
            />
            <Form.Check
              type="radio"
              id="onlinePayment"
              label="Online Payment"
              value="onlinePayment"
              checked={selectedOption === "onlinePayment"}
              onChange={handleOptionChange}
            />
            {selectedOption === "onlinePayment" && (
              <div>
                 <input type="button" name="next" onClick={handleSubmit}
           value="Continue Booking" className="Form3-btn"/>
              </div>
            )
            }
             {selectedOption === "cashOnDelivery" && (
              <div>
                <input type="button" name="next" onClick={handleSubmit}
          class="next action-button" value="Continue Booking"className="Form3-btn" />
              </div>
            )
            }
           
           
          </Form>
        </Card.Body>
      </Card>
    )
}

const Page4 = ({ Page, setPage ,Bookstate,setBookState}) => {
    const[state,setState]=useState(false)
    const onChange = (value) => {
        localStorage.setItem("captcha", value)
        if(value!==null){
            setBookState(true)
        }
        else{
            setBookState(false)
        }
    }
    return (
        <div className="Form-outerdiv">
            <div className="Form1">
                <h2 className="Form2-heading">Confirm here</h2>
                <center>
                    <ReCAPTCHA
                                    sitekey="6LdyhYIkAAAAAJj04Umnf4rQ427h49pItJtiBJ_l"
                                    onChange={onChange}
                                />
                                </center>
            </div>
        </div>
    )
}



export { Page1, Page2, Page3, Page4 }