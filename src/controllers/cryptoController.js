const { getCryptoPrice } = require("../services/cryptoService");

const saveCryptoPriceController = async (req, res) => {
  const { id } = req.params;
  try {
    await getCryptoPrice(id);
    console.log("price>>>>>>>>>>>>", req.params);
    res.status(200).json({
      success: true,
      message: "Crypto prices updated successfully",
    });

    // res.json({
    //   success: true,
    //   id,
    //   price,
    // });
  } catch (error) {
    //console.error(`Failed to fetch price for ${id}: ${error}`);
    res.status(500).json({
      success: false,
      message: "Failed to fetch cryptocurrency price and save",
      error: error.message,
    });
  }
};

module.exports = { saveCryptoPriceController };
