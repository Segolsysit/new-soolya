const mongoose = require('mongoose')
const express = require('express')
const app = express.Router()
const Cart = require('../models/CartModel')



app.post('/AddtoCart', async (req, res) => {
    const ProductId = req.body.ProductId
    const User = req.body.UserID
    const Price = req.body.Price
    const Name = req.body.Name
    const data = await Cart.find({ "ProductID": ProductId })
    const UserData=data.find(val=>val['User']===User)
    if (data) {
        if(UserData)
        {
            try {
            console.log(data);
            UserData.Quantity = UserData.Quantity + 1
            await UserData.save()
            res.json({ status: 'ok', message: 'itemAdded' })
        }
        catch (error) {
            res.json({ status: 'failed', message: 'Failed in data' })
        }
    }
    else {
        try {
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
        catch (error) {
            res.json({ status: 'failed', message: error })
        }
    }

        
    }
    else {
        try {
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
        catch (error) {
            res.json({ status: 'failed', message: error })
        }

    }




}
)

app.patch('/AddQty', async (req, res) => {
    const Id = req.body.ProductId

    try {
        const data = await Cart.findByIdAndUpdate(Id)
        console.log(data);
        if (data) {

            data.Quantity = data.Quantity + 1
            data.save()
            res.json({ status: 'ok', message: 'patched' })

        }
        else {
            res.json({ status: 'failed' })
        }
    }
    catch (err) {
        res.json(err)
    }
})

app.patch('/RemoveQty', async (req, res) => {
    const Id = req.body.ProductId

    try {
        const data = await Cart.findByIdAndUpdate(Id)
        console.log(data);
        if (data) {

            data.Quantity = data.Quantity - 1
            data.save()
            res.json({ status: 'ok', message: 'patched' })

        }
        else {
            res.json({ status: 'failed' })
        }
    }
    catch (err) {
        res.json(err)
    }
})


app.delete('/deleteCartItem/:UserId', async (req, res) => {
    const UserID = req.params.UserId
    try {
        await Cart.deleteMany({ "User": UserID })
        res.json({ status: 'ok' })
    }
    catch (error) {
        res.json(error)
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