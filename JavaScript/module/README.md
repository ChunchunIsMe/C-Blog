## ESModule & CommonJS
ESModule与CommandJS有两个重大的差异
- CommonJS 模块输出的是一个值的拷贝,ESModule输出的是值的引用
- CommonJS 模块是运行时加载,ESModule是编译时输出接口

第二个差异是因为 CommonJS 加载的是一个对象(`module.exports`对象),该对象只有在脚本运行完才会生成。而ESModule不是对象,它的外接是一种静态定义,在代码静态解析阶段就会生成。

第一个差异

CommonJS模块输出的是值的拷贝,也就是说,一旦输出这个值,模块内部的变化就影响不到这个值。比如
```
// lib.js
var count = 3;
function addCount() {
  count++;
}
module.exports = {
  count:count,
  addCount:addCount
}
// main.js
var mod = require('./lib');
console.log(mod.count); // 3
mod.addCount();
console.log(mod.count); // 3
```
你会发现并没有影响到count的值,原因就是CommonJS使用的是值的拷贝,导出来的同时你已经拷贝了这个值,如果你想要获取这个值,那么需要封装成函数来进行
```
var count = 3;
function addCount() {
  count++;
}
module.exports = {
  get count() { return count; },
  addCount:addCount
}
```
ESModule的运行机制就和CommonJS的不一样,JS引擎对脚本静态分析的时候,遇到模块加载命令`import`,就会生成一个只读的引用。等到脚本真正执行的时候,再根据这个只读引用,到被加载的那个模块里面去取值。如果上面的例子用ESModule来写就是另一种情况了
```
// lib.js
export var count = 3;
export function addCount() {
  count++;
}
// main.js
import { count, addCount } from './lib.js';
console.log(mod.count); // 3
mod.addCount();
console.log(mod.count); // 4
```
## TreeShake
Web的TreeShake就是依靠ESModule在编译时输出静态值的引用来做的

因为ESModule模块依赖关系是确定的,和运行时的状态无关,所以可以进行可靠的静态分析,这就是tree-shaking的基础

而如果使用CommonJS是运行时导出值的拷贝,那么做tree-shaking基本不可能