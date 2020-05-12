function bl(str) {
  if (!str) {
    return '';
  }
  var arr = new Array(str.length);
  for (var i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      arr[i] = '%20';
    } else {
      arr[i] = str[i];
    }
  }
  return arr.join('');
}

console.log(bl('we are the champion'))