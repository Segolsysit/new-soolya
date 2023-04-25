import { Button, Table, TableBody, TableCell, TableRow, TableHead,Switch } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';


const RecivedApplication = ({formNumber}) => {
    let serialNumber=1;
const [application,setApplication] = useState()
    useEffect(() => {
        axios.get("http://localhost:3001/vendor_Applications/vendor_application").then((res) => {
            console.log(res.data);
            setApplication(res.data)
        })
    },[])

    if(formNumber === 10){
        return(
            <div>
                <h5>RecivedApplications</h5>

                <div >
                                <Table className='table-cat'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>SN</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Contact</TableCell>
                                            <TableCell>Address</TableCell>
                                            <TableCell>Location</TableCell>
                                            <TableCell>View</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {application.map((data) =>
                                            <TableRow >
                                                <TableCell>{serialNumber++}</TableCell>
                                                <TableCell>{data.FirstName} {data.LastName}</TableCell>
                                                <TableCell>
                                                    <p>{data.Email}</p></TableCell>
                                                <TableCell><p>{data.Phone}</p></TableCell>
                                                <TableCell><p>{data.Address}</p></TableCell>
                                                   <TableCell>
                                                   <p>{data.Location}</p>
                                                   </TableCell>
                                                <TableCell>
                                                  <Button type="button" data-toggle="modal" data-target="#exampleModalCenter"
                                                    ><i class="fa-solid fa-eye"></i></Button>
                                                </TableCell>
                                            </TableRow>
                                        )}



                                    </TableBody>
                                </Table>
                            </div>
            </div>
        )
    }
    else return null;
    
   
}

export default RecivedApplication;