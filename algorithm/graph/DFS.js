const { Colors, initializeColor } = require('./color')
const { graph, Graph } = require('./index');

function DFS(graph, callback) {
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

// 最小路径算法之 Floyd(弗洛伊德算法-动态规划算法)
// Floyd(弗洛伊德算法)
// 计算图中 i-j 最短路径 我们只需要对比i-k-j的距离是否小于 i-j 的距离即可 所以我们第一层循环固定中点k 第二层循环找节点 i 第三层找 j
function Floyd(array) {

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      for (let k = 0; k < array.length; k++) {
        if (array[j][i] + array[i][k] < array[j][k]) {
          array[j][k] = array[j][i] + array[i][k];
        }
      }
    }
  }
  return array;
}
const INF = Number.MAX_SAFE_INTEGER;
// const arr = Floyd([
//   [0, 1, INF, 1, INF],
//   [1, 0, INF, INF, 1],
//   [INF, INF, 0, 4, 4],
//   [1, INF, 4, 0, INF],
//   [INF, 1, 4, INF, 0]
// ])
// const arr = Floyd([
//   [0, INF, INF, 1, INF],
//   [1, 0, INF, INF, INF],
//   [INF, INF, 0, INF, 4],
//   [INF, INF, 4, 0, INF],
//   [INF, 1, INF, INF, 0]
// ])

// Dijkstra(迪杰斯特拉算法-贪心算法)
// 计算点 i-j的最短距离
// 先将 i 到所有点的距离设置一个数组,[INF,...0,...,INF];第i位为0，意思是他距离自己为0,距离其他暂时先全为无限大
// 开始从这个数组中找 i 到所有点距离最小的点 找到他本身,然后我们就可以在数组中赋值邻接 i 的点的距离
// 第二步骤找到没有访问过找到 i 到所有点距离最小的点,且没有访问过的点,以这个点为中点遍历整个图获取通过 这个点 走到其他点的距离如果更小将该点到i的距离设为该值
// 重复2直到遍历完数组
// 最后数组的结果就是i到所有点的最短路径
// 其实就是佛洛伊算法的简化版
function findMin(dist, visted) {
  let min = undefined;
  for (let i = 0; i < dist.length; i++) {
    const element = dist[i];
    if (!visted[i]) {
      if (min == null) {
        min = i
      } else {
        if (dist[i] < dist[min]) {
          min = i;
        }
      }
    }
  }
  return min;
}
function Dijkstra(array, src) {
  const dist = [];
  const visted = [];

  for (let i = 0; i < array.length; i++) {
    if (i === src) {
      dist[i] = 0;
    } else {
      dist[i] = INF;
    }
    visted[i] = false;
  }
  let j = findMin(dist, visted);
  visted[j] = true;
  while (j != null) {
    for (let k = 0; k < dist.length; k++) {
      if (dist[j] + array[j][k] < dist[k]) {
        dist[k] = dist[j] + array[j][k];
      }
    }
    j = findMin(dist, visted)
    visted[j] = true;
  }
  return dist;
}

// const arr = Dijkstra([
//   [0, 1, INF, 1, INF],
//   [1, 0, INF, INF, 1],
//   [INF, INF, 0, 4, 4],
//   [1, INF, 4, 0, INF],
//   [INF, 1, 4, INF, 0]
// ], 0)
// const arr = Dijkstra([
//   [0, INF, INF, 1, INF],
//   [1, 0, INF, INF, INF],
//   [INF, INF, 0, INF, 4],
//   [INF, INF, 4, 0, INF],
//   [INF, 1, INF, INF, 0]
// ], 0)
// DFS(graph, (i) => console.log('visted vertex ' + i))
// DFSTime(graph)

// 求最小生成树,实际运用有: 有4个村庄,他们的联通是一张图,我们要用最少的距离将四个村庄连接起来,建造马路,这就是最小生成树

// prim(普里姆算法-贪心)
// prim算法和dijkstra算法很相似就不说了

function prim(array) {
  const dist = [];
  const visted = [];
  const parent = [];
  for (let i = 0; i < array.length; i++) {
    dist[i] = INF;
    visted[i] = false;
  }
  dist[0] = 0;
  parent[0] = 0;
  let j = findMin(dist, visted)
  visted[0] = true;
  while (j != null) {
    for (let k = 0; k < dist.length; k++) {
      if (dist[k] > array[j][k]) {
        dist[k] = array[j][k];
        parent[k] = j;
      }
    }
    j = findMin(dist, visted);
    visted[j] = true;
  }
  return parent;
}
// const arr = prim([
//   [0, 1, INF, 1, INF],
//   [1, 0, INF, INF, 1],
//   [INF, INF, 0, 4, 4],
//   [1, INF, 4, 0, INF],
//   [INF, 1, 4, INF, 0]
// ])
// const arr = prim([
//   [0, INF, INF, 1, INF],
//   [1, 0, INF, INF, INF],
//   [INF, INF, 0, INF, 4],
//   [INF, INF, 4, 0, INF],
//   [INF, 1, INF, INF, 0]
// ])

// kruskal(克鲁斯卡尔算法-贪心)
// 和prim算法不一样的贪心,prim是找点的最短边的贪心,kruskal是找图的最短边,如果最短边的两点已经存在舍弃该边,直到找到所有点
// 这个算法还需要计算环路,比prim繁琐好多,不想做了,知道prim这个算法很简单的
console.log(arr);