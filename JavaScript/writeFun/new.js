function myNew(fn, ...arg) {
  const obj = {};
  const res = fn.call(obj, ...arg);
  if (res instanceof Object) {
    return res;
  }
  return obj;
}