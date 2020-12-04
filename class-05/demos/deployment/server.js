'use strict';

// For deployment
// 1. create an app
// 2. connect github
// 3. click the deploy button


// npm (node package manager) is what allows us to load libraries into a node environment / app
// 1. run npm init -this creates package.json
// 2. install all libraries with `npm install <libraryname>`

// code your server
// 1. load our dependencies
// 2. initialize the server
// 3. make it listen on a PORT

// give functionality to a server
// Add any Routes that you need
// A Route/Endpoint is a destination on the Server that can receive http and respond with data

// Load dependencies
const express = require('express');

// Global Variables
const app = express();
const PORT = process.env.PORT || 3000;

// configure app with middleware

// static hosting middleware, it allows you to host a website from the server
// this takes an argument of a folder path and serves all files there publicly
// it will live on '/' localhost:8080/
app.use(express.static('./public'));


// this triggers when someone visits localhost:3000/cookies
app.get('/cookies', function(requestPotato, responsePotato){
  console.log('I want an oreo');
  responsePotato.send('oreo');
});

app.get('/hello-world', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.get('/triangle', (request, response) => {
  // request is the predefined parameter
  // request.query is a predefined property on request, we don't affect it
  // request.query.ANYTHING is the key of they request query as defined by localhost:8080/triangle?ANYTHING='something'
  //       request.query.triangleSize === 5 ::
  //localhost:8080/triangle?triangleSize=5
  response.send(makeTriangle(request.query.triangleSize));
});

function makeTriangle(number){ // 2
  if(number <= 1 ){
    return '*';
  }
  let str = '';
  for(let i = 0; i < number; i++){
    str += '*';
  }
  str += '</br>';
  str += makeTriangle(number - 1);
  return str;
}


app.get('/starShark', (request, response) =>{

});

// function buildShark()

// Make it listen on a PORT
app.listen(PORT, () => console.log('yay the server actually started'));


