## 二叉堆
二叉堆是一种特殊的二叉树,拥有以下两个特性

1. 他是一棵完整二叉树,表示树的每一层都有左侧和右侧子节点(除了最后一层的叶节点),并且最后一层的叶节点尽可能都是左侧子节点,这叫做结构特性
2. 二叉堆不是最小堆就是最大堆,最小堆允许你快速导出树的最小值,最大堆允许你快速导出树的最大值。所有的节点都大于等于(最大堆)或小于等于(最小堆)每个它的子节点

- [最小堆](./MinHeap.js)
- 最大堆就是把最小堆的逻辑反一下就行了
- 堆排序就是一直导出二叉堆的最顶端元素就ok了