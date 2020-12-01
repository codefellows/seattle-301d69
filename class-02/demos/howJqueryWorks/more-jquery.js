'use strict';

// Jquery Traversal

const $snowdrop = $('ul:nth-of-type(2) li:nth-child(2)');
console.log($snowdrop.text());

console.log($snowdrop.parent().prev().children());

function Person(name, age){
  this.name = name;
  this.age = age;
}

Person.prototype.renderPerson = function(){
  const $copy = $('#personTemplate').clone();
  console.log($copy);

  // TODO: fill it out, add the data to the eleent
  // $('.name').text(this.name); // Only affects elements on the page so we miss our copy
  $copy.attr('id', '');
  $copy.find('.name').text(this.name);
  $copy.find('.age').text(this.age);

  $('ul:nth-of-type(3)').append($copy);
};

const person = new Person('nich', 10000);
person.renderPerson();

const harryPotter = new Person('Harry', 35);
const spongebob = new Person('SpongeBob', 100000);

harryPotter.renderPerson();
spongebob.renderPerson();

