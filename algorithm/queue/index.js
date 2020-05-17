class Queue {
  constructor() {
    this.count = 0;
    this.lowerCount = 0;
    this.items = {};
  }

  enqueue(item) {
    this.items[this.count + this.lowerCount] = item;
    this.count++;
  }

  dequeue() {
    const result = this.items[this.lowerCount];
    delete this.items[this.lowerCount++];
    this.count--;
    return result;
  }

  peek() {
    return this.items[this.lowerCount];
  }

  isEmpty() {
    return this.count === 0
  }

  size() {
    return this.count
  }

  clear() {
    this.count = 0;
    this.lowerCount = 0;
    this.items = {};
  }

  toString() {
    const midArr = { ...this.items, length: this.count + this.lowerCount };
    return Array.from(midArr).filter(item => item !== undefined).toString()
  }
}


class DoubleQueue {
  constructor() {
    this.count = 0;
    this.lowerCount = 0;
    this.items = {};
  }

  addFront(item) {
    if (this.isEmpty()) {
      this.addBack(item);
    } else if (this.lowerCount > 0) {
      this.items[--this.lowerCount] = item;
      this.count++;
    } else {
      const midArr = Array.from({ ...this.items, length: this.count + this.lowerCount });
      midArr.unshift(item);
      this.items = { ...midArr };
      this.count++;
    }
  }

  addBack(item) {
    this.items[this.count + this.lowerCount] = item;
    this.count++;
  }

  removeFront() {
    const result = this.items[this.lowerCount];
    delete this.items[this.lowerCount++];
    this.count--;
    return result;
  }

  removeBack() {
    const result = this.items[this.lowerCount + this.count - 1];
    delete this.items[this.lowerCount + this.count];
    this.count--;
    return result;
  }

  peekFront() {
    return this.items[this.lowerCount];
  }

  peekBack() {
    return this.items[this.count + this.lowerCount];
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }

  clear() {
    this.count = 0;
    this.lowerCount = 0;
    this.items = {};
  }

  toString() {
    const midArr = { ...this.items, length: this.count + this.lowerCount };
    return Array.from(midArr).filter(item => item !== undefined).toString()
  }
}


module.exports = {
  Queue,
  DoubleQueue
}