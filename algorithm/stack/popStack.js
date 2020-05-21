function popStack(arr, n) {
  let result = [];
  (function circle(index, value, stack) {
    if (index >= arr.length && stack.length <= 0) {
      result.push(value)
      return;
    }
    const element = arr[index];

    if (stack.length < n && index < arr.length) {
      circle(index + 1, value, [...stack, element])
    }

    if (stack.length > 0) {
      circle(index, [...value, stack.pop()], stack)
    }
  })(0, [], []);
  return result;
}