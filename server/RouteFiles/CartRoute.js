const mongoose = require('mongoose')
const express = require('express')
const app = express.Router()
const Cart = require('../models/CartModel')



app.post('/AddtoCart', async (req, res) => {
    const ProductId = req.body.ProductId
    const User = req.body.User
    const Price = req.body.Price
    const Name = req.body.Name
    try {
        const data = await Cart.find({ "ProductID": ProductId })
        console.log(data);
        if (data && data.User === User) {
            data.Quantity = data.Quantity + 1
            data.save()
            res.json({ status: 'ok', message: 'itemAdded' })
        }
        else {
            const Item = new Cart({
                ProductID: ProductId,
                ItemName: Name,
                Price: Price,
                Quantity: 1,
                User: User
            })
            await Item.save()
            res.json({ status: 'ok', message: 'Item Added' })
        }

    }
    catch (err) {
        res.json(err)
    }

}
)

app.patch('/AddQty',async(req,res)=>{
    const Id = req.body.ProductId
     
    try {
        const data = await Cart.findByIdAndUpdate(Id)
        console.log(data);
        if (data)  {
           
            data.Quantity = data.Quantity + 1
            data.save()
            res.json({ status: 'ok', message: 'patched' })
        
        }
        else{
            res.json({status:'failed'})
        }
    }
    catch(err){
        res.json(err)
    }
})

app.patch('/RemoveQty',async(req,res)=>{
    const Id = req.body.ProductId
     
    try {
        const data = await Cart.findByIdAndUpdate(Id)
        console.log(data);
        if (data)  {
           
            data.Quantity = data.Quantity - 1
            data.save()
            res.json({ status: 'ok', message: 'patched' })
        
        }
        else{
            res.json({status:'failed'})
        }
    }
    catch(err){
        res.json(err)
    }
})


app.get('/getCartItems/:UserId', async (req, res) => {
    const User = req.params.UserId
    try {
        const data = await Cart.find({ "User": User })
        res.json(data)
    }
    catch (err) {
        res.json(err)
    }
})


module.exports = app