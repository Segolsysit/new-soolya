const VendorAuth = require("../models/vendorAuthModel")
const VendorAuthRoute = require("express").Router();
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const vjwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return vjwt.sign({ id }, "soolya vendor super secret key",);
};

const createToken2 = (id) => {
    return vjwt.sign({ id }, "soolya vendor super secret key", {
        expiresIn: maxAge,
    });
};

const handleErrors = (err) => {
    let errors = { Username: "", Email: "", Password: "" };

    console.log(err);

    // if (err.email === " Email is Required"){
        
    //   errors.email = "Email is Required";
    // }

    if (err.message === "incorrect email") {
        errors.Email = "email is not exist";
    }

    if (err.message === "incorrect password") {
        errors.Password = "Invalid Password";
    }

    if (err.code === 11000) {
        errors.Email = "Email is already exist";
        return errors;
    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

VendorAuthRoute.post("/", (req, res, next) => {
    const token = req.cookies.vjwt2;
    if (token) {
        vjwt.verify(
            token,
            "soolya vendor super secret key",
            async (err, decodedToken) => {
                if (err) {
                    res.json({ status: false });
                    next();
                } else {
                    const Vendor_register_schema1 = await VendorAuth.findById(decodedToken.id);
                    if (Vendor_register_schema1) res.json({ status: true, Vendor: Vendor_register_schema1.Username });
                    else res.json({ status: false });
                    next();
                }
            }
        );
    } else {
        res.json({ status: false });
      next();
    }
})

VendorAuthRoute.post("/register", async (req, res, next) => {

    try {
    const {Username , Email, Password } = req.body;

      const Vendor_register_Schema = await VendorAuth.create({Username, Email, Password })
      const token = createToken(Vendor_register_Schema._id);
  
      res.cookie("vjwt", token, {
        withCredentials: true,
        httpOnly: false
       
      });
  
      res.status(201).json({ Vendor: Vendor_register_Schema, created: true });
    } catch (err) {
      console.log(err);
      const errors = handleErrors(err);
      res.json({ errors, created: false });
    }
  });



  VendorAuthRoute.post("/login",  async (req, res) => {
    const { Email, Password } = req.body;
    try {
      const user = await VendorAuth.login(Email, Password)
      const token = createToken2(user._id);
      res.cookie("vjwt2", token, { httpOnly: false, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id, status: true });
    } catch (err) {
      const errors = handleErrors(err);
      res.json({ errors, status: false });
    }
  });

  // Vendor_register_router.get("/fetch",async(req,res) => {
  //   const getdata= await User.find()
  //  getdata.save()
  //   res.json(getbyid)
  // })
    

  VendorAuthRoute.get("/fetch_vendor/:id",async(req,res) => {
    const getbyid = await VendorAuth.findById(req.params.id)
    res.json(getbyid)
  })



  VendorAuthRoute.post("/forgot_password", async (req, res , next) => {
    const { Email } = req.body;
    try {
      const oldUser = await VendorAuth.findOne({ Email });
      if (!oldUser) {
        console.log("user not exist");
        return res.json({ status: "User Not Exists!!" });
      }
      const secret = "soolya sheth super secret key" + oldUser.Password;
      const token = vjwt.sign({ Email: oldUser.Email, id: oldUser._id }, secret, {
        expiresIn: "5m",
      });
      const link = `http://localhost:3001/vendor_register/reset-password/${oldUser._id}/${token}`;
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host:  "smtp.ethereal.email",
        port: 587,
        secure: true,
        auth: {
          user: 'senthil.segolsys@gmail.com',
          pass: 'hbdmsjcdmqfdpzwn'
        }
      });

      const mailOptions = {
        from: 'senthil.segolsys@gmail.com', // your Gmail email address
        to: oldUser.Email,
        subject: 'Reset-Password',
        text: link
      };

      try{
        await transporter.sendMail(mailOptions);
        res.json({status:'Email sent successfully'});
      }catch(err){
        console.log(err);
        res.status(500).send('Error sending email');
      }

      console.log(link);
      }catch(err){
        console.log(err);
      }
  

    }
      );
    
      VendorAuthRoute.get("/reset-password/:id/:token",async(req, res , next) => {
        const { id, token } = req.params;
        console.log(req.params);
        // res.send("Done")
        const oldUser = await VendorAuth.findOne({ _id: id });
        if (!oldUser) {
          return res.json({ status: "User Not Exists!!" });
        }
        const secret = "soolya sheth super secret key" + oldUser.Password;
        try {
          const verify = vjwt.verify(token, secret);
          res.render( "main" ,{Email:verify.Email,status:"Not Verified"} );
        } catch (error) {
          console.log(error);
          res.send("Not Verified");
        }

        next()
      });

      VendorAuthRoute.post("/reset-password/:id/:token",async(req, res) => {
        const { id, token } = req.params;

        const {Password} = req.body;
        // console.log(req.params);
        // res.send("Done")
        const oldUser = await VendorAuth.findOne({ _id: id });
        if (!oldUser) {
          return res.json({ status: "User Not Exists!!" });
        }
        const secret = "soolya sheth super secret key" + oldUser.Password;
        try {
          console.log(Password);
          const verify = vjwt.verify(token, secret);
          const salt = await bcrypt.genSalt(10);
          const  encryptedpassword = await bcrypt.hash(Password, salt);

          await Vendor_register_schema.updateOne(
          {
            _id:id
          },
          { 
           $set:{
            Password:encryptedpassword
          }
          }
          )

            // res.json({status:"password updated"})
            res.render( "main" ,{Email:verify.Email,status:"verified"} );


        } catch (error) {
          console.log(error);
          return res.json({status:"Something went wrong"});
        }
      });

    
module.exports = VendorAuthRoute;