const Application_Router = require("express").Router();
const Applicationschema = require("../models/applicationModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");




const Storage=multer.diskStorage({
    destination:(req,file,cb)=>{

cb(null , "files&img")

    },
    filename:(req,file,cb)=>{
          cb(null,file.fieldname + "_"+Date.now() + path.extname(file.originalname))  
    }
})
const fileFilter = (req, file, cb) => {
    const acceptFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (acceptFileTypes.includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const upload = multer({
    storage:Storage,
    fileFilter: fileFilter
})


Application_Router.post("/Applications",upload.single("file"),async(req,res) => {
    const objects = new Applicationschema({
        FirstName:req.body.FirstName,
        LastName:req.body.LName,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        Email:req.body.Email,
        Location:req.body.Location,
        Address:req.body.Address,
        Category:req.body.Category,
        Phone:req.body.Phone
       })
       await objects.save();
       res.status(200).json({message:"Uploaded Successfully",objects})
})

Application_Router.get("/vendor_application",async(req,res) => {
    const vendorData = await Applicationschema.find();
     res.json(vendorData)
 })
 
 Application_Router.get("/fetchVendor_id/:id",async(req,res) => {
    const vendorData = await Applicationschema.findById(req.params.id);
     res.json(vendorData)
 })
module.exports=Application_Router;