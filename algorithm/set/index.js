class MySet {
  constructor() {
    this.items = {};
  }

  add(element) {
    if (!this.has(element)) {
      this.items[element] = element;
      return true;
    }
    return false;
  }

  delete(element) {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }

  has(element) {
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.keys(this.items).length;
  }

  values() {
    return Object.values(this.items)
  }

  union(otherSet) {
    const unionSet = new MySet();
    this.values().forEach(item => unionSet.add(item));
    otherSet.values().forEach(item => unionSet.add(item));
    return unionSet
  }

  intersection(otherSet) {
    const interSet = new MySet();
    this.values().forEach(item => {
      if (otherSet.has(item)) {
        interSet.add(item);
      }
    })
  }

  difference(otherSet) {
    const differSet = new MySet();
    this.values().forEach(item => {
      if (!otherSet.has(item)) {
        differSet.add(item);
      }
    })
  }

  isSubsetOf(otherSet) {
    return this.values().every(otherSet.has.bind(otherSet))
  }
}