import { useEffect, useState } from "react";
import "./css/dashboard.css";
import axios from 'axios';




function DashBoard({open,close,formNumber}){



    const [completed_orderdetails, setcompleted_orderdetails] = useState([])
    const [PendingOrders,setPendingOrders]=useState([])
    const[Orders,setOrders]=useState([])
    const[Application,setApplication]=useState([])
    const[Workers,setWorkers]=useState([])
    const [completedOrderdetails, setcompletedOrderdetails] = useState([])


useEffect(()=>{
  axios.get("https://backend.kooblu.com/booking_api/completed_booking_data").then((res) => {
            setcompleted_orderdetails(res.data)
        })
        axios.get(`https://backend.kooblu.com/vendor_Applications/vendor_application`).then((res) => {
            setApplication(res.data);
       
    })

    axios.get("https://backend.kooblu.com/booking_api/booking_data").then((res) => {
        setOrders(res.data)
    })
    axios.get("https://backend.kooblu.com/booking_api/pending_booking_data").then((res) => {
        setPendingOrders(res.data)
    })
    axios.get("https://backend.kooblu.com/vendor_Auth/fetch_vendor").then((res) => {
        setWorkers(res.data)
    })
    axios.get(`https://backend.kooblu.com/booking_api/Completed_vendor_order`) .then((response) => {
                        setcompletedOrderdetails(response.data)
                        console.log(response.data);
                        // const totalearnings = completedOrderdetails.reduce((acc, curr) => acc + parseInt(curr.total), 0)
                        // console.log(total);
                    })

},[])

const totalearnings = ((completedOrderdetails.reduce((acc, curr) => acc + parseInt(curr.total), 0)))


console.log(Application);

 
if(!open) return null
    else if(open&&formNumber===3)
    {
        return(
            <div>
    
            <div>
              <h4 className="dashboard_heading">Dashboard Analysis</h4>
            </div>

          <div className="dashboard_overall_count_div">

            <div className="dashboard_view" style={{backgroundColor:'dodgerblue'}}>
                <div  className="dashboard_view_img" >
                    {/* <i id="teams_img" class="fa-solid fa-people-group fa-beat-fade fa-2xl"></i> */}
                    <i id="teams_img_2" class="fa-solid fa-cart-arrow-down fa-beat-fade" style={{color:'white'}}></i>
                </div>
                <div className="team_count_div">
                  <div className="teams_count">
                      <h5 style={{color:'white'}}>{Orders.length}</h5>
                  </div>
                    <h6 style={{color:'white'}}>Total Orders Received</h6>
                </div>
            </div>

            <div className="dashboard_view" style={{backgroundColor:'#cc666a'}}>
                <div className="dashboard_view_img">
                    {/* <i id="teams_img_2" class="fa-solid fa-cart-arrow-down fa-beat-fade"></i> */}
                    <i style={{color:'white'}} id="teams_img" class="fa-solid fa-hourglass-end fa-beat-fade"></i>
                </div>
                <div className="team_count_div">
                  <div className="teams_count">
                      <h5 style={{color:'white'}}>{PendingOrders.length}</h5>
                  </div>
                    <h6 style={{color:'white'}}>Total Pending Orders</h6>
                </div>
            </div>

            <div className="dashboard_view" style={{backgroundColor:'#79a3e0'}}>
                <div className="dashboard_view_img">
                <i id='teams_img_2' class="fa-solid fa-check fa-beat" style={{color: "#2d6fe1;"}}></i>
</div>
                <div className="team_count_div">
                  <div className="teams_count">
                      <h5 style={{color:'white'}}>{completed_orderdetails.length}</h5>
                  </div>
                    <h6 style={{color:'white'}}>Total Completed Orders</h6>
                </div>
            </div>


            <div className="dashboard_view" style={{backgroundColor:'#6dd1ab'}}>
                <div className="dashboard_view_img">
                <i id='teams_img_2' class="fa-solid fa-list fa-beat-fade"></i>                                </div>
                <div className="team_count_div">
                  <div className="teams_count">
                      <h5 style={{color:'white'}}>{Application.length}</h5>
                  </div>
                    <h6 style={{color:'white'}}>Applications Recieved</h6>
                </div>
            </div>

            <div className="dashboard_view" style={{backgroundColor:'#f0a05b'}}>
                <div className="dashboard_view_img">
                <i id="teams_img_3" class="fa-solid fa-users fa-beat-fade"></i>
                                </div>
                <div className="team_count_div">
                  <div className="teams_count">
                      <h5 style={{color:'white'}}>{Workers.length}</h5>
                  </div>
                    <h6 style={{color:'white'}}>Active Workers</h6>
                </div>
            </div>

            <div className="dashboard_view" style={{backgroundColor:'#e088f2'}}>
                <div className="dashboard_view_img">
                <i id="teams_img_3" class="fa-solid fa-piggy-bank fa-beat-fade"></i>
                </div>
                <div className="team_count_div">
                  <div className="teams_count">
                      <h5 style={{color:'white'}}>₹ {totalearnings}</h5>
                  </div>
                    <h6 style={{color:'white'}}>Total Earnings</h6>
                </div>
            </div>

            
            
          </div>


          
            
          
    
            </div>
        )
    }
}

export default DashBoard;