function lcs(a, b) {
  const result = [];
  const al = a.length;
  const bl = b.length;
  for (let i = 0; i <= al; i++) {
    result[i] = []
    for (let j = 0; j <= bl; j++) {
      result[i][j] = 0;
    }
  }

  for (let i = 0; i <= al; i++) {
    for (let j = 0; j <= bl; j++) {
      if (i === 0 || j === 0) {
        result[i][j] = 0;
      } else if (a[i - 1] === b[j - 1]) {
        result[i][j] = result[i - 1][j - 1] + 1;
      } else {
        const an = result[i - 1][j];
        const bn = result[i][j - 1];
        result[i][j] = an > bn ? an : bn;
      }
    }
  }
  return result[al][bl];
}

const res = lcs('acbaed', 'abcadf');
console.log(res);