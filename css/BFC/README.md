## FC
FC的全程是: Formatting Contexts, 是W3C CSS2.1规范的一个概念。它是页面中一块渲染区域,并且有一套渲染规则,它决定了其子元素将如何定位,以及和其他元素的关系和相互作用

### IFC(Inline Formatting Contexts)
直译为"内联格式化上下文",IFC的line box(线框)高度由其包含行内元素中最高的实际高度计算而来(不受到竖直方向的padding/margin影响)

IFC中line box一般都贴紧整个IFC,但是会因为float元素而扰乱。float元素会位于IFC与line box之间,使得line box宽度缩短。同个IFC下的多个line box高度会不同。IFC中时不可能有块级元素,当插入块级元素时(比如p插入div)会产生两个匿名块与div分隔开,即产生两个IFC,每个IFC对外表现为块级元素,与div垂直排列

作用:
- 水平居中: 当一个块要在环境中水平居中时,设置其为inline-block则会在外层产生IFC,通过text-align则可以使其水平居中
- 垂直居中: 创建一个IFC,用其中一个元素撑开父元素的高度,然后设置其vertical-align: middle,其他行内元素则可以在此父元素下垂直居中

### GFC(GridLayout Formatting Contexts)
GFC直译为"网格布局格式化上下文",当为一个元素设置display值为grid的时候,此元素将会获得一个独立的渲染区域,我们可以通过在网格容器(grid container)上定义行(grid definition rows)和网格定义列(grid definition columns)属性各在项目(grid item)上定义网格行(grid row)和网格列(grid columns)为每个网格项目(grid item)定义位置和空间

同样为表格GFC可以有更加丰富的属性来控制行列
### FFC(Flex Formatting Contexts)
FFC直译为"自适应格式化上下文",display值为flex或者inline-flex的元素将会生成自适应容器(flex container)。

flex box 由伸缩容器和伸缩项目组成。设置 flex 被渲染成一个块级元素,inline-flex则渲染成一个行内元素

伸缩容器中每一个子元素都是一个伸缩项目。伸缩项目可以是任意数量的。伸缩容器外和伸缩项目内一切元素不受影响(完全由flex)


### BFC(Block Formatting Contexts)
直译为"块级格式化上下文"。BFC就是页面上一个隔离的渲染区域,容器里面的元素不会在布局上影响到外面的元素,反之也是如此。

布局规则:
1. 内部的Box会一个接着一个放置
2. Box的垂直方向由margin决定。属于同一个BFC的两个Box垂直方向margin会发生重叠
3. 每个盒子的margin box 的左边和border box的左边相接触
4. BFC的区域不会和float box重叠(不是BFC元素float box不会盖住字但是会盖住元素)
5. 计算BFC高度时,子元素的float也参与计算

创建BFC:
- 根元素(html)
- 浮动元素(float 不是 none)
- 绝对定位元素(position是absolute或者fixed)
- display为 inline-block/table-cell/table-caption/table/table-row/table-row-group/table-header-group/table-footer-group/inline-table/flex/inline-flex/flow-root/grid/inline-grid
- overflow 不为 visible
- contain 为 layout、content、paint
- column-count或column-width不为 auto
- column-span为all

使得浮动占位还有一个方法是最后一个元素属性为 clear:both

clear这个属性是指定一个元素是否必须移动到它之前的浮动元素下面