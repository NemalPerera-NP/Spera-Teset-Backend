const { registerUser, loginUser } = require('../services/authService');

//controller to handel for User registration API call
const userRegisterController = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        return res.status(201).json({
            success: true,
            message: "Registration Successful please login",
            user,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
//controller for handel user Login API call
const loginController = async (req, res) => {
    try {
        const { loginuser, token } = await loginUser(req.body);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            loginuser,
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { userRegisterController, loginController };
