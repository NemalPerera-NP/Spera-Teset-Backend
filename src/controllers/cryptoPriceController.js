// controllers/cryptoPriceController.js

const { getLatestCryptoPrices, getDailyMaxCryptoPrices } = require('../services/cryptoPriceService');

//controller to get the lateset price of all the Cryptocurencies from sercvice function
const getLatestCryptoPricesController = async (req, res) => {
  const result = await getLatestCryptoPrices();
  
  if (result.success) {
    res.json(result.data);
  } else {
    res.status(500).json({ message: result.message });
  }
};

//controller to get the daily maximum price of all the crypto curencies

const getDailyMaxPricesController = async (req, res) => {
  try {
    const result = await getDailyMaxCryptoPrices();
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error('Error in getDailyMaxPricesController:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching daily max crypto prices'
    });
  }
};



module.exports = { getLatestCryptoPricesController,getDailyMaxPricesController };
