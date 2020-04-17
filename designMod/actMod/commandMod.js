const mockData = {
  10001: {
    name: '电视',
    price: 3888
  },
  10002: {
    name: 'Mac',
    price: 10000
  }
}

// 商品类: 执行者
class Mall {
  static request(id) {
    if (!mockData[id]) {
      return '商品不存在'
    }
    const { name, price } = mockData[id];
    return `商品名: ${name} 单价: ${price}`
  }

  static buy(id, number) {
    if (!mockData[id]) {
      return '商品不存在'
    }
    if (number < 1) {
      return '至少买一个'
    }
    return mockData[id].price * number;
  }
}

// 这个时候可以直接调用商品类的方法了，但是这回增加调用者和执行者的耦合度。如果之后的函数名称变了，那么修改成本自然高。
// 根据命令模式的思路，封装一个"传递者"函数，专门用来传递指令和参数。如果之后商场类的函数名改变了，只需要在"传递者"函数中做个简单映射即可。


// 传递者

function execCmd(cmd, ...args) {
  if (typeof Mall[cmd] !== 'function') {
    return;
  }
  return Mall[cmd](...args)
}

// 调用者
console.log(execCmd('request', 10001));
console.log(execCmd('buy', 10002, 3))