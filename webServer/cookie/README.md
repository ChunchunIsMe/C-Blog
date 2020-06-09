## cookie
为了解决客户端和服务端会话状态的问题,产生了cookie

cookie: 复数形态cookies,类型为小型文本文件,指某些网站为了辨别用户而存储在用户本地终端上的数据

cookie的属性:

- Name: Cookie名称
- Value: Cookie的值
- Domain: 可以访问cookie的域名
- Path: 可以访问cookie的页面路径
- Expires/Max-Age: cookie的超时时间,不设置的话默认值是Session
- size: Cookie大小
- HttpOnly: 如果为true只有在http请求头中带有此cookie的信息
- secure: 是否只能通过https来传递这条cookie
- sameSite: 阻止与跨站点请求一起发送。(如果需要AJAX带上第三方cookie则需要使用withcredentials)
   - Strict:严格模式,表明这个cookie在任何情况下都不可能作为第三方的cookie没有例外.
   - Lax: 宽松模式,如果是GET请求,这个cookie可以通过第三方cookie
- Priority: 优先级: 比如在`b.a.com`登录了又在`c.a.com`登录了这个时候可能有两个登录cookie,就可以使用这个值来进行设置优先级
   - Low
   - Medium(默认值)
   - High

## Session
通过保存在用户端的某些值比如id来查询存储在服务器端的用户信息
## token
token是在客户端存储一份在服务器端存储一份,之后在服务端端进行token对比来判断是哪个用户。