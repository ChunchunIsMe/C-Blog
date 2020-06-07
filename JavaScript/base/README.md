## script元素
1. defer: 拥有defer="defer"的script标签碰到之后会先下载,但是延迟执行(h5规范要求按出现的顺序先后执行,但是现实不一定是这样)且外部脚本才生效
2. async: async和defer类似,都用于改变处理脚本的行为,同样只适用于外部脚本文件,但是async的脚本不能保证先后执行顺序
3. noscript: 当浏览器不支持script的时候里面的元素会显现出来
4. DOCTYPE: html开始时的文档类型声明
## 数据类型转换
- 值转换为Boolean
   - Boolean: Boolean
   - 非空字符串: true
   - 空字符串: false
   - 0和NaN: false
   - 除0和NaN的数字: true
   - Object: true
   - undefined/null: false
- 值转换为Number
   - true: 1
   - false: 0
   - null: 0
   - undefined: NaN(这个要注意!!)
   - 空字符串: 0
   - 只包含数字的字符串: 数字
   - 拥有其他字符的字符串: NaN (但是如果使用parseInt他会取字符串最开始的数字进行转换,直到遇到不是数字则将后续舍弃,但是ParseInt转换空字符串是NaN并且开头不是数字也将是NaN)
   - 对象: 如果有`[Symbol.toPrimitive]`就取它的返回值,没有就取`valueOf`再没有就取`toString`
- 值转换为String: 调用各自的toString()方法但是如果是 null 和 undefined 是没有toString方法的,他们则转换为'null'和'undefined1',且Number的toString方法是可以输入值将其转换为2、8、16进制的字符串