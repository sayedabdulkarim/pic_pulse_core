const jwt = require("jsonwebtoken");

const generateToken = (userId, expiresIn = "2d") => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });
};

module.exports = { generateToken };
