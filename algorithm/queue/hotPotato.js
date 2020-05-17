const { Queue } = require('./index');

function hotPotato(elementsList, num) {
  const queue = new Queue();
  const result = [];
  for (let i = 0; i < elementsList.length; i++) {
    queue.enqueue(elementsList[i]);
  }

  while (queue.size() > 1) {
    for (let j = 1; j < num; j++) {
      queue.enqueue(queue.dequeue())
    }
    result.push(queue.dequeue());
  }
  return {
    winner: queue.dequeue(),
    eliminated: result
  }
}

const test = [1, 2, 3, 4, 5, 6, 7];
const result = hotPotato(test, 2);
result.eliminated.forEach(item => { console.log(`${item}被淘汰`) });
console.log(`胜利者是${result.winner}`);