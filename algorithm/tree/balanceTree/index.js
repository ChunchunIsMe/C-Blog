const { addSearchTreeNode, RemoveSearchTreeNode } = require('../searchTree/searchTree');

function RR(node) {
  const temp = node.left;
  node.left = temp.right;
  temp.right = node;
  return temp;
}

function LL(node) {
  const temp = node.right;
  node.right = temp.left;
  temp.left = node;
  return temp;
}

function RL(node) {
  node.right = RR(node.right);
  return LL(node);
}

function LR(node) {
  node.left = LL(node.left);
  return RR(node);
}


function getHeight(node) {
  if (node == undefined) {
    return 0;
  }
  if (node.left == undefined && node.right == undefined) {
    return 1;
  }
  return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
}

function getBalance(node) {
  if (node == undefined) {
    return 0;
  }
  return getHeight(node.left) - getHeight(node.right);
}

function balanceTree(node, father = null) {
  const balance = getBalance(node);
  const fatherBalance = getBalance(father);
  if (balance > 1) {
    if (fatherBalance < -1) {
      father.right = RL(node)
    } else {
      node = balanceTree(node.left, node);
    }
  } else if (balance < -1) {
    if (fatherBalance > 1) {
      father.left = LR(node);
    } else {
      node = balanceTree(node.right, node);
    }
  } else {
    if (father === null) {
      return node;
    } else {
      if (balance > 0 && fatherBalance > 1) {
        return RR(node)
      } else if (balance < 0 && fatherBalance < -1) {
        return LL(node);
      } else if (balance > 0 && fatherBalance < 0) {
        return RL(node)
      } else if (balance < 0 && fatherBalance > 0) {
        return LR(node);
      }
    }
  }
  return node;
}

function addBalanceNode(head, value) {
  head = addSearchTreeNode(head, value);
  head = balanceTree(head);
  return head;
}

function removeBalanceNode(head, value) {
  head = removeBalanceNode(head, value);
  head = balanceTree(head);
  return head;
}

const a = addBalanceNode(undefined, 1)
addBalanceNode(a, 2)
addBalanceNode(a, 3)
addBalanceNode(a, 4)
addBalanceNode(a, 5)
addBalanceNode(a, 6)
addBalanceNode(a, 7)
addBalanceNode(a, 8)
addBalanceNode(a, 9)
addBalanceNode(a, 10)
console.log(a);

