const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

//define a port for the server
const PORT = process.env.PORT || 3000;

const app = express();

app.get("", (req, res) => {
  res.send("Initial codeing on crypto project!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
