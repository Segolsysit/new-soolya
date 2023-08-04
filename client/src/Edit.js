// import axios from 'axios';
// import React, { useEffect, useRef, useState } from 'react';

// function Edit(props) {

//     const [editfirstname, setEditfirstname] = useState("");
//     const [editlastname, setEditlastname] = useState("");
//     const [editPhonenumber, setEditPhonenumber] = useState("");
//     const [editEmail, setEditEmail] = useState("");
//     const [getuserdata, setGetuserdata] = useState({});

//     function GetedituserData() {
//         axios.get("http://localhost:3001/authUser/fetch_email/64c9fa58c2120327afd9c53c").then((res) => {
//             setGetuserdata(res.data);
//             setEditfirstname(res.data.firstName);
//             setEditlastname(res.data.lastName);
//             setEditPhonenumber(res.data.phoneNumber);
//             setEditEmail(res.data.email);
//         })
//     }

//     useEffect(() => {
//         GetedituserData()
//     }, [])

//     function EditUser() {
//         axios.put("http://localhost:3001/authUser/64c9fa58c2120327afd9c53c", {
//             firstName: editfirstname,
//             lastName: editlastname,
//             phoneNumber: editPhonenumber,
//             email: editEmail
//         }).then(() => {
//             // setEditfirstname("");
//             // setEditlastname("");
//             // setEditPhonenumber("");
//             // setEditEmail("")
//             window.location = "/edit"
//         })
//     }

//     return (
//         <div>
//             <h1>Edit My Profile</h1>
//             <div className="edit_table_div">
//                 <div>
//                     <table className="edit_table">
//                         <tbody>
//                             <tr>
//                                 <td>First Name</td>
//                                 <td><input defaultValue={getuserdata.firstName} onChange={(e) => { setEditfirstname(e.target.value) }} /></td>
//                             </tr>
//                             <tr>
//                                 <td>Last Name</td>
//                                 <td><input defaultValue={getuserdata.lastName} onChange={(e) => { setEditlastname(e.target.value) }} /></td>
//                             </tr>
//                             <tr>
//                                 <td>Phone Number</td>
//                                 <td><input defaultValue={getuserdata.phoneNumber} onChange={(e) => { setEditPhonenumber(e.target.value) }} /></td>
//                             </tr>
//                             <tr>
//                                 <td>Email</td>
//                                 <td><input defaultValue={getuserdata.email} onChange={(e) => { setEditEmail(e.target.value) }} /></td>
//                             </tr>

//                         </tbody>
//                     </table>
//                     <div className="edit_submit_btn_div">
//                         <button className="edit_submit_btn" onClick={EditUser}>Submit</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Edit;