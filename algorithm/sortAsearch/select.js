function select(array) {
  for (let i = 0; i < array.length; i++) {
    let min = i;
    for (let j = i; j < array.length; j++) {
      if (array[min] > array[j]) {
        min = j;
      }
    }
    [array[i],array[min]] = [array[min],array[i]];
  }
  return array;
}

const sortarr = select([5, 2, 1, 4, 3]);
console.log(sortarr);