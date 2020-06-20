## Performance
W3C定义了一个强大的 `Performance` API,可以通过`window.performance`来访问,其中包括了诸多指标,来看看它到底有哪些指标吧

- memory: 浏览器内存情况
- navigation: 网页导航相关
- timing: 页面性能相关
- timeOrigin: 一个性能考核开始时间的高精度时间戳
- onresourcetimingbufferfull: 一个DOM0级事件 在resourcetimingbufferfull时间触发时调用 这个事件当浏览器的资源事件性能缓冲区已满时会触发

### memory
- jsHeapSizeLimit js堆内存大小限制
- totalJSHeapSize 表示当前js堆栈内存总大小
- usedJSHeapSize 表示所有被使用的js堆栈内存
### navigation
- redirectCount 重定向属性,一个只读属性,返回当前页面是几次重定向才过来的。但是这个接口有同源策略限制,即仅能检测出同源的重定向。
- type: 返回值是0,1,2中的一个.分别对应三个枚举值
   - 0: TYPE_NAVIGATE (用户通过常规导航方式访问页面,比如点一个链接,或者一般的get方式)
   - 1: TYPE_RELOAD (用户通过刷新,包括JS调用刷新接口等方式访问本页面)
   - 2: TYPE_BACK_FORWARD (用户通过前进后退按钮访问本页面)
### timing
W3C中有张图很明确的说明了时间的各个阶段

![进程模型](./pic/time.svg)

- navigationStart 表示了从同一个浏览器上下文的上一个文档卸载结束时的时间戳,如果没有上一个文档,这个值会和fetchStart相同
- unloadEventStart 表示了上一个文档 unload 开始时的时间戳,如果没有上一个文档或者重定向中不同源,会返回0
- unloadEventEnd 表示了上一个文档 unload 结束时的时间戳,如果没有上一个文档或者重定向中不同源,会返回0
- redirectStart 表示了第一个HTTP重定向开始时的时间戳。如果没有重定向,或者重定向中不同源,这个值会返回0
- redirectEnd 表示了第一个HTTP重定向结束时的时间戳。如果没有重定向,或者重定向中不同源,这个值会返回0
- fetchStart 表示了浏览器准备好实用HTTP请求来获取文档的时间戳.这个时间点会在检查任何应用缓存之前
- domainLookupStart 表示了域名查询开始的时间戳,如果使用了持续连接,或者这个信息储存到了本地资源上,这个值会和fetchStart一致
- domainLookupEnd 表明了域名查询的结束的时间戳,如果使用了持续连接,或者这个信息储存到了本地资源上,这个值会和fetchStart一致
- connectStart 返回HTTP请求开始向服务器建立连接时的时间戳。如果使用持久连接,则返回值等同于fetchStart属性的值
- connectEnd 返回HTTP请求向服务器建立连接结束时的时间戳。如果使用持久连接,则返回值等同于fetchStart属性的值
- secureConnectionStart 返回浏览器和服务器开始安全连接握手时间戳。如果没有安全连接则返回0
- requestStart 浏览器正式和服务器通信开始时间
- responseStart 浏览器从服务器收到的第一个字节的时间戳。如果请求失败并且连接被重开,会变成新请求相对应的发起时间
- responseEnd 浏览器从服务器收到最后一个字节的时间戳
- domLoading 当网页DOM开始解析时,document.readystate变为'loading'(readystatechange事件触发时)时触发
- domInteractive 当网页DOM开始解析结束开始加载内嵌资源时,document.readystate变为'interactive'(readystatechange事件触发时)时触发
- domContentLoadedEventStart 当解析器发送`DOMContentLoaded`事件,即所有需要被执行的脚本已经被解析时的时间戳
- domContentLoadedEventEnd 当所有需要立即执行的脚本已经被执行完成的时间戳
- domComplete 当前文档解析完成,document.readystate变为'complete'(readystatechange事件触发时)时触发
- loadEventStart load事件被发送时的时间戳,如果这个事件还没被发送。他的值将会是0
- loadEventEnd 当`load`事件结束,即加载事件完成时的时间戳


## 浏览器生命周期
我们同样可以通过浏览器的生命周期时间来进行监控

1. document.onreadystatechange(document.readyState==='loading') 此时正在加载dom(js监听不到这个事件的,因为走到js代码已经开始dom解析了)
2. document.onreadystatechange(document.readyState==='interactive') 此时所有的dom已经加载完成,当前宏任务(script中的同步代码)也已经完成
3. document.DOMContentLoaded 此时所有的dom已经加载完成,当前宏任务(script中的同步代码)也已经完成
4. document.onreadystatechange(document.readyState==='complete') 此时外部资源已经加载完成(img等)
5. window.onload  此时外部资源已经加载完成(img等)
## 性能监控工具
通过上面的performance我们可以获取到
- 重定向时间
- dns预解析时间
- TCP连接时间
- 传输数据时间
- TLS握手时间
- 数据传输时间
- DOM解析/加载/渲染时间
- js脚本执行时间

接下来我们捕获一些js错误

- window.onerror 如果js脚本出错了将会触发这个事件
- window.onrejectionhandled 如果存在promise变成了rejected状态没有被catch函数或者then捕获将会触发这个事件

上面都是一些js错误或者页面加载的监控,如果我们需要监听ajax的请求时间或者错误请求该怎么办

这个时候我们可以通过重写`XMLHttpRequest.prototype.send`方法
```
const send = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function (...arr) {
  this.addEventListener('readystatechange',() => {
    // this.readystate
    // this.status
  })
  this.addEventListener('error',() => {
    // ....
  })
  send.call(this,...arr);
}
```
这样我们就实现了对ajax的监控

突然又想到一种,如果需要对事件进行全局的监控的话,可以在body上注册捕获事件+冒泡事件来计算 冒泡-捕获 的时间就是执行的时间了 

我在github上看到了一个比较好的实现,我的一些思路就是从上面看到的,我将它fork下来了[项目地址](https://github.com/ChunchunIsMe/monitorjs_horse)

