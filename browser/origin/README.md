## 跨域的几种方式
同源策略就是当浏览器的域名和请求的协议/端口/域名不同时,浏览器禁止发送该AJAX请求

但是 img/link/script是允许跨域加载资源的
### JSONP
JSONP就是依靠script标签不会产生跨域的原理来进行的跨域操作的,但是也需要后端进行支持,JSONP请求后端传递过来的应该是JavaScript代码
```
function JSONP(url,funcname,callback) {
    const script = document.createElement('script');
    script.src = url;
    window[funcname] = (data) = > {
      callback && callback(data);
    }
    document.appendChild(script);
}
```
### CORS
浏览器会自动进行CORS通信,实现CORS的关键是后端。只要后端实现了CORS,就实现了跨域。

服务端再响应头设置`Access-Control-Allow-Origin`就可以开启CORS。该属性表示了哪些域名可以访问资源, 如果设置通配符则表示所有网站都可以访问资源

但是如果设置这种方法解决跨域问题的话,会在发送请求的时出现两种情况,分别为简单请求和复杂请求
1. 简单请求

只要同时满足
- 请求方法为 GET/POST/HEAD
- Content-Type 为 text/plain multipart/form-data application/x-www-form-urlencoded

请求中任意的XMLHTTPRequestUpload对象均没有注册任何事件监听器;XMLHttpRequestUpload 对象可以使用XMLHttpRequest.upload 属性访问

2. 复杂请求

不符合以上请求的就是复杂请求了

复杂请求,会在通信之前,增加一次HTTP查询请求,被称为预检请求,该请求是`option`方法的,通过该方法来知道服务端是否允许跨域

当我们使用复杂请求的时候,后台需要做如下配置
```
if(req.method==='OPTIONS') {
  res.end();
}
```
有关CORS相关的请求头
- access-control-allow-credentials 响应头表示是否可以将对应请求的响应暴露给页面。返回true则可以,其他值均不可以
- access-control-allow-headers 响应头,列出了将会正式请求的`access-control-request-headers`字段中出现的首部
- access-control-allow-methods 响应头,在预检请求的应答中明确了客户端所要访问的资源允许使用的方法或者方法列表
- access-control-expose-headers 响应头,列出哪些首部可以作为响应的一部分暴露给外部
- access-control-max-age (重要！！)响应头,表示预检请求返回的结果可以被缓存多久(这个options请求可以被缓存!!!)
- access-control-request-headers 出现在预检请求头中,用于通知服务器在真正的请求中会采用哪些请求头
- access-control-request-method 出现在预检请求头中,用于通知服务器在正常的请求中会采用那种Methods

还有需要注意的是浏览器模式是不允许预检请求的重定向的,因为预检请求只要返回的不是`2XX`开头的,都会当做错误处理
### document.domain
在资源和浏览器二级域名相同的情况下,比如`c.a.com`和`b.a.com`我们就可以使用`document.domain = a.com`
### postMessage
postMessage是H5 XMLHttpRequest Level2 中的API,而且是为数不多的可以跨域操作的window属性之一,它可用于解决以下问题
- 页面和其打开的新窗口数据传递
- 多窗口之间消息传递
- 页面与嵌套的iframe消息传递
- 上面三个场景的跨域数据传递

> postMessage方法允许来自不同源的脚本采用异步方式进行有限的通信,可以实现跨文本档、多窗口、跨域消息传递
```
otherWindow.postMessage(message,targetOrigin,[transfer]);
```
下面来看一个例子从`http://localhost:3000/a.html`页面向`http://localhost:4000/b.html`传递消息
```
// a.html
<iframe src="http://localhost:4000/b.html" id="iframe"></iframe>
<script>
  function load() {
    const iframe = document.getElementById('iframe');
    iframe.contentWindow.postMessage('hi','http://localhost:4000');
    window.onmessage = function (e) {
      console.log(e);
    }
  }
</script>
// b.html
window.onmessage = (e) => {
  console.log(e.data);
  e.source.postMessage('hi!', e.origin);
}
```
### WebSocket
WebSocket是HTML5的一个持久化的协议,它实现了浏览器和服务器的全双工通信,同时也是跨域的一种解决方案。WebSocket和HTTP都是应用层协议,都基于TCP协议。但是WebSocket是一种双向通信协议,在建立连接之后,WebSocket的server和client都能主动向对方发送或接收数据。同时,WebSocket在建立连接时需要借助HTTP协议,连接建立好了之后client和server之间的双向通信就和HTTP无关了
```
// socket.html
<script>
  const socket = new WebSocket('ws://localhost:3000');
  socket.onopen = function () {
    socket.send('hi');
  }
  socket.onmessage = function () {
    console.log(e.data);
  }
</script>
// server.js
const express = require('express');
const app = express();
const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 3000});
wss.on('connect',function (ws) {
  ws.on('message', function (data) {
    console.log(data);
    ws.send('byebye')
  })
})
```
### 服务器代理
因为同源策略是浏览器的,如果使用代理服务器进行代理请求则不会发生跨域,我们可以使用正向代理/反向代理
### location.hash
实现原理:通过iframe监听其hash变化来进行跨域
```
// a.html
<iframe src="https://localhost:4000/b.html" id="iframe"></iframe>
<script>
  const iframe = document.getElementById('iframe');
  iframe.contentWindow.location.hash = "gg";
</script>
// b.html
<script>
  window.onhashchange = funciton () {
    console.log(location.hash);
  }
</script>
```
