class BoardController {
  constructor({ createPost, getPosts, deletePost }) {
    this.createPost = createPost;
    this.getPosts = getPosts;
    this.deletePost = deletePost;

    this.list = this.list.bind(this);
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
  }

  async list(req, res, next) {
    try {
      const data = await this.getPosts.execute();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const data = await this.createPost.execute({
        userId: req.auth.userId,
        ...req.body,
      });

      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const postId = Number(req.params.id);
      const data = await this.deletePost.execute({
        postId,
        userId: req.auth.userId,
      });

      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BoardController;