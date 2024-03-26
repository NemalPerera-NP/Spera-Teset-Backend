const bcrypt = require("bcrypt");

// Hash Function using
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10); 
    const hash = await bcrypt.hash(password, salt); 
    return hash;
  } catch (err) {
    console.log("error....", err);
    throw err; 
  }
};

//COMPARE || DECRYPT FUNCTION
const comparePassword = (password,hashedpssw) =>{
  return bcrypt.compare(password,hashedpssw)
}
module.exports = { hashPassword ,comparePassword};
