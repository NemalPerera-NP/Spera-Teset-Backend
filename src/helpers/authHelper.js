const bcrypt = require("bcrypt");

// Hash Function using
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10); // Generates a salt
    const hash = await bcrypt.hash(password, salt); // Hashes the password using the generated salt
    return hash;
  } catch (err) {
    console.log("error....", err);
    throw err; // Throws any errors to be caught by the caller
  }
};

//COMPARE || DECRYPT FUNCTION
const comparePassword = (password,hashedpssw) =>{
  return bcrypt.compare(password,hashedpssw)
}
module.exports = { hashPassword ,comparePassword};
