function addSearchTreeNode(head, value) {
  if (head === undefined) {
    return { value, left: undefined, right: undefined }
  }
  if (head.value > value) {
    if (head.left) {
      addSearchTreeNode(head.left, value)
    } else {
      head.left = { value, left: undefined, right: undefined }
    }
  } else {
    if (head.right) {
      addSearchTreeNode(head.right, value)
    } else {
      head.right = { value, left: undefined, right: undefined }
    }
  }
  return head;
}

function RemoveSearchTreeNode(head, value) {
  let current = head;
  let father = null;
  let type = ''
  while (current != undefined && current.value !== value) {
    if (current.value > value) {
      current = current.left
      father = current;
      type = 'left'
    } else if (current.value < value) {
      current = current.right;
      father = current;
      type = 'right'
    } else {
      break;
    }
  }


  if (current !== head && current.left == undefined) {
    father[type] = current.right;
  } else if (current !== head && current.right == undefined) {
    father[type] = current.left;
  } else {
    let child = current.right;
    let parent = current;

    while (child.left != undefined) {
      parent = child;
      child = child.left;
    }
    if (parent === current) {
      current.value = child.value;
      current.right = current.right.right;
    } else {
      current.value = child.value;
      parent.left = undefined;
    }
  }

  return head;
}

module.exports = {
  addSearchTreeNode,
  RemoveSearchTreeNode
}