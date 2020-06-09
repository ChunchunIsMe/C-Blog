function debounce(fn, time) {
  let lastTime, last;
  return () => {
    const now = Date.now();
    if (lastTime != null && now - lastTime < time) {
      return;
    }
    // 增加这个last的原因是
    // 如果存在输入框远程搜索防抖,那么如果发出请求的上一次比这一次的结果晚到,那么下拉框展示的会是上一次的结果
    // 这个时候我们应该用一个函数来终止上一次的行为,比如 ajax 的 abort
    if (typeof last === 'function') {
      last();
    }
    last = func();
    lastTime = Date.now();
  }
}