'use strict';

// TODO: constructor

const neighborhoodArray = [];

function Neighborhood(dataObject){
  this.name = dataObject.name;
  this.city = dataObject.city;
  this.population = dataObject.population;
  this.founded = dataObject.founded;
  this.body = dataObject.body;
}

Neighborhood.prototype.renderWithMustache = function(){
  const template = $('#mustache-template').html();
  // Mustache comes from mustache.js's library
  const outputHtml = Mustache.render(template, this);
  $('ul:first-of-type').append(outputHtml);

  // 1. Get the template from the html any way we want
  // 2. mass the html string and an object into Mustache.render
  // 2.a any key that matches a templated value in the template will fill the template
  // 3. Put the new html we just made onto the page


  // const template = document.getElementById('mustache-template').innerHTML;
  // const template = `<li>
  //     <!-- we replaced this with name because it is the key in our object that holds `Wallingford` -->
  //     <h2>{{name}}</h2>
  //     <p>{{city}}, Population: {{population}}</p>
  //     <p>Founded: {{founded}}</p>
  //     {{{body}}}
  //   </li>`

};





// TODO: render it
Neighborhood.prototype.render = function(){
  // TODO: copy the template element
  const $clonedLi = $('#neighborhood-template').clone();


  // TODO: change the attributes/ text/ content of the copy
  $clonedLi.removeAttr('id');
  $clonedLi.find('h2').text(this.name);
  $clonedLi.find('p:nth-of-type(1)').text(`${this.city}, Population: ${this.population}`);
  $clonedLi.find('p:nth-of-type(2)').text(`Founded: ${this.founded}`);
  $clonedLi.find('p:nth-of-type(3)').remove();
  $clonedLi.append(this.body);



  // TODO: append it to the DOM

  $('ul:nth-of-type(2)').append($clonedLi);
};


// neighborhoodDataSet.forEach(obj => neighborhoodArray.push(new Neighborhood(obj)));
// call the forEach method on neighborHoodDataSet (which is our array from the other file)
// this calls the callback method on each item in the array
// this is the callback method `obj => neighborhoodArray.push(new Neighborhood(obj))`
// obj represents one thing in the array
// obj is {
// name: 'Fremont',
// city: 'Seattle',
// population: '23,566',
// founded: '1820',
// body: '<p>This is example text to show you how <strong>HTML</strong> can be escaped using <em>Mustache</em>.</p>'
// },

// neigborhoodArray.push() pushes whatever is in the parentheses into the array neighborhoodArray
// new Neighborhood(obj) (an instance of Neighborhood)

const constructEachNeighborhood = obj => neighborhoodArray.push(new Neighborhood(obj));
neighborhoodDataSet.forEach(constructEachNeighborhood);

neighborhoodArray.forEach(neighborhood => {
  neighborhood.render();
  neighborhood.renderWithMustache();
});

$('#neighborhood-template').hide();



// const $clonedLi = $(`  <ul>
//     <li id="neighborhood-template">
//       <h2>Wallingford</h2>
//       <p>Seattle, Population: 19,233</p>
//       <p>Founded: 1878</p>
//       <p>This is example text to show you how <strong>HTML</strong> can be escaped using <em>Mustache</em>.</p>
//     </li>
//   </ul>`);
