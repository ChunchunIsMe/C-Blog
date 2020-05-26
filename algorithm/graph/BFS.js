const { Colors, initializeColor } = require('./color')
const { Queue } = require('../queue/index');
const { graph } = require('./index');
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


// 使用BFS寻找最短路径-用于无权,如果要计算加权图最短路径深度优先更加适合
function BFSDistance(graph, startVertex) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const distance = {};
  const predecessors = {}
  const queue = new Queue();
  for (let i = 0; i < vertices.length; i++) {
    const element = vertices[i];
    distance[element] = 0;
    predecessors[element] = null;
  }
  queue.enqueue(startVertex);
  while (!queue.isEmpty()) {
    const u = queue.dequeue();
    const nighbors = adjList.get(u);
    color[u] = Colors.GRAY;
    for (let i = 0; i < nighbors.length; i++) {
      const element = nighbors[i];
      if (color[element] === Colors.WHITE) {
        queue.enqueue(element);
        distance[element] = distance[u] + 1;
        predecessors[element] = u;
        color[element] = Colors.GRAY;
      }
    }
    color[u] = Colors.BLACK;
    if (typeof callback === 'function') {
      callback(u);
    }
  }
  console.log(distance, predecessors)
  return { distance, predecessors };
}

BFS(graph, graph.getVertices()[0], (i) => console.log('visted vertex ' + i))
BFSDistance(graph, graph.getVertices()[0]);

module.exports = BFS;