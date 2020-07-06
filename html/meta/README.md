## meta
### 类型
`meta` 元素定义的元数据的类型包括以下几种
- 如果设置了`name`属性,`meta`元素提供的是文档级别的元数据,应用于整个页面
- 如果设置了`http-equiv`属性,`meta`元素则是编译指令,提供的信息与类似命名的HTTP头部相同
- 如果设置了`charset`属性,`meta`元素时一个字符集声明,告诉文档使用哪种字符编码
- 如果设置了`itemprop`属性,`meta`元素提供用户定义的元数据
### 属性
> `meta`属性具有全局属性,但是`name`在meta中有特殊含义,另外,同一个`<meta>`标签中,拥有`name`,`http-equiv`或者`charset`三者中任何一个属性,`itemprop`属性不能被使用

1. charset 声明文档的字符编码。
2. content 包含`http-equiv`或`name`属性的值（类似于键值对`http-quiv/name`为键`content`为值）
3. http-equiv 定义了一个编译指示指令。可以用来设置http头什么的(比如使用`<meta http-equiv="expires" content="Wed, 20 Jun 2019 22:33:00 GMT" />`)
4. name `name`和`content`属性可以一起使用,以名-值对的方式给文档提供元数据,其中name作为元数据的名称,content作为元数据的值。(常用为`viewport`如：`<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />`)