const { addSearchTreeNode, RemoveSearchTreeNode } = require('../searchTree/searchTree');

function getNodeHeight(node) {
  if (node == null) {
    return 0;
  }
  let left = 0, right = 0;
  if (node.left) {
    left = getNodeHeight(node.left)
  }
  if (node.right) {
    right = getNodeHeight(node.right)
  }
  return Math.max(left, right) + 1;
}

function getBalance(node) {
  return getNodeHeight(node.left) - getNodeHeight(node.right);
}

function LL(node) {
  const temp = node.left;
  node.left = temp.right;
  temp.right = node;
  return temp;
}

function RR(node) {
  const temp = node.right;
  node.right = temp.left;
  temp.left = node;
  return temp;
}

function RL(node) {
  node.left = RR(node.left);
  return LL(node);
}

function LR(node) {
  node.right = LL(node.right);
  return RR(node);
}

function balanceTree(node) {
  const balance = getBalance(node);
  if (balance < -1) {
    const rightBalance = getBalance(node.right);
    if (rightBalance < -1) {
      node.right = balanceTree(node.right);
    } else if (rightBalance <= 0) {
      node = RR(node);
    } else {
      node = LR(node);
    }
  } else if (balance > 1) {
    const leftBalance = getBalance(node.left);
    if (leftBalance > 1) {
      node.left = balanceTree(node.left);
    } else if (leftBalance >= 0) {
      node = LL(node);
    } else {
      node = RL(node);
    }
  }
  return node;
}

function insertNode(node, value) {
  if (node == null) {
    return { value, left: undefined, right: undefined }
  }
  addSearchTreeNode(node, value);
  return balanceTree(node);
}

let a = insertNode(null, 70);
a = insertNode(a, 50);
a = insertNode(a, 80);
a = insertNode(a, 72);
a = insertNode(a, 90);
console.log(a);
a = insertNode(a, 75);
console.log(a);