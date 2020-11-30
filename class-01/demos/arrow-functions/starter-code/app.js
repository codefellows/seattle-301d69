'use strict';

// An arrow function is NOT just a function
// it is a function that does not have a contextual this of its own
// it is written differently
// both have params, both run the code in the curly braces


// most of the differences and weird things with arrow functions are there to make your life easy

function add(a,b){
  return a + b;
}

const addArrow1 = (a,b) => {
  return a + b;
};

const addArrow2 = (a,b) => a + b; // implicit return

function doSomething(something){
  return something + 'nothing';
}

const arrowSomething1 = (something) => {
  return something + 'nothing';
};

const arrowSomething2 = something => something + 'nothing';

// Constructors (the loss of 'this');

function Dog(name, age){
  this.name = name;
  this.age = age;
}

const DogArrow = (name, age) => {
  this.name = name;
  this.age = age;
};

const ginger = new Dog('Ginger', 2);
// const rufus = new DogArrow('Rufus', 1); // because this lacks contectual this, javascript stops us right away

Dog.prototype.speak = function(owner){
  console.log(`Hey there ${owner}, from ${this.name}`);
};

Dog.prototype.speakArrow = (owner) => {
  console.log(`Hey there ${owner}, from ${this.name}`);
};

