function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(400).json({
    success: false,
    message: err.message || "서버 오류",
  });
}

module.exports = errorHandler;