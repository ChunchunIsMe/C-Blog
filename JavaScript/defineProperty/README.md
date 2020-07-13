## defineProperty
`Object.defineProperty()`方法会直接在一个对象上定义一个新属性, 或者修改一个对象的现有属性, 并返回此对象。

#### 基本语法
```
Object.defineProperty(obj, prop, descriptor)
```
1. obj 要定义属性的对象
2. prop 要定义或修改的属性的名称或`Symbol`
3. descriptor 要定义或修改的属性描述符,这个参数为一个对象,对象中的描述符有
- configurable 当该属性的`configurable`键为`true`时,该属性的描述符才能够被改变,同时该该属性也能从对应的对象上被删除,默认值为`false`
- enumerable 当且仅当该属性的`enumerable`键值为`true`时,该属性才会出现在对象的枚举属性中。默认值为`false`
- value 该属性对应的值。可以是任何有效的 JavaScript 值(数值,对象,函数等)。默认值为`undefined`
- get 属性的`getter`函数,如果没有getter,则为`undefined`。访问该属性时,会调用此函数。执行时不传入任何参数,但是会传入`this`对象(由于继承关系,这里的this并不一定是定义该属性的对象)。该函数的返回值会被用作属性的值。默认为`undefined`

> 如果一个描述符同时拥有`value`或`writable`和`get`或`set`键,则会产生一个异常
#### 例子
可以用这个做一个双向绑定
```
<body>
  <input type="text" id="input">
  <div id="div"></div>
  <script>
    const input = document.getElementById('input');
    const div = document.getElementById('div');
    const obj = {}
    Object.defineProperty(obj, 'input', {
      set(e) {
       this.a = e;
       div.innerText = e;
      },
      get() {
        return this.a;
      }
    })
    input.oninput = (e) => {
      obj.input = e.target.value;
    }
  </script>
</body>
```
## defineProperties
`Object.defineProperties`其实就是`Object.defineProperty`多个定义的简写
#### 基本语法
```
Object.defineProperties(obj,props)
```
1. obj 在其定义或修改属性的对象
2. props 要定义其可枚举属性或修改的属性描述符对象。对象中存在的属性描述符主要有两种: 数据描述符和访问器描述符。为一个对象,对象的`key`为`obj`的`key`值为`descriptor`
- configurable 同上
- enumerable 同上
- value 同上
- writable 同上
- get 同上
- set 同上
#### 例子
如果我们一下子要做多个input的双向绑定,比如要写一个框架的时候,那肯定用`defineProperties`好,要不然一个个写`defineProperty`不是累死了
```
<body>
  <input type="text">
  <input type="text">
  <input type="text">
  <div id="div"></div>
  <script>
    const div = document.getElementById('div');
    const inputs = document.getElementsByTagName('input');
    const obj = ['', '', ''];
    Object.defineProperties(obj, {
      input0: {
        set(e) {
          this[0] = e;
          div.innerText = `${this[0]},${this[1]},${this[2]}`;
        }
      },
      input1: {
        set(e) {
          this[1] = e;
          div.innerText = `${this[0]},${this[1]},${this[2]}`;
        }
      },
      input2: {
        set(e) {
          this[2] = e;
          div.innerText = `${this[0]},${this[1]},${this[2]}`;
        }
      }
    })
    for (let i = 0; i < inputs.length; i++) {
      const ele = inputs[i];
      ele.addEventListener('input', e => {
        const key = `input${i}`
        obj[key] = e.target.value;
      })
    }
  </script>
</body>
```