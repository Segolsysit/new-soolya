const mongoose = require("mongoose");


const bookingdetailSchema =new mongoose.Schema({
    user_email:{
        type:String
    },
    address:{
        type:String
    },
    street:{
        type:String
    },
    city:{
        type:String
    },
    zip:{
        type:Number
    },
    person:{
        type:String
    },
    number:{
        type:Number
    },
    Service:{
        type:String
    },
    Category:{
        type:String
    },
    price:{
        type:Number
    },
    paymentMethod:{
        type:String
    }
})

const pendingOderSchema =new mongoose.Schema({
    vendor_email:{
        type:String
    },
    address:{
        type:String
    },
    street:{
        type:String
    },
    city:{
        type:String
    },
    zip:{
        type:Number
    },
    person:{
        type:String
    },
    number:{
        type:Number
    },
    // Service:{
    //     type:String
    // },
    Category:{
        type:String
    },
    price:{
        type:Number
    },
    paymentMethod:{
        type:String
    }
})

const pendingOders_schema = mongoose.model("pendingOders_schema", pendingOderSchema)
const bookingdetails_schema = mongoose.model("bookingdetails_schema", bookingdetailSchema)

module.exports = {
    pendingOders_schema,
    bookingdetails_schema
}