const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
// const swaggerJsdoc = require("swagger-jsdoc");
const swaggerDocument = require("../swagger_output.json");
const authenticateToken = require("./midleware/midlewareAuthToke");

const {
  getUniqueCryptoIdsController,
} = require("./controllers/cryptoController");
const { getCryptoPrice } = require("./services/cryptoService");
const {
  addUserFavoritesController,
  updateUserFavoritesController,
  removeUserFavoritesController,
  getUserFavoritemsController,
  replaceOrCreateUserFavoritesController,
} = require("./controllers/userFavoriteListController");

const {
  getLatestCryptoPricesController,
  getDailyMaxPricesController,
} = require("./controllers/cryptoPriceController");

const {
  userRegisterController,
  loginController,
} = require("./controllers/authController");
dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 8080; //define a port for the server

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use(cors());

//API to get swagger API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //url - http://localhost:8080/api-docs

setInterval(() => {
  getCryptoPrice().catch((error) =>
    console.error("Error updating crypto prices:", error)
  );
}, 300000); //fetch crypto price for predetermined Crypto's every 5 (ms-300000) minutes and save it in the DB/

//to correctly handle JSON payloads in the HTTP request body (common in API requests), use the express.json() middleware.
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Initial codeing on crypto project!");
});
//POST API
app.post("/api/auth/signup", userRegisterController); //API for User registration//

app.post("/api/auth/login", loginController); //API for user Login//



app.post(
  "/api/user/favorites",
  authenticateToken,
  addUserFavoritesController
); /* Endpoint to add/update user's 
favorite cryptocurrencies (this API can Only Create a new Fav list this can't be used to update a Exsisting one/*/



app.post(
  "/api/user/all-in-one/favorites",
  authenticateToken,
  replaceOrCreateUserFavoritesController
); /* Endpoint to create as a new or update a exsisting user's favorite cryptocurrencies 
(this API can Create a new Fav list and this can be used to update a Exsisting one), if this used no need of DELETE and PATCH API's/*/



//GET
app.get(
  "/api/crypto/unique-ids",
  authenticateToken,
  getUniqueCryptoIdsController 
);
//to get all the unique crypto ids from the data base/



app.get(
  "/api/user/favorites/:userId",
  authenticateToken,
  getUserFavoritemsController 
);// API to get all CryptoId's in a users Favorite lists if that user has a Favorite Crypto list/



app.get(
  "/api/crypto/latest-prices",
  authenticateToken,
  getLatestCryptoPricesController
); //API to get the lateset price of all the Cryptocurencies from sercvice function/

//



app.get(
  "/api/crypto/daily-max-prices",
  authenticateToken,
  getDailyMaxPricesController
); //API to get daily maximum pricess of all the CryptoIds/




//PUT


app.patch(
  "/api/user/favorites",
  authenticateToken,
  updateUserFavoritesController
); //API to update a exsisting User Favorite Cryptocurency list based on userId/




//DELETE
app.delete(
  "/api/user/favorites",
  authenticateToken,
  removeUserFavoritesController
); //API to delete items from a Users exsisting Favorite Cryptocurency list based on userId/
