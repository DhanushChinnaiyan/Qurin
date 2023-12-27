const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["user", "merchant"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

const generateJwtToken = (user) => {
  return jwt.sign(user, process.env.Secret_KEY, { expiresIn: "2d" });
};

module.exports = { User, generateJwtToken };
