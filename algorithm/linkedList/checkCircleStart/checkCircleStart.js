const checkCircle = require('../checkCircle/index');
function checkCircleStart(head) {
  const current1 = head;
  const current2 = checkCircle(head);

  while(1) {
    if(current1===current2) {
      return current1;
    }
    current1 = current1.next;
    current2 = current2.next;
  }
}

module.exports = checkCircleStart;