const express = require("express");

function createAuthRoutes({ authController, authMiddleware }) {
  const router = express.Router();

  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.get("/me", authMiddleware, authController.me);
  router.post("/logout", authController.logout);

  return router;
}

module.exports = createAuthRoutes;