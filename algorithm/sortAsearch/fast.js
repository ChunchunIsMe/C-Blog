function fast(array) {
  if (array.length === 1 || array.length === 0) {
    return array;
  }
  let mid = Math.floor(array.length / 2);
  let p = mid - 1, q = mid + 1;
  while (p >= 0 || q < array.length) {
    while (array[p] < array[mid]) {
      p--;
    }
    while (array[q] > array[mid]) {
      q++;
    }
    if (array[p] != null && array[q] != null) {
      [array[p], array[q]] = [array[q], array[p]]
    } else if(array[p] != null&&array[q]==null) {
      array.splice(q, 0, array.splice(p, 1)[0]);
      p--;
      mid--;
    } else if(array[p] == null && array[q] !=null) {
      array.splice(p < 0 ? 0 : p, 0, array.splice(q, 1)[0]);
      q++;
      mid++;
    }
  }
  return fast(array.slice(0, mid)).concat(fast(array.slice(mid)));
}

const sortarr = fast([5, 2, 1, 4, 3]);
console.log(sortarr);