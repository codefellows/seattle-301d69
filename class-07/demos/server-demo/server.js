'use strict';

const express = require('express');
const cors = require('cors');
const superagent = require('superagent'); // superagent loosely equals $.ajax, it goes on the internet
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ============== middleware ===============
app.use(cors());


// ================= Routes ====================================

app.get('/students', getThreeStudents);
app.get('/are-they-a-student', checkIfTheyAreStudent);
app.get('/ginger-treat', giveTreatToGinger);

app.get('/gps', function(req, res){
  const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
  console.log(req.query);
  const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${req.query.city}&format=json`;

  superagent.get(url).then(whatComesBack => {
    const gpsData = whatComesBack.body;
    const instanceOfGpsData = new GpsData(gpsData);


    res.send(instanceOfGpsData); // put a ./ when referencing files from a server.js
  })
    .catch(error => console.log(error));


});

app.get('/dining', function(req, res){
  console.log(req.query);
  // superagent.get(`https://developers.zomato.com/api/v2.1/geocode?lat=${req.query.latitude}&lng=${req.query.longitude}`)
  //   .set('user-key', process.env.ZOMATO_API_KEY)
  //   .then(stuffThatCameBack =>{
  superagent.get(`https://developers.zomato.com/api/v2.1/geocode`)
    .query({
      lat : req.query.latitude,
      lng: req.query.longitude
    })
    .set('user-key', process.env.ZOMATO_API_KEY)
    .then(stuffThatCameBack => {

      const data = stuffThatCameBack.body;
      const array = data.nearby_restaurants;
      const allRestaurants = [];
      array.forEach(restaurant => allRestaurants.push(new Restaurant(restaurant)));
      console.log(allRestaurants);
      res.send(allRestaurants);
    });




});

app.get('/dining2', function (req, res) {
  console.log(req.query);
  // superagent.get(`https://developers.zomato.com/api/v2.1/geocode?lat=${req.query.latitude}&lng=${req.query.longitude}`)
  //   .set('user-key', process.env.ZOMATO_API_KEY)
  //   .then(stuffThatCameBack =>{
  superagent.get(`https://developers.zomato.com/api/v2.1/geocode`)
    .query({
      lat: req.query.latitude,
      lng: req.query.longitude
    })
    .set('user-key', process.env.ZOMATO_API_KEY)
    .then(result => {
      res.send(result.body.nearby_restaurants.map(restaurant => new Restaurant(restaurant)));
    });




});

// ================= Callback Functions ========================

function Restaurant(object){
  this.restaurant = object.restaurant.name;
  this.cuisines= object.restaurant.cuisines;
  this.locality= object.restaurant.location.locality_verbose;
}

function GpsData(gpsObject){
  this.id = gpsObject.id;
  this.search_query = gpsObject.search_query;
  this.formatted_query = gpsObject[0].display_name;
  this.latitude = gpsObject[0].lat;
  this.longitude = gpsObject[0].lon;
  this.created_at = gpsObject.created_at;
}

function getThreeStudents(request, response) {
  response.send('William, Nick, Nick');
}

function checkIfTheyAreStudent(req, res) {
  console.log(req.query);
  console.log('the student is', req.query.student);
  console.log('the mountains  are', req.query.mountains);
}

function giveTreatToGinger(request, response) {
  console.log(request.query);
  console.log(`have a ${request.query.treat} Ginger`);
  response.send(`have a ${request.query.treat} Ginger`);
}

// Add error handling and start server
app.use('*', (request, response) => {
  response.status(404).send('The route you are looking for has been disconnected, We hope you have a nice day');
});

app.listen(PORT, () => console.log(`server is up on port: ${PORT}`));
