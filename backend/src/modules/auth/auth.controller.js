const { createUser, validateUser } = require("./auth.service");
const { generateToken } = require("../../utils/jwt");

const register = async (req, res, next) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json({
      // 201 Created
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await validateUser(email, password); // validate user credentials
    if (!user) {
      return res.status(401).json({
        // 401 Unauthorized
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken({
      // generate JWT token
      id: user._id,
      role: user.role,
    });

    res.json({
      // sending with token
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};
//exporting 
module.exports = {
  register,
  login,
};
