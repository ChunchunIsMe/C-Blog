// 先说一下数的三种遍历方式 
// 前序: 中左右
// 中序: 左中右
// 后序: 左右中
class Tree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  setLeft(node) {
    this.left = node;
  }
  setRight(node) {
    this.right = node;
  }

  static preOrderCallback(node, callback) {
    callback(node);
    if (node.left) {
      this.preOrderCallback(node.left)
    }
    if (node.right) {
      this.preOrderCallback(node.right)
    }
  }

  static preOrderCircle(node, callback) {
    var stash = [node];
    while (stash.length > 0) {
      var item = stash.pop();
      callback(item);
      if (item.right) {
        stash.push(item.right)
      }

      if (item.left) {
        stash.push(item.left)
      }
    }
  }

  static midOrderCallback(node, callback) {
    if (node.left) {
      this.midOrderCallback(node.left)
    }
    callback(node);
    if (node.right) {
      this.midOrderCallback(node.right)
    }
  }

  // static midOrderCircle(node, callback) {
  //   const stash = [node];
  //   while (stash.length) {
  //     if(stash[length-1].right) {
  //       stash.push(right)
  //     }
  //     if(stash[length-1].left) {
  //       stash.unshift(left)
  //     }
      
  //   }
  // }

  static afterOrderCallback(node, callback) {
    if (node.left) {
      this.midOrderCallback(node.left)
    }
    if (node.right) {
      this.midOrderCallback(node.right)
    }
    callback(node);
  }

}

// 知道前序遍历和中序遍历重建树

function getTree(start, mid) {
  if (!(start.length && mid.length)) {
    return null;
  }
  const value = start[0];
  const midIndex = mid.indexOf(start[0]);
  const leftStart = start.slice(1, 1 + midIndex);
  const leftMid = mid.slice(0, midIndex);
  const rightStart = start.slice(1 + midIndex);
  const rightMid = mid.slice(midIndex + 1);
  const left = getTree(leftStart, leftMid);
  const right = getTree(rightStart, rightMid);
  return {
    value,
    left,
    right
  }
}

const node = getTree([1, 2, 4, 7, 3, 5, 6, 8], [4, 7, 2, 1, 5, 3, 8, 6]);

// 知道后序遍历和中序遍历同理

// 但是知道后续遍历和前序遍历树 如果是有节点单边的时候无法确定子节点是左子节点还是右子节点