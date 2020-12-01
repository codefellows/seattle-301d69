'use strict';

const dogs = [];

// TODO: define constructor
function Dog(jsonObject){
  this.name =jsonObject.name;
  this.image_url = jsonObject.image_url;
  this.hobbies = jsonObject.hobbies;
}

// TODO: define prototype render method
Dog.prototype.render = function(){
  //TODO: get the clone of the template
  const $newDogLi = $('#template').find('li').clone();

  // TODO: add the dog name, add the hobby, add the image url to the cloned list item
  //this.name
  $newDogLi.find('h2').text(this.name);
  $newDogLi.find('p').text(this.hobbies);

  $newDogLi.find('img').attr('src', this.image_url);



  //TODO: put the cloned template in the ul
  $('ul').append($newDogLi);

};


// $.ajax and $.get both make ajax request
// AJAX stands for Asynchronous Javascript and XML
// go external to the file/ app and get things

// AJAX takes time all asynchronous javascript takes time.
// All Ajax takes 1 million years

// .then is a method on all Promises that takes in a callback that fires off when the data returns to the javascript
// the callback has 1 parameter: data

$.get('data.json', 'json').then(dataPotato => {
  console.log('data potato async', dataPotato);

  // TODO: make a Dog out of each json object
  JSON.parse(dataPotato).forEach(dogJSONObject => dogs.push(new Dog(dogJSONObject)));

  // TODO: call render on each Dog
  dogs.forEach(dog => dog.render());
});
// console.log('dog json synchronously', dogJSON);


$('#template').hide();



// $.get('https://raw.githubusercontent.com/codefellows/code-301-guide/master/curriculum/class-02/demo/read-json/data.json?token=AHUYDZX2LB4KGHFZWFYYVGK7Z7NGI', 'json').then(dataPotato => {
