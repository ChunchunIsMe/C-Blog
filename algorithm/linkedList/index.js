function defaultEquals(a, b) {
  return a === b;
}

class Node {
  constructor(element) {
    this.element = element;
    this.next = undefined;
  }
}

class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next, prev);
    this.next = next;
    this.prev = prev;
  }
}

export class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0;
    this.head = undefined;
    this.equalsFn = equalsFn;
  }

  push(element) {
    const node = new Node(element);
    if (this.head === undefined) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
    return true;
  }

  insert(element, position) {
    if (position > 0 && position <= this.count) {
      const node = new Node(element);
      if (position === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  getElementAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      for (let i = 1; i <= index; i++) {
        current = current.next;
      }
      return current;
    }
    return undefined;
  }

  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.count && current !== undefined; i++) {
      if (this.equalsFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  removeAt(index) {
    if (index > 0 && index < this.count) {
      if (index === 0) {
        this.head = this.head.next;
      } else {
        const previous = this.getElementAt(index - 1);
        previous.next = previous.next.next;
      }
      this.count--;
      return true;
    }
    return false;
  }

  isEmpty() {
    return this.count === 0
  }

  size() {
    return this.count;
  }

  toString() {
    let current = this.head;
    let str = `${current.element}`;
    for (let i = 1; i < this.count && current !== undefined; i++) {
      current = current.next;
      str += `,${current.element}`;
    }
    return str;
  }
}

class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
    this.tail = undefined;
  }

  push(element) {
    const node = new DoublyNode(element);
    if (this.head === undefined) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
      node.prev = current;
    }
    this.tail = node;
    this.count++;
    return true
  }

  insert(element, position) {
    const node = new DoublyNode(element);
    if (position === 0) {
      if (this.head) {
        this.head.prev = node;
        node.prev = this.head;
      }
      this.head = node;
    } else if (position === this.count - 1) {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    } else {
      const prev = super.getElementAt(position - 1);
      const next = prev.next;
      prev.next = node;
      node.prev = prev;
      node.next = next;
      next.prev = node;
    }
    this.count++;
    return true;
  }

  removeAt(index) {
    if (index > 0 && index < this.count) {
      if (index === 0) {
        this.head = this.head.next;
        this.head.prev = undefined;
      } else if (index === this.count - 1) {
        this.tail = this.tail.prev;
        this.tail.next = undefined;
      } else {
        const previous = this.getElementAt(index - 1);
        previous.next.next.prev = previous;
        previous.next = previous.next.next;
      }
      this.count--;
      return true;
    }
    return false;
  }

  remove(element) {
    const index = super.indexOf(element);
    return this.removeAt(index);
  }
}