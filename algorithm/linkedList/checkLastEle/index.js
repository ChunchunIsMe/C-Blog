function checkLastEle(head, k) {
  let slow = head;
  let fast = head;
  for (let i = 0; i < k; i++) {
    fast = fast.next;
  }
  while (fast != null) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow;
}