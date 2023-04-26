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
    const [Data,setData]=useState([])
    const id=localStorage.getItem("order_id")

    function get(){
        axios.get(`http://localhost:3001/api/fetch_items_id/${id}`)
        .then((data)=>setData(data.data))
    }
    useEffect(()=>{
         get()
        // console.log(Data);
    // console.log(da;
    },[])
    
    const Name = localStorage.getItem("Name")
    const Number = localStorage.getItem("Phone")
    const Address = localStorage.getItem("Address")
    

    
    // console.log(Data.Desc);
        return (
            <div className="Form-outerdiv">
                <div className="Form2">
                    
                    <h2 className="Form2-heading">Billing Summary</h2>
                    <div className="Form2-contactdiv">
                            <div className="Purchase-data">
                                <p className="Bill-data">Item:{Data.Desc}</p>
                                <p className="Bill-data">Price:${Data.Price}</p>
                                </div>
                        <ul className="Form2-ul">
                            <li className="Form2-li"><i class="fa-solid fa-user"></i><p>{Name}</p></li>
                            <li className="Form2-li"><i class="fa-solid fa-phone"></i><p>{Number}</p></li>
                            <li className="Form2-li"><i class="fa-solid fa-location-dot"></i><p>{Address}</p></li>
                        </ul>
                    </div>
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
      axios.get(`http://localhost:3001/api/fetch_items_id/${Orderid}`)
      .then((data)=>setData(data.data))
  }
  useEffect(()=>{
       get()
      // console.log(Data);
  // console.log(da;
  },[])
  
  const Name = localStorage.getItem("Name")
  const Number = localStorage.getItem("Phone")
  const Address = localStorage.getItem("Address")

  
  const handleSubmit = (event) => {
    event.preventDefault();

    if(selectedOption === "cashOnDelivery"){
      localStorage.setItem("paymentType",selectedOption)
    }
    else{
      localStorage.setItem("paymentType",selectedOption);
      
      var options = {
        key:"rzp_test_1SnQnLm783h5Op",
        key_secret:"W3x1XiUXiyqIKQJrSBqaXGmE",
        amount:Data.Price *100,
        currency:"INR",
        name:"SOOLYA",
        description:"Payment here",
        handler:function(res){
            console.log(res);
            alert(res.razorpay_payment_id);
        },
        prefill:{
            name:'vignesh',
            email:"vigneshvignesh4727@gmail.com",
            contact:"9791823953"
        },
        notes:{
            address:"Segolsys software solutions"
        },
        theme:{
            color:"#3399cc"
        }
    };

    var pay = new window.Razorpay(options);

    pay.open();
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
       <p>Amount Payable: ₹ {Data.Price}</p>
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
                <ReCAPTCHA
                                    sitekey="6LdyhYIkAAAAAJj04Umnf4rQ427h49pItJtiBJ_l"
                                    onChange={onChange}
                                />
            </div>
        </div>
    )
}



export { Page1, Page2, Page3, Page4 }