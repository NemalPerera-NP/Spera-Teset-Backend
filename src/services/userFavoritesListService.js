const UserFavorites = require("../models/UserFavCrypto");

//function to create a new User Favorite Cryptocurency list
const addUserFav = async (userId, cryptoId) => {
  try {
    const userExist = await UserFavorites.findOne({ userId });

    console.log("userExist......", userExist);
    if (userExist) {
      //console.log("User favorites already exist::::::", userExist);
      return {
        success: false,
        message: "User favorites already exist.",
      };
    } else {
      //no list exsits
      const createUserFavList = new UserFavorites({
        userId: userId,
        cryptoIds: cryptoId,
      });
      await createUserFavList.save();
      console.log("User favorites created:||||||||||||||||", createUserFavList);
      return { success: true, data: createUserFavList };
    }
  } catch (error) {
    console.error("Error adding user favorite cryptocurrencies:", error);
    throw error;
  }
};

//function to Update
const updateUserFav = async (userId, cryptoId) => {
  //const userExist = await UserFavorites.findOne({ userId });
  console.log("cryptoId........", cryptoId);
  console.log("userId........", userId);


  try {
    const updateFavlist = await UserFavorites.findOneAndUpdate(
      { userId: userId },
      { $addToSet: { cryptoIds: { $each: cryptoId } } },
      { new: true }
    );

    if (updateFavlist) {
      console.log("User favorites list updated with new cryptId's");
      return {
        success: true,
        data: updateFavlist,
      };
    } else {
      console.log("favorites list dosen't exist to update.");
      return {
        success: false,
        message: "No such user favorites exist to update.",
      };
    }
  } catch (error) {
    console.error("Error updating user favorite cryptocurrencies list:", error);
    throw error;
  }
};

//function to delete
const removeFavListItems =async(userId, cryptoId)=>{
  try {

    const updateFavlist = await UserFavorites.findOneAndUpdate(
      { userId },
      { $pull: { cryptoIds: { $in: cryptoId } } },      
      { new: true } 
    )
    if(!updateFavlist){
      return {
        success: false,
        message: "Favorites not found or cryptoId not in favorites",
      };
    }

      return {success: true,data: updateFavlist,};
    
    
  } catch (error) {
    console.error("Error updating user favorite cryptocurrencies list:", error);
    throw error;
  }
}

module.exports = { addUserFav, updateUserFav,removeFavListItems };
