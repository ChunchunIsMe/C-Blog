## 路由原理
前端路由实现起来很简单,本质就是监听URL的变化,然后匹配路由规则,显示相应的页面,并且无须刷新页面。目前前端使用的路由只有两种实现方式
- Hash模式
- History模式
## Hash模式
`www.test.com/#/`就是Hash URL,当`#`后面的哈希值发生变化时,可以通过`hashchange`事件来监听URL的变化,通过修改`window.location.hash`从而进行跳转页面,并且无论哈希值如何变化,服务器端接收到的URL请求永远都是www.test.com
```
// 修改hash
window.location.hash = '/a/c';
// 监听hash
```
## history模式
history模式是HTML5新推出的功能,主要使用`history.pushState`和`history.replaceState`来改变URL
```
history.pushState(stateObject,title,URL);
history.replaceState(stateObject,title,URL);
```
当用户做出浏览器动作的时候,比如点击后退按钮时,会触发`popState`事件(使用pushState和replaceState不会触发)
```
window.addEventListener('popState', (e) => {
  console.log(e.state)
})
```
## 两种模式对比
- Hash模式只可以更改`#`后面的内容,History模式可以通过 API 设置任意的同源URL
- History模式可以通过API添加任意类型的数据到历史记录中,Hash模式只能更改哈希值,也就是字符串
- Hash模式无须后盾配置,并且兼容性好。History模式在用户手动输入地址或者属性页面的时候会发起URL请求,后端需要配置`index.html`页面用于匹配不到静态资源的时候