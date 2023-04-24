const mongoose = require("mongoose");

const Applicationschema = mongoose.Schema({
    FirstName: {
        type: String,

    },

    LastName: {
        type: String,

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
   


});

module.exports = mongoose.model("vendorApplication" , Applicationschema)