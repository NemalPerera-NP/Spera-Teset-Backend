/* this code is to fetch the current price of Bitcoin (BTC) as an 
example. You can extend this service to fetch prices for other cryptocurrencies or to include additional 
information as needed. */

const axios = require("axios");
const CryptoPrice = require("../models/CryptoPriceModel");

const BASE_URL = "https://api.coingecko.com/api/v3";

//fetch crypto price form coingecko.com and save it in the DB
const getCryptoPrice = async (
  cryptoIds = ["bitcoin", "ethereum", "ripple", "cardano", "solana", "dogecoin"]
) => {
  try {
    const ids = cryptoIds.join(",");

    const response = await axios.get(`${BASE_URL}/simple/price`, {
      params: {
        ids,
        vs_currencies: "USD",
      },
    });

    const cryptoPriceList = Object.entries(response.data).map(([id, data]) => {
      return new CryptoPrice({
        cryptoId: id,
        price: data.usd,
        updatedDate: new Date(),
      }).save();
    });

    await Promise.all(cryptoPriceList);
    console.log("Crypto prices updated successfully");
  } catch (error) {
    console.error(`Failed to fetch prices: ${error.message}`);
    throw error;
  }
};

//service to get all the unique crypto ids from the data base
const getUniqueCryptoId = async () => {
  try {
    const uniqueCryptoIds = await CryptoPrice.distinct("cryptoId");
    return uniqueCryptoIds;
  } catch (error) {
    console.error("Error fetching unique cryptoIds:", error);
    throw error;
  }
};

module.exports = {
  getCryptoPrice,
  getUniqueCryptoId,
};
