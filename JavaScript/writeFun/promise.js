class MyPromise {
  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error('fn is not a function');
    }
    this.state = 'pedding';
    this.val;
    this.resolveQueue = [];
    this.rejectQueue = [];
    this.nextResolve = [];
    this.nextReject = [];
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    fn(this.resolve, this.reject);
  }
  resolve(val) {
    if (this.state === 'pedding') {
      this.state = 'fullfilled'
      this.val = val;
      this.resolveQueue.forEach((fn, i) => {
        this.nextResolve[i](fn(this.val));
      });
      this.reset();
    }
  }
  reject(err) {
    if (this.state === 'pedding') {
      this.state = 'rejected'
      this.val = err;
      this.resolveQueue.forEach((fn, i) => {
        this.nextReject[i](fn(this.val));
      })
      this.reset();
    }
  }
  reset() {
    this.resolveQueue = [];
    this.rejectQueue = [];
    this.nextResolve = [];
    this.nextReject = [];
  }
  then(resolveFn = () => { }, rejectFn = () => { }) {
    let nextRe, nextRj;
    let mypro = new MyPromise((re, rj) => { nextRe = re; nextRj = rj; })
    if (this.state === 'pedding') {
      this.resolveQueue.push(resolveFn);
      this.nextResolve.push(nextRe);
      this.rejectQueue.push(rejectFn);
      this.nextReject.push(nextRj);
    } else if (this.state === 'fullfilled') {
      const res = resolveFn(this.val);
      if (res instanceof MyPromise) {
        return res;
      } else {
        nextRe(res);
      }
    } else {
      const res = rejectFn(this.val);
      if (res instanceof MyPromise) {
        return res;
      } else {
        nextRj(res);
      }
    }
    return mypro;
  }
}

const pr = new MyPromise((re) => {
  console.log(1);
  re(1);
});

pr.then(val => {
  console.log(val);
  return ++val;
}, err => console.log(err)).then(val => {
  console.log(val);
  return (new MyPromise((re, rj) => re(333)));
}, err => console.log(err)).then(val => {
  console.log(val);
  return ++val;
}, err => console.log(err)).then(val => {
  console.log(val);
  return ++val;
}, err => console.log(err));

const pr1 = new MyPromise((re) => {
  console.log(1);
  setTimeout(() => {
    re(1);
  }, 2000)
});

pr1.then(val => {
  console.log(val);
  return ++val;
}, err => console.log(err)).then(val => {
  console.log(val);
  return ++val;
}, err => console.log(err)).then(val => {
  console.log(val);
  return ++val;
}, err => console.log(err));