const { DoubleQueue } = require('./index');

function plindromeChecker(str) {
  if (!str && typeof str !== 'string') {
    return false;
  }
  const queue = new DoubleQueue();
  const lowerStr = str.split(' ').join('').toLocaleLowerCase();
  let result = true;
  for (let i = 0; i < lowerStr.length; i++) {
    queue.addBack(lowerStr[i]);
  }

  while (queue.size() > 1 && result) {
    const start = queue.removeBack();
    const end = queue.removeFront();
    if (start === end) {
      continue;
    } else {
      result = false;
      break;
    }
  }
  return result;
}

console.log(plindromeChecker('1234321'));