// controllers/cryptoPriceController.js

const { getLatestCryptoPrices } = require('../services/cryptoPriceService');

const getLatestCryptoPricesController = async (req, res) => {
  const result = await getLatestCryptoPrices();
  
  if (result.success) {
    res.json(result.data);
  } else {
    res.status(500).json({ message: result.message });
  }
};

module.exports = { getLatestCryptoPricesController };
