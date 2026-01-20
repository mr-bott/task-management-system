const bcrypt = require("bcryptjs");
const User = require("./auth.model");

const createUser = async (userData) => {
  const { name, email, password, role } = userData;

  const existingUser = await User.findOne({ email });  // finding user with same details 
  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }
  const hashedPassword = await bcrypt.hash(password, 10); // Hash password with salt rounds = 10
  return User.create({
    name,                                 // create new user
    email,
    password: hashedPassword,
    role: role || "USER"
  });
};

const validateUser = async (email, password) => {
  const user = await User.findOne({ email });   // find user by email
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password); // compare password 
  if (!isMatch) return null;

  return user;
};

module.exports = {
  createUser,
  validateUser
};
