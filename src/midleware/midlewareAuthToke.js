//const expressJWT = require("express-jwt");
var { expressjwt: jwt } = require("express-jwt");

//midleware
const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});


module.exports = {requireSignIn}