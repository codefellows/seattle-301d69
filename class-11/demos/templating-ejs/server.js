'use strict';

const express = require('express');

const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs'); // express is going to be the one calling require('ejs')
// a view engine will be responsible for ALL rendering and likely ALL templating
// the views folder is looked for literally by `ejs` if it is called viewsPotato nothing will render

const holidayPresents = ['Monitor', 'Mac', 'Vacation', 'Swim Trunks', 'Desk Chair', 'Keyboard', 'Ps5'];

const theList = [
  { name: 'Nick A', naughtyOrNice: 'nice', present: 'Swim Trunks' },
  {name: 'James', naughtyOrNice: 'nice', present: 'Desk Chair'},
  {name: 'William', naughtyOrNice: 'nice', present: 'Keyboard'},
  {name: 'Alan', naughtyOrNice: 'nice', present: 'Ps5'},
  {name: 'Nick M', naughtyOrNice: 'nice', present: 'Monitor'},
  {name: 'Wondwosen', naughtyOrNice: 'nice', present: 'Mac'},
  { name: 'Seid', naughtyOrNice: 'nice', present: 'Vacation' },
];

app.get('/', getHome);
app.get('/gifts', getGifts);
app.get('/naughty-or-nice-list', getNaughtyOrNiceList);
app.post('/pokemon/pikachu', addPerson); // post lets me know this adds
app.get('/add-person', showPersonForm); // get lets me know it just shows a page

function showPersonForm(req, res){
  res.render('add-person.ejs');
}

function addPerson(req, res){
  theList.push(req.body); // I need urlEncloded {name, naughtyOrNice, present}

  // do I want to show data? (book app should show search results)
  res.render('personAdded.ejs', req.body);
  // do I just want to send them back to the naughty or nice list route
  // res.redirect('/naughty-or-nice-list');
}

function getNaughtyOrNiceList(req, res){

  res.render('naughtyList.ejs', {
    list: theList
  });
}

function getHome(req,res){
  res.render('index.ejs'); // this does not need a filepath, it looks directly in views
}

function getGifts(request, response){
  // response.send(holidayPresents);

  // Mustache.render takes in a html string and a data object
  // response.render takes in an argument of the file and an argument of the data object
  response.render('presents.ejs', {
    from: 'These are from Santa',
    holidayPresents : holidayPresents
  });
}

app.listen(3000, () => console.log('running on a hardcoded port of 3000'));
