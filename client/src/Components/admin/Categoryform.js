import React from "react";
import './css/Categoryform.css'
import { Button, Table, TableBody, TableCell, TableRow, TableHead, TextField } from '@mui/material';


const CategoryForm=({open,close,FormNumber,setNumber})=>{

   const PostCategory=()=>{
    close(false)
   }

  


    if(!open) return null
    if(FormNumber==1) {
        return(
        <div className="Category-Screen">
            <h1>Service Category</h1>
            <div className="Category-Outer">
                <form className="Category-left" onSubmit={PostCategory}>
                    <label className="Category-Label">Category</label>
                    <input type="text" className="Category-input"/>
                    
                    <label className="Category-Label">Image</label>
                    <div className="Categoryfile-div">
                    <input type="file" className="Category-input"/>
                    </div>
                    <button type="Submit" className="Category-button">Add</button>
                </form>
                <img className="Category-Right" src="https://cdn.pixabay.com/photo/2018/07/25/15/52/design-3561661_1280.jpg"/>
            </div>
            <div >
                                <Table className='table-cat'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>SN</TableCell>
                                            <TableCell>Category</TableCell>
                                            <TableCell>Image</TableCell>
                                            <TableCell>Edit</TableCell>
                                            <TableCell>Delete</TableCell>



                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            getData.map((data, index) => (


                                                <TableRow key={index}>
                                                    <TableCell>{a++}</TableCell>

                                                    <TableCell><p>{data.catagorySetup}</p></TableCell>
                                                    <TableCell><img src={localpath + data.filename} style={{ width: "5em", height: "5em" }} alt=".........."></img> </TableCell>
                                                    <TableCell><Button data-bs-toggle="modal" onClick={() => EditFun(data._id)} data-bs-target="#EditCategory"><i class="fa-solid fa-pencil"></i></Button></TableCell>
                                                    <TableCell><Button onClick={() => delete_item(data._id)}><i class="fa-regular fa-trash-can"></i></Button></TableCell>
                                                </TableRow>


                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </div>
            </div>
        )
    }
if(FormNumber==2){
    return(
        <div className="Category-Screen">
                    <h1>Service Man</h1>
                    <div className="Table-div">
                        <table>
                            <tr className="Table-row">
                                <th>SN</th>
                                <th>Name</th>
                                <th>Contact info</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Kumar</td>
                                <td>123456</td>
                                <td>active</td>
                                <td>None</td>
                                
                                <td>
                                <div className="icons-category">
                                <button className="categoryicon-btns"><i class="fa-solid fa-pencil"></i></button>
                                <button className="categoryicon-btns"><i class="fa-solid fa-eye"></i></button>
                                <button className="categoryicon-btns"><i class="fa-solid fa-trash"></i></button>
                                </div>
                                </td>
                            </tr>
                            
                        </table>
                    </div>
                </div>
    )
}
    
    
}


export default CategoryForm