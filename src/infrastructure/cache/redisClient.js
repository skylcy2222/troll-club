const store = new Map();

const redisClient = {
  async get(key) {
    return store.get(key) ?? null;
  },

  async set(key, value) {
    store.set(key, value);
    return "OK";
  },

  async del(key) {
    return store.delete(key) ? 1 : 0;
  },
};

module.exports = redisClient;