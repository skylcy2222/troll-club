class Serializer {
  static toJSON(value) {
    return JSON.stringify(value);
  }

  static fromJSON(text) {
    return JSON.parse(text);
  }
}

module.exports = Serializer;