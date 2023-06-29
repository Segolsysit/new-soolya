const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

    const VendorAuth = new mongoose.Schema({
        Username:String,
        Email:String,
        Password:String,
        Phonenumber:Number
    })

  

module.exports = mongoose.model("VendorAuth" , VendorAuth)