class BoardPolicy {
  validatePost({ title, content }) {
    if (!title || title.trim().length < 2) {
      throw new Error("제목이 너무 짧습니다.");
    }

    if (!content || content.trim().length < 5) {
      throw new Error("내용이 너무 짧습니다.");
    }
  }
}

module.exports = BoardPolicy;