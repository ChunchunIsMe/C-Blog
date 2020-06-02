function merge(left, right) {
  let i = 0, j = 0;
  const result = [];
  while (i < left.length && j < right.length) {
    result.push(left[i] > right[j] ? right[j++] : left[i++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}

function mergeSort(array) {
  if (array.length > 1) {
    const mid = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, mid));
    const right = mergeSort(array.slice(mid));
    array = merge(left, right);
    return array;
  }
  return array;
}

console.log(mergeSort([5,2,4,1,7,9,11,6]));