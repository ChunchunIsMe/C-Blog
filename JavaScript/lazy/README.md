## 获取dom是否出现在视图中
### getBoundingClientRect
直接使用`DOM.getBoundingClientRect()`即可。

DOM.getBoundingClientRect() 返回一个 Rect 对象

Rect对象中有很多属性
- x: dom距离原点的x坐标
- y: dom距离原点的y坐标
- width: dom的宽度
- height: dom的高度
- top: 返回DOMRect的顶坐标值(与y相同,如果height为负值,则为y+height)
- bottom: 返回DOMRect底部的极坐标值(y+height,如果height为负值则为y)
- left: 返回DOMRect的左坐标值(与x相同,如果width为负值,则为x+width)
- right: 返回DOMRect右边的坐标值(x+width,如果width为负值则为x)

### IntersectionObserver
`IntersectionObserver`同样提供了一种异步观察目标元素与祖先元素或顶级文档`viewprot`的交集中的变化的方法。

`IntersectionObserver`是一个构造器方法,会返回一个监听器,监听器可以增加元素的监听,当满足监听条件时就会触发监听器回调

##### 用法
```
const observe = new IntersectionObserver(callback, options)
```
##### 参数
1. callback: 当满足指定的阈值,就会调用回调。回调接收`IntersectionObserverEntry`对象和观察者列表
2. options: 允许控制调用观察者的回调环境
- root 指定根元素。用于检查目标的可见性。必须是目标元素的父级元素。如果未指定或者为`null`,则为浏览器视窗
- rootMargin root元素的外边距。类似于css中的margin属性,比如`'10px 20px 30px 40px'`。如果有指定参数,则rootMargin也可以用百分比来取值。
- threshold 可以是单一的`number`也可以是`number`数组,target元素和root元素相交到何种程度会被执行,比如0.5是相交到一半时
##### 返回值
1. 属性: 其属性就定义时传入的options
2. 原型方法
- observe(target) 开始观察
- unobserve(target) 停止观察
- disconnect() 关闭观察器
- takeRecords() 返回IntersectionObserverEntry对象数组,每个对象的目标元素都包含每次相交的信息,可以显示通过调用此方法清除挂起的相交状态列表

##### IntersectionObserverEntry
这个接口描述了目标元素和根元素在某一特定过渡时刻的交叉状态

属性
- bounndingClientRect 返回边界信息
- intersectionRatio 返回和绑定root的比例值
- intersectionRect 描述根和目标元素的相交区域
- isIntersecting 如果目标元素和交叉区域观察者对象的根相交,则返回true
- rootBounds 返回观察者的根
- target 与根出现相交区域改变的元素
- time 返回一个记录从`IntersectionObserver`的时间原点到交叉被触发的时间的时间戳