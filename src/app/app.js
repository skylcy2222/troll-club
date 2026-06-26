const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bootstrap = require("./bootstrap");

function createApp() {
  const app = express();
  const { routers } = bootstrap();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(process.cwd(), "public")));

  app.use("/api/auth", routers.auth);
  app.use("/api/board", routers.board);
  app.use("/api/community", routers.community);
  app.use("/api/settings", routers.settings);

  app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "index.html"));
  });

  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  });

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(400).json({
      success: false,
      message: err.message || "서버 오류",
    });
  });

  return app;
}

module.exports = createApp;