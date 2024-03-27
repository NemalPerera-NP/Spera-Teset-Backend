const { getCryptoPrice,getUniqueCryptoId } = require("../services/cryptoService");

/*
const saveCryptoPriceController = async (req, res) => {
  const { id } = req.params;
  try {
    await getCryptoPrice(id);
    console.log("price>>>>>>>>>>>>", req.params);
    res.status(200).json({
      success: true,
      message: "Crypto prices updated successfully",
    });

  } catch (error) {
    //console.error(`Failed to fetch price for ${id}: ${error}`);
    res.status(500).json({
      success: false,
      message: "Failed to fetch cryptocurrency price and save",
      error: error.message,
    });
  }
};*/


//controller to get all the unique crypto ids from the data base
const getUniqueCryptoIdsController = async (req, res) => {
  try {
    const uniqueCryptoIds = await getUniqueCryptoId();
    res.status(200).json({ success: true, data: uniqueCryptoIds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch unique cryptoIds" });
 
  }
}

module.exports = { getUniqueCryptoIdsController };
