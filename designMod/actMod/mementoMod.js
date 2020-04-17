
function mementoMod() {
  const cache = {};
  return function Fibonacci(n) {
    if (cache[n]) {
      return cache[n]
    }
    if (n <= 2) {
      return 1;
    }
    cache[n] = Fibonacci(n - 1) + Fibonacci(n - 2)
    return cache[n]
  }
}
const fun = mementoMod();
console.log(fun(7));