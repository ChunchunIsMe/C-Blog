function perm(arr) {
  let result = [];
  (function circle(start) {
    if (start.length >= arr.length) {
      result.push(start);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (start.includes(element)) {
        continue;
      } else {
        circle([...start, element])
      }
    }
  })([])
  return result;
}