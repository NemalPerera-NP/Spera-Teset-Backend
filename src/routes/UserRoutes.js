const express = require("express");
const {
  userRegisterControler,
  loginControl,
} = require("../controllers/UserControlers");

//router Object

const router = express.Router();

//routes
//Signup || POST
router.post("/signup", userRegisterControler);
router.post("/login", loginControl);

module.exports = router;
