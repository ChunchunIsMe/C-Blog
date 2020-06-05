## let 和 const

- 增加了暂时性死区
- const是常量不可改变
- let/const声明的变量不再挂载在window对象下(挂载在了和Global平级的Script对象下,window对象其实是一个Global的代理)
- let/const拥有块级作用域
- 不会进行变量提升
- 不允许重复声明
- 增加顶层对象globalThis(ES2020)兼容各个环境(浏览器window/node是global)
## 扩展运算符
可以用来解构`...`
```
arr.push(...arr);
function (...rest){}
```
## 解构赋值

可以将数组/对象/字符串进行解构赋值,还可以给初始值比如
```
const obj = {val:1};
const obj1 = {...obj};
const arr = [1];
const arr1 = [...arr];
const str = 'hellp'
const arr2 = [...str];
const obj2 = {...str};
const [a=1,b=2] = arr;
const {val:c=2,doc:d:3} = obj;
```

## 字符串扩展
- 允许`\uxxxx`表示一个字符
- 拥有`for...of`
- 字符串模板\`\`中间可以使用${}来传入变量
- String.fromCodePoint(): 新增静态方法,用于从Unicode码点返回对应字符
- String.raw(): 静态方法,使得反斜杠被转义,比如`String.raw('\n')`返回`\\n`;
- codePointAt(): 正确处理4个字节字符方法
- mormalize(): 处理字符
- includes()/startsWith()/endsWith(): 传入的字符串是否在字符串中存在/字符串开头/字符串结尾
- repeat(): 将字符串循环传入的参数次并返回/参数小数被取整 无穷大负数报错
- padStart()/padEnd(): 字符串填补长度/这两个方法分别在头尾填补/第一个参数是返回的字符串长度/第二个参数是填补的字符串
- trimStart()/trimEnd(): trim是消除头尾空格,他们分别是消除头/尾
- matchAll(): 方法返回正则在字符串中所有匹配

## 正则
- 允许了 new Regexp() 第二个参数为修饰符
- 使用正则的字符串对象方法`match()/replace()/search()/split()`都定义在了Regexp下
## 数值
- 二进制用0b八进制用0o开头表示
- Number.isFinite()/Number.isNaN: 用来判断是否是Infinity和NaN
- 移植parseInt/parseFloat 到 Number 下
- Number.isInteger(): 判断数是否是Integer
- Number.isSafeInteger(): 判断数字是否安全
- 增加BigInt: 在数字后面加n
- 指数运算符 **: 2的3次方`2**3`
- Math.trunc(): 去除参数的小数部分后返回
## 函数
- 箭头函数: this变为定义时上下文this且不能改变
- rest参数: 使用解构赋值代替`arguments`比如`function(...rest){}`
- name属性: 返回函数名
- 尾调用优化: 增加尾调用优化
## 数组
- Array.form(): 把可以生成数组的值转化成新数组
- Array.of(): 把参数作为数组中的值`Array.of(1,2,3)// [1,2,3]`
- copyWithin(target, start=0,end=this.length): 将指定数组中的值赋值到数组的另一位置start/end是选取的区域,将选取的区域从index=target的位置开始赋值
- find()/findIndex():寻找在数组中的值返回true/index
- fill(val,start=0,end=this.length):将数组的值进行填充
- includes(): 判断是否在数组中
- flat(): 将数组拍平,参数是拍平多少层
- flatMap(): 和map类似只不过如果返回数组会拍平数组
## 对象
- super: 指向对象的原型对象
- 链式判断运算符`a?.b?.c`ES2020才引入
- null判断运算符 `a ?? b`在a 为 null 或者 undefined时返回b
- Object.is(): 和`===`基本一致除了`+0`不等于`-0`还有`NaN`等于自身
- Object.assign()
- Object.keys()/Object.values()/Object.entries()
- Object.fromEntries();
## Symbol
- 新增数据类型且唯一
## Set/Map

## Proxy

## Reflect

## Promise

## Iterator

## Generator

## async

## Class

## ArrayBuffer

## Decorator