module.exports = class Dictionary {
  constructor() {
    this.table = {}
  }
  set(key, value) {
    if (key != null && value != null) {
      this.table[key] = value;
      return true;
    }
    return false;
  }
  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[key];
      return true;
    }
    return false;
  }
  hasKey(key) {
    return this.table[key] != null;
  }
  get(key) {
    return this.table[key] == null ? undefined : this.table[key]
  }
  clear() {
    this.table = {};
  }

  size() {
    return Object.keys(this.table).length;
  }

  isEmpty() {
    return Object.keys(this.table) === 0;
  }

  keys() {
    return Object.keys(this.table);
  }

  values() {
    return Object.values(this.table);
  }

  keyValues() {
    return Object.entries(this.table);
  }

  forEach(callback) {
    this.keys().forEach((key, i) => {
      callback(key, this.table[key], i)
    })
  }
}