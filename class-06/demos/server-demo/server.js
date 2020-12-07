'use strict';

// test how the the front end works by first sending the example from the trello board

// Overall Goal: get constructors as soon as possible that just have all undefined values, or default values you create. Then get the keys one by one

// common errors: error handling before routes (catch all before the all), don't install packages, we don't restart our server,

// if `nodemon` does not work, run `npm install -g nodemon` - if that does not work, get a ta

// TODO: make a server

// to get express we run `npm install express -S`
// this creates the package lock.json, it installs the package express and its dependencies
// it creates a line of code in our package.json `"express": "^4.17.1"` that would tell Nick M's computer to install express too
const express = require('express');
const cors = require('cors'); // Cross origin resource sharing - allow a frontend running from your computer to access a backend on your computer
require('dotenv').config(); // configures variables from `.env`
// npm install dotenv -S
// npm i dotenv -S

const app = express();
const PORT = process.env.PORT || 3000;

// ============== middleware ===============
// -things that happen in the middle of a request coming in and reaching a route (before it gets to our code)
app.use(cors());


// ================= Routes ====================================

app.get('/students', getThreeStudents);
app.get('/are-they-a-student', checkIfTheyAreStudent);
app.get('/ginger-treat', giveTreatToGinger);

// city explorer light routes
app.get('/gps', function(req, res){
  const gpsData = require('./data/location.json');
  const instanceOfGpsData = new GpsData(gpsData);

  console.log(instanceOfGpsData);

  res.send(instanceOfGpsData); // put a ./ when referencing files from a server.js
});

app.get('/dining', function(req, res){
  const data = require('./data/restaurants.json');
  const array = data.nearby_restaurants;
  const allRestaurants = [];
  array.forEach(restaurant => allRestaurants.push(new Restaurant(restaurant)));
  console.log(allRestaurants);
  res.send(allRestaurants);
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
  console.log(req.query); // an object that comes from express that always contains the data from a client's request
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
