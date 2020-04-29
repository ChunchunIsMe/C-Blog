## package.json字段
```
name: 包名
version: 版本号
description: 包的描述
homepage: 项目的地址
author: 包的作者
contributors: 包的参与者们 array
repository: 包代码的Repo信息，包括type/URL,type可以是git或者svn,url则是包的Repo地址
main: require(package.name) 程序主要入口 // 在moudle里会有几个入口的详解
keywords: 包的关键字
bugs: 给了一些联系地址比如url是可以提issue的地方, email是可以给作者发邮件的地方
license: 许可证信息
people fields: 参与者的信息 Array<Object>
files: 模块下的文件名或者文件夹名字
browser: 浏览器入口
bin: 用来添加包的可执行文件
man: 制定一个通过数组制定一些文件来让linux下的man命令查找文档地址
directories: { // CommonJS 通过该属性来制定一些方法描述模块的结构
  lib: 告诉用户 lib 在哪
  bin: 指定了 bin 目录，这个配置下面的文件会被加到 bin 路径下
  man: 指定 man 文件目录
  doc: markdown 文件
  example: 例子
  test: 测试脚本
}
scripts: 脚本执行指令
config: 设置一些项目配置
dependencies: 生产环境依赖包
devDependencies: 开发环境依赖包,
peerDependencies: 同等依赖，用于指定当钱包兼容的宿主版本
bundledDependencies/bundleDependencies: 打包依赖，一个包含依赖包名的数组对象
optionalDependencies: 可选依赖包
engines: 可用其来指定node版本或者npm版本
os: 说明哪个操作系统可以运行
cpu: 说明哪些cpu可以运行
preferGlobal: 表示当用户不将sdk安装为全局模块的时候，需不需要显示警告
private: 如果这个设置了true npm 会拒绝 publish
publishConfig: 发布时使用的配置值
```
## .npmignore
- .gitignore: 防止某些文件上传到git
- .npmignore: 防止某些文件发布出去

里面的写法都一样
## .npmrc
.npmrc可以直接设置npm config 中的值

比如设置源直接在.npmrc中写
```
registry=https://registry.npm.taobao.org/
```
就可以设置源了，而在当前目录下运行npm，规则也会按照.npmrc的规则来进行，而不是使用全局的
## 包的发布和调试
  ### 包的发布
  ```
  npm adduser
  npm login
  npm publish [name] // 如果已经在该源登录了npm账号则可以直接跳过上面两步
  ```
  ### 包的调试

## 几个 dependencies 的区别
1. dependencies
2. devDependencies
3. peerDependencies
4. bundledDependencies/bundleDependencies
5. optionalDependencies

这个五个各有各的用处,最熟悉的应该就是 dependencies 和 devDependencies 这两个了，dependencies是项目运行时需要安装的包，当该包的使用者使用该包的时候也会装这里的包，devDependencies是在环境构建或者测试时需要用到的包,该包的使用者使用的时候则不会装这个包。我们下面主要来讲讲后面三种 dependencies
  #### peerDependencies
    同等依赖，或者叫做同伴依赖，用于指定当前包使用的依赖的版本。比如下面是你的package.json
    ```
    {
      // ...
      "dependencies": {
        // ...
        "antd": "^3.26.16",
      },
      "peerDependencies": {
        "antd": "3.x",
      }
    }
    ```
    当外部要用你的包的时候 peerDependencies 就会明确告诉使用方,你需要使用哪个版本的 antd
    > npm1 和 npm2 会自动安装同等依赖，npm3 不再自动安装，会产生警告，需要手动在`package.json`添加依赖项。
  #### bundledDependencies/bundleDependencies
  打包依赖，bundledDependencies是一个包含依赖包名的数组对象，在发布时会将这个对象中的包打包到最终的发布包中。但是这个包必须在 devDependencies 或dependencies 声明过，否则打包会报错。这里就不做例子了因为现在打包都不用 npm pack 了都用 webpack 所以这个没什么用
  #### optionalDependencies
  可选依赖，如果有一些依赖包即使安装失败，项目依然能够运行或者希望 npm 继续运行，就可以使用 optionalDependencies。但是 optionalDependencies 会覆盖 dependencies 中的同名依赖包，所以不要在两个地方都写
## module vs browser vs main
## bin 和 npx