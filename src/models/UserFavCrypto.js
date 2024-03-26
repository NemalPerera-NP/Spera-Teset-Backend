const mongoose = require("mongoose");

const userFavCryptoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
      unique: true, // Ensure one document per user
    },
    cryptoIds: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserFavorites", userFavCryptoSchema);
