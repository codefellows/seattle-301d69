'use strict';

//express is an active listener, it gets all the info from an incoming http request and decides how to respond
const express = require('express');
// like a security middleware, firewall
const cors = require('cors');
// superagent goes out onto the internet - talks to servers, it always initiates the conversation
const superagent = require('superagent');
// pg postgres, connects us to the database - allows us to run any sql command
const pg = require('pg');
// the file `.env` holds the environment variables, `dotenv` reads the `.env` file
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const TRAILS_API_KEY = process.env.TRAILS_API_KEY;

const client = new pg.Client(DATABASE_URL);

client.on('error', error => console.error(error));

app.use(cors());

// =========================== Routes ============================
app.get('/location', getLocation);
app.get('/weather', getWeather);
app.get('/trails', getTrails);


// =========================== Functions ============================

function getLocation(req, res){

  const city = req.query.city;

  client.query('SELECT * FROM location WHERE search_query=$1', [city])
    .then(result => ifDataThenSend(result, res))
    .then(result => ifNoDataThenGetFromApi(result, city))
    .then(apiResults => saveLocationApi(apiResults, city))
    .then(location => location && res.send(location));
}

function ifDataThenSend(result, res){
  if(result.rows.length !== 0){
    res.send(result.rows[0]);
  }
  return result;
}

function ifNoDataThenGetFromApi(result, city){
  if(!result.rows.length){
    return superagent.get(`https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${city}&format=json`);
  } else {
    return null;
  }
}

function saveLocationApi(apiResults, city){
  if(!apiResults) return null;
  const location = new Location(apiResults.body[0], city);
  // save it
  const sql = 'INSERT INTO location (search_query, latitude, longitude, formatted_query) VALUES ($1, $2, $3, $4)';
  client.query(sql, [location.search_query, location.latitude, location.longitude, location.formatted_query]);
  return location;
}


function getWeather(req, res) {
  const city = req.query.search_query;
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  console.log('starting');
  client.query('SELECT * FROM weather WHERE search_query=$1', [city])
    .then(result => {
      if(result.rows.length > 0){
        console.log('using stored weather');
        res.send(result.rows);
      } else {
        console.log('searching weather');
        superagent.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}&days=7&lang=en`)
          .then(data => {
            const weathers = data.body.data.map(obj => new Weather(obj, city));
            const promises = weathers.map(weather => {
              const sql = 'INSERT INTO weather (search_query, forecast, time) VALUES ($1, $2, $3)';
              return client.query(sql, [weather.search_query, weather.forecast, weather.time]);
            });
            Promise.all(promises)
              .then(() => res.send(weathers));
          })
          .catch(error => console.log(error));
      }
    });


}

function getTrails(req, res) {
  res.send([
    {
      'name': 'Rattlesnake Ledge',
      'location': 'Riverbend, Washington',
      'length': '4.3',
      'stars': '4.4',
      'star_votes': '84',
      'summary': 'An extremely popular out-and-back hike to the viewpoint on Rattlesnake Ledge.',
      'trail_url': 'https://www.hikingproject.com/trail/7021679/rattlesnake-ledge',
      'conditions': 'Dry: The trail is clearly marked and well maintained.',
      'condition_date': '2018-07-21',
      'condition_time': '0:00:00 '
    },
    {
      'name': 'Mt. Si',
      'location': 'Tanner, Washington',
      'length': '6.6',
      'stars': '4.4',
      'star_votes': '72',
      'summary': 'A steep, well-maintained trail takes you atop Mt. Si with outrageous views of Puget Sound.',
      'trail_url': 'https://www.hikingproject.com/trail/7001016/mt-si',
      'conditions': 'Dry',
      'condition_date': '2018-07-22',
      'condition_time': '0:17:22 '
    },
  ]);
}


function Location(obj, searchQuery){
  this.search_query = searchQuery;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
  this.formatted_query = obj.display_name;
}

function Weather(obj, searchQuery){
  this.search_query = searchQuery;
  this.forecast = obj.weather.description;
  this.time = obj.datetime;
}

function Trail(){

}


app.use('*', (req, res)=> {
  res.send('this is not the route you are looking for');
});

const listen = () => app.listen(PORT, () => console.log(`up on PORT : ${PORT}`));

client.connect()
  .then(listen);
