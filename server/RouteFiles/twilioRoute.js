// server/routes/api.js
const twilioOtpRoute = require("express").Router();
const OtpSchema = require("../models/twilioSchema");
const jwt = require('jsonwebtoken');
const secret = 'soolya secret magic key';

const twilio = require('twilio');

const accountSid = 'AC42a05923ee73112583a32c130ba44de1'
const authToken = '007915eb4f9c5452a5a836fd6a7e21aa'
const twilioNumber = "+16073604744"

const client = twilio(accountSid, authToken);

// Generate a 6-digit random OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// Send OTP via SMS
twilioOtpRoute.post('/send-otp', async (req, res) => {
  const { mobile } = req.body;
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);


  try {
    const OTP =  new OtpSchema({
        mobile:req.body.mobile,
        otp:otp,
        expiresAt
    })
     client.messages.create({
      body: `Your OTP is ${otp}`,
      from: twilioNumber,
      to: mobile
    });

    const timer = setInterval(async () => {
      const now = new Date();
      if (now >= OTP.expiresAt) {
        await OTP.remove();
        clearInterval(timer);
      }
    }, 15000);
  

    await OTP.save()
    res.status(200).json({ otp, OTP});
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sending OTP');
  }
});


// Verify OTP
twilioOtpRoute.post('/verify-otp',async(req, res) => {
  const { mobile, otp } = req.body;

  try {
    const ven = await OtpSchema.findOne({ mobile:mobile });
    
    if (!ven) {
      return res.status(404).json({ message: "OTP expired" });
    }
    

  
    if (otp === ven.otp) {
    // Generate a JWT token and send it back to the client
    const token = jwt.sign({ mobile }, secret);
    res.cookie("otp_Token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(200).json({ token });
  } else {
    res.status(401).send('Invalid OTP');
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

  const correctOTP = '123456'; // This is just an example value, you should get it from your database

 
});


module.exports = twilioOtpRoute;