function sudokuSolver(matrix) {
  if (fillMatrix(matrix)) {
    return matrix;
  }

  return 'has not val';
}

function fillMatrix(matrix) {
  let row = 0, col = 0, hasNone = false;
  for (; row < matrix.length; row++, col = 0) {
    for (; col < matrix[row].length; col++) {
      if (matrix[row][col] === 0) {
        hasNone = true;
        break;
      }
    }
    if (hasNone) {
      break;
    }
  }
  if (!hasNone) {
    return true;
  }

  for (let i = 1; i < 10; i++) {
    if (safeVal(matrix, row, col, i)) {
      matrix[row][col] = i;
      if (fillMatrix(matrix)) {
        return true;
      }
      matrix[row][col] = 0;
    }
  }


  return false;
}

function safeVal(matrix, row, col, i) {
  return safeRow(matrix, row, i) && safeCol(matrix, col, i) && safeBox(matrix, row, col, i);
}

function safeRow(matrix, row, val) {
  return !matrix[row].includes(val);
}

function safeCol(matrix, col, val) {
  for (let j = 0; j < matrix.length; j++) {
    if (matrix[j][col] === val) {
      return false;
    }
  }
  return true;
}

function safeBox(matrix, row, col, val) {
  const rowShow = Math.floor(row / 3);
  const colShow = Math.floor(col / 3);
  for (let i = rowShow * 3; i < (rowShow + 1) * 3; i++) {
    for (let j = colShow * 3; j < (colShow + 1) * 3; j++) {
      if (matrix[i][j] === val) {
        return false;
      }
    }
  }
  return true;
}

const result = sudokuSolver([
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
]);

if (Array.isArray(result)) {
  for (let i = 0; i < result.length; i++) {
    const element = result[i];
    console.log(element);
  }
} else {
  console.log(result);
}