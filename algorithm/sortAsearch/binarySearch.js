// 二分法搜索只适合已经排好序的
function binarySearch(array, val) {
  if (array.length === 0) {
    return -1;
  }
  if (array.length === 1) {
    return array[0] === val ? 0 : -1;
  }
  const mid = Math.floor(array.length / 2);
  if (array[mid] > val) {
    return binarySearch(array.slice(0, mid), val);
  } else if (array[mid] < val) {
    return binarySearch(array.slice(mid + 1), val) + mid + 1;
  } else {
    return mid;
  }
}

console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 9));