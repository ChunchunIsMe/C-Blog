function flatObj(obj) {
  const result = {};
  const allKeys = Reflect.ownKeys(obj);
  const allValue = allKeys.map(key => obj[key]);
  while (allKeys.length > 0) {
    const key = allKeys.shift();
    const val = allValue.shift();
    if (typeof val === 'object') {
      const keys = Reflect.ownKeys(val);
      allKeys.push(...keys.map(item => `${key}.${item}`));
      allValue.push(...keys.map(item => val[item]));
    } else {
      result[key] = val;
    }
  }
  return result;
}

function reverseObj(obj) {
  const keys = Reflect.ownKeys(obj);
  const values = keys.map(item => obj[item]);
  const result = {};
  while (keys.length > 0) {
    let curr = result;
    const key = keys.shift().split('.');
    const value = values.shift();
    for (let i = 0; i < key.length - 1; i++) {
      const ele = key[i];
      if (ele in curr) {
        curr = curr[ele];
        continue;
      }
      curr[ele] = {};
      curr = curr[ele];
    }
    curr[key[key.length - 1]] = value;
  }
  return result;
}

const obj = { a: 1, b: { c: { e: 1 }, d: { f: 3 } } }

const res = flatObj(obj);

console.log(res);

console.log(reverseObj(res));