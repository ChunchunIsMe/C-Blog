
function isObject(value) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}
// WeakMap和WeakSet没有迭代方法,里面的值也是不稳定的所以拷贝不了
function isWeak(value) {
  return (value instanceof WeakSet) || (value instanceof WeakMap)
}
// circle 是为了防止循环引用的情况
function baseClone(value, circle = new Map()) {
  if (!isObject(value) || isWeak(value)) {
    return value;
  }
  const isArr = Array.isArray(value);
  const isFunction = typeof value === 'function';
  const isRegexp = value instanceof RegExp;
  const isMap = value instanceof Map;
  const isSet = value instanceof Set;
  if (isRegexp) {
    return new RegExp(value);
  } else if (isFunction) {
    return function (...arg) { return value.call(this, ...arg) }
  } else if (isArr) {
    return copyArr(value, circle);
  } else if (isMap) {
    return copyMap(value, circle);
  } else if (isSet) {
    return copySet(value, circle);
  } else {
    return copyObj(value, circle);
  }
}

function copyArr(arr, circle = new Map()) {
  const result = [];
  circle.set(arr, result);
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    if (circle.has(val)) {
      result[i] = circle.get(val)
    } else {
      if (isObject(val)) {
        result[i] = baseClone(val, circle);
      } else {
        result[i] = val;
      }
    }
  }
}

function copyMap(map, circle = new Map()) {
  const result = new Map();
  circle.set(map, result);
  const keys = map.keys();
  for (const key of keys) {
    let realKey, realVal;
    if (circle.has(key)) {
      realKey = circle.get(key);
    } else {
      if (isObject(key)) {
        realKey = baseClone(key, circle);
      } else {
        realKey = key;
      }
    }
    if (circle.has(map.get(key))) {
      realVal = circle.get(map.get(key))
    } else {
      if (isObject(map.get(key))) {
        realVal = baseClone(map.get(key), circle);
      } else {
        realVal = map.get(key);
      }
    }
  }
  return result;
}

function copySet(set, circle = new Map()) {
  const result = new Set();
  circle.set(set, result);
  const values = set.values();
  for (const val of values) {
    if (circle.has(val)) {
      result.add(circle.get(val));
    } else {
      if (isObject(val)) {
        result.add(baseClone(val, circle));
      } else {
        result.add(val);
      }
    }
  }
}

function copyObj(obj, circle = new Map()) {
  const keys = Reflect.ownKeys(obj);
  const result = {};
  circle.set(obj, result);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const val = obj[key];
    if (circle.has(val)) {
      result[key] = circle.get(val);
    } else {
      if (isObject(val)) {
        result[key] = baseClone(val, circle);
      } else {
        result[key] = val;
      }
    }
  }
  return result;
}