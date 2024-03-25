const {
  addUserFav,
  updateUserFav,
} = require("../services/userFavoritesListService");

//controller to call the service file function to create a new User Favorite Cryptocurency list
const addUserFavoritesController = async (req, res) => {
  try {
    const { userId, cryptoIds } = req.body;

    const result = await addUserFav(userId, cryptoIds);
    if (!userId || !cryptoIds || !Array.isArray(cryptoIds)) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data",
      });
    }

    console.log("createFavorites<<<<<<<", result);
    if (result.success) {
      res.status(201).json({
        success: true,
        message: "Favorites updated successfully",
        data: result.data,
      });
    } else {
      // User favorites already exist
      res.status(401).send({
        success: false,
        message: "User favorites already exist.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating favorites",
    });
  }
};

//controller to call the service file function to update a exsisting User Favorite Cryptocurency list
const updateUserFavoritesController = async (req, res) => {
  try {
    const { userId, cryptoIds } = req.body;
    // Validate input
    if (!userId || !cryptoIds || !Array.isArray(cryptoIds)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid input data. Ensure 'userId' is provided and 'newCryptoIds' is an array.",
      });
    }

    console.log("newCryptoIds........", cryptoIds);

    const result = await updateUserFav(userId, cryptoIds);
    if (result.success) {
      res.status(200).json({
        success: true,
        message: "Favorites updated successfully",
        data: result.data,
      });
    } else {
      // User favorites already exist
      res.status(404).send({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating favorites",
    });
  }
};

module.exports = { addUserFavoritesController, updateUserFavoritesController };
