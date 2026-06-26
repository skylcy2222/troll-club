function createRateLimit({ limit = 30, windowMs = 60_000 } = {}) {
  const hits = new Map();

  return function rateLimit(req, res, next) {
    const key = req.ip || "unknown";
    const now = Date.now();
    const record = hits.get(key) || { count: 0, start: now };

    if (now - record.start > windowMs) {
      record.count = 0;
      record.start = now;
    }

    record.count += 1;
    hits.set(key, record);

    if (record.count > limit) {
      return res.status(429).json({
        success: false,
        message: "요청이 너무 많습니다.",
      });
    }

    next();
  };
}

module.exports = createRateLimit;