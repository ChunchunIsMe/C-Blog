class PublicSubscribe {
  constructor() {
    this.event = {};
  }

  listener(key, ...fn) {
    if (!this.event[key]) {
      this.event[key] = [];
    }
    const length = this.event[key].length
    this.event[key].push(...fn);
    return (function () {
      this.event[key].splice(length, fn.length);
    }).bind(this)
  }

  trigger(key) {
    if (!this.event[key]) {
      return;
    }
    this.event[key].forEach((fn) => fn());
  }
}


const listen = new PublicSubscribe();

const removeRun1 = listen.listener('run', () => { console.log('run1') }, () => { console.log('run2') })
const removeRun2 = listen.listener('run', () => { console.log('run3') }, () => { console.log('run4') })


const removeEat1 = listen.listener('eat', () => { console.log('eat1') }, () => { console.log('eat2') })
const removeEat2 = listen.listener('eat', () => { console.log('eat3') }, () => { console.log('eat4') })

listen.trigger('run');
listen.trigger('eat');
removeRun1();
listen.trigger('run');