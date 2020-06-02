function sequentialSearch(array, val) {
  for (let i = 0; i < array.length; i++) {
    if(array[i]===val) {
      return i;
    }
  }
  return -1;
}

console.log(sequentialSearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 9));
