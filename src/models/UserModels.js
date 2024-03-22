const mongoose = require("mongoose");

/*
Module 01 – Login and Signup
Name - Last Name
Email
Username 
Password
*/

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please add name"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Please add name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add Email Address"],
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Please add username"],
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Please add password"],
      min: 6,
      max: 100,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
