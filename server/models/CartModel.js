const mongoose=require('mongoose')




const CartSchema=new mongoose.Schema({
    ProductID:String,
    ItemName:String,
    Price:Number,
    User:String,
    Quantity:Number
})




module.exports=mongoose.model("Cart",CartSchema)