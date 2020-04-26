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

      if(item.left) {
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

