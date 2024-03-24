const { times } = require("lodash");
const mongoose = require("mongoose");

const cryptoPriceSchema = new mongoose.Schema({
  cryptoId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CryptoPrice", cryptoPriceSchema);
