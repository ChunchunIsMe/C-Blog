## esmodule
看到尤大大写了一个[vite](https://github.com/vitejs/vite)使用之后发现热更新太快了,有点惊到我了,毕竟修改less之后等待编译的感觉太痛苦了,为什么vite这么快呢
1. 在开发环境使用原生ESM进行驱动,基于浏览器原生ES imports开发
- 真正的按需编译(ESM天生就是按需加载的,只有import的时候才会按需加载)
- 不需要生成bundle
2. 在生产环境基于 Rollup 打包

就是这个ESM才能让编辑阶段如此快速,所以我想用esmodule来写写[例子](./index.html)

但是需要注意的是使用`esmodule`不能直接使用`file`协议,也就是直接本地打开,打开之后他会报个错误

![错误](./pic/error.png)

> 注意最后一句,它只支持`http, data, chrome, chrome-extension, https`这些协议,所以我们还是使用http-server吧,来到demo的文件夹下,执行`npx http-server`就OK了(不得不说npx真好用)