## transition
`transition`是`transition-property`/`transition-duration`/`transition-timing-function`/`transition-delay`的一个简写属性

它可以为一个元素在不同状态切换的时候定义不同的过渡效果。比如在不同的伪元素(:hover)之间,或者通过 JavaScript 实现状态变化

- transition-property(指定应用过渡属性的名称(如 width) 默认值为 all 可以取 none(没有过渡动画)/all(所有属性)/IDENT(属性名称)
- transition-duration 以秒或者毫秒为单位指定过渡动画执行的时间。默认值为 0S
- transition-timing-function 规定动画的速度曲线,默认是linear
   - linear 以相同的速度开始至结束(等于 cubic-bezier(0,0,1,1))
   - ease 规定慢速开始,然后变快,然后慢速结束的过渡效果 (cubic-bezier(0.25,,0.1,0.25,1))
   - ease-in 规定以慢速开始的过渡效果 (cubic-bezier(0.42,0,1,1))
   - ease-out 规定以慢速结束的过渡效果 (cubic-bezier(0,0,0.58,1))
   - ease-in-out 规定以慢速开始和结束的过渡效果 (cubic-bezier(0.42,0,0.58,1))
   - cubic-bezier(n,n,n,n) 在 cubic-bezier中定义自己的值,n可以是0-1之间
- transition-delay 值以秒或者毫秒为单位,表明动画过渡效果在何时开始。取值为正时会延迟一段时间来响应过渡效果,如果为0或者为负数则立即开始(默认为0s)
```
.tran {
  width: 100px;
  height: 100px;
  background-color: red;
  transition: all 2s ease .5s;
}
.tran:hover {
  width: 400px;
  background-color: blue;
}
// ..
<div class="tran"></div>
```
## animation
`animation`是`animation-name`/`animation-duration`/`animation-timing-function`/`animation-delay`/`animation-iteration-count`/`animation-direction`/`animation-fill-mode`/`animation-play-state`的一个简写形式
- animation-name 指定应用的一系列动画,每个名称代表一个由`@keyframes`定义的动画序列,初始值为`none`
- animation-duration 规定完成动画一个周期所花费的时间,单位可以是秒或者毫秒,默认是0
- animation-timing-function 规定动画的速度曲线,默认是'ease'
   - linear 以相同的速度开始至结束(等于 cubic-bezier(0,0,1,1))
   - ease 规定慢速开始,然后变快,然后慢速结束的过渡效果 (cubic-bezier(0.25,,0.1,0.25,1))
   - ease-in 规定以慢速开始的过渡效果 (cubic-bezier(0.42,0,1,1))
   - ease-out 规定以慢速结束的过渡效果 (cubic-bezier(0,0,0.58,1))
   - ease-in-out 规定以慢速开始和结束的过渡效果 (cubic-bezier(0.42,0,0.58,1))
   - cubic-bezier(n,n,n,n) 在 cubic-bezier中定义自己的值,n可以是0-1之间
- animation-delay 规定动画延时多久开始,单位可以是秒或者毫秒,默认值是0,
- animation-iteration-count 规定动画播放的次数,默认值是1,inifinite代表它无限次播放
- animation-direction 规定动画是否在下一周期逆向的播放,默认值是'normal'正常播放,alternate 动画反向播放
- animation-fill-mode 规定对象动画时间之外的状态,规定动画在播放前或者播放之后,其动画效果是否可见
   - none 不改变默认行为
   - forwards 当动画完成时,保持最后一个属性值
   - backwards 在 animation-delay 所指定的一段时间内,在动画显示之前,应用开始属性值(在第一个关键帧中定义)
   - both 向前和向后填充模式都被应用
- animation-play-state 规定动画是否在运行或者暂停 paused规定动画已经暂停,running规定动画正在播放

可以通过`@keyframes`来创建动画,原理是将一套CSS样式逐渐变化为另一套样式。基本语法是
```
@keyframes animationname { keyframes-selector { css-styles; } }
```
- animationname 必须。定义动画的名称
- keyframes-selector 必须。定义动画的百分比,合法的值为
   - `0-100%`
   - form 与 0% 相同
   - to 与 100% 相同
- css-styles 必须。一个或者多个合法的 CSS 样式属性

```
.animation {
  width: 100px;
  height: 100px;
  background-color:red;
  animation: change 2s infinite alternate
}
@keyframes change {
  form {
    width: 100px;
    background-color: red;
  }
  to {
    width: 500px;
    background-color: blue;
  }
}
// ...
<div class="animation"></div>
```