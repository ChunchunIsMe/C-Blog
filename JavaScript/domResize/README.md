## 监听dom尺寸的大小
### MutationObserver
这个Observer可以用来监听dom的改变,但是我一直没有尝试成功,不知道是不是写的不对的原因,就算写对了这个也很简单,就配置一下就完事了,而且这个兼容性不是很好,低版本的浏览器可能不支持
### 通过子元素的scroll事件来监听父级元素大小是否改变
我们通过垂直状态的来说明这个的原理(水平方向上的是一样的)

首先我们看一个不具有滚动条元素的子元素的`scrollTop`不管你给他设置多少,最后都会是`0`,因为它的父元素没有滚动条,也就是滚动条此时顶在了父元素的最上方

当滚动条位于最末端的时候,如果区域外的内容减少了,那么`scrollTop`会自动调整(触发`scroll`事件),因为外部的内容没有这么多了,但是如果内容增大,是不会自动调整的。我们可以根据这个来监控元素大小变化

如果一个具有滚动条元素中有一个高度为`height: 200%`的子元素,当这个滚动条元素的滚动条位于最下方时,如果元素正在缩小,那么子元素将缩小的更多,那么`scrollTop`就会不断的减小(区域外的内容少了),但是如果这个元素放大,这个滚动条并不会自动调整改变。

如果一个具有滚动条元素中有一个高度为`height: 10000px`的子元素,当这个滚动条的滚动条位于最下方时,如果元素正在放大,那么可视区域就在增大,那么`scrollTOp`也会因为自动调整而不断减小(区域外的内容少了),但是这个元素如果缩小,这个滚动条不会自动调整改变。


所以我们如果要监听一个元素尺寸大小是否变化,只需要在其内部插入这两种带有scroll的子元素,这两个子元素的宽高为`100%`,然后分别去监听他们的`scroll`事件就可以监听这个元素尺寸大小的变换了,[demo](./index.html)