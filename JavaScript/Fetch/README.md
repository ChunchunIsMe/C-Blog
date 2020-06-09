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
- request.setRequestHeader(header, value): 必须在open和send之间调用,设置请求头

## Fetch

## Axios