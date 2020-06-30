function myInstanceof(value, CreateFunc) {
  if (value == null) {
    return false;
  }
  const type = typeof value;
  if (type !== 'object' && type !== 'function') {
    return false;
  }
  if (typeof CreateFunc !== 'function') {
    throw new Error('not a function');
  }
  let proto = value.__proto__;
  while (proto) {
    if (proto === CreateFunc.prototype) {
      return true;
    }
    proto = proto.__proto__;
  }
  return false
} 