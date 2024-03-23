const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const swaggerUi = require("swagger-ui-express");
// const swaggerJsdoc = require("swagger-jsdoc");
const swaggerDocument = require("../swagger_output.json");
const authenticateToken = require("./midleware/midlewareAuthToke");

//importing controllers
const {
  userRegisterControler,
  loginControl,
} = require("./controllers/UserControlers");

const { getCryptoPrice } = require("../src/services/cryptoService");

dotenv.config();
// Connect to MongoDB
connectDB();

const app = express();
//define a port for the server
const PORT = process.env.PORT || 8080;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//url - http://localhost:8080/api-docs

//to correctly handle JSON payloads in the HTTP request body (common in API requests), use the express.json() middleware.
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Initial codeing on crypto project!");
});

app.post("/api/auth/signup", userRegisterControler);
app.post("/api/auth/login", loginControl);

//GET
app.get("/api/crypto/price/:id", authenticateToken, async (req, res) => {
  const { id } = req.params; // Cryptocurrency ID, e.g., "bitcoin"
  try {
    const price = await getCryptoPrice(id);
    res.json({ success: true, id, price });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch cryptocurrency price",
        error: error.message,
      });
  }
});
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
