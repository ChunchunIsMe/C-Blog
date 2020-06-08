function getCode(num, re) {
  let str = ''
  while (num > 0) {
    str = num % re + str;
    num = Math.floor(num / re);
  }
  return str;
}

console.log(getCode(10, 2));