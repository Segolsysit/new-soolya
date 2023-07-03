import { useEffect, useState } from "react";
import "./css/dashboard.css";
import axios from 'axios';




function DashBoard({open,close,formNumber}){



    const [completed_orderdetails, setcompleted_orderdetails] = useState([])
    const [PendingOrders,setPendingOrders]=useState([])
    const[Orders,setOrders]=useState([])
    const[Application,setApplication]=useState([])
    const[Workers,setWorkers]=useState([])


useEffect(()=>{
  axios.get("http://localhost:3001/booking_api/completed_booking_data").then((res) => {
            setcompleted_orderdetails(res.data)
        })
        axios.get(`http://localhost:3001/vendor_Applications/vendor_application`).then((res) => {
            setApplication(res.data);
       
    })

    axios.get("http://localhost:3001/booking_api/booking_data").then((res) => {
        setOrders(res.data)
    })
    axios.get("http://localhost:3001/booking_api/pending_booking_data").then((res) => {
        setPendingOrders(res.data)
    })
    axios.get("http://localhost:3001/vendor_Auth/fetch_vendor").then((res) => {
        setWorkers(res.data)
    })

},[])

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

            <div className="dashboard_view" style={{backgroundColor:'red'}}>
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

            <div className="dashboard_view">
                <div className="dashboard_view_img">
                <i id='teams_img_2' class="fa-solid fa-check fa-beat" style={{color: "#2d6fe1;"}}></i>
</div>
                <div className="team_count_div">
                  <div className="teams_count">
                      <h5>{completed_orderdetails.length}</h5>
                  </div>
                    <h6>Total Completed Orders</h6>
                </div>
            </div>


            <div className="dashboard_view">
                <div className="dashboard_view_img">
                <i id="teams_img_3" class="fa-solid fa-piggy-bank fa-beat-fade"></i>
                </div>
                <div className="team_count_div">
                  <div className="teams_count">
                      <h5>{Application.length}</h5>
                  </div>
                    <h6>Applications Recieved</h6>
                </div>
            </div>

            <div className="dashboard_view">
                <div className="dashboard_view_img">
                <i id="teams_img_3" class="fa-solid fa-piggy-bank fa-beat-fade"></i>
                </div>
                <div className="team_count_div">
                  <div className="teams_count">
                      <h5>{Workers.length}</h5>
                  </div>
                    <h6>Active Workers</h6>
                </div>
            </div>
            
          </div>


          
            
          
    
            </div>
        )
    }
}

export default DashBoard;