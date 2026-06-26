class UserRepository {
  constructor(db) {
    this.db = db;
  }

  findByEmail(email) {
    return this.db.users.find((user) => user.email === email) || null;
  }

  findById(id) {
    return this.db.users.find((user) => user.id === id) || null;
  }

  create({ username, email, passwordHash }) {
    const user = {
      id: this.db.counters.user++,
      username,
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    this.db.users.push(user);
    return user;
  }
}

module.exports = UserRepository;