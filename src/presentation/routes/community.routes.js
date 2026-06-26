const express = require("express");

function createCommunityRoutes() {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.json({
      success: true,
      data: { items: [], message: "community ready" },
    });
  });

  return router;
}

module.exports = createCommunityRoutes;