class GetPosts {
  constructor({ postRepository, userRepository }) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
  }

  async execute() {
    const posts = this.postRepository.findAll();

    return posts.map((post) => {
      const author = this.userRepository.findById(post.userId);
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        author: author
          ? {
              id: author.id,
              username: author.username,
            }
          : null,
      };
    });
  }
}

module.exports = GetPosts;