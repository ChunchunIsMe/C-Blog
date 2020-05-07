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

但是这个时候想要在页面将元素展示出来还是远远不够的,因为我们只将JSX解析成了 VDom,之后我们还需要将 VDom 转换成真正的 dom 元素,这个时候我们就需要 createElement 方法和 render 函数
```
function createElement(vdom) {
  if (typeof vdom === 'number' || typeof vdom === 'string') {
    return document.createTextNode(vdom);
  }
  const { tag, props, children } = vdom;
  const dom = document.createElement(tag);
  setProps(dom, props);
  children.map(createElement).forEach((item) => {
    dom.appendChild(item)
  })
  return dom;
}

function render(target) {
  const vdom = view();
  const dom = createElement(vdom);
  target.appendChild(dom);
}
```
这个时候再执行`npm run babel`浏览器打开`index.html`就可以将JSX展示到页面上了