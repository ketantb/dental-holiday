const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
const path = require("path");
const port = process.env.PORT || 4000;

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(require("./routes/account"));

app.get("/", (req, res) => {
  try {
    res.send("This is Dental Holiday!");
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(port, () => {
      console.log(`Node api is running on port ${port}`);
      console.log("welcome to dental holiday");
    });
  })
  .catch((error) => {
    console.log(error);
  });
