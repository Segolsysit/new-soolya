import React, { useEffect, useState } from 'react'
import { Header, MenuBar } from '../objects/objects';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import'./Cart.css'



const Cart=()=>{
  const Token=localStorage.getItem("ty")
  const decodedToken=Token?jwtDecode(Token):null
  const UserId=Token?decodedToken.id:null
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  const [CartItems,setCartItems]=useState([])
  const [Total,setTotal]=useState(0)


  const[Address,setAddress]=useState("")
  const[street,setStreet]=useState("")
  const[city,setCity]=useState("")
  const[Pin,setPin]=useState("")
  const[Phno,setPhno]=useState("")
  const[Person,setPerson]=useState("")
  const[Pay,setPay]=useState("")
  const[User,setUser]=useState([])

  const getUser = () => {
        // console.log(userId);
        axios.get(`http://localhost:3001/authUser/fetch_email/${UserId}`)
            .then((res) => {
                console.log(res.data);
                setUser(res.data)
            })
    }

     useEffect(() => {
        getUser()
    }, [])

    const TotalItems=CartItems?CartItems.map(item=>{return {"Name":item.ItemName,"Price":item.Quantity*item.Price}}):null



    const PostOrder=async()=>{
         await axios.post("http://localhost:3001/booking_api/new_booking_cart", {
            Cart:TotalItems,
            user_email: User.email,
            address:Address,
            street:street,
           city:city,
            zip:Pin,
            person:Person,
            number:Phno,
            // Service: booking_service.Service,
            
            paymentMethod: Pay
        }
        )
        .then(() => {
            axios.post("http://localhost:3001/vendororder_api/new_booking_cart", {
            Cart:TotalItems,
            user_email: User.email,
            address:Address,
            street:street,
            city:city,
            zip:Pin,
            person:Person,
            number:Phno,
            // Service: booking_service.Service,
            
            paymentMethod: Pay
            })
        })
    }



  console.log(TotalItems);

  useEffect(()=>{
    CartItems.map(item=>{
      const tot=item.Quantity*item.Price
      setTotal(Total+tot)

    })
  },[CartItems])
  useEffect(()=>{
    console.log(Total);

  },[Total])


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
  };




  const getData=async()=>{
    if(Token){
      await axios.get(`http://localhost:3001/Cart/getCartItems/${UserId}`)
      .then(res=>setCartItems(res.data))
    }
  }

  useEffect(()=>{
    getData()
  },[])


  const AddItem=async(id)=>{
    await axios.patch("http://localhost:3001/Cart/AddQty",{
      ProductId:id,
    })
    .then((res)=>{
      if(res.data.status==='ok'){
        getData()
      }
    })
  }

  const RemoveItem=async(id)=>{
    await axios.patch("http://localhost:3001/Cart/RemoveQty",{
      ProductId:id,
    })
    .then((res)=>{
      if(res.data.status==='ok'){
        getData()
      }
    })
  }
    

    
    return(
        <div>
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Please fill the form
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Address
          </Typography>
          <input onChange={(e)=>setAddress(e.target.value)}/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            street
          </Typography>
          <input onChange={(e)=>setStreet(e.target.value)}/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            City
          </Typography>
          <input onChange={(e)=>setCity(e.target.value)}/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Pincode
          </Typography>
          <input onChange={(e)=>setPin(e.target.value)}/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Number
          </Typography>
          <input onChange={(e)=>setPhno(e.target.value)}/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Contact person
          </Typography>
          <input onChange={(e)=>setPerson(e.target.value)}/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Payment method
          </Typography>
          <select onChange={(e)=>setPay(e.target.value)}>
            <option>Select</option>
            <option>cashOnDelivery</option>
            <option>onlinePayment</option>
          </select>
          <br></br>
          <button onClick={PostOrder}>Submit</button>
        </Box>
      </Modal>
            <Header/>
            <MenuBar/>
            <div style={{display:'flex',flexDirection:'column',gap:'50px',alignItems:'center'}}>
            <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead >
          <TableRow>
            <TableCell style={{backgroundColor:'grey',color:'white',fontWeight:800}} align="center">Item</TableCell>
            <TableCell style={{backgroundColor:'grey',color:'white',fontWeight:800}} align="center">Qty</TableCell>
            <TableCell style={{backgroundColor:'grey',color:'white',fontWeight:800}} align="center">Price</TableCell>
            <TableCell style={{backgroundColor:'grey',color:'white',fontWeight:800}} align="center">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(CartItems)&&CartItems.map((row) => (
            <TableRow
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.ItemName}</TableCell>
              <TableCell align="center" style={{display:'flex',justifyContent:'space-between'}}><button className='Increment_btn' onClick={()=>RemoveItem(row._id)}>-</button>{row.Quantity}<button className='Increment_btn' onClick={()=>AddItem(row._id)}>+</button></TableCell>
              <TableCell align="center">{row.Price}</TableCell>
              <TableCell align="center">{row.Quantity*row.Price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <button style={{backgroundColor:'dodgerblue',width:'fit-content',color:'white',borderRadius:'10px',border:'none',padding:'3px 8px 3px 8px',fontWeight:600}} onClick={handleOpen}>Place Order</button>
    </div>

        </div>
    )
}


export default Cart