//setting up JSON token required
const JWT = require("jsonwebtoken");
const userModel = require("../models/UserModels");
const { hashPassword, comparePassword } = require("../helpers/authHelper");

//User Signup / Register function

const userRegisterControler = async (req, res) => {
  try {
    const { firstname, lastname, email, username, password } = req.body;
    //validation
    if (!firstname) {
      return res.status(400).send({
        success: false,
        message: "First name is required",
      });
    }
    if (!lastname) {
      return res.status(400).send({
        success: false,
        message: "lastname is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is required",
      });
    }
    if (!username) {
      return res.status(400).send({
        success: false,
        message: "username is required",
      });
    }
    if (!password || password.length <= 6) {
      return res.status(400).send({
        success: false,
        message: "password is required and 6 charector long",
      });
    }

    //exsisting user
    // const exsistingUser = await userModel.findOne({email:email})
    const exsistingUser = await userModel.findOne({ email });
    //console.log("exsistingUser.........", exsistingUser);
    if (exsistingUser) {
      return res.status(500).send({
        success: false,
        message: "User Already Registered with This Email",
      });
    }

    //hashed password
    const hashedPassword = await hashPassword(password);

    //save user
    const user = await userModel({
      firstname,
      lastname,
      email,
      username,
      password: hashedPassword,
    }).save();

    return res.status(201).send({
      success: true,
      message: "Registration Successful please login",
    });
  } catch (error) {
    //console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

//LOGIN Function
const loginControl = async (req, res) => {
  try {
    const { username, password } = req.body;

    //validation
    if (!username || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide Username or Password",
      });
    }

    //findind the user
    const loginuser = await userModel.findOne({ username });

    if (!loginuser) {
      return res.status(401).send({
        success: false,
        message: "User not found",
      });
    }
    console.log("User---", loginuser);

    //if user exists password should be matched
    const matchPssw = await comparePassword(password, loginuser.password);
    console.log("matched Password---", matchPssw);
    if (!matchPssw) {
      return res.status(401).send({
        success: false,
        message: "Invalid Password",
      });
    }

    console.log("Token........", process.env.JWT_SECRET);
    const token = JWT.sign({ _id: loginuser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    //username is valid and password also matched hence should be able to login
    return res.status(200).send({
      success: true,
      message: "Login",
      token,
      loginuser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

module.exports = { userRegisterControler, loginControl };
