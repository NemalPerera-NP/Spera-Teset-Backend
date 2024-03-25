const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
// const swaggerJsdoc = require("swagger-jsdoc");
const swaggerDocument = require("../swagger_output.json");
const authenticateToken = require("./midleware/midlewareAuthToke");
const {
  userRegisterControler,
  loginControl,
} = require("./controllers/UserControlers");
const {
  saveCryptoPriceController,
  getUniqueCryptoIdsController,
} = require("./controllers/cryptoController");
const { getCryptoPrice } = require("./services/cryptoService");
const {
  addUserFavoritesController,updateUserFavoritesController,
} = require("./controllers/userFavoriteListController");

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 8080; //define a port for the server

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //url - http://localhost:8080/api-docs

setInterval(() => {
  getCryptoPrice().catch((error) =>
    console.error("Error updating crypto prices:", error)
  );
}, 300000); //fetch crypto price every 5 (ms-300000) minutes and save it in the DB

//to correctly handle JSON payloads in the HTTP request body (common in API requests), use the express.json() middleware.
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Initial codeing on crypto project!");
});

app.post("/api/auth/signup", userRegisterControler);
app.post("/api/auth/login", loginControl);
// Endpoint to add/update user's favorite cryptocurrencies
app.post("/api/user/favorites", addUserFavoritesController);


//GET
app.get("/api/crypto/unique-ids", getUniqueCryptoIdsController);

//PUT
app.patch("/api/user/favorites",updateUserFavoritesController)

// Protected route for fetching cryptocurrency price,
// app.get("/api/crypto/price/:id", authenticateToken, saveCryptoPriceController);





//swagger
// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Crypto Price Site API",
//       version: "1.0.0",
//     },
//     servers: [
//       {
//         url: `http://localhost:${PORT}/`,
//       },
//     ],
//   },
//   apis: ["./server.js"],
// };

// const swaggerSpec = swaggerJsdoc(options);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
