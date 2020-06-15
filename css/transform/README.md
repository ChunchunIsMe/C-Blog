## transform
transform属性向元素应用 2D 或 3D 转换。该属性循序我们对元素进行旋转、缩放、移动或者倾斜,语法
```
transform: none|transform-functions;
```
可选值
- none 定义不设置转换
- matrix(n,n,n,n,n,n) 定义2d转换,使用六个值的矩阵
- matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n) 定义3d转换,使用16个值的转换
- translate(x,y) 定义2d转换
- translate3d(x,y,z) 定义3d转换
- translateX(x) 定义x轴的转换
- translateY(y) 定义y轴的转换
- translateZ(z) 定义z轴的转换
- scale(x,y) 定义2d的缩放
- scale3d(x,y,z) 定义3的缩放
- scaleX(x) 通过设置x轴的值来定义缩放转换
- scaleY(y) 通过设置y轴的值来定义缩放转换
- scaleZ(z) 通过设置z轴的值来定义缩放转换
- rotate(angle) 定义2d旋转,在参数中规定角度
- rotate3d(x,y,z,angle) 定义3d旋转
- rotateX(angle) 定义沿着x轴的旋转
- rotateY(angle) 定义沿着y轴的转换
- rotateZ(angle) 定义沿着z轴的转换
- skew(x-angle,y-angle) 定义沿着x和y轴的倾斜转换
- skewX(angle) 定义沿着x轴的倾斜转换
- skewY(angle) 定义沿着y轴的倾斜转换
- perspective(n) 为3d转换元素定义透视视图

[常用属性例子](./index.html)