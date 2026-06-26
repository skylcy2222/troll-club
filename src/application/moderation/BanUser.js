class BanUser {
  constructor({ userRepository, riskEngine }) {
    this.userRepository = userRepository;
    this.riskEngine = riskEngine;
  }

  async execute({ userId, reason = "policy violation" }) {
    const user = this.userRepository.findById(userId);
    if (!user) {
      throw new Error("유저를 찾을 수 없습니다.");
    }

    user.banned = true;
    user.banReason = reason;
    user.bannedAt = new Date().toISOString();

    if (this.riskEngine) {
      this.riskEngine.reset(userId);
    }

    return {
      banned: true,
      userId: user.id,
      reason,
    };
  }
}

module.exports = BanUser;