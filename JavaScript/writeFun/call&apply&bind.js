Function.prototype.myCall = function (obj, ...arg) {
  const sy = Symbol();
  obj[sy] = this;
  const res = obj[sy](...arg);
  Reflect.deleteProperty(sy);
  return res;
}
Function.prototype.myApply = function (obj, arg) {
  const sy = Symbol();
  obj[sy] = this;
  const res = obj[sy](...arg);
  Reflect.deleteProperty(sy);
  return res;
}
Function.prototype.myBind = function (obj, ...arg) {
  return (...next) => {
    return this.myCall(obj, ...arg, ...next);
  }
}