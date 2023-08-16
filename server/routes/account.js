require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
Account = require("../model/account");
const accountMiddleware = require("../midleware/account");

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

// add details e.g travel , treatment , date details
router.put("/account-form-details", accountMiddleware, async (req, resp) => {
  const accountId = req.accountId;
  const modifiedTreatmentDate = moment(
    req.body.treatmentDetails.treatmentDate
  ).format("DD/MM/YYYY");
  try {
    const findAccount = await Account.findOne({ _id: accountId });
    if (findAccount) {
      const updateData = await Account.findByIdAndUpdate(accountId, {
        travelDetails: req.body.travelDetails,
        treatmentDetails: req.body.treatmentDetails,
      });
    }
    const updatedAccount = await Account.findOne({ _id: accountId });
    console.log(updatedAccount);
    resp.json({
      success: false,
      message: "Details saved successfully",
      updatedAccount,
    });
  } catch (err) {
    resp.json({ success: false, message: err.message });
  }
});

module.exports = router;
