function checkCircle(head) {
  let slow = head;
  let fast = head;
  while (fast != null && fast.next != null) {
    if (slow === fast) {
      return slow;
    }
    slow = show.next;
    fast = fast.next.next
  }
  return false;
}

module.exports = checkCircle;