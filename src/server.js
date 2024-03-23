const express = require("express");
const dotenv = require("dotenv");
const cryptoRoutes = require("./routes/cryptoRotes");
const userRoutes = require("./routes/UserRoutes");
const connectDB = require("./config/db");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerDocument = require("../swagger_output.json");

//importing controllers
const {
  userRegisterControler,
  loginControl,
} = require("./controllers/UserControlers");

dotenv.config();
// Connect to MongoDB
connectDB();

const app = express();
//define a port for the server
const PORT = process.env.PORT || 8080;

//swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crypto Price Site API",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${PORT}/`,
      },
    ],
  },
  apis: ["./server.js"],
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//url - http://localhost:8080/api-docs

//to correctly handle JSON payloads in the HTTP request body (common in API requests), use the express.json() middleware.
app.use(express.json());

app.post("/api/auth/signup", userRegisterControler);
app.post("/api/auth/login", loginControl);

app.get("/", (req, res) => {
  res.send("Initial codeing on crypto project!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
