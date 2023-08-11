require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const Account = require("../model/account");

// login
router.post("/account-login", async (req, resp) => {
  console.log(req.body);
  try {
    const findAccount = await Account.findOne({ email: req.body.email });
    if (findAccount) {
      const matchPassword = await bcrypt.compare(
        req.body.password,
        findAccount.password
      );
      console.log("Password match=>", matchPassword);
      if (!findAccount.isVerified) {
        resp.json({
          success: false,
          message:
            "Your account is not verified. Please go to signup page and verify your account",
        });
      } else if (findAccount.isVerified && !matchPassword) {
        resp.json({ success: false, message: "Incorrect password" });
      } else if (findAccount.isVerified && matchPassword) {
        // generate jwt token
        const dataToGenerateToken = {
          _id: findAccount._id,
        };
        const token = await jwt.sign(
          dataToGenerateToken,
          process.env.JWT_SECRET_KEY,
          { expiresIn: "72h" }
        );
        resp.json({ success: true, message: "Login successful", token: token });
      }
    } else {
      resp.json({ success: false, message: "Email not registered" });
    }
  } catch (err) {
    resp.json({ success: false, message: err.message });
  }
});

//send email with OTP
function sendOtpMail(email, otp) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "OTP verificaion for Dental Holiday",
    text: `
                Hello from Dental Holiday,
                Verification Code=${otp}
                Thanks.
                `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return { error: error };
    } else {
      console.log("Email sent: " + info.response);
      return { success: true, message: info.response };
    }
  });
}

//ROUTE TO GENERATE OTP AND SEND IT TO Account NUMBER THROUGH EMAIL
router.post("/send-email", async (req, res) => {
  console.log(req.body);
  try {
    const { email } = req.body;
    const emailFound = await Account.findOne({ email });
    if (emailFound) {
      if (!emailFound.isVerified) {
        console.log("emailFoundButNotVerified => ", emailFound);
        sendOtpMail(emailFound.email, emailFound.otp);
        return res.status(200).json({
          success: false,
          message:
            "Account found but not verified. OTP has been resent. Please check your email",
        });
      } else if (emailFound.isVerified) {
        console.log("Email already in use. Try to login");
        return res.status(200).json({
          success: false,
          message: "Email already in use. Try to login",
        });
      }
    } else {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const min = 1000; // Minimum 4-digit number (inclusive)
      const max = 9999; // Maximum 4-digit number (inclusive)
      const randomNumberForOtp =
        Math.floor(Math.random() * (max - min + 1)) + min;
      const accountData = {
        email,
        password: hashPassword,
        otp: randomNumberForOtp,
      };
      const newAccount = await Account.create(accountData);
      sendOtpMail(email, randomNumberForOtp);
      return res.status(200).json({
        success: true,
        message: "created account and otp sent successfully",
        newAccount,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//verify otp
router.post("/verify-otp", async (req, resp) => {
  console.log(req.body);
  try {
    const findAccount = await Account.findOne({ email: req.body.email });
    if (findAccount) {
      if (findAccount.otp === Number(req.body.otp)) {
        findAccount.isVerified = true;
        findAccount.save();
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

// add details e.g travel , treatment , date details
router.put("/account-form-details", async (req, resp) => {
  console.log(req.body);
  try {
    const findAccount = await Account.findOne({ email: req.body.email });
  } catch (err) {
    resp.json({ success: false, message: err.message });
  }
});

module.exports = router;
