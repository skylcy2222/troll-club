class CreatePost {
  constructor({ postRepository, boardPolicy }) {
    this.postRepository = postRepository;
    this.boardPolicy = boardPolicy;
  }

  async execute({ userId, title, content }) {
    this.boardPolicy.validatePost({ title, content });

    return this.postRepository.create({
      userId,
      title: title.trim(),
      content: content.trim(),
    });
  }
}

module.exports = CreatePost;