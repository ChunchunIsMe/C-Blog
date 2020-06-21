## WebWorker
因为JavaScript采用的是单线程模型,也就是说,所有任务只能在一个线程上完成,一次只能做一件事。

而WebWorker的作用就是为JavaScript创造多线程环境,允许主线程创建Worker线程,将一些任务分配给后者运行。在主线程运行的同时,Worker线程在后台运行,两者互不干扰。等到Worker线程在后台完成计算任务再将结果返回给主线程。

WebWorker有几个使用注意点
- 同源限制: 分配给Worker线程运行的脚本文件,必须与主线程的脚本文件同源
- DOM限制: Worker所在的全局对象和主线程不一样,无法读取主线程所在网页的DOM对象,也无法使用`document`、`window`、`parent`这些对象,但是Worker可以访问`navigator`和`location`对象。
- 通信联系: Worker线程和主线程不在同一个上下文环境,他们不能直接通信,必须通过消息完成
- 脚本限制: Worker线程不能执行`alert()`方法和`confirm()`方法,但可以使用`XMLHttpRequest`对象发出AJAX请求。
- 文件限制: Worker线程无法读取本地文件,即不能打开本机的文件系统(`file://`),它所加载的脚本必须来自网络

### 基本用法
主进程调用`Worker`构造函数,新建一个Worker线程
```
const worker = new Worker('work.js');
```
然后主进程调用`worker.postMessage()`方法,向Worker发消息,其中的参数就是主线程传给`Worker`的数据。它可以是各种数据类型,包括二进制数据,接着主线程通过`worker.onmessage`指定监听函数,接受子线程发回来的消息,Worker完成任务以后,主线程就可以使用`worker.terminate()`把它关掉
```
worker.postMessage('hello world');
worker.onmessage = (event) {
  console.log(event.data);
  worker.terminate();
}
```

Worker线程

Worker线程内部的顶级对象为`self`代表了子线程自身,使用`message`事件监听信息,同样使用`postMessage()`来发送消息,但是使用`self.close()`来关闭自身,如果Worker内部需要加载其他脚本,还可以使用`importScripts()`来加载其他脚本
```
importScripts(a.js,b.js);
self.addEventListener('message',(e) => {
  self.postMessage(e.data+'!!!');
  self.close();
})
```

错误处理

Woker是否发生错误可以使用error事件,如果发生错误就会触发`error`事件
### 同页面的 WebWorker
通常情况下,Worker载入的是一个单独的JavaScript脚本文件,但是也可以载入与主线程在同一个页面的代码
```
<!DOCTYPE html>
  <body>
    <script id="worker" type="app/worker">
      addEventListener('message',(e) => {
        console.log(e.data);
      })
    </script>
  </body>
</html>
```
然后读取这一段页面的脚本,用Worker来处理
```
const blob = new Blob([document.getElementById('worker')]);
const url = window.URL.createObjectURL(blob);
const worker = new Worker(url);

worker.onmessage = (e) => {
  console.log(e.data);
}
```
[代码](./index.html);