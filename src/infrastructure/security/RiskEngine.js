class RiskEngine {
  constructor() {
    this.userRisk = new Map();
  }

  addRisk(userId, score = 1) {
    const current = this.userRisk.get(userId) || 0;
    const next = current + score;
    this.userRisk.set(userId, next);
    return next;
  }

  getRisk(userId) {
    return this.userRisk.get(userId) || 0;
  }

  isBlocked(userId) {
    return this.getRisk(userId) >= 100;
  }

  reset(userId) {
    this.userRisk.delete(userId);
  }
}

module.exports = RiskEngine;