class Context {
  constructor() {
    this._list = []; // 存放 终结符表达式
    this._sum = 0; // 存放非终结符表达式(运算结果)
  }

  get sum() {
    return this._sum;
  }

  set sum(val) {
    this._sum = val;
  }

  add(expression) {
    this._list.push(expression);
  }

  get list() {
    return [...this._list];
  }
}


class Plus {
  interpret(context) {
    if (!(context instanceof Context)) {
      throw new Error('TypeError');
    }
    context.sum = ++context.sum
  }
}

class Minus {
  interpret(context) {
    if (!(context instanceof Context)) {
      throw new Error('TypeError');
    }
    context.sum = --context.sum
  }
}

// 测试代码

const context = new Context();

context.add(new Plus());
context.add(new Plus());
context.add(new Minus());

context.list.forEach(item => item.interpret(context));

console.log(context.sum);