## DOM
### Node
1. Node类型

Node类型可以使用nodeType属性来进行分别
- 1 Element 代表元素
- 2 Attr 代表属性
- 3 Text 代表文本元素或者属性中的文本内容
- 4 CDATASelection 代表文档中的CDATA部分
- 5 EntityReference 代表实体引用
- 6 Entity 代表实体
- 7 ProcessingInstruction 代表处理指令
- 8 Comment 代表注释
- 9 Document 代表整个文档(DOM树的根节点)
- 10 DocumentType 向为文档定义的实体提供接口
- 11 DocumentFragment 代表轻量级的 Document 对象,能够容纳文档的某个部分
- 12 Notation 代表DTD中声明的符号

2. nodeName和nodeValue

对于元素节点,nodeName始终都为它的标签名,nodeValue始终都为null


3. 节点关系

- childNodes 所有节点之间都有一个childNodes属性,其中保存着一个NodeList对象。NodeList是一种类数组对象,用于保存一组有序的节点,可以通过位置来访问这些节点
- parentNode 每个节点都有一个parentNode属性,该属性指向文档树中的父节点。包含在childNodes中的节点都具有相同的父节点
- prveiousSibling 代表了这个节点的上一个兄弟节点,列表的第一个节点的prveiousSibling为null
- nextSibling 代表了这个节点的下一个兄弟节点,列表的最后一个节点的nextSibling为null
- firstChild 代表了该节点的第一个子节点,如果没有子节点则为null
- lastChild 代表了该节点的最后一个子节点,如果没有子节点则为null

4. 操作节点
- appendChild() 用于在childNodes末尾添加一个节点。添加之后,childNodes的新增节点、父节点以及以前最后一个子节点的关系指针都会得到更新。
- insertBefore() 如果需要把节点放在childNodes列表中的某个特殊位置上,而不是放在末尾,那么可以使用这个方法,一般是`father.insertBefore(newItem,newNextItem)`
- relplaceChild() 将第一个子节点移出,然后换成第二个子节点`father.replaceChild(removeItem,newItem)`
- cloneNode() 用于创建调用这个方法的节点的一个完全相同的副本。cloneNode方法接收一个布尔值参数,表示是否执行深复制,否则则是浅复制`clone = node.cloneNode()`
5. 获取节点
- document.getElementById()
- document.getElementsByTagName()
- document.getElementsByName()
- document.querySelector()
- document.querySelectorAll()