const express = require("express");

function createSettingsRoutes({ settingsController }) {
  const router = express.Router();

  router.get("/", settingsController.get.bind(settingsController));
  router.put("/", settingsController.update.bind(settingsController));

  return router;
}

module.exports = createSettingsRoutes;