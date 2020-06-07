function hasPath(matrix, rows, cols, path) {
  // write code here
  if (path == null || path.length > rows * cols) {
    return false
  }
  if (path.length === 0) {
    return true;
  }
  const start = [];
  const type = [];
  for (let i = 0; i < rows; i++) {
    type.push([])
    for (let j = 0; j < cols; j++) {
      type[i][j] = 0;
      if (matrix[i][j] === path[0]) {
        start.push([i, j]);
      }
    }
  }
  if (start.length === 0) {
    return false;
  }
  for (let i = 0; i < start.length; i++) {
    if (findWay(matrix, rows, cols, type, path, start[i][0], start[i][1])) {
      console.log(type);
      return true;
    }
  }
  console.log(type);
  return false;
}

function findWay(matrix, rows, cols, type, path, x, y) {
  path = path.slice(1);
  type[x][y] = 1;
  if (path === '') {
    return true;
  }
  if (hasNext(x + 1, y, rows, cols, type)) {
    if (path[0] === matrix[x + 1][y]) {
      if (findWay(matrix, rows, cols, type, path, x + 1, y)) {
        return true;
      }
    }
  }
  if (hasNext(x - 1, y, rows, cols, type)) {
    if (path[0] === matrix[x - 1][y]) {
      if (findWay(matrix, rows, cols, type, path, x - 1, y)) {
        return true;
      }
    }
  }
  if (hasNext(x, y + 1, rows, cols, type)) {
    if (path[0] === matrix[x][y + 1]) {
      if (findWay(matrix, rows, cols, type, path, x, y + 1)) {
        return true;
      }
    }
  }
  if (hasNext(x, y - 1, rows, cols, type)) {
    if (path[0] === matrix[x][y - 1]) {
      if (findWay(matrix, rows, cols, type, path, x, y - 1)) {
        return true;
      }
    }
  }
  type[x][y] = 0;
  return false;
}

function hasNext(x, y, rows, cols, type) {
  if (x >= 0 && y >= 0 && x < rows && y < cols && type[x][y] === 0) {
    return true;
  }
  return false;
}

const a = hasPath([
  ['a', 'b', 'c', 'e'],
  ['s', 'f', 'c', 's'],
  ['a', 'd', 'e', 'e'],
], 3, 4, 'abcce');
console.log(a);