class ObjectPool {
  constructor() {
    this._pool = [];
    this.size = 0;
  }

  // 创建对象
  create(Obj) {
    if (this._pool.length === 0) {
      this.size += 1
      return new Obj(this)
    } else {
      return this._pool.shift()
    }
  }

  // 对象回收
  recover(obj) {
    this._pool.push(obj);
  }

  // 对象池大小
  getSize() {
    return this.size;
  }
}

// 模仿一个文件类
class File {
  constructor(pool) {
    this.pool = pool
    this.name = '';
    this.src = '';
  }

  setFile(name, src) {
    this.name = name;
    this.src = src;
  }

  reset() {
    this.name = '';
    this.src = '';
  }

  downLoad() {
    console.log(`从${this.src}路径开始下载${this.name}文件`)
    setTimeout(() => {
      console.log(`${this.name}文件下载完成`)
      this.reset();
      this.pool.recover(this);
    }, 100)
  }
}

// 测试代码

const objectPool = new ObjectPool();

const file1 = objectPool.create(File);
file1.setFile('file1', 'download1.com');
file1.downLoad();

const file2 = objectPool.create(File);
file2.setFile('file2', 'download2.com');
file2.downLoad();

setTimeout(() => {
  const file3 = objectPool.create(File);
  file3.setFile('file3', 'download3.com');
  file3.downLoad();
}, 200)

setTimeout(() => {
  console.log(`下载了3个文件，但是创建了${objectPool.getSize()}个对象`)
}, 1000)