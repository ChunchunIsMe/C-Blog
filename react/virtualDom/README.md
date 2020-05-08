## 前言
想了解的目的是在读react源码之前先了解一些 react 概念,这样可以

借鉴

1. [你不知道的VirtualDom](https://segmentfault.com/a/1190000016129036)

大佬好强,站在巨人的肩上看世界。
## 准备工作
首先`npm init -y`初始化 npm 之后需要安装`babel`来转化jsx语法
```
npm i @babel/cli @babel/core @babel/plugin-transform-react-jsx @babel/preset-env -D
```
配置`babel`, 创建`.babelrc`文件
```
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "h"
      }
    ]
  ]
}
```
创建 index.js 和 index.html 
```
// index.html
// ...
<body>
  <div id="main"></div>
  <script src="./compiled.js"></script>
  <script>
    var main = document.getElementById('main');
    render(main);
  </script>
</body>
// ...
```
增加 npm 脚本
```
// package.json
// ...
"scripts": {
  "babel": "babel index.js --out-file compiled.js"
},
// ...
```
## 解析JSX
`.babelrc`中使用了`@babel/plugin-transform-react-jsx`插件,插件可传入一个参数`pragma`这个参数传入的值就是jsx解析后将要调用的函数

1. 在`index.js`中创建`h`函数和jsx函数`view`
```
function h(tag, props, ...children) {
  return {
    tag,
    props: props || {},
    children: children || []
  }
}
function view() {
  return (
    <div>
      hello,world
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
  )
}
```
这个时候你在终端输入`npm run babel`在项目的文件夹下就会多出一个`compiled.js`文件,你可以仔细看看JSX都被解析成了什么样子

但是这个时候想要在页面将元素展示出来还是远远不够的,因为我们只将JSX解析成了 VDom,之后我们还需要将 VDom 转换成真正的 dom 元素,这个时候我们就需要 `createElement`方法和`render`函数
```
function setProps(dom, props) {
  // 让后续更好操作
  dom._props = props;
  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      const value = props[key];
      dom.setAttribute(key, value)
    }
  }
}
function createElement(vdom) {
  if (typeof vdom === 'number' || typeof vdom === 'string') {
    return document.createTextNode(vdom);
  }
  const { tag, props, children } = vdom;
  const dom = document.createElement(tag);
  setProps(dom, props);
  children.map(createElement).forEach(dom.appendChild.bind(dom))
  return dom;
}

function render(target) {
  const vdom = view();
  const dom = createElement(vdom);
  target.appendChild(dom);
}
```
这个时候再执行`npm run babel`浏览器打开`index.html`就可以将JSX展示到页面上了

但是这个时候解析的JSX还不够完美,如果你将`li`以循环的方式展现出来
```
const arr = [0, 1, 2, 3, 4, 5]
function view() {
  return (
    <div>
      hello,world
      <ul>
        {
          arr.map(item => (
            <li id="item" class={`li-${item}`}>{i * arr.length}</li>
          ))
        }
      </ul>
    </div>
  )
}
```
这个时候你编译之后发现报错了,原因是`JSX`将`{}`内的值当做一个值来看待了,当`{}`中是一个数组的时候JSX就会返回这个数组给你,所以我们要兼容这种情况,修改`h`函数
```
function h(tag, props, ...children) {
  // 打平 children 数组
  children = children || [];
  children = children.flat(2);
  return {
    tag,
    props: props || {},
    children: children
  }
}
```
然后我们增加一些`style`样式
```
// index.html
<style>
  body {
    margin: 0;
    font-size: 24;
    font-family: sans-serif
  }

  .li-0 {
    background: gray
  }

  .li-1 {
    background: red
  }

  .li-2 {
    background: green
  }

  .li-3 {
    background: yellow
  }

  .li-4 {
    background: purple
  }

  .li-5 {
    background: blue
  }
</style>
```
初步的`JSX`展示就算完成了
## diff
这个时候如果我们需要动态的修改`dom节点`我们就需要将新的`vdom`和旧的相对比,所以我们创建`diff`函数,我们先来考虑新增/删除/替换节点的三种情况
```
// 判断 dom 节点和新的 vdom 是否是同一类型
function isSameType(dom, newVdom) {
  if (dom.nodeType === Node.TEXT_NODE && (typeof newVdom === 'string' || typeof newVdom === 'number')) {
    return dom.nodeValue === newVdom
  }
  if (dom.nodeType === Node.ELEMENT_NODE) {
    return dom.nodeName.toLocaleLowerCase() === newVdom.tag;
  }
  return false;
}

function diff(dom, newVdom, parent) {
  // 如果传入 dom 不存在那就是新增
  if (dom === undefined || dom === null) {
    parent.appendChild(createElement(newVdom))
    return;
  }
  // 如果传入 newVdom 不存在那就是删除
  if (newVdom === undefined || newVdom === null) {
    parent.removeChild(dom);
    return;
  }
  // 如果类型不同那就是直接替换节点
  if (!isSameType(dom, newVdom)) {
    parent.replaceChild(createElement(newVdom), dom);
    return;
  }
}
```
如果碰到类型相同的节点则要替换属性并且对比子节点
```
function diffProps(dom, newVdom) {
  const newProps = { ...dom._props, ...newVdom.props };
  for (const key in newProps) {
    if (newProps.hasOwnProperty(key)) {
      if (newVdom.props[key] === undefined) {
        dom.removeAttribute(key)
      } else {
        dom.setAttribute(key, newProps[key])
      }
    }
  }
}

function diffChild(dom, newVdom, parent) {
  const children = dom.childNodes,
    childLength = children.length;
  const { children: newChildren } = newVdom;
  const newChildLength = newChildren.length;
  const vLength = Math.max(childLength, newChildLength);
  for (let i = 0; i < vLength; i++) {
    diff(children[i], newChildren[i], parent);
  }
}

function diff(dom, newVdom, parent) {
  // 如果传入 dom 不存在那就是新增
  if (dom === undefined || dom === null) {
    parent.appendChild(createElement(newVdom))
    return;
  }
  // 如果传入 newVdom 不存在那就是删除
  if (newVdom === undefined || newVdom === null) {
    parent.removeChild(dom);
    return;
  }
  // 如果类型不同那就是直接替换节点
  if (!isSameType(dom, newVdom)) {
    parent.replaceChild(createElement(newVdom), dom);
    return;
  }
  // 如果类型相同则对比子节点
  if (dom.nodeName.toLocaleLowerCase() === newVdom.tag) {
    diffProps(dom, newVdom);
    diffChild(dom, newVdom, dom);
    return;
  }
  // 如果是文本节点类型相同则不动
  return;
}
```
之后我们增加`task`测试函数并且修改`render`函数
```
function render(target) {
  const vdom = view();
  const dom = createElement(vdom);
  target.appendChild(dom);
  task(target);
}
function task(target) {
  const time = window.setInterval(() => {
    arr.push(arr.length);
    const newVdom = view();
    diff(target.firstChild, newVdom, target);
    if (arr.length >= 20) {
      window.clearInterval(time);
    }
  }, 500)
}
```
执行`npm run babel`后打开`index.html`就可以发现页面在逐渐增加li
## key
当在渲染数组元素的时候,它们一般都有相同的结构,只是内容有些不同而已,比如
```
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
```
这个时候如果将上面的变成下面这种情况,确实很简单,因为只需要在最后插入一个子元素就行了
```
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
```
但是如果要删除第一个元素的时候,之前写的diff就会很浪费性能,比如要变成下面这种情况,如果是之前的diff算法那么每个li节点中的TextNode都需要进行操作,这就很浪费性能了。
```
<ul>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
```
如果有 key 从下面这种情况删除第一个节点就会快很多,我们就可以判断是只需要删除第一个元素即可
```
<ul>
  <li key="1">1</li>
  <li key="2">2</li>
  <li key="3">3</li>
  <li key="4">4</li>
</ul>
```
所以我们来修改我们的diff
```

```