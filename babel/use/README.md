## babel的简单使用

### babel是什么
官方解释: babel是一个 JavaScript 编译器. 就像很多编译器一样它会经过三步: parsing(解析), transforming(转换), printing(生成)

基本原理: 将源码转化为抽象语法树(AST),然后对语法树进行处理生成新的语法树,最后生成新的 JS 代码
### 配置文件
1. babel.config.json
2. .babelrc
3. package.json

```
// babel.config.json 或者 .babelrc
{
  presets: [...],
  plugins: [...]
}

// package.json
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    "presets": [ ... ],
    "plugins": [ ... ],
  }
}
```


### 使用
运行babel必须安装 @babel/cli @babel/core

1. @babel/cli

@babel/cli 是 Babel 提供的内建命令行工具。babel 推荐将其安装在项目下, 因为不同的项目可能拥有不同的运行环境。

2. @babel/core

@babel/cli 运行时依赖 @babel/core 这是 babel 的核心代码

安装之后在`package.json`中的`script`中配置脚本
```
"babel": "babel app.js -o ./dist/app.js"
```
### plugins
babel中的插件用来转换你的代码。比如 `@babel/plugin-transform-arrow-functions` 安装完成之后进行配置
```
// .babelrc
{
  "plugins": ["@babel/plugin-transform-arrow-functions"]
}
```
接下来就可以使用 `npm run babel` 来将箭头函数转换了

#### 插件顺序
- 插件在 Presets 前运行
- 插件的顺序是从前往后运行的
- Presets的顺序是从后往前运行的

#### 插件参数
plugin 和 preset 都可以接收参数, 参数由插件名和参数对象组成一个数组, 可以在文件中设置
```
// .babelrc
{
  "plugins": [["@babel/plugin-transform-arrow-functions", { "spec": true }]]
}
```
上面这种就给 `@babel/plugin-transform-arrow-functions` 插件设置了一个参数

### preset
如果想要设置多种转义的`babel`那么一个个插件设置这样太困难了, 这个时候就出现了`preset`其实`preset`就是一大堆`插件的集合`你写过一个`preset`之后你就知道`preset`是什么了
```
module.exports = () => {
  return {
    presets: [
      require("@babel/preset-env"),
    ],
    plugins: [
      [require("@babel/plugin-proposal-class-properties"), { loose: true }],
      require("@babel/plugin-proposal-object-rest-spread"),
    ],
  }
}
```
它其实就是一个到处的函数然后将`babel`配置导出, 然后`babel`将使用这个配置进行转义。`preset`还支持绝对路径或者相对路径来使用你写的`preset`
### 官方Preset
1. @babel/preset-env 这个预设可以让你直接使用最后版本的JavaScript
2. @babel/preset-flow 类型检测插件
3. @babel/preset-react react语法插件
4. @babel/preset-typescirpt 转换typescript语法
5. @babel/preset-stage-x 一些未纳入JavaScript标准的提案,这些提案可能随时改变,特别是 stage-3之前的任何提案。
  - stage-0 一个设想,可能有babel插件
  - stage-1 值得跟进的建议
  - stage-2 初始规范草案
  - stage-3 候选规范,完成规范并且在浏览器初步实现
  - stage-4 将添加到下一个年度发布版本中
### Toolings
1. @babel/parser 将源代码解析成AST
2. @babel/core 包括了整个babel工作流,也就是说在 @babel/core 中会使用到 @babel/parser、transformer[s]、@babel/generator
3. @babel/generator 将AST源码解析生成 js 代码
4. @babel/code-frame 用于生成错误信息并且打印出错误原因和错误行数。(其实就是个 console 工具类)
5. @babel/helpers 也是工具类, 提供一些内置的函数实现, 主要用于babel插件的开发
6. @babel/runtime 也是工具类, 为了babel编译时提供一些基础的工具库。作用于transformer[s]阶段,当然这是一个工具类,如果要使用这个工具库。还要引入@babel/plugin-tranform-runtime
7. @babel/template 工具类, 为parser提供模板引擎, 更加快速的转化成 AST
8. @babel/traverse 工具类, 用来遍历AST树,可以得到文件依赖 也在@babel/generator过程中生效。
9. @babel/types 工具类, 主要用来在创建AST时判断各种语法类型

在 [webpack打包原理](../../webpack/bundlePrincipe)中有对上述工具的使用

### runtime
当进行编译的时候在文件的头部总会出现一些工具方法,你会发现很多文件头部的工具方法都是一样的,这个时候我们就可以使用runtime来复用辅助函数

首先要安装包
```
npm i @babel/runtime -S
npm i @babel/plugin-transform-runtime -D
```
然后再`plugins`中加入这个插件就可以实现复用了