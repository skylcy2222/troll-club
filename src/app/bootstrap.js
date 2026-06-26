const db = require("../infrastructure/database/db");
const UserRepository = require("../infrastructure/database/repositories/UserRepository");
const PostRepository = require("../infrastructure/database/repositories/PostRepository");
const PasswordPolicy = require("../domain/auth/PasswordPolicy");
const BoardPolicy = require("../domain/board/BoardPolicy");
const PasswordHasher = require("../infrastructure/security/PasswordHasher");
const SessionManager = require("../infrastructure/security/SessionManager");

const RegisterUser = require("../application/auth/RegisterUser");
const LoginUser = require("../application/auth/LoginUser");
const CreatePost = require("../application/board/CreatePost");
const GetPosts = require("../application/board/GetPosts");
const DeletePost = require("../application/board/DeletePost");

const AuthController = require("../presentation/controllers/auth.controller");
const BoardController = require("../presentation/controllers/board.controller");

const createAuthMiddleware = require("../presentation/middleware/authMiddleware");
const createAuthRoutes = require("../presentation/routes/auth.routes");
const createBoardRoutes = require("../presentation/routes/board.routes");
const createCommunityRoutes = require("../presentation/routes/community.routes");
const createSettingsRoutes = require("../presentation/routes/settings.routes");

function bootstrap() {
  const userRepository = new UserRepository(db);
  const postRepository = new PostRepository(db);

  const passwordPolicy = new PasswordPolicy();
  const boardPolicy = new BoardPolicy();

  const passwordHasher = new PasswordHasher({
    pepper: process.env.PEPPER || "dev-pepper",
  });

  const sessionManager = new SessionManager();

  const registerUser = new RegisterUser({
    userRepository,
    passwordPolicy,
    passwordHasher,
  });

  const loginUser = new LoginUser({
    userRepository,
    passwordHasher,
    sessionManager,
  });

  const createPost = new CreatePost({
    postRepository,
    boardPolicy,
  });

  const getPosts = new GetPosts({
    postRepository,
    userRepository,
  });

  const deletePost = new DeletePost({
    postRepository,
  });

  const authController = new AuthController({
    registerUser,
    loginUser,
    userRepository,
    sessionManager,
  });

  const boardController = new BoardController({
    createPost,
    getPosts,
    deletePost,
  });

  const authMiddleware = createAuthMiddleware({ sessionManager });

  return {
    routers: {
      auth: createAuthRoutes({ authController, authMiddleware }),
      board: createBoardRoutes({ boardController, authMiddleware }),
      community: createCommunityRoutes(),
      settings: createSettingsRoutes(),
    },
  };
}

module.exports = bootstrap;