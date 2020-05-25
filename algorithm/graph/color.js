const Colors = {
  WHITE: 0,
  GRAY: 1,
  BLACK: 2
}

const initializeColor = vertices => {
  const color = {};
  for (let i = 0; i < vertices.length; i++) {
    const element = vertices[i];
    color[element] = Colors.WHITE;
  }
  return color;
}

module.exports = {
  Colors,
  initializeColor
}