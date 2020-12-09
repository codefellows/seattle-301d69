'use strict';

const express = require('express');
const cors = require('cors');
const superagent = require('superagent'); // superagent loosely equals $.ajax, it goes on the internet
const pg = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

const client = new pg.Client(DATABASE_URL);
client.on('error', (error) => console.error(error));

// ============== middleware ===============
app.use(cors());


// ================= Routes ====================================

app.get('/students', getThreeStudents);
app.get('/are-they-a-student', checkIfTheyAreStudent);
app.get('/ginger-treat', giveTreatToGinger);

app.get('/gps', function(req, res){ // if the search_query is already in the database ,just give them that one
  client.query('SELECT * FROM location WHERE search_query=$1', [req.query.city])
    .then(data => {
      if(data.rows.length > 0){
        // TODO: send them the stuff
        console.log(data.rows);
        console.log('need to send them stuff');
        res.send(data.rows[0]);
      } else {
        const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
        const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${req.query.city}&format=json`;

        superagent.get(url).then(whatComesBack => {
          const gpsData = whatComesBack.body;
          const instanceOfGpsData = new GpsData(gpsData);

          // TODO: store the new data if we had to go get it
          client.query(
            `INSERT INTO location 
            (search_query, latitude, longitude)
            VALUES ($1, $2, $3)`, [ req.query.city, instanceOfGpsData.latitude, instanceOfGpsData.longitude])
            .then(() => {
              res.send(instanceOfGpsData); // put a ./ when referencing files from a server.js
            });


        })
          .catch(error => console.log(error));
      }
    });
});

app.get('/dining', function(req, res){
  console.log(req.query);

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
  this.search_query = gpsObject.search_query;
  this.formatted_query = gpsObject[0].display_name;
  this.latitude = gpsObject[0].lat;
  this.longitude = gpsObject[0].lon;
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

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`server is up on port: ${PORT}`));
  })
  .catch(error => console.error(error));
