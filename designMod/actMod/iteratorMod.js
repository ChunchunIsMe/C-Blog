function iteratorCreater(list) {
  return function () {
    let index = 0;
    function next() {
      var obj = {
        value: list[index++],
        done: list[index] !== undefined ? false : true
      }
      console.log(obj);
      return obj;
    }
    return {
      next
    };
  }
}
var iter = iteratorCreater([1, 2, 3, 4, 5]);

var iter2 = {}
iter2[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  return 5;
}

iter[Symbol.iterator] = iter;
for (const item of iter2) {
  console.log(item)
}