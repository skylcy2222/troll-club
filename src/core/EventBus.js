class EventBus {
  constructor() {
    this.handlers = new Map();
  }

  on(eventName, handler) {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName).push(handler);
  }

  emit(eventName, payload) {
    const list = this.handlers.get(eventName) || [];
    for (const handler of list) {
      handler(payload);
    }
  }
}

module.exports = EventBus;