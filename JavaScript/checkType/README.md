## 判断类型的几种方式
### typeof
格式`typeof xxx`会返回一个字符串,具体的规则是
- typeof number: number
- typeof string: string
- typeof boolean: boolean
- typeof null: object
- typeof Symbol: symbol
- typeof undefined: undefined
- typeof function: function
- typeof object: object
- typeof bigint: bigint
我们可以看到null和object同样都返回了object,这是因为,js在底层存储变量的时候,会在变量的机器码的低1-3位存储其类型信息
- 对象: 000
- 浮点数: 010
- 字符串: 100
- 布尔值: 110
- 整数: 1
- null: 全0
- undefined: -2^30

> 这里要注意如果是基本包装类型使用typeof返回的是object,比如`typeof new String('1')`返回的是'object'
### instanceof
instanceof 语法`a instanceof b`如果a是b构建出来的则返回true,通过这个特性可以判断两个对象是否属于实例关系

instanceof就是判断你的原型链上是否存在这个它的原型,下面是instanceof实现

需要注意的是 instanceof 不能用来判断基本类型,比如`1 instanceof Number`返回的是false,但是`typeof new Number(1)`返回的是`object`,instanceof不会帮助你自动建立包装类,所以不能用来判断基本类型值
```
function myInstanceof(val, obj) {
  if(val==null) {
    return false;
  }
  const type = typeof val
  if(type !== 'object'&&type !== 'function') {
    return false;
  }
  if(typeof obj!=='function') {
    throw new Error('Right-hand is not a Object')
  }
  let valProto = val.__proto__;
  const objProto = obj.prototype;
  while(valProto!=null) {
    if(valProto===objProto) {
      return true;
    }
    valProto = valProto.__proto__;
  }
  return false;
}
```
### Object.prototype.isPrototypeOf()
这个方法和 instanceof 的原理是一致的,只不过调用方法比较奇怪,要使用原型来进行调用,比如判断 一个对象是否是某个构造函数构建的
```
function A() {}
const a = new A();
A.prototype.isPrototype(a); // true
```
### Object.prototype.toString.call() 最准确的判断类型的方法
这个方法我将其称之为最准确的判断类型的方法,因为上述的判断类型方法都有它存在的问题(只要不修改`[Symbol.toStringTag]`这个属性的时候)
- typeof: 当判断 null 的时候会返回 'object', 判断基本包装类型为'object'
- instanceof: 无法判断基本类型,基本类型使用instanceof都会返回false
- Object.prototype.isPrototypeOf(): 同 instanceof

使用方法`Object.prototype.toString.call(x)`,各种类型调用返回值为
- number(不管是基本类型还是基本包装类型): "[object Number]"
- string(不管是基本类型还是基本包装类型): "[object String]"
- boolean(不管是基本类型还是基本包装类型): "[object Boolean]"
- undefined: "[object Undefined]"
- null: "[object Null]"
- symbol: "[object Symbol]"
- bigInt: "[object BigInt]"
- object: "[object Object]"

你看是不是完全正确,但是它的功能还不止于此,对于 Array/Math/Regexp 等内置对象都能够完美的正确判断,太棒了

它的原理就是寻找对象下的`[[buildTag]]`属性,然后将其拼接到object 后面

在ES6中暴露了一个属性`[Symbol.toStringTag]`当拥有这个属性的时候会优先拼接这个属性而不是寻找原型链中的`[[buildTag]]`属性

```
const a = {};
Object.prototype.toString.call(a) // "[object Object]"
a[Symbol.toStringTag] = 'aaa';
Object.prototype.toString.call(a) // "[object aaa]"
```