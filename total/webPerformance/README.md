## 网站性能优化
### 网络传输性能优化
1. 浏览器缓存: service worker/强缓存(Expires/cache-control)/协商缓存(last-Modified If-Modifiy-since/ETag If-None-Match)
2. 资源打包压缩: webpack打包/treeshake/提取公共资源/按需加载/compression-webpack-plugin进行gzip压缩/prerender-spa-plugin进行预渲染
3. 图片资源压缩 
- 不要在HTML中缩放图像: 如果200X200的图片容器使用400X400的图片
- 使用雪碧图: 多张图片并在一起用background-position,多张图片并在一起会比多张的大小更小,可以使用`webpack-spritesmith`进行合成雪碧图
- 使用字体图标: 图片毕竟是图片如果用图标图肯定更小的
- 使用webp: 谷歌公司开发的,在加快图片加载速度的图片格式
4. 网络传输性能检测工具--page speed: chrome插件不仅会测出速度,还会提出建议
5. 使用cdn: 使用CDN缓存
### 页面渲染性能优化
1. 浏览器渲染过程: 解析DOM生成DOM树,解析CSS生成Style树,两树合成Render树生成各种图层给GPU渲染,遇到js引擎线程会被阻塞,因为渲染线程和js线程时互斥的
2. GPU硬件加速: 复合图层将由GPU进程进行渲染,会有层压缩/层爆炸现象,注意
3. 重绘与重排: 重排必引起重绘,避免重排
4. 优化策略
- css属性读写分离: 每次对元素进行读操作时,都必须进行一次重新渲染,所以我们在JS对元素样式读写操作的时候,最好将两者分开,先读再写,避免两者交叉使用
- 通过切换class或者style.csstext属性批量操作元素样式
- DOM元素离线更新
- 将没用的元素设置为不可见
- 压缩DOM的深度
- 图片在渲染前指定大小
- 对大量重排重绘的元素单独触发渲染层,使用硬件加速GPU分担CPU压力
- 服务端渲染
- 使用骨架屏优化用户体验(有更强的加载感)
### JS阻塞性能
防止内存泄漏
### 负载均衡
1. Node.js处理IO密集型请求
2. PM2实现Node.js多线程
3. nginx搭建反向代理