const bookingdetails_router = require("express").Router();
const {bookingdetails_Model,pendingOrders_Model} = require("../models/bookingdetails_schema");
// const  objectId = require('mongoose').isObjectIdOrHexString()
// const { ObjectId } = require('mongodb');

// An existing valid ObjectId value
// const existingId = new ObjectId('6147dd3f670d952b7a8cfc90');

bookingdetails_router.post("/new_booking", async (req, res) => {

    const deatails = new bookingdetails_Model({
        user_email:req.body.user_email,
        address: req.body.address,
        street: req.body.street,
        city: req.body.city,
        zip: req.body.zip,
        person: req.body.person,
        number: req.body.number,
        Service: req.body.Service,
        Category: req.body.Category,
        price: req.body.price,
        paymentMethod:req.body.paymentMethod
    })
    await deatails.save();
    res.status(200).json({message:"Uploaded Successfully",deatails})
})

bookingdetails_router.post("/pending_orders/:id", async (req, res) => {
    
    const deatails = new pendingOrders_Model({
        vendor_email:req.body.vendor_email,
        address: req.body.address,
        street: req.body.street,
        city: req.body.city,
        zip: req.body.zip,
        person: req.body.person,
        number: req.body.number,
        Service: req.body.Service,
        Category: req.body.Category,
        price: req.body.price,
        paymentMethod:req.body.paymentMethod
    })

   await deatails.save();
    res.status(200).json({message:"Uploaded Successfully",deatails})

    

})

bookingdetails_router.get("/pending_booking_data/:vendor_email",async(req,res)=>{
    const vendor_email = req.params.vendor_email;
    const item_by_id = await pendingOrders_Model.find({vendor_email:vendor_email})
    res.json(item_by_id )
})

bookingdetails_router.get("/booking_data",async(req,res)=>{
    const booking_data = await bookingdetails_Model.find()
    res.json(booking_data)
})

// bookingdetails_router.get("/booking_data/:id",async(req,res)=>{
//     const booking_data = await bookingdetails_schema.find(req.params.id)
//     res.json(booking_data)
// })

bookingdetails_router.get("/booking_data/:user_email",async(req,res)=>{
    const user_email = req.params.user_email;
    const item_by_id = await bookingdetails_Model.find({user_email:user_email})
    res.json(item_by_id )
})

bookingdetails_router.delete("/delete_item/:id",async(req,res)=>{
    await bookingdetails_Model
    .findByIdAndDelete(req.params.id)
    return res.json('Deleted')
})

module.exports = bookingdetails_router;