

// Animal 是父类且定义了子类需要重写的方法(eat/sleep/getMouse)，并且父类可以决定是否调用该子类方法，即完成了模板模式
class Animal {
  constructor() {
    // 这里不暴露live是保证不被子类重写
    this.live = () => {
      this.eat();
      this.sleep();
      if (this.type === 'cat') {
        this.getMouse();
      }
    }
  }
}


class Dog extends Animal {
  constructor(...args) {
    super(...args)
    this.type = 'dog';
  }

  eat() {
    console.log('dog eat');
  }

  sleep() {
    console.log('dog sleep')
  }

}

class Cat extends Animal {
  constructor(...args) {
    super(...args)
    this.type = 'cat';
  }

  eat() {
    console.log('cat eat');
  }

  sleep() {
    console.log('cat sleep')
  }

  getMouse() {
    console.log('cat get mouse')
  }
}

const dog = new Dog();
dog.live();
const cat = new Cat();
cat.live();