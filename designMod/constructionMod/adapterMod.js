const API = {
  qq: () => ({
    n: '菊花台',
    a: '周杰伦',
    f: 1
  }),
  netease: () => ({
    name: '菊花台',
    author: '周杰伦',
    f: false
  })
};


const adapter = (info = {}) => ({
  name: info.name || info.n,
  author: info.author || info.a,
  free: !!info.f
})


console.log(adapter(API.qq()));
console.log(adapter(API.netease()));