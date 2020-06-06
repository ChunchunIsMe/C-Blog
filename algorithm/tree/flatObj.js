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

const obj = {a:1,b:{c:{e:1},d:{f:3}}}

const res = flatObj(obj);

console.log(res);