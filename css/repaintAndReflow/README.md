## 重绘(repaint)
绘制,即渲染上色,所有对元素的视觉表现属性的修改,都会引发重绘
## 重排(reflow)
渲染层内元素布局的改变,都会导致页面重新排列,比如窗口尺寸的变化、删除或者添加DOM元素,影响了元素盒子大小的CSS属性(比如: width、height、padding)
## 会导致重排的JS方法和属性
当需要获取布局信息的操作时,会导致队列刷新,因为获取布局信息需要返回最新的信息,所以浏览器不得不执行渲染队列中的待处理变化并触发`重排`以返回最新的值,会触发的方法比如:

- offsetTop/offsetLeft/offsetHeight/offsetWidth
- scrollTop/scrollLeft/scrollWidth/scrollHeight
- clientTop/clientLeft/clientWidth/clientHeight
- getComputedStyle()/getBoundingClientRect()

不仅仅上述方法会导致重排,当需要获取最新的信息的时候都会导致重排的,所以上述方法需要慎用