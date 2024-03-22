const express = require("express");
const { userRegisterControler } = require("../controllers/UserControlers");

//router Object

const router = express.Router();

//routes
//Signup || POST
router.post("/signup", userRegisterControler);

module.exports = router;
