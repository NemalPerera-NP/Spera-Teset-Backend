//setting up JSON token required

const userModel = require("../models/UserModels");

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

    //save user
    const user = await userModel({
      firstname,
      lastname,
      email,
      username,
      password,
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
