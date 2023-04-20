import React, { useEffect } from "react";
import { MenuBar } from "../objects/objects";
import './myorder.css'


const Myorder = () => {
    
        var Status=localStorage.getItem("Status")
        if(Status==="Loggedin"){
            return (
                <div >
                    <MenuBar />
                    <h1 className="Order-heading">My Order</h1>
                    <div className="Table-div">
                        <table>
                            <tr className="Table-row">
                                <th>SN</th>
                                <th>Category</th>
                                <th>Service</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Number</th>
                                <th>Person</th>
                                <th>Street</th>
                                <th>Zip</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Cleaning</td>
                                <td>Erode</td>
                                <td>Kollampalayam</td>
                                <td>Erode</td>
                                <td>1234567890</td>
                                <td>Kumar</td>
                                <td>Kumar Street</td>
                                <td>638902</td>
                            </tr>
                            
                        </table>
                    </div>
                </div>
            )
        }
    
        else{
            window.location.href="/"
        }
   
    
    
    
}


export default Myorder