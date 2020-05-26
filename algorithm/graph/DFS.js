const { Colors, initializeColor } = require('./color')
const { graph, Graph } = require('./index');

function DFS(graph, callback) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  function depthFirstSearchVisit(u) {
    const neighbors = adjList.get(u);
    color[u] = Colors.GRAY
    debugger;
    for (let i = 0; i < neighbors.length; i++) {
      const element = neighbors[i];
      if (color[element] === Colors.WHITE) {
        depthFirstSearchVisit(element);
      }
    }
    callback(u);
    color[u] = Colors.BLACK;
  }
  // 用循环可以深度有向图
  for (let i = 0; i < vertices.length; i++) {
    const element = vertices[i];
    if (color[element] === Colors.WHITE) {
      depthFirstSearchVisit(element)
    }
  }

}


// DFS的探索时间和发现时间
function DFSTime(graph) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  let time = 0;
  const d = {}, f = {}, p = {};
  for (let i = 0; i < vertices.length; i++) {
    const element = vertices[i];
    d[element] = 0;
    f[element] = 0;
    p[element] = null;
  }
  function depthFirstSearchVisit(u) {
    const neighbors = adjList.get(u);
    color[u] = Colors.GRAY
    d[u] = ++time;
    debugger;
    for (let i = 0; i < neighbors.length; i++) {
      const element = neighbors[i];
      if (color[element] === Colors.WHITE) {
        p[element] = u;
        depthFirstSearchVisit(element);
      }
    }
    f[u] = ++time;
    color[u] = Colors.BLACK;
  }

  for (let i = 0; i < vertices.length; i++) {
    const element = vertices[i];
    if (color[element] === Colors.WHITE) {
      depthFirstSearchVisit(element)
    }
  }

  for (let i = 0; i < vertices.length; i++) {
    const element = vertices[i];
    console.log(`${p[element]}-${element}-${d[element]}/${f[element]}`)
  }
  return {
    discovery: d,
    finished: f,
    predecessors: p
  }
}

// 拓扑排序
// 需要编排一些任务或者步骤的执行顺序时,这称为拓扑排序
// 我们可以通过倒序排序完成时间 finished 来得到拓扑排序,得到我们任务的流程
// 比如存在有向图
const graph1 = new Graph(true);
const list = ['a', 'b', 'c', 'd', 'e', 'f'];
graph1.addEdge('a', 'c') // 先完成a才能做c
graph1.addEdge('a', 'd') // 完成a才能做d
graph1.addEdge('b', 'd') // ...
graph1.addEdge('b', 'e')
graph1.addEdge('c', 'f')
graph1.addEdge('f', 'e')

// 我们不可能直接先做e对吧,所以我们可以用他们的深度优先遍历的完成时间来获取它的拓扑排序


// DFS(graph, (i) => console.log('visted vertex ' + i))
DFSTime(graph)