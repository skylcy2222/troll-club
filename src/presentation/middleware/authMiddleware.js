function createAuthMiddleware({ tokenService }) {
  return function authMiddleware(req, res, next) {
    const header = req.headers.authorization || "";
    const [, token] = header.split(" ");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "토큰이 필요합니다.",
      });
    }

    try {
      const decoded = tokenService.verifyToken(token);
      req.auth = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "유효하지 않은 토큰입니다.",
      });
    }
  };
}

module.exports = createAuthMiddleware;