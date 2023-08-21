const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  email: String,
  otp: Number,
  password: String,
  appoitmentDetails: [],
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("account", accountSchema);
