### 获取dom是否出现在视图中
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