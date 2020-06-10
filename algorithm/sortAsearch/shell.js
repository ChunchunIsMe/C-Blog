function shell(array) {
  let len = array.length;
  debugger;
  for (let gap = Math.floor(len / 2); gap >= 1; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < array.length; i++) {
      for (let j = i; j >= gap && array[j] < array[j - gap]; j -= gap) {
        [array[j], array[j - gap]] = [array[j - gap], array[j]];
      }
    }
  }
  return array;
}

const sortarr = shell([9, 8, 7, 6, 5, 4, 3, 2, 10]);
console.log(sortarr);