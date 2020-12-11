# Warm-Up Exercise
Read through this code as if you are the interpreter. Find all of the mistakes in this code and write down the correct syntax for each mistake.

## server.js

```
'use strict';

const express = require('express');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;
const client = new pg.Client(process.env.DATABASE_URL);

app.post('/' , (request, response) {
  let sql = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';

  let values = [request.body.username, request.body.password];
  
  client.query(sql, values)
    .then((result) => {
      response.send(result.rows[0]);
    })
})

client.connect();
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)}
);
```

## schema.sql

```
DROP TABLE IF EXISTS users

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255),
  age NUMERIC(3),
)
```
