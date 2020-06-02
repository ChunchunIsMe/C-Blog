// 内插搜索是改良版的二分法搜索,同样需要排好序的数组
// 二分法搜索总是检查mid的值,而内插搜索可能会根据要搜索的值检查数组中不同的地方
function insertSearch(array, val) {
  let i = 0, j = array.length - 1;
  while (i <= j) {
    if (array[i] === val) {
      return i;
    }
    if (array[j] === val) {
      return j;
    }
    const mid = Math.floor((i + j) / 2);
    if (array[mid] > val) {
      j--;
    } else if (array[mid] < val) {
      i++;
    } else {
      return mid;
    }
  }
  return -1;
}

console.log(insertSearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 2));
