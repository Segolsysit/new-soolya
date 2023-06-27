const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

    const VendorAuth = new mongoose.Schema({
        FirstName:{
            type:String
        },
        LName:{
            type:String
        },
        Location:{
            type:String
        },
        Email:{
            type:String,
            unique:true
        },
        Phone:{
            type:Number,
            unique:true
        },
        Address:{
            type:String,
        },
        Gender:{
            type:String,
        },
        Language:{
            type:String,
        },
        DOB:{
            type:Date,
        },
        AAdhar:{
            type:Number,
        },
        AccNo:{
            type:Number,
        },
        BnkName:{
            type:String,
        },
        Ifsc:{
            type:String,
        },
        Education:{
            type:String,
        },
        JobTitle:{
            type:String,
        },
        WorkExp:{
            type:String,
        },
        Zone:{
            type:String,
        },
        AltPH:{
            type:Number,
        },
        KnownL:{
            type:String,
        },
        SkillExp:{
            type:String,
        },
        Files: [{
            fieldName: String,
            filename:String,
            originalName: String,
            mimeType: String,
            path: String,
            
          }],
        

    })

  

module.exports = mongoose.model("VendorAuth" , VendorAuth)