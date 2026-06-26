class LoginUser {
  constructor({ userRepository, passwordHasher, sessionManager }) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.sessionManager = sessionManager;
  }

  async execute({ email, password }) {
    const user = this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
    }

    const ok = this.passwordHasher.verify(password, user.passwordHash);
    if (!ok) {
      throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
    }

    const sessionId = this.sessionManager.createSession(user.id);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      sessionId,
    };
  }
}

module.exports = LoginUser;