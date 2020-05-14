const items = Symbol('items');
const count = Symbol('count');
class Stack {
  constructor() {
    this[items] = []
  }

  push(e) {
    this[items].push(e)
  }

  pop() {
    return this[items].pop()
  }

  peek() {
    return this[items][this[items].length - 1];
  }

  isEmpty() {
    return this[items].length === 0;
  }

  clear() {
    this[items] = [];
  }

  size() {
    return this[items].length;
  }
}

class ObjStack {
  constructor() {
    this[count] = 0;
    this[items] = {};
  }

  push(e) {
    this[items][this[count]++] = e;
  }

  pop(e) {
    const popVal = this[items][this[count] - 1];
    delete this[items][this[count]--];
    return popVal;
  }
  peek() {
    return this[items][this[count] - 1];
  }
  isEmpty() {
    return this[count] === 0
  }

  clear() {
    this[items] = {};
    this[count] = 0;
  }

  size() {
    return this[count];
  }

  toString() {
    return Array.from({ ...this[items], length: this[count] }).toString();
  }
}
var sta = new Stack()
Object.getOwnPropertySymbols(sta);