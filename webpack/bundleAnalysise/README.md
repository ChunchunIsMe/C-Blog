## 打包产物分析
### 开始
如果我们要分析打包产物的话,我们肯定需要搭建环境的,首先初始化npm、再安装webpack
```
npm init -y
npm i webpack webpack-cli -D
```
然后在目录下随便写三个文件index.js、test.js、useTest.js
```
// index.js
console.log('aa');
// test.js
export default 'aa'
// useTest.js
import a from './test';
console.log(a);
```
再简单配置一下webpack.config.js
```
const path = require('path');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'index.js'),
    test: path.resolve(__dirname, 'test.js'),
    useTest: path.resolve(__dirname, 'useTest.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: 'development'
}
```
执行
```
npx webpack
```
我们就可以看到 dist 文件夹下有三个打包产物了
### 分析
首先看 index.js 的打包产物,它其实就是一个自调用函数
```
(function (modules) {
  // ...
})({
  "./index.js": (function (module, exports) {
        eval("console.log('llc');\n\n//# sourceURL=webpack:///./index.js?");
  })
})
```
自调用函数传入了一个对象,对象中存在属性'./index.js'值为函数,函数使用 eval