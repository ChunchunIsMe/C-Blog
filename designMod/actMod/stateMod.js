class MyPromise {
  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error('MyPromise arguments is not function')
    }
    this.state = 'PADDING'
    this.success = [];
    this.fail = [];
    this.nextResolve = [];
    this.nextReject = [];
    this.value = null;
    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject.call(this, e)
    }
  }

  static all(arg) {
    if (!Array.isArray(arg)) {
      throw new Error('MyPromise.all arguments must be array')
    }
    const testPromise = new MyPromise((resolve) => {
      const count = 0;
      const result = [];
      arg.forEach((item, i) => {
        if (!(item instanceof MyPromise)) {
          throw new Error('MyPromise.all arguments item must be array')
        }
        item.then(res => {
          result[i] = res;
          if (++count >= arg.length) {
            resolve(result);
          }
        })
      })
    })
    return testPromise;
  }

  static race(arg) {
    if (!Array.isArray(arg)) {
      throw new Error('MyPromise.all arguments must be array')
    }
    const testPromise = new MyPromise((resolve) => {
      arg.forEach((item, i) => {
        if (!(item instanceof MyPromise)) {
          throw new Error('MyPromise.all arguments item must be array')
        }
        item.then(res => {
          resolve(res);
        })
      })
    })
    return testPromise;
  }

  resolve(value) {
    setTimeout(() => {
      this.state = 'FULFILLED'
      this.value = value;
      this.success.forEach((fn, i) => {
        const nextValue = fn(value);
        if (nextValue instanceof MyPromise) {
          nextValue.then(this.nextResolve[i], this.nextReject[i])
        } else {
          this.nextResolve[i](nextValue);
        }
      })
    }, 0)
  }

  reject(value) {
    setTimeout(() => {
      this.state = 'REJECTED'
      this.value = value;
      this.fail.forEach((fn, i) => {
        const nextValue = fn(value);
        if (nextValue instanceof MyPromise) {
          nextValue.then(this.nextResolve[i], this.nextReject[i])
        } else if (!nextValue) {
          this.nextReject[i](this.value);
        } else {
          this.nextReject[i](nextValue);
        }
      })
    }, 0)
  }

  then(success = (val) => val, fail = (val) => val) {
    if (this.state === 'FULFILLED') {
      const value = success(this.value);
      if (value instanceof MyPromise) {
        return value;
      } else {
        return new MyPromise((resolve) => { resolve(value) })
      }
    } else if (this.state === 'REJECTED') {
      const value = fail(this.value);
      if (value instanceof MyPromise) {
        return value;
      } else if (!value) {
        return new MyPromise((resolve, reject) => { reject(this.value) })
      } else {
        return new MyPromise((resolve, reject) => { reject(value) })
      }
    } else {
      this.success.push(success);
      this.fail.push(fail);

      return new MyPromise((resolve, reject) => { this.nextReject.push(reject); this.nextResolve.push(resolve); });
    }
  }

  catch(fail) {
    return this.then((e) => e, fail);
  }

  finally(fn) {
    this.then(fn, fn);
  }
}

const one = new MyPromise((resolve, reject) => {
  console.log(1, 'one');
  resolve(1);
})

one.then((val) => {
  console.log(val + 1, 'oneFULFILLED');
  return val + 1
}).then((val) => {
  console.log(val + 1, 'oneFULFILLED');
  return new MyPromise((re, rj) => { rj('error') })
}).then((val) => {
  console.log(val + 1, 'oneFULFILLED');
  return val + 1
}, (e) => {
  console.log(e, 'one1')
}).then((val) => {
  console.log(val + 1, 'oneFULFILLED');
  return val + 1
}, (e) => {
  console.log(e, 'one2')
})


console.log('--------------');


const two = new MyPromise((resolve, reject) => {
  console.log(1, 'two');
  setTimeout(() => {
    resolve(1);
  }, 1000)
})

two.then((val) => {
  console.log(val + 1, 'two');
  return val + 1
}).then((val) => {
  console.log(val + 1, 'two');
  return new MyPromise((re, rj) => { rj('error') })
}).then((val) => {
  console.log(val + 1, 'two');
  return val + 1
}, (e) => {
  console.log(e, 'two1')
}).then((val) => {
  console.log(val + 1, 'two');
  return val + 1
}, (e) => {
  console.log(e, 'two2')
})