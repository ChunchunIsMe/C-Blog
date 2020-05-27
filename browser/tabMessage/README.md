## web跨页面通信的几种方式
1. 获取句柄

只要获取了对应窗口的 window 对象,比如 iframe 的 contentWindow 属性, 执行 window.open 返回的窗口对象, 或者是命名过或数值索引的 window.frames,被window.open打开页面的window.opener等等。

可以通过这个 window 对象调用 postMessage 来进行跨页面通信,或者直接调用对应窗口的 window 对象下的方法来进行通信。

2. localStorage
可以通过`window.onstorage`来进行监听`storage`的改变来进行通信
```
// a.html
// ...
window.onstorage = (e) => { console.log(e) }
// ...
// b.html
// ...
window.localStorage.setItem('key','value')
// ...
```
当打开 a.html 后再打开 b.html 这个时候 a.html 就会打印一个事件对象, 这样两个标签页就进行了通信
3. cookie
主页面修改 cookie 之后次页面进行脏数据轮询检查
4. BroadcastChannel
```
// a.html
// 注意这里注册的name需要和通信的页面name一致
const channelA = new BroadcastChannel('test');
channelA.onmessage = (e) => { console.log(e) }
// b.html
const channelB = new BroadcastChannel('test');
channelB.postMessage('xxxx');
```
此时就完成了从b.html到a.html的通信
5. sharedWorker

6. Server
- 使用EventSource(只允许服务端推送至客户端)/WebSocket(客户端和服务端双向长连接通信)
