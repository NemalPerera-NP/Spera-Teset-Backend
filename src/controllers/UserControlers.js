//setting up JSON token required

const userModel = require("../models/UserModels");
const { hashPassword } = require("../helpers/authHelper");

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
    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "password is required and 6 charector long",
      });
    }

    //exsisting user
    // const exsistingUser = await userModel.findOne({email:email})
    const exsistingUser = await userModel.findOne({ email });
    console.log("exsistingUser.........", exsistingUser);
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
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

module.exports = { userRegisterControler };
