function searchTree(head, value) {
  if (head === undefined) {
    return { value, left: undefined, right: undefined }
  }
  if (head.value > value) {
    if (head.left) {
      searchTree(head.left, value)
    } else {
      head.left = { value, left: undefined, right: undefined }
    }
  } else {
    if (head.right) {
      searchTree(head.right, value)
    } else {
      head.right = { value, left: undefined, right: undefined }
    }
  }
}