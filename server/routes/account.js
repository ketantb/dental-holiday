require("dotenv").config();
const express = require("express");
const router = express.Router();
const Account = require("../model/account");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const accountMiddleware = require("../midleware/account");

//send email of booking confirmation
router.post("/send-email", async (req, resp) => {
  const min = 1000; // Minimum 4-digit number (inclusive)
  const max = 9999; // Maximum 4-digit number (inclusive)
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  try {
    const findAccount = await Account.findOne({ email: req.body.email });
    if (findAccount) {
      return resp.json({ success: false, message: "Email already registered" });
    }
    const otp = randomNumber;
    const newData = await Account.create({ ...req.body, otp: otp });

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    let mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: req.body.email,
      subject: "OTP verificaion for Dental Mart",
      text: `
            Hello from Dental Holidays,
            A sign in attempt requires further verification because we did not recognise your device. 
            To complete the sign in, enter the verification code.
            Your verification code is : ${otp}
            Thanks.
            `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return resp.status(500).json({ error: error });
      } else {
        console.log("Email sent: " + info.response);
        return resp
          .status(200)
          .json({ success: true, message: info.response, newData: newData });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

//verify otp
router.post("/verify-otp", async (req, resp) => {
  try {
    const findAccount = await Account.findOne({ email: req.body.email });
    if (findAccount) {
      if (findAccount.otp === req.body.otp) {
        resp.json({ success: true, message: "OTP verified successfully" });
      } else {
        resp.json({ success: false, message: "Invalid OTP" });
      }
    } else {
      resp.json({
        success: false,
        message: "Cannot find account with this email",
      });
    }
  } catch (err) {
    resp.json({ success: false, message: err.message });
  }
});
module.exports = router;
