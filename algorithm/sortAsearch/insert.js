function insert(array) {
  const newArr = [];
  for (let i = 0; i < array.length; i++) {
    const ele = array[i];
    let q = 0;
    for (let j = 0; j < newArr.length; j++) {
      if (ele < newArr[j]) {
        q = j;
        break;
      }
    }
    newArr.splice(q, 0, ele);
  }
  return newArr;
}

const sortarr = insert([5, 2, 1, 4, 3]);
console.log(sortarr);