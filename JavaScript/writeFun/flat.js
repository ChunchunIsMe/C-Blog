Array.prototype.myFlat = function (circle = 1) {
  if (circle <= 0) {
    return this;
  }
  const result = [];
  this.forEach(item => {
    if (Array.isArray(item)) {
      result.push(...item);
    } else {
      result.push(item);
    }
  });
  if (result.every(item => !Array.isArray(item))) {
    return result;
  }
  return result.myFlat(circle - 1);
}

const testArr = [[1], [2], [3], [4, [5, [6]]]];
console.log(testArr.myFlat());
console.log(testArr.myFlat(1));
console.log(testArr.myFlat(2));
console.log(testArr.myFlat(3));
console.log(testArr.myFlat(Infinity));