function ratInAMaze(maze) {
  const way = [];
  for (let i = 0; i < maze.length; i++) {
    way[i] = [];
    for (let j = 0; j < maze[i].length; j++) {
      way[i][j] = 0;
    }
  }

  function findWay(maze, x, y) {
    if (x === maze.length - 1 && y === maze.length - 1) {
      way[x][y] = 1;
      return true;
    }

    if (x < maze.length && y < maze.length && maze[x][y] === 1) {

      way[x][y] = 1;
      if (findWay(maze, x + 1, y)) {
        return true;
      }

      if (findWay(maze, x, y + 1)) {
        return true;
      }
      way[x][y] = 0;
    }

    return false;
  }

  if (findWay(maze, 0, 0)) {
    return way;
  }

  return 'NOT WAY';
}

const result = ratInAMaze([
  [1,0,0,0],
  [1,1,1,1],
  [1,0,1,0],
  [1,0,1,1],
])
console.log(result);