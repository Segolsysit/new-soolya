// server/routes/api.js
const twilioOtpRoute = require("express").Router();
const OtpSchema = require("../models/twilioSchema");
const jwt = require('jsonwebtoken');
const secret = 'soolya secret magic key';

const twilio = require('twilio');
const accountSid = 'ACa28711fdf748fc911c31dc44314d2f4a'
const authToken = '4eaba296783ee3a543135c4fc4b46035'
const twilioNumber = "+18622929576"

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
twilioOtpRoute.post('/verify-otp', async (req, res) => {
  const { mobile, otp } = req.body;

  try {
    const storedOTP = await OtpSchema.findOne({ mobile });

    if (!storedOTP) {
      return res.status(404).json({ message: 'OTP not found' });
    }

    const now = new Date();
    if (now > storedOTP.expiresAt) {
      await storedOTP.remove();
      return res.status(400).json({ message: 'OTP expired' });
    }

    if (storedOTP.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    await storedOTP.remove();
    const token = jwt.sign({ mobile }, secret);
    res.cookie("otp_Token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    return res.status(200).json({ message: 'OTP verified successfully!' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});



module.exports = twilioOtpRoute;