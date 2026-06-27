const express = require("express");

function createCommunityRoutes({ communityController }) {
  const router = express.Router();

  router.get("/", communityController.list);
  router.post("/", communityController.create);
  router.get("/info", communityController.info);

  return router;
}

module.exports = createCommunityRoutes;