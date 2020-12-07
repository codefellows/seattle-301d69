'use strict';

console.log('first line running');

function bark(){
  console.log('bark bark');
}

bark();

2;

console.log(process.env.PORT);

// environments are terminal tab specific, even opening a new tab fully resets the environment
// window, document, anything front related does not exist here

// console.log(window);
