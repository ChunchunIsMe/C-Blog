// 这个时候isFun就可以作为一个装饰装饰器，对其他东西进行装饰

function isFun(fn) {
  return typeof fn === 'function';
}

function runFun(fn) {
  if (!isFun(fn)) {
    return;
  }
  fn();
}
