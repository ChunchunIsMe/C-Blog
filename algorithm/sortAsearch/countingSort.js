function countingSort(array) {
  const arr = [], result = [];
  for (let i = 0; i < array.length; i++) {
    if (arr[array[i]] == null) {
      arr[array[i]] = 0
    }
    arr[array[i]]++;
  }
  debugger;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != null) {
      result.push(i);
    }
  }
  return result;
}

console.log(countingSort([5, 2, 4, 1, 7, 9, 11, 6]));
