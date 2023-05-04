const mongoose = require("mongoose");

const Applicationschema = mongoose.Schema({
    FirstName: {
        type: String,

    },

    LastName: {
        type: String,

    },
    Email: {
        type:String,
    },
    Location: {
        type:String,
    },
    Address: {
        type:String,
    },
    Category: {
        type:String,
    },
    Phone:{
        type:Number,
    },
    mimetype: {
        type: String,

    },
    filename: {
        type: String,

    },
    path: {
        type: String,

    },
    size: {
        type: Number,

    }
   


});

module.exports = mongoose.model("vendorApplication" , Applicationschema)