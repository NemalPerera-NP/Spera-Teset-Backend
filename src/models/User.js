const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
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
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Crypto",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
