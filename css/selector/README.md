## 选择器
### 基本选择器
#### 标签选择器
直接是标签名比如
```
div { }
p { }
```
这样写的样式就是将所有该标签的样式变为选择器中的样式
#### 类选择器
类选择器就是将拥有该类的标签样式变为选择器中的样式 以.开头
```
.red {
  color: red
}
// ...
<div class="red">red font</div>
<div>font</div>
```
这样拥有 red 类的标签就会拥有类选择器中的样式
#### id选择器
id选择器就是将拥有该id的标签变为选择器中的样式 以#开头
```
#myid {
  color: red;
}
// ...
<div id="myid">red font</div>
```
#### 属性选择器
属性选择器就是选择拥有该属性的元素 用`[]`将属性包裹起来
```
[href] { font-size: 20px } // 带href属性的全用这个样式
[href=taobao.com] { color: red } // href属性为taobao.com的用这个样式
[title~=hello] {color: green} // ~=适用于用空格分开的属性值,只要带这个属性值就用这个样式
[lang|=en] {color:bule} // |= 适用于连字符(-)分割的属性值只要连字符端有这个属性就用这个样式
// ...
<a href="www.baidu.com">baidu</a>
<a href="taobao.com">taobao</a>
<div title="hello">hello</div>
<div title="hello end">hello</div>
<p lang="en">Hello!</p>
<p lang="en-us">Hi!</p>
```
### 条件选择器
#### 后代选择器
使用基本选择器,然后用空格隔开就是后代选择器,注意后代选择器包含该元素的所有下级(不只是下一级)
```
p p { background-color: red } 选择p标签的所有p后代
// ...
<p>
  hello // 这里不会变色
  <p>
    hi // 这里红色
    <p>down</p> // 这里会变色
  </p>
  <div>no</div> // 这里不会变色
</p>
```
#### 子元素选择器
使用基本选择器,然后用>代表选择它的子元素,注意子元素选择器只会选择它的下一级
```
p p { background-color: red } 选择p标签的所有p后代
// ...
<p>
  hello // 这里不会变色
  <p>
    hi // 这里红色
    <p>down</p> // 这里不会变色
  </p>
  <div>no</div> // 这里不会变色
</p>
```
#### 相邻兄弟选择器
使用基本选择器,然后用+接后一个兄弟,代表选择它的兄弟
```
p+div {
    color: blue;
  }
//...
<div>1323123123123</div> // 不变
<p>222</p>
<div>1323123123123</div> // 变色
<div>1323123123123</div> // 不变
```
#### 后续兄弟选择器
使用基本选择器,然后使用~接一个标签,代表选择它后续所有该标签的兄弟
```
p~div {
    color: blue;
  }
//...
<div>1323123123123</div> // 不变
<p>222</p>
<div>1323123123123</div> // 变色
<div>1323123123123</div> // 变色
```
#### 并集选择器
两个基本选择器挨着就会选择它的并集
```
p.red {
  color: red;
}
// ...
<p>no color</p>
<div class="red">no color</div>
<p class="red">red</p>
```
#### 交集选择器
用逗号隔开那么所有的选择器都会使用这个样式
```
div,p {color: red}
// ...
<div>red</div>
<p>red</p>
```
### 伪类选择器
1. :link 向未被访问的链接添加样式
2. :visited 向已被访问的链接添加样式
3. :hover 当鼠标悬浮在元素上展现的样式
4. :active 向被激活的链接样式
5. :first-child 向元素的第一个子元素添加样式
6. :lang 想有指定lang属性的元素添加样式
7. :focus 向拥有键盘输入焦点的元素添加样式
### 伪元素选择器
1. :first-line 向文本的首行添加特殊样式
2. :first-letter 向文本的第一个字母添加特殊样式
3. :before 在元素之前添加内容
4. :after 在元素之后添加内容