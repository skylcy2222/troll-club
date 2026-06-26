const crypto = require("node:crypto");

class PasswordHasher {
  constructor({ pepper = "" } = {}) {
    this.pepper = pepper;
  }

  hash(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const derived = crypto.scryptSync(password + this.pepper, salt, 64);
    return `${salt}:${derived.toString("hex")}`;
  }

  verify(password, storedHash) {
    const [salt, hash] = String(storedHash).split(":");
    if (!salt || !hash) return false;

    const derived = crypto.scryptSync(password + this.pepper, salt, 64);
    const actual = derived.toString("hex");

    return crypto.timingSafeEqual(Buffer.from(actual), Buffer.from(hash));
  }
}

module.exports = PasswordHasher;