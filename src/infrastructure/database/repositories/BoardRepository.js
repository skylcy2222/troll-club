class BoardRepository {
  constructor(db) {
    this.db = db;
  }

  findAll() {
    return [...this.db.posts].sort((a, b) => b.id - a.id);
  }

  findById(id) {
    return this.db.posts.find((post) => post.id === id) || null;
  }

  create({ userId, title, content }) {
    const board = {
      id: this.db.counters.post++,
      userId,
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    this.db.posts.push(board);
    return board;
  }

  deleteById(id) {
    const index = this.db.posts.findIndex((post) => post.id === id);
    if (index === -1) return false;

    this.db.posts.splice(index, 1);
    return true;
  }
}

module.exports = BoardRepository;