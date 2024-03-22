const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cryptoRoutes = require("./routes/cryptoRotes");
const userRoutes = require('./routes/UserRoutes')
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

//define a port for the server
const PORT = process.env.PORT || 8080;

const app = express();

//to correctly handle JSON payloads in the HTTP request body (common in API requests), use the express.json() middleware.
app.use(express.json());
app.use("/api/crypto", cryptoRoutes); // Use the Crypto routes
app.use("/api/auth", userRoutes);// use the User Routes

app.get("", (req, res) => {
  res.send("Initial codeing on crypto project!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
