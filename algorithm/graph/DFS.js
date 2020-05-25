const { Colors, initializeColor } = require('./color')
const graph = require('./index');

function DFS(graph, startVertex, callback) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  function depthFirstSearchVisit(u) {
    const neighbors = adjList.get(u);
    color[u] = Colors.GRAY
    for (let i = 0; i < neighbors.length; i++) {
      const element = neighbors[i];
      if (color[element] === Colors.WHITE) {
        depthFirstSearchVisit(element);
      }
    }
    callback(u);
    color[u] = Colors.BLACK;
  }
  depthFirstSearchVisit(startVertex)
}

DFS(graph, graph.getVertices()[0], (i) => console.log('visted vertex ' + i))