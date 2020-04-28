## library
当你要使用webpack打包一个sdk的时候,使用普通的webpack配置是不行的，这个时候需要使用特殊的属性来进行打包配置

### 基本配置
1. externals: 避免将一些东西打包到应用程序，而使用者使用sdk的时候将必须要有一个lodash 的依赖
2. library: 可以将你的bundle暴露给设置的全局变量(比如library:'a',windows.a可以访问它)
3. libraryTarget: 控制以不同的形式暴露target
  - 变量: 作为一个全局变量，通过`script`访问(`libraryTarget: 'var'`)
  - this: 通过`this`对象访问(`libraryTarget: 'this'`)
  - window: 在浏览器通过`window`对象访问(`libraryTarget: 'window'`)
  - UMD: 在 AMD 或 CommonJS `require` 之后可访问 (`libraryTarget: 'umd'`)

### 最终步骤
将生成 `bundle` 的文件路径添加到 `package.json` 中的 `main` 字段中。

或者按照 npm 指南,将其添加为标准模块