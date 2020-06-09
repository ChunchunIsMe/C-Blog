function debounce(func, time) {
  let id = null;
  let last;
  return () => {
    if (id != null) {
      window.clearTimeout(id)
    }
    id = window.setTimeout(() => {
      if (typeof func === 'function') {
        // 增加这个last的原因是
        // 如果存在输入框远程搜索防抖,那么如果发出请求的上一次比这一次的结果晚到,那么下拉框展示的会是上一次的结果
        // 这个时候我们应该用一个函数来终止上一次的行为,比如 ajax 的 abort
        if (typeof last === 'function') {
          last();
        }
        last = func();
      }
    }, time);
  }
}