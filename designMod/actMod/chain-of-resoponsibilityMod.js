class ChainResoponBility {
  constructor(type, ...list) {
    if (!type && type !== 0) {
      throw new Error('type error')
    }
    if (ChainResoponBility.chain[type]) {
      throw new Error('type is already exist')
    }
    this.type = type
    this.list = list;
    this.next = null;
    ChainResoponBility.chain[type] = this;
  }
  static findItem(type) {
    return this.chain[type]
  }

  setNext(next) {
    this.next = next;
  }

  changeType(type) {
    if (ChainResoponBility.chain[type]) {
      throw new Error('type is already exist')
    }
    ChainResoponBility.chain[type] = this;
    delete ChainResoponBility.chain[this.type];
    this.type = type;
  }

  start(type) {
    if (!type && type !== 0) {
      throw new Error('type error')
    }
    if (this.type === type) {
      this.list.forEach(item => item.apply(this));
      return;
    }
    this.next && this.next.start(type);
  }
}

ChainResoponBility.chain = {};

const run1 = new ChainResoponBility('run1', () => { console.log('run1', 1) }, () => { console.log('run1', 2) })
const run2 = new ChainResoponBility('run2', () => { console.log('run2', 1) }, () => { console.log('run2', 2) })
const run3 = new ChainResoponBility('run3', () => { console.log('run3', 1) }, () => { console.log('run3', 2) })
const run4 = new ChainResoponBility('run4', () => { console.log('run4', 1) }, () => { console.log('run4', 2) })

// run1.start()
run1.setNext(run2);
run2.setNext(run3);
run3.setNext(run4);

run1.start('run3');
console.log(ChainResoponBility.findItem('run3'));