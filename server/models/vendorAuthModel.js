const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

    const VendorAuth = new mongoose.Schema({
        Username:{
            type:String   
        },
        Email:{
            type:String,
            unique: true
        },
        Password:{
            type:String
        },
        Phonenumber:{
            type:Number
        }
    })

  

module.exports = mongoose.model("VendorAuth" , VendorAuth)