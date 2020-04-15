class Male {
  run() {
    console.log('我是男生');
  }
}

class Female {
  run() {
    console.log('我是女生');
  }
}

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


class AinmalFactory {
  getAinmal(name) {
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

class PersonFactory {
  getPerson(name) {
    const lowName = name.toLocaleLowerCase();
    switch (lowName) {
      case 'male':
        return new Male();
      case 'female':
        return new Female();
      default:
        throw new Error('class name error')
    }
  }
}

class Factory {
  constructor(choice) {
    const lowChoice = choice.toLocaleLowerCase();
    switch(lowChoice) {
      case 'person':
        return new PersonFactory();
      case 'animal':
        return new AinmalFactory(); 
    }
  }
}

const person = new Factory('person');
const male = person.getPerson('male')
const female = person.getPerson('female');
male.run();
female.run();

const animal = new Factory('animal');
const cat = animal.getAinmal('cat');
const dog = animal.getAinmal('dog');
cat.run();
dog.run();