/* this code is to fetch the current price of Bitcoin (BTC) as an 
example. You can extend this service to fetch prices for other cryptocurrencies or to include additional 
information as needed. */

const axios = require("axios");

const BASE_URL = "https://api.coingecko.com/api/v3";

const getCryptoPrice = async (cryptoId = "bitcoin") => {
  try {
    const response = await axios.get(`${BASE_URL}/simple/price`, {
      params: {
        ids: cryptoId,
        vs_currencies: "USD",
      },
    });
    return response.data[cryptoId].usd;
  } catch (error) {
    console.error(`Failed to fetch price for ${cryptoId}: ${error.message}`);
    throw error;
  }
};

module.exports = {
  getCryptoPrice,
};
