function knapSack(capacity, weight, values) {
  const cache = [0];
  for (let i = 1; i <= capacity; i++) {
    let max = 0;
    for (let j = 0; j < weight.length; j++) {
      if (weight[j] > i) {
        continue;
      } else if (weight[j] === i) {
        if (max < values[j]) {
          max = values[j];
        }
      } else {
        if (i - weight[j] > 0) {
          if (cache[i - weight[j]] + values[j] > max) {
            max = cache[i - weight[j]] + values[j]
          }
        } else {
          if (values[j] > max) {
            max = values[j];
          }
        }
      }
    }
    cache[i] = max;
  }
  console.log(cache);
  return cache[capacity];
}

const value = knapSack(10, [2, 3, 4, 5], [3, 4, 5, 7]);
console.log(value);