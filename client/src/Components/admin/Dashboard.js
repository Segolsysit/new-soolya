import { useEffect, useState } from "react";
import "./css/dashboard.css";
import axios from 'axios';




function DashBoard({open,close,formNumber}){


    const [amount, setAmount] = useState("");
    const [completed_orderdetails, setcompleted_orderdetails] = useState([])

    const handlePayment = (e)=>{
          e.preventDefault();

          if(amount === ""){
              alert("Please enter amount");
          }
          else{
            // alert("payment gateway open");

            // var options = {
            //     key:"rzp_test_1SnQnLm783h5Op",
            //     key_secret:"W3x1XiUXiyqIKQJrSBqaXGmE",
            //     amount:amount *100,
            //     currency:"INR",
            //     name:"SOOLYA",
            //     description:"Payment here",
            //     handler:function(res){
            //         ////console.log(res);
            //         alert(res.razorpay_payment_id);
            //     },
            //     prefill:{
            //         name:'vignesh',
            //         email:"vigneshvignesh4727@gmail.com",
            //         contact:"9791823953"
            //     },
            //     notes:{
            //         address:"Segolsys software solutions"
            //     },
            //     theme:{
            //         color:"#3399cc"
            //     }
            // };

            // var pay = new window.Razorpay(options);

            // pay.open();
          }
    }


    // demo
useEffect(()=>{
  axios.get("http://backend.kooblu.com/booking_api/completed_booking_data").then((res) => {
            setcompleted_orderdetails(res.data)
        })

},[])

    const counters = document.querySelectorAll(".count");
    const speed = 200;
    const totalearnings = completed_orderdetails.reduce((acc,curr)=> acc + parseInt(curr.total), 0)
    
    counters.forEach((counter) => {
      const updateCount = () => {
        const target = parseInt(+counter.getAttribute("data-target"));
        const count = parseInt(+counter.innerText);
        const increment = Math.trunc(target / speed);
        //console.log(increment);
        
    
        if (count < target) {
          counter.innerText = count + increment;
          setTimeout(updateCount, 1);
        } else {
          count.innerText = target;
        }
      };
      updateCount();
    });
if(!open) return null
    else if(open&&formNumber===3)
    {
        return(
            <div>
    
    
            <div className="demo_h1">
    
                <div>
               
    
                    <input type="text" value={amount} onChange={(e)=>{setAmount(e.target.value)}}></input>
                    <br/>
                    <br/>
                    <div className="three">
                        <button  type="button" onClick={handlePayment} >Submit</button>
                    </div>
    
                </div>
    
         
    
            </div>
    
    
            <div class="container">
        <div class="heading">
          Counting Upto the Limit
        </div>
        <div class="counter-container">
          <div class="counter">
            <img src="https://raw.githubusercontent.com/nemo0/animated-counter/29e12c0cb15e90c27faaef0d83fb2618126067db/icons/iconmonstr-time-19.svg" alt="timer" srcset="" class="icon"></img>
            <h3>{completed_orderdetails.length}</h3>
            <h6>Total Orders</h6>
          </div>
          <div class="counter">
            <img src="https://raw.githubusercontent.com/nemo0/animated-counter/29e12c0cb15e90c27faaef0d83fb2618126067db/icons/iconmonstr-coffee-11.svg" alt="Coffee" srcset="" class="icon"></img>
            <h3>{totalearnings}</h3>
            <h6>Total Earnings</h6>
          </div>
          {/* <div class="counter">
            <img src="https://raw.githubusercontent.com/nemo0/animated-counter/29e12c0cb15e90c27faaef0d83fb2618126067db/icons/iconmonstr-weather-112.svg" alt="night" srcset="" class="icon"></img>
            <h3 data-target="500" class="count">0</h3>
            <h6>Sleepless Nights</h6>
          </div> */}
        </div>
      </div>
      
    
            </div>
        )
    }
}

export default DashBoard;