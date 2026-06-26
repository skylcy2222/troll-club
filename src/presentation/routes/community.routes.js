const express = require("express");

function createCommunityRoutes({ communityController }) {
  const router = express.Router();

  router.get("/", communityController.list);
  router.post("/", communityController.create);

  return router;
}

module.exports = createCommunityRoutes;