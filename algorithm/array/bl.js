function bl(arr, item, result) {
  var result = result || [];
  var message = '找不到元素'
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result.push(i);
      message = bl(arr[i], item, result);
      if (message !== '找不到元素') {
        return message;
      }
    } else {
      if (arr[i] === item) {
        result.push(i);
        message = `元素在数组${result.join(',')}中`
        return message;
      }
    }
  }

  if (result.length) {
    result.pop();
  }
  return message;
}
var arr = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, [12, 13, 14], 15],
  16
]
console.log(bl(arr, 16));