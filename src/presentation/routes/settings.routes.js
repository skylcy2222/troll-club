const express = require("express");

function createSettingsRoutes() {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.json({
      success: true,
      data: { theme: "monochrome" },
    });
  });

  return router;
}

module.exports = createSettingsRoutes;