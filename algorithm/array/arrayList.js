function arrayList(head) {
  var node = head;
  var arr = [];
  while(node) {
    arr.push(node);
    node = node.next;
  }
  return arr.reverse();
}