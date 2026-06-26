class LoginUser {
  constructor({ userRepository, passwordHasher, tokenService }) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.tokenService = tokenService;
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

    const accessToken = this.tokenService.signToken({
      userId: user.id,
      username: user.username,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      accessToken,
    };
  }
}

module.exports = LoginUser;