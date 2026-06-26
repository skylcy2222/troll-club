require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "dev-jwt-secret",
  pepper: process.env.PEPPER || "dev-pepper",
  nodeEnv: process.env.NODE_ENV || "development",
};