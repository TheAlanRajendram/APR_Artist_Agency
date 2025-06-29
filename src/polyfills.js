// Polyfill for MessageChannel in Cloudflare Workers environment
if (typeof MessageChannel === 'undefined') {
  globalThis.MessageChannel = class MessageChannel {
    constructor() {
      this.port1 = new MessagePort();
      this.port2 = new MessagePort();
      this.port1._otherPort = this.port2;
      this.port2._otherPort = this.port1;
    }
  };

  globalThis.MessagePort = class MessagePort {
    constructor() {
      this._listeners = new Map();
      this._otherPort = null;
    }

    addEventListener(type, listener) {
      if (!this._listeners.has(type)) {
        this._listeners.set(type, []);
      }
      this._listeners.get(type).push(listener);
    }

    removeEventListener(type, listener) {
      if (this._listeners.has(type)) {
        const listeners = this._listeners.get(type);
        const index = listeners.indexOf(listener);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      }
    }

    postMessage(message) {
      if (this._otherPort) {
        setTimeout(() => {
          const event = { data: message, type: 'message' };
          if (this._otherPort.onmessage) {
            this._otherPort.onmessage(event);
          }
          if (this._otherPort._listeners.has('message')) {
            this._otherPort._listeners.get('message').forEach(listener => {
              listener(event);
            });
          }
        }, 0);
      }
    }

    start() {
      // No-op for compatibility
    }

    close() {
      // No-op for compatibility
    }
  };
}
