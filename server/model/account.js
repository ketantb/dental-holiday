const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  email: String,
  otp: Number,
  password: String,
  travelDetails: {},
  treatmentDetails: {},
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("account", accountSchema);
