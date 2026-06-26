class DeletePost {
  constructor({ postRepository }) {
    this.postRepository = postRepository;
  }

  async execute({ postId, userId }) {
    const post = this.postRepository.findById(postId);
    if (!post) {
      throw new Error("게시글을 찾을 수 없습니다.");
    }

    if (post.userId !== userId) {
      throw new Error("삭제 권한이 없습니다.");
    }

    this.postRepository.deleteById(postId);
    return { deleted: true };
  }
}

module.exports = DeletePost;