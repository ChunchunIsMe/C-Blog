function knightRun(x, y) {
  const time1 = new Date();
  if (!indexInTable(x, y)) {
    return false;
  }
  const matrix = [];
  for (let i = 0; i < 5; i++) {
    matrix[i] = [];
    for (let j = 0; j < 5; j++) {
      if (i === x && j === y) {
        matrix[i][j] = 1;
      } else {
        matrix[i][j] = 0;
      }
    }
  }
  run(matrix, x, y, 1)
  const time2 = new Date();
  console.log(`time:${time2 - time1}`)
  return matrix;
}

function run(matrix, x, y, val) {
  const allWay = [
    [1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [-2, 1], [2, -1], [-2, -1]
  ]

  for (let i = 0; i < allWay.length; i++) {
    const ele = allWay[i];
    const way = [x + ele[0], y + ele[1]];
    if (indexInTable(way[0], way[1]) && matrix[way[0]][way[1]] === 0) {
      matrix[way[0]][way[1]] = val + 1;
      if (val + 1 >= 25) {
        return true;
      }
      if (run(matrix, way[0], way[1], val + 1)) {
        return true;
      }
      matrix[way[0]][way[1]] = 0;
    }
  }
  return false;
}

function indexInTable(x, y) {
  return x >= 0 && x < 5 && y >= 0 && y < 5;
}


const result = knightRun(2, 2);
console.log(result)