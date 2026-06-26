class CommunityRepository {
  constructor(db) {
    this.db = db;
    if (!this.db.communities) {
      this.db.communities = [];
      this.db.counters.community = 1;
    }
  }

  findAll() {
    return [...this.db.communities].sort((a, b) => b.id - a.id);
  }

  create({ name, description = "" }) {
    const community = {
      id: this.db.counters.community++,
      name,
      description,
      createdAt: new Date().toISOString(),
    };

    this.db.communities.push(community);
    return community;
  }
}

module.exports = CommunityRepository;