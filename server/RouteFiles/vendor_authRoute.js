const VendorAuth = require("../models/vendorAuthModel")
const VendorAuthRoute = require("express").Router();
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const vjwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;


// const auth = (req, res, next) => {

//     }
//     );
//   }


//   } 

// Protected route that can only be accessed by authenticated users
VendorAuthRoute.get('/', (req, res) => {
  const token = req.cookies.venjwt;
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  else {
    vjwt.verify(token, "soolya vendor super secret key",
      async (err, decodedToken) => {
        if (err) {
          res.json({ status: false });
          next();
        }
        else {
          const user = await VendorAuth.findById(decodedToken.id);
          if (user) res.json({ status: true, users: user.Username });
          else res.json({ status: false });

        }
      })
  }
});

VendorAuthRoute.post("/register", async (req, res, next) => {

  try {
    const { Username, Email, Password, Phonenumber,Location,Gender,Language,DOB,AAdhar,AccNo,BnkName,Ifsc,Education,JobTitle,WorkExp,Zone,AltPH,KnownL,Files } = req.body;
  
    const hashedPassword = await bcrypt.hash(Password, 10);
  
    const isEmailExists = await VendorAuth.findOne({ Email });
  
    if (isEmailExists) {
      console.log("Email is already registered");
      return res.json({ status: "error", message: "Email is already registered" });
    }
  
    const user = await VendorAuth.create({
      Username,
      Email,
      Password: hashedPassword,
      Phonenumber,
      Location,
      Gender,
      Language,
      DOB,
      AAdhar,
      AccNo,
      BnkName,
      Ifsc,
      Education,
      JobTitle,
      WorkExp,
      Zone,
      AltPH,
      KnownL,
      Files
    });
  
    await user.save();
  
    res.json({ status: "success", message: "Signup successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
})  



VendorAuthRoute.post("/login", async (req, res) => {
  const { Email, Password } = req.body;
  try {

    const user = await VendorAuth.findOne({ Email });

    if (!user) {
      return res.json({ status: "error", message: "Email Not Exist" });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);

    if (isPasswordValid) {
      const token = vjwt.sign({ id: user._id }, "soolya vendor super secret key");
      res.cookie("venjwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id, status: true, token:token });

    }
    else {

      return res.json({ status: "error", message: "Invalid password" });

    }

  } catch (err) {
    console.log(err);
    res.json({ err, status: false });
  }

});

VendorAuthRoute.get("/fetch_vendor", async (req, res) => {
  const getbyid = await VendorAuth.find()
  res.json(getbyid)
})

VendorAuthRoute.get("/fetch_vendor/:id", async (req, res) => {
  const getbyid = await VendorAuth.findById(req.params.id)
  res.json(getbyid)
})

// VendorAuthRoute.get("/fetch_vendor_bynum/:Phonenumber",async(req,res) => {
//   const Phonenumber=parseInt(req.params.Phonenumber)
//   const getbyNum = await VendorAuth.find({"Phonenumber":Phonenumber})
//   res.json(getbyNum)
// })

VendorAuthRoute.get("/fetch_vendor/search", async (req, res) => {
  const getbyid = await VendorAuth.find()
  res.json(getbyid)
})


VendorAuthRoute.delete("/delete_item/:id", async (req, res) => {
  await VendorAuth.findByIdAndDelete(req.params.id)
  return res.json('Deleted')
})



VendorAuthRoute.post("/forgot_password", async (req, res, next) => {
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
    const link = `http://localhost:3001/vendor_Auth/reset-password/${oldUser._id}/${token}`;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.ethereal.email",
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

    try {
      await transporter.sendMail(mailOptions);
      res.json({ status: 'Email sent successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).send('Error sending email');
    }

    console.log(link);
  } catch (err) {
    console.log(err);
  }


}
);

VendorAuthRoute.get("/reset-password/:id/:token", async (req, res, next) => {
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
    res.render("main", { Email: verify.Email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }

  next()
});

VendorAuthRoute.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;

  const { Password } = req.body;
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
    const encryptedpassword = await bcrypt.hash(Password, salt);

    await VendorAuth.updateOne(
      {
        _id: id
      },
      {
        $set: {
          Password: encryptedpassword
        }
      }
    )

    // res.json({status:"password updated"})
    res.render("main", { Email: verify.Email, status: "verified" });


  } catch (error) {
    console.log(error);
    return res.json({ status: "Something went wrong" });
  }
});


VendorAuthRoute.patch('/Edit/:id',async(req,res)=>{
  const id=req.params.id
   const data= await VendorAuth.findByIdAndUpdate(id,{
    Username:req.body.Name,
    Email:req.body.mail,
    Phonenumber:req.body.Phone,
    Location:req.body.Location,
    Gender:req.body.Gender,
    Language:req.body.Language,
    DOB:req.body.DoB,
    AAdhar:req.body.Aadhar,
    AccNo:req.body.Accn,
    BnkName:req.body.BnkName,
    Ifsc:req.body.IFSC,
    Education:req.body.Education,
    JobTitle:req.body.JobTitle,
    WorkExp:req.body.WorkExp,
    Zone:req.body.Zone,
    AltPH:req.body.AltPhone,
    KnownL:req.body.Lang,
    Files:req.body.Files
  })
  try{
    await data.save()
    .then(res.json({status:'ok',data}))
  }
  
  
  catch(error){
    res.json({status:'error',error})
  }

  
})


module.exports = VendorAuthRoute;