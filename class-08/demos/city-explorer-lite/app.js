'use strict';

// TODO: set a form listener that asks for the data when submitted

$('form').on('submit', function(event){
  event.preventDefault();

  // the implication is that we need the gps to get the restaurants (and the map)

  const cityWeAreSearchingFor = this.city.value;

  // Gets gps data
  $.ajax({
    url: 'https://day-8-301d69.herokuapp.com/gps',
    method: 'get',
    dataType: 'json',
    data: { city: cityWeAreSearchingFor }
  })
    .then(function(location){
      console.log(location);
      displayMap(location);

      // uses gps data to get restaurants
      $.ajax({
        url: 'https://day-8-301d69.herokuapp.com/dining',
        method: 'get',
        dataType: 'json',
        data : location
      })
        .then(restaurants => {
          // render them to the page
          restaurants.forEach(restaurant => displayRestaurant(restaurant));
        });


    });


});

function displayMap(location){
  const html = $('template:nth-of-type(2)').html();
  const newHtml = Mustache.render(html, location);
  $('#image-goes-here').append(newHtml);

}

function displayRestaurant(restaurantObject){
  const html = $('template:first-of-type').html();
  const newHtml = Mustache.render(html, restaurantObject);
  $('section').append(newHtml);
}
