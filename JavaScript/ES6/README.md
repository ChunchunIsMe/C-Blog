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
- 使用`let a = Symbol()`创建,前面不能带new
- description: 创建Symbol的时候可以添加一个描述,用这个属性可以获取。`const a = Symbol('foo');a.description`
- 如果使用Symbol值作为属性名: `for...in`、`for...of`、`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`都不会返回Symbol属性名。只有使用`Object.getOwnPropertySymbols()`可以获取指定对象的所有Symbol属性名,方法返回一个数组。还有一个`Reflect.ownKeys()`返回所有类型的键名,包括常规和Symbol
- Symbol.for(): 如果想要使用相同的Symbol可以使用Symbol.for()输入相同的参数生成`Symbol.for('foo')===Symbol.for('foo')`
- Symbol.keyFor(): 用来返回传入Symbol的key这个key是使用Symbol.for()注册的key
```
const a = Symbol.for('foo');const b = Symbol('foo')
Symbol.keyFor(a) // foo
Symbol.keyFor(b) // undefined
```
## 内置的Symbol属性
1. Symbol.hasInstance: 对象的内部方法。比如使用`foo instanceof Foo`其实是调用`Foo[Symbol.hanInstance](foo)`
```
const obj = {
  [Symbol.hasInstance](foo) {
    return Array.isArray(foo)
  }
}
[] instanceof obj // true
```
2. Symbol.isConcatSpreadable: 一个布尔值,代表使用Array.prototype时是否可以展开
```
let arr1 = [2,3,4];
[1].concat(arr1,5); // [1,2,3,4,5]
let arr2 = [2,3,4];
arr2[Symbol.isConcatSpreadable] = false;
[1].concat(arr2,5); // [1,[2,3,4],5]
```
3. Symbol.species: 
4. Symbol.match: 使用match的时候会调用它
```
str.match(regexp);
// 相当于
regexp[Symbol.match](str)
```
5. Symbol.replace: 如果想要替换掉这个字符串,那么将会调用这个函数
```
str.replace(a,b);
// 相当于
a[Symbol.replace](str,b);
```
6. Symbol.search: 调用search的时候,将会调用这个函数
```
str.search(regexp);
// 相当于
regexp.[Symbol.search](str);
```
7. Symbol.split: 调用split的时候,将会调用这个函数
```
str.split(re,limit);
// 相当于
re[Symbol.split](str,limit);
```
8. Symbol.iterator: 指向对象的默认遍历器方法,进行`for..of`的时候将会调用这个函数,调用这个函数将会返回一个有next的函数,当调用这个next的时候将会返回`{value:1,done:false}`这样的值,value是当前遍历的值,done代表是否就可以进行下一步next();
9. Symbol.toPrimitive: 当类型转换的时候将会调用这个函数
```
let obj = {};
String(obj);
// 相当于
obj[Symbol.toPromitive]('string');
```
10. Symbol.toStringTag: 一个属性,返回的值将会出现在toString的字符串中,比如Math[Symbol.toStringTag]: 'Math' Math.toString() === `[object Math]`,重写了toString的会按照toString的逻辑处理
11. Symbol.unscopables: 一个对象,其中包含了不会被with语法块的作用域下找的属性。
## Set/WeakSet
- Set类似于数组,但是成员的值都是唯一的,没有重复的值,可以接受数组(或者具有iterator接口的数据成员)作为参数,用来初始化`new Set([1,1,3,4]) // [1,3,4]`
- 拥有size属性获取Set元素总数
- add(val)/delete(val)/has(val)/clear(): 分别用来增加/删除元素、判断元素是否存在、清空所有成员
- keys()/values()/entries()/forEach(): 前三个返回的都是遍历器对象{next: () => {//..}}。后一个和数组一致,注意Set没有键名只有键值(或者说都一样)、forEach((key,value) => {//..})
- 可以使用Array.form()、扩展运算符将Set转化为数组
- WeakSet只有add、delete、has方法没有清空和遍历方法。WeakSet的值都是弱引用,并且WeakSet中只能存放对象
## Map/WeakMap
- 也是键-值对结构的集合,但是对象只接受字符串/Symbol当做键名Map不限数据类型
- Map可以使用new Map()来创建可以填入一个entries结构的作为参数
- size属性获取成员总数
- set(key,value)/get(key)/has(key)/delete(key)/clear(): 分别用来设置/获取/判断是否存在/删除成员、清除map
- keys()/values()/entries/forEach(): 和Set的一致
- 可以用扩展运算符等转换为对象,如果key不是字符串将会调用toString、
- WeakMap和Map类似只不过key只接受对象,并且都是弱引用,也只有set/get/has
## Proxy
- 名字就很明显了,给对象设置一层代理,对对象进行任何操作的时候进行代理
- 当使用proxy代理对象后,使用proxy调用对象的方法,其中的this为proxy对象
- Proxy支持的拦截操作如下
- get(target,key,proxy): 在获取属性值的时候进行拦截return值为获取的值
- set(target,key,value,proxy): 在给属性值赋值的时候拦截返一个布尔值
- has(target,key): 拦截`key in target`的操作返回一个布尔
- deleteProperty(target,key): 拦截 delete 操作,返回一个布尔值
- ownKeys(targets): 拦截所有key的遍历方法,返回一个数组
- getOwnPropertyDescriptor(target, key): 拦截`Object.getOwnPropertyDescriptor(proxy,key);//返回属性的描述对象`返回属性的描述对象
- defineProperty(target,key,desc): 拦截`Object.defineProperty(proxy,key,desc)`/`Object.defineProerties(proxy,desc)`返回布尔值
- preventExtensions(target): 拦截`Object.preventExtensions(proxy);//让对象无法新增属性`返回布尔值
- getProtypeOf(target): 拦截`Object.getProtypeOf(proxy)`,返回一个对象
- isExtensible(target): 拦截`Object.isExtensible(proxy);// 判断对象是否可扩展`返回布尔值
- setPrototypeOf(target,proto): 拦截`Object.setPrototypeOf(proxy,proto)`,返回一个布尔值
- apply(target,object,args): 拦截调用的操作比如`proxy(...args);proxy.call();proxy.apply()`等
- construct(target,args): 拦截使用`new`比如`new proxy(...args)`
## Reflect
- Reflct 只是将`Object`对象的一些明细属于语言内部的方法,放到Reflect对象
- Reflct的方法和Proxy的拦截操作方法一一对应,不同的是Proxy是拦截,Reflct调用时直接操作,参数也和上面完全一致,比如
- 想要删除`obj`的`foo`属性的时候`Reflect.deleteProperty(obj,'foo')`
## Promise
- Promise是异步解决方案,分为三个状态`pending`进行中,`fullfilled`成功,`reject`失败
- 定义方式`let p = new Promise((resolve,reject) => {})` 传入Promise的函数会立即调用,函数会传入两个参数`resolve`和`reject`,当调用`resolve`之后`p`的状态就会变为`fullfilled`,调用`reject`之后状态就会变为`rejected`
- promise实例可以调用`then`方法,then方法会在`p`的状态变为`fullfilled`之后将第一个参数的函数加入到微任务池中,变为`reject`之后会将第二个参数加入微任务队列比如`p.then((val) => {},(e) => {})`then中函数传入的值为上一个promise返回的值,并且then方法会返回一个promise对象,也就是说你可以一直`then`下去,如果你then中的函数返回的一个promise对象下一个then就是根据返回的这个promise对象来判断,如果不是promise那就会将开始的状态传递下去,但是遇到reject就会停止
- catch(fn) 相当于 then(,fn) 本质还是`then`
- finally(fn) 不管最后是什么状态都会调用其函数 本质还是`then`
- Promise.all(promiseArr) 接收一个数组,返回一个promise对象数组中都是promise对象 当数组中的promise所有状态都变为`fullfilled`返回的promise才会变成`fullfilled`否则就是`rejected`resolve中的值为数组,数组中为所有promise的值
- Promise.race(): 和all基本一样,只不过数组中只要有一个变成`fullfilled`就立马变成`fullfilled`
- Promise.allSelected() 和all基本一样,只不过all遇到有`rejected`的就直接改变`rejected`状态,而`allSelected`会等所有都执行完在改变状态
- Promise.any(): 和all反着来,只要有一个fulfilled就会fullfilled,同样会等待所有promise都执行完
- Promise.resolve(): 返回一个`fullfilled`状态的promise
- Promise.reject(): 返回一个`rejected`状态的promise
- Promise.try(fn): 传入一个函数如果是同步的就同步执行,异步的使用then捕获
## Iterator

## Generator

## async

## Class

## ArrayBuffer

## Decorator