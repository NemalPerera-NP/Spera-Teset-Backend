// services/cryptoPriceService.js

const CryptoPrice = require("../models/CryptoPriceModel");

//service function to get the lateset price of all the Cryptocurencies
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




//service function to get the maximum price of crypto curencies based on days

const getDailyMaxCryptoPrices = async () => {
  try {
    // Aggregate prices to get the highest price for each cryptoId per day
    const dailyMaxPrices = await CryptoPrice.aggregate([
      {
        $addFields: {
          // Extract the date part only from the updatedDate timestamp
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$updatedDate" },
          },
        },
      },
      {
        $group: {
          _id: { cryptoId: "$cryptoId", date: "$date" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $project: {
          _id: 0,
          cryptoId: "$_id.cryptoId",
          date: "$_id.date",
          price: "$maxPrice",
        },
      },
      {
        $sort: { cryptoId: 1, date: 1 },
      },
    ]);

    return { success: true, data: dailyMaxPrices };
  } catch (error) {
    console.error("Error fetching daily max crypto prices:", error);
    return {
      success: false,
      message: "Failed to fetch daily max crypto prices",
    };
  }
};
module.exports = { getLatestCryptoPrices,getDailyMaxCryptoPrices };
