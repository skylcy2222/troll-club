class AuthController {
  constructor({ registerUser, loginUser, userRepository }) {
    this.registerUser = registerUser;
    this.loginUser = loginUser;
    this.userRepository = userRepository;

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.me = this.me.bind(this);
  }

  async register(req, res, next) {
    try {
      const result = await this.registerUser.execute(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const result = await this.loginUser.execute(req.body);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async me(req, res, next) {
    try {
      const user = this.userRepository.findById(req.auth.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "유저를 찾을 수 없습니다.",
        });
      }

      res.json({
        success: true,
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;