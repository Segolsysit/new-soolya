const mongoose=require('mongoose')


const Schema=new mongoose.Schema({
    Name:String,
    Job:String,
    Phone:Number,
    Claimable:Number,
    Request:Number,
    VendorId:String
})


module.exports=mongoose.model('request',Schema)