const Dictionary = require('../map/index')

class Graph {
  constructor(isDirected = false) {
    // 表示是否有向 默认无向
    this.isDirected = isDirected;
    // 顶点列表
    this.vertices = [];
    // 邻接表
    this.adjList = new Dictionary();
  }

  // 新增节点
  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  // 建立两点连线
  addEdge(v, w) {
    if (!this.adjList.get(v)) {
      this.addVertex(v)
    }

    if (!this.adjList.get(w)) {
      this.addVertex(w);
    }
    if (!this.adjList.get(v).includes(w)) {
      this.adjList.get(v).push(w);
    }
    if (!this.isDirected) {
      if (!this.adjList.get(w).includes(v)) {
        this.adjList.get(w).push(v);
      }
    }
  }

  // 返回顶点列表
  getVertices() {
    return this.vertices;
  }
  // 返回邻接表
  getAdjList() {
    return this.adjList;
  }
  // 展示
  toString() {
    let s = '';
    for (let i = 0; i < this.vertices.length; i++) {
      const element = this.vertices[i];
      s+= `${element} -> ${this.adjList.get(element).join(' ')}\n`
    }
    return s;
  }
}

const graph = new Graph();
const myVertices = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
for (let i = 0; i < myVertices.length; i++) {
  const element = myVertices[i];
  graph.addVertex(element);
}
graph.addEdge('a', 'b');
graph.addEdge('a', 'c');
graph.addEdge('a', 'd');
graph.addEdge('c', 'd');
graph.addEdge('c', 'g');
graph.addEdge('d', 'g');
graph.addEdge('d', 'h');
graph.addEdge('b', 'e');
graph.addEdge('b', 'f');
graph.addEdge('e', 'i');

console.log(graph.toString());

module.exports = graph;

