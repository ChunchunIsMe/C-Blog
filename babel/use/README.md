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