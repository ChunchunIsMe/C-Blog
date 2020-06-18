## 防抖
遇到一道题目,当时有点懵没做出来,也有可能是没有认真审题的原因吧,是要求写一个防抖函数,现在突然有了思路,现在来写一下
```
function debounce(fn,time) {
  let last,abord;
  return (...arr) => {
    const now = Date.now();
    if(last==null||now-last>=time) {
      last=now;
      if(typeof abord === 'function') {
        abord();
      }
      abord = fn(...arr);
    }
  }
}
```