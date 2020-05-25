const { Colors, initializeColor } = require('./color')
const { Queue } = require('../queue/index');
const graph = require('./index');
function BFS(graph, startVertex, callback) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const queue = new Queue();
  queue.enqueue(startVertex);
  while (!queue.isEmpty()) {
    const u = queue.dequeue();
    const nighbors = adjList.get(u);
    color[u] = Colors.GRAY;
    for (let i = 0; i < nighbors.length; i++) {
      const element = nighbors[i];
      if (color[element] === Colors.WHITE) {
        queue.enqueue(element);
        color[element] = Colors.GRAY;
      }
    }
    color[u] = Colors.BLACK;
    if (typeof callback === 'function') {
      callback(u);
    }
  }
}

BFS(graph, graph.getVertices()[0], (i) => console.log('visted vertex ' + i))


module.exports = BFS;