// services/cryptoPriceService.js

const CryptoPrice = require("../models/CryptoPriceModel");

const getLatestCryptoPrices = async () => {
  try {
    // Aggregate prices to get the latest price for each cryptoId
    const latestPrices = await CryptoPrice.aggregate([
      {
        $sort: { updatedDate: -1 },
      },
      {
        $group: {
          _id: "$cryptoId",
          price: { $first: "$price" },
          updatedDate: { $first: "$updatedDate" },
        },
      },
      {
        $project: {
          _id: 0,
          cryptoId: "$_id",
          price: 1,
          updatedDate: 1,
        },
      },
    ]);

    return { success: true, data: latestPrices };
  } catch (error) {
    console.error("Error fetching latest crypto prices:", error);
    return { success: false, message: "Failed to fetch latest crypto prices" };
  }
};

module.exports = { getLatestCryptoPrices };
