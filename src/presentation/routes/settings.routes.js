const express = require("express");

function createSettingsRoutes({ settingsController }) {
  const router = express.Router();

  router.get("/", settingsController.get);
  router.put("/", settingsController.update);

  return router;
}

module.exports = createSettingsRoutes;