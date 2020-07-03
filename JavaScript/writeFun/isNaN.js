function myIsNaN(num) {
  return Object.is(num, NaN);
}
function myIsNaNES5(num) {
  if (typeof num === 'number' && !Boolean(num) && num !== 0) {
    return true;
  }
  return false;
}