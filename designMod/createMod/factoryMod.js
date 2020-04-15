class Dog {
  run() {
    console.log('汪汪汪')
  }
}

class Cat {
  run() {
    console.log('喵喵喵')
  }
}

class Animal {
  constructor(name) {
    const lowName = name.toLocaleLowerCase();
    switch (lowName) {
      case 'dog':
        return new Dog();
      case 'cat':
        return new Cat();
      default:
        throw TypeError('class name Error');
    }
  }
}

const dog = new Animal('dog');
const cat = new Animal('cat');
dog.run();
cat.run();
