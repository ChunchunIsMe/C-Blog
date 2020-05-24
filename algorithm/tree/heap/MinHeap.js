
class MinHeap {
  constructor() {
    this.heap = [];
  }

  getLeftIndex(index) {
    return index * 2 + 1;
  }

  getRightIndex(index) {
    return index * 2 + 2;
  }

  getParentIndex(index) {
    if (index === 0) {
      return undefined;
    }

    return Math.floor((index - 1) / 2);
  }

  insert(value) {
    if (value != null) {
      this.heap.push(value);
      this.siftUp(this.heap.length - 1);
      return true;
    }
    return false;
  }

  siftUp(index) {
    if (index === 0) {
      return;
    }
    const parentIndex = this.getParentIndex(index);
    const value = this.heap[index];
    const parentValue = this.heap[parentIndex];
    if (parentValue > value) {
      this.heap[index] = parentValue;
      this.heap[parentIndex] = value;
      this.siftUp(parentIndex);
    }
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  findMinimum() {
    return this.heap[0];
  }

  extract() {
    if (this.isEmpty()) {
      return undefined;
    }

    if (this.size() === 1) {
      return this.heap.shift();
    }

    const value = this.heap.shift();
    this.heap.unshift(this.heap.pop());
    this.siftDown(0);
    return value;
  }

  siftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    let element = index;
    if (leftIndex < this.size() && this.heap[element] > this.heap[leftIndex]) {
      element = leftIndex;
    }

    if (rightIndex < this.size() && this.heap[element] > this.heap[rightIndex]) {
      element = rightIndex;
    }

    if (element !== index) {
      const temp = this.heap[index];
      this.heap[index] = this.heap[element];
      this.heap[element] = temp;
      this.siftDown(element);
    }
  }
}

// 堆排序
const arr = [5, 6, 4, 2, 8, 1, 10, 7];
const result = [];
const minHeap = new MinHeap();
for (let i = 0; i < arr.length; i++) {
  const element = arr[i];
  minHeap.insert(element);
}

while (minHeap.size()) {
  result.push(minHeap.extract());
}

console.log(result);