const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/env");
const { JWT_EXPIRES_IN } = require("../../config/constants");

function signToken(payload) {
  return jwt.sign(payload, jwtSecret, { expiresIn: JWT_EXPIRES_IN });
}

function verifyToken(token) {
  return jwt.verify(token, jwtSecret);
}

module.exports = {
  signToken,
  verifyToken,
};