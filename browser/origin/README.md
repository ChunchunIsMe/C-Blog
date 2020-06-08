## 跨域的九种方式
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

复杂请求,首先会发起一个预检请求,该请求是`option`方法的,通过该方法来知道服务端是否允许跨域

当我们使用复杂请求的时候,后台需要做如下配置
```
if(req.method==='OPTIONS') {
  res.end();
}
```
### document.domain

### postmassage

### webSocket

### 服务器代理

