/* this code is to fetch the current price of Bitcoin (BTC) as an 
example. You can extend this service to fetch prices for other cryptocurrencies or to include additional 
information as needed. */

const axios = require("axios");
const CryptoPrice = require("../models/CryptoPriceModel");

const BASE_URL = "https://api.coingecko.com/api/v3";

//cryptoId = "bitcoin"
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

    // Iterate over each cryptocurrency and insert a new document in the database
    // const cryptoPriceList = Object.entries(response.data).map(([id, data]) => {
    //   const cryptoPrices = new CryptoPrice({
    //     cryptoId: id,
    //     price: data.usd,
    //     updatedDate: new Date(),
    //   });
    //   return cryptoPrices.save(); // Save the new document
    // });

    // Wait for all save operations to complete
    // console.log("priceSavePromises..........", cryptoPriceList);
    // await Promise.all(cryptoPriceList);
    // console.log("response.data[cryptoId].usd>>>>>>>>", response.data);
    //return response.data;

    //return response.data[cryptoId].usd;
  } catch (error) {
    console.error(`Failed to fetch prices: ${error.message}`);
    throw error;
  }
};

module.exports = {
  getCryptoPrice,
};
