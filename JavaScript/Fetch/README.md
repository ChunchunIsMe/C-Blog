## AJAX
AJAX是发送异步请求的一个浏览器方法

初始化
```
const request = new XMLHttpRequest();
```
构造函数
- XMLHttpRequest(): 初始化一个XMLHttpRequest,返回一个实例对象
属性 (下面的request均为 new XMLHttpRequest()的返回值)
- requset.onreadystatechange: readyState改变的时候,会调用赋给这个属性的方法
- request.readyState: 一个只读属性,代表了XMLHttpRequest的状态,0:代理被创建没有调用open,1:open方法已经被调用,2:send已经被调用,3:下载中,responseText已经包含部分数据,4:下载操作已完成
- request.response: 一个对象为服务器响应的值,类型取决于`responseType`的值,如果请求未完成或未成功取值为`null`
- request.responseText: 返回的是纯文本的值,请求过程中responseText也可能有值
- request.responseType: 返回数据的类型。
- request.responseURL: 返回响应序列化URL,如果有锚点`#`会被删除
- request.responseXML: 返回响应的HTML或者XML的Document
- request.status: 返回响应的状态码,在请求完成前是0,如果出错也是0
- request.statusText: 返回状态码的文本信息比如`OK`或者`NOT Found`
- request.timeout: 设置请求的最大等待时长
- request.upload: 返回一个XMLHttpRequestUpload对象,用来表示上传的进度可以绑定以下事件来追踪它的进度
   - onloadstart: 获取开始
   - onprogress: 数据传输进行中
   - onabort: 获取操作终止
   - onerror: 获取失败
   - onload: 获取成功
   - ontimeout: 获取操作在用户规定时间内未完成
   - onloadend: 获取完成(无论是否成功)
- request.withCredentials: 如果设置为true则会带上第三方的cookie。默认值为false

事件
- readystatechange: readyState改变的时候,会调用赋给这个属性的方法
- load: 请求完成调用
- loadend: 加载进度停止之后触发(比如: error,abort,load之后)
- loadstart: 程序加载开始时调用
- error: 遇到错误调用
- progress: 接收到数据时周期性触发
- abort: 终止时调用
- timeout: 遇到时间到期终止时,会触发

方法(下面的request均为 new XMLHttpRequest()的返回值)
- request.abort(): 如果请求已经被发出。终止该请求,如果被终止readyState将变为0
- request.getAllResponseHeaders(): 返回所有的响应头,用回车\r或者换行符\n分隔开
- request.getResponseHeader(head): 获取指定头部的值,如果有多个用逗号隔开
- request.open(method(请求方法), url(请求路径), async(默认为true,表示是否异步,可选), user(可选用户名用于认证默认为null), password(可选密码用于认证默认为null)): 初始化一个请求:但是如果为已激活的请求调用该方法,相当于调用abort()
- request.overrideMimeType(): 指定一个MIME类型用于替代服务器指定的类型,使服务器传输的数据按照MIME类型处理,需要在send前调用
- request.send(): 用于发送http请求。如果是异步会在请求后立即返回,如果同步会在响应到达后返回
   - 可选参数,可填ArrayBuffer/ArrayBufferView/Blob/Document/DOMString/FormData
- request.setRequestHeader(header, value): 必须在open和send之间调用,设置请求头

## Fetch
fetch提供了一种简单,合理的方式来跨网络异步获取资源,但是和ajax有些不同
- 返回一个promise,但是如果接收到一个错误的HTTP状态码的时,从fetch返回的Promise也不会标记为rejected,即使响应的HTTP状态码是404或500。相反,它会将Promise的状态标记为resolve,仅当网络故障或者请求被阻止的时候才将状态改为reject
- fetch不会接受跨域cookies;你也不能使用fetch()建立跨域会话。其他网站的`set-cookie`头部字段将会被无视,但是可以设置credentials来进行改变

1. 基本使用
```
fetch(url).then(res => {
   consolo.log(res);
})
```
2. fetch的参数
- input: 定义要获取的资源,这可能是
   - 一个USVString字符串,包含要获取资源的URL。一些浏览器会接受blob和data:作为schemes
   - 一个Request对象(后面会说到)
- init(可选): 一个配置项对象,包括所有对请求的设置。可选的参数有:
   - method: 请求使用的方法
   - header: 请求的头信息,形式为Headers的对象或包含ByteString值的对象字面量
   - body: 请求的body信息: 可能是一个Bolb、BufferSource、FormData、URLSearchParams或者USVString对象。注意GET、HEAD方法的请求不能包含body信息
   - mode: 请求的模式 比如 cors、no-cors或者same-origin
   - credentials: 请求凭证的允许(cookie可以通过这个设置)可以设置 omit(不允许)、same-origin(只携带同源)、include(包含第三方cookie)
   - cache: 请求的cache模式: default、no-store、reload、no-cache、force-cache或者only-if-cached
   - redirect: fllow(自动重定向)、error(如果产生重定向将自动终止并且抛出一个错误)、manual(手动重定向)
   - referrer: 一个USVString可以是no-referrer、client或一个URL。默认是client
   - refererPolicy: 制定头部referer字段的值。可能为以下值之一: no-referer、no-referer-when-downgrade、origin、origin-when-cross-origin、unsafe-rul
   - integery: 包括请求的subresource integerity(使用base64编码过后的文件哈希值写入你使用的script或link标签的integeity属性即可启用子资源完整性功能)值

2. fetch返回的body

Body mixin代表了fetch中响应/请求的正文,允许你声明其内容是什么,以及应该如何处理。

属性
- Body.body(只读): 一个简单的getter用于暴露一个ReadableString类型的主题内容
- Body.bodyUsed(只读): 一个Boolean值指示是否body已经被读取

方法
- Body.arrayBuffer()
- Body.blob()
- Body.forData()
- Body.json()
- Body.text()

上述方法都是首先挂起一个流操作然后在完成是读取它的值然后返回一个promise当读取完成时候,resolve传入的值是方法名类型的。这些方法都会将Body.bodyUsed变为可读

4. Header、request、response 构造器

fetch还可以通过上述构造器来进行构造响应头、请求头和响应体来创建参数这里就不再说下去了,因为浏览器还在实现呢！