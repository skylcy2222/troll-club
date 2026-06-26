const crypto = require("node:crypto");

class SessionManager {
  constructor() {
    this.sessions = new Map();
  }

  createSession(userId) {
    const sessionId = crypto.randomUUID();
    this.sessions.set(sessionId, {
      userId,
      createdAt: new Date().toISOString(),
    });
    return sessionId;
  }

  getSession(sessionId) {
    if (!sessionId) return null;
    return this.sessions.get(sessionId) || null;
  }

  destroySession(sessionId) {
    this.sessions.delete(sessionId);
  }
}

module.exports = SessionManager;