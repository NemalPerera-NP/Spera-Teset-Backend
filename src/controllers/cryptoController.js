const { getCryptoPrice } = require("../services/cryptoService");

const getCryptoPriceController = async (req, res) => {
  const { id } = req.params;
  try {
    const price = await getCryptoPrice(id);
    res.json({
      success: true,
      id,
      price,
    });
  } catch (error) {
    console.error(`Failed to fetch price for ${id}: ${error}`);
    res.status(500).json({
      success: false,
      message: "Failed to fetch cryptocurrency price",
      error: error.message,
    });
  }
};

module.exports = { getCryptoPriceController };
