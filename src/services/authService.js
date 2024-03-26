const JWT = require("jsonwebtoken");
const userModel = require("../models/UserModels");
const { hashPassword, comparePassword } = require("../helpers/authHelper");

//service function to handel for User registration authentication
const registerUser = async ({
  firstname,
  lastname,
  email,
  username,
  password,
}) => {
  if (
    !firstname ||
    !lastname ||
    !email ||
    !username ||
    !password ||
    password.length <= 6
  ) {
    throw new Error("Validation failed");
  }

  try {
    const existingUserByEmail = await userModel.findOne({ email });
    if (existingUserByEmail) {
      throw new Error("User Already Registered with This Email");
    }

    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      throw new Error("Username Already Exists");
    }

    const hashedPassword = await hashPassword(password);
    const user = await userModel.create({
      firstname,
      lastname,
      email,
      username,
      password: hashedPassword,
    });

    return user;
  } catch (error) {
    throw error;
  }
};

//service function to handel for User login authentication
const loginUser = async ({ username, password }) => {
  if (!username || !password) {
    throw new Error("Please provide Username or Password");
  }

  try {
    const loginuser = await userModel.findOne({ username });
    if (!loginuser) {
      throw new Error("User not found");
    }

    const isPasswordMatch = await comparePassword(password, loginuser.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid Password");
    }

    const token = JWT.sign({ _id: loginuser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return { loginuser, token };
  } catch (error) {
    throw error;
  }
};

module.exports = { registerUser, loginUser };
