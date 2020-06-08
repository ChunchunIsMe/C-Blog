## flex
弹性布局

可以使用 `display:flex`或者`display:inline-flex`来将容器指定为弹性布局,前者会渲染成块级元素,后者会渲染为行内块元素

flex存在两根轴: 水平的主轴和垂直的交叉轴

有6个属性设置在容器上

- flex-direction: 设置主轴方向 row(默认) | row-reverse | column | colum-reverse
- flex-wrap: 设置容器内元素是否换行 nowrap(默认) | wrap | wrap-reverse
- flex-flow: flex-direction 和 flex-wrap 的缩写
- justify-content: 设置在主轴上的对齐方式 flex-start(默认)从左到右 | flex-end从右到左 | center全部居中 | space-between两端对齐(所有项目间隔相同但左右不留间隙) | space-around 所有项目间隔相同左右留间隙,间隙为项目间隔一半
- align-items: 设置在交叉轴上的对齐方式 flex-start | flex-end | center | baseline | stretch 默认(拉伸每个子元素的交叉轴长度设置为和容器元素轴长一致)
- align-content: 定义多根轴线的对齐方式(wrap之后),如果只有一根轴线则不生效, flex-start | flex-end | center | space-between | space-around | stretch

有6个属性设置在子元素上

- order: 默认为 0 数值越小排列越前
- flex-grow: 放大属性,默认为0,如果大于0那么父元素还有剩余空间则会按比例放大
- flex-shrink: 缩放属性,默认为1,如果空间不足,则按比例缩放
- flex-basis: 设置元素在缩放/放大前本来占据主轴的大小 默认值为 auto 就是他本来的大小
- flex: flex-grow flex-shrink flex-basis 的缩写有两个快捷值auto(1 1 auto)/none(0 0 auto)
- align-self: 允许单个项目与其他项目不一样的对齐方式,可以覆盖align-items属性