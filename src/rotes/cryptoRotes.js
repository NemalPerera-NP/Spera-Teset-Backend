/*
this route is used to display cryptocurrency prices.
*/

const express = require("express");
const router = express.Router();

//this code is to call the getCryptoPrice function in CryptoServicess.js
const { getCryptoPrice } = require("../services/cryptoService");

router.get("/price/:id", async (req, res) => {
  try {
    const cryptoId = req.params.id;
    const price = await getCryptoPrice(cryptoId);
    res.json({ id: cryptoId, price: price });
    //
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/*
This code defines a GET route /price/:id where :id is a placeholder for the cryptocurrency ID (e.g., bitcoin). 
It uses the getCryptoPrice function 
from our service to fetch the price and returns it in JSON format.
*/

module.exports = router;
