'use strict';

// Jquery getters
// If I want the form the code would be $('form');

const $form = $('form');


const $title = $('h1:first-child');
// the argument of the jquery function takes in css
console.log($title);

console.log($title.text());
// getter for text

console.log($('ul:nth-of-type(2) li:nth-child(2)').text());

$('ul:nth-of-type(2) li:nth-child(2)').text();// gets the text
$('ul:nth-of-type(2) li:nth-child(2)').text('Rufus');// set the text

console.log($('li'));
console.log($('li').text());
// console.log($('li').text('Dinosaur'));


const h1Element = document.getElementById('title');
h1Element.addEventListener('click', () => console.log('clicked the h1 with vanilla listener'));

$('#title').on('click', () => console.log('clicked with jquery'));

$('ul').on('click', 'li', function(){ // 'li' causes the click to only trigger on the list items in the ul now
  console.log(this); // this in a callback function is the DOM element we clicked on
  console.log($(this)); // $(this) in a callback function is the jquery element we clicked on
});


// Attribute getters and setters
console.log($('h1').attr('id')); // getter
$('h1').attr('id', 'theH1Title'); // setter
