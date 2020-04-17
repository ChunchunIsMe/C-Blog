// 策略类
const strategies = {
  A() {
    console.log('This is stragegy A')
  },
  B() {
    console.log('This is stragegy B')
  }
}

// 环境类
const context = name => {
  return strategies[name]();
}

// 调用策略A
context("A");
// 调用策略B
context("B")