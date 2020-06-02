function minCoinChange(coins, amount) {
  let cache = [];
  function findMin(amount) {
    if (amount <= 0) {
      return false;
    }
    if (cache[amount]) {
      return cache[amount];
    }
    let min,minCorn;
    for (let i = 0; i < coins.length; i++) {
      if (coins[i] === amount) {
        cache[amount] = [coins[i]];
        return cache[amount];
      } else {
        const prev = findMin(amount - coins[i]);
        if (Array.isArray(prev)) {
          if (min == null) {
            min = prev
            minCorn = coins[i];
          }
          if (min.length > prev.length) {
            min = prev;
            minCorn = coins[i];
          }
        }
      }
    }
    if(min) {
      cache[amount] = [...min, minCorn];
      return cache[amount];
    } else {
      return false;
    }
  }
  findMin(amount);
  console.log(cache);
  return cache[amount];
}


minCoinChange([1,5,10,25],36);