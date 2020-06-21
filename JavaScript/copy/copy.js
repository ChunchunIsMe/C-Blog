const CLONE_DEEP_FLAG = 1;    // 1 即 0001, 深拷贝标志位
const CLONE_FLAT_FLAG = 2;    // 2 即 0010, 拷贝原型链标志位
const CLONE_SYMBOLS_FLAG = 4; // 4 即 0100, 拷贝 Symbols 标志位

function isObject(value) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

function baseClone(value, bitmask, customizer, key, object, stack) {
  let result;

  const isDeep = bitmask
  // 非对象的拷贝
  if (!isObject(value)) {
    return value;
  }

  const isArr = Array.isArray(value);
  if (isArr) {
    result = [];
    return copyArr(value, result);
  } else {
    
  }
}