'use strict';

const express  = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const messages = [];

app.use(express.static('./public'));
app.use(express.urlencoded({extended: true})); // parsing the encoded key value pairs in the request
// urlencoded puts the data into request.body


// the POST method can store data encrypted in the url
// the GET method's purpose is to get data, the POST method's purpose is to save/ create new data

// on a GET, the client's data comes in the url in the request.query
// on a POST, the default data from the client comes encrypted and can be found in request.body


// the same url on a POST : http://localhost:3000/save-voice-message
// the same url on a GET  : http://localhost:3000/save-voice-message?from=asdf&to=asdf&phone=111-111-1111&message=asdf
app.post('/save-voice-message', saveVoiceMessage);
app.get('/contact-me', contactMe);

function saveVoiceMessage(req, res) {
  console.log(req.body);
  messages.push(req.body);
  res.send(messages);
}

function contactMe(req, res){
  console.log(req.query);
  res.send(req.query);
}


// http://localhost:3000/   ?from=asdf&to=asdf&phone=111-111-1111&message=asdf

app.listen(PORT, () => console.log(`up on PORT ${PORT}`));
