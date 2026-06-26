class RegisterUser {
  constructor({ userRepository, passwordPolicy, passwordHasher }) {
    this.userRepository = userRepository;
    this.passwordPolicy = passwordPolicy;
    this.passwordHasher = passwordHasher;
  }

  async execute({ username, email, password }) {
    if (!username || !email) {
      throw new Error("이름과 이메일은 필수입니다.");
    }

    this.passwordPolicy.validate(password);

    const exists = this.userRepository.findByEmail(email);
    if (exists) {
      throw new Error("이미 가입된 이메일입니다.");
    }

    const passwordHash = this.passwordHasher.hash(password);
    const user = this.userRepository.create({
      username,
      email,
      passwordHash,
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}

module.exports = RegisterUser;