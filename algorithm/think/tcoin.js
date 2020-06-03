function tcoin(coins, amount) {
  const change = [];
  let result = 0;
  for (let i = coins.length - 1; i >= 0; i--) {
    while (result + coins[i] <= amount) {
      result += coins[i];
      change.push(coins[i]);
    }
  }
  console.log(change, result);
  return result;
}

tcoin([1, 5, 10, 25], 36);
tcoin([1, 3, 4], 6);

