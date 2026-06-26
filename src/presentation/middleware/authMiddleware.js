function createAuthMiddleware({ sessionManager }) {
  return function authMiddleware(req, res, next) {
    const sessionId = req.cookies?.sid;
    const session = sessionManager.getSession(sessionId);

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "로그인이 필요합니다.",
      });
    }

    req.auth = {
      userId: session.userId,
      sessionId,
    };

    next();
  };
}

module.exports = createAuthMiddleware;