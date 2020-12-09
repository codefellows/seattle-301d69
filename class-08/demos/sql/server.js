'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL=process.env.DATABASE_URL;
// DATABASE_URL=postgres://ncarignan:password@localhost:5432/cookies
// DATABASE_URL=postgres://<username>:<password>@localhost:5432/<your database>

const client = new pg.Client(DATABASE_URL);
client.on('error', error => console.error(error));

// Cookie Jar
const cookies = ['molasses'];

app.get('/cookies', (req, res) => {
  client.query('SELECT * FROM cookie')
    .then(data => {
      res.send(data.rows);
    });
});

app.get('/cookie', (req, res) => {
  // give a random cookie, if we provide a specific cookie, give that instead
  const index = cookies.indexOf(req.query.cookie);
  console.log(req.query, index);
  if (index !== -1){
    res.send(cookies.splice(index, 1));
  }
  console.log(cookies);
  const cookie = cookies.pop();
  console.log(cookie);
  res.send(cookie);
});

app.get('/bakeCookies', (req, res) =>{
  //add a cookie to the jar
  client.query('INSERT INTO cookie (name) VALUES($1)', [req.query.cookie])
    .then(() => {
      res.send('thanks for baking a cookie');
    });
});

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`app up on port :${PORT}`));
  })
  .catch(error => console.error(error));
