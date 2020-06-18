## 防抖
遇到一道题目,当时有点懵没做出来,也有可能是没有认真审题的原因吧,是要求写一个防抖函数,现在突然有了思路,现在来写一下
```
function debounce(fn,time) {
  let last,abord,id,lastfn;
  const result = (...arr) => {
    const now = Date.now();
    if(last==null||now-last>=time) {
      last=now;
      if(typeof abord === 'function') {
        abord();
      }
      abord = fn(...arr);
      setTimeout(() => {
        if(typeof lastfn==='function') {
          lastfn();
          lastfn = null;
        }
      }, time)
    } else {
      lastfn = () => result(...arr)
    }
  }
  return result;
}
```
这个函数比防抖函数的好处是,第一次触发的时候会直接触发,接下来会监听上一次触发的时间,如果前一次触发为100ms前触发的话,则直接触发。如果上一次触发不到100ms,则会在上次触发后的100ms后调用这100ms内最后调用的结果