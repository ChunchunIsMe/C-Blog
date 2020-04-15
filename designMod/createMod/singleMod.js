function Singleton() { }

Singleton.getInstance = (function () {
  let midObj = null;
  return function () {
    if (!midObj) {
      midObj = new Singleton()
    }
    return midObj;
  }
})()

console.log(Singleton.getInstance() === Singleton.getInstance());