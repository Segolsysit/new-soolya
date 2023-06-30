import { useEffect, useState } from "react";
import "./css/dashboard.css";
import axios from 'axios';




function DashBoard({open,close,formNumber}){



    const [completed_orderdetails, setcompleted_orderdetails] = useState([])


useEffect(()=>{
  axios.get("https://backend.kooblu.com/booking_api/completed_booking_data").then((res) => {
            setcompleted_orderdetails(res.data)
        })

},[])

 
if(!open) return null
    else if(open&&formNumber===3)
    {
        return(
            <div>
    
            <div>
              <h4 className="dashboard_heading">Dashboard Analysis</h4>
            </div>

          <div className="dashboard_overall_count_div">

            <div className="dashboard_view">
                <div className="dashboard_view_img">
                    {/* <i id="teams_img" class="fa-solid fa-people-group fa-beat-fade fa-2xl"></i> */}
                    <i id="teams_img_2" class="fa-solid fa-cart-arrow-down fa-beat-fade"></i>
                </div>
                <div className="team_count_div">
                  <div className="teams_count">
                      <h5>8,452</h5>
                  </div>
                    <h6>Total Orders Received</h6>
                </div>
            </div>

            <div className="dashboard_view">
                <div className="dashboard_view_img">
                    {/* <i id="teams_img_2" class="fa-solid fa-cart-arrow-down fa-beat-fade"></i> */}
                    <i id="teams_img" class="fa-solid fa-hourglass-end fa-beat-fade"></i>
                </div>
                <div className="team_count_div">
                  <div className="teams_count">
                      <h5>852</h5>
                  </div>
                    <h6>Total Pending Orders</h6>
                </div>
            </div>

            <div className="dashboard_view">
                <div className="dashboard_view_img">
                <i id="teams_img_3" class="fa-solid fa-piggy-bank fa-beat-fade"></i>
                </div>
                <div className="team_count_div">
                  <div className="teams_count">
                      <h5>450</h5>
                  </div>
                    <h6>Total Completed Orders</h6>
                </div>
            </div>
            
          </div>
      
    
            </div>
        )
    }
}

export default DashBoard;