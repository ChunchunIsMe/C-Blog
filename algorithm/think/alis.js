// var new21Game = function (N, K, W) {
//   const re = getRate(N, K, W);
//   console.log(re);
//   return re.pass / re.total;
// };

let to = 0, to1 = 0;
function getRate(N, K, W, count = 0, rate = 1, time = 1, cache = {}) {
  if (K === 0) {
    return 1;
  }
  to++;
  // if (to % 500 === 0) {
  //   console.log(to, 'run');
  // }

  if (cache[`${time}.${count}`]) {
    to1++
    if (to1 % 500 === 0) {
      console.log(to1, to, 'cache');
    }
    return cache[`${time}.${count}`];
  }
  let total = 0;
  rate *= 1 / W;
  for (let i = W; i >= 1; i--) {
    const nextCount = count + i;
    if (nextCount >= K && nextCount <= N) {
      total += rate;
    } else if (nextCount > K) {
      continue;
    } else {
      const result = getRate(N, K, W, nextCount, rate, time + 1, cache);
      total += result;
    }
  }
  cache[`${time}.${count}`] = total;
  return total;
}

// console.log(getRate(10, 1, 10));
// console.log(getRate(6, 1, 10));
console.log(getRate(421, 400, 47), to);
// console.log(getRateNoCut(21, 17, 10), to1);
