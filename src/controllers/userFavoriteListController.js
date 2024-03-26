const {
  addUserFav,
  updateUserFav,
  removeFavListItems,
  getFavListItems,
  replaceOrCreateUserFav,
} = require("../services/userFavoritesListService");

//controller to call the service file function to create a new User Favorite Cryptocurency list
const addUserFavoritesController = async (req, res) => {
  const { userId, cryptoIds } = req.body;

  try {
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
  const { userId, cryptoIds } = req.body;
  try {
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

//controller to call the service file function to remove items from a exsisting User Favorite Cryptocurency list
const removeUserFavoritesController = async (req, res) => {
  const { userId, cryptoIds } = req.body;
  try {
    const result = await removeFavListItems(userId, cryptoIds);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: "Favorites deleted successfully",
        data: result.data,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Favorites not found or cryptoId not in favorites",
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

const getUserFavoritemsController = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await getFavListItems(userId);
    if (result.success) {
      res.status(200).json({
        success: true,
        message: "Favorites fetched successfully",
        data: result.data,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Favorites not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetchng favorites",
    });
  }
};




// Controller to handle the request to replace or create a new user favorite cryptocurrencies list
const replaceOrCreateUserFavoritesController = async (req, res) => {
  const { userId, cryptoIds } = req.body;

  try {
    if (!userId || !cryptoIds || !Array.isArray(cryptoIds)) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data",
      });
    }

    const result = await replaceOrCreateUserFav(userId, cryptoIds);
    console.log("Favorites updated or created:", result.data);
    res.status(201).json({
      success: true,
      message: "Favorites updated successfully",
      data: result.data,
    });
  } catch (error) {
    console.error("Error in replacing or creating user favorites:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating favorites",
    });
  }
};

module.exports = {
  addUserFavoritesController,
  updateUserFavoritesController,
  removeUserFavoritesController,
  getUserFavoritemsController,
  replaceOrCreateUserFavoritesController,
};
