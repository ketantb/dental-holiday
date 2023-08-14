const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  email: String,
  otp: Number,
  password: String,
  travelDetails: {
    state: String,
    city: String,
  },
  treatmentDetails: {
    numTravelers: Number,
    numPatients: Number,
    treatmentType: String,
    treatmentDate: String,
  },
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("account", accountSchema);
