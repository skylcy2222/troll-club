const express = require("express");

function createBoardRoutes({ boardController, authMiddleware }) {
  const router = express.Router();

  router.get("/", boardController.list);
  router.post("/", authMiddleware, boardController.create);
  router.delete("/:id", authMiddleware, boardController.remove);

  return router;
}

module.exports = createBoardRoutes;