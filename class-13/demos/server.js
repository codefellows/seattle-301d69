// 1. Create a seed.sql and schema.sql to populate your database
// 2. use the data from the database to render your 'saved' books (your bookshelf)

// 3. create a detail route '/books/:id
// 4. render it with a page called detail.ejs

// 5. include a form for saving
// 6. after a search you click a submit button on a form and it will save that book

// 7. clean up the app by cleaning up the functions, the ejs files, and writing good css



'use strict';

const express = require('express');
require('dotenv').config();
const pg = require('pg');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3000;

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => console.error(error));

const todos = [
  new Todo('Pet Ginger', 'right after class', 'scritchy scratchy'),
  new Todo('Clean the Ceiling', 'tomorrow', 'soap and water')
];

app.use(methodOverride('_method')); // `_` is a symbol devs use to indicate this variable should not be changed and it is needed somewhere down the line
// all you need to add to the action of a form is _method="DELETE" or _METHOD="PUT"
// 1. change the action to have ?_method=DELETE
// 2. change the express method to be app.delete('/path', cb);


app.use(express.urlencoded({extended : true}));
app.use(express.static('./public'));
app.set('view engine', 'ejs');

// Routes

// '/anything/anythingelse/:PATH_VARIABLE
// whatever comes after the colon ':' is a dynamic piece of the url / route, anything can be placed there, we can read what it was
// to visit the route you MUST fill in that piece of the url

app.get('/', showTodos);
app.get('/todo/:index', showSingleTodo);
app.post('/todo', makeTodo);

app.delete('/delete-todo', deleteTodo);
app.put('/update-todo', updateTodo);

function updateTodo(req, res){
  // need to know?
  // ID, info we want to update (all the info);
  console.log(req.body);

  const sql = `
  UPDATE todo
  SET title=$2, due_date=$3, description=$4  
  WHERE id=$1
  `;
  const sqlArray = [req.body.id, req.body.title, req.body.due_date, req.body.description];
  client.query(sql, sqlArray)
    .then(() => {
      res.redirect('/todo/' + req.body.id);
    });
}

function deleteTodo(req, res) {
  client.query('DELETE FROM todo WHERE id=$1', [req.body.id])
    .then(() => res.redirect('/'));
}

function showTodos(req, res){
  client.query('SELECT * FROM todo')
    .then(result => {
      const todos = result.rows;
      res.render('index.ejs', { todos: todos });

    });
}

function showSingleTodo(req, res){
  client.query('SELECT * FROM todo WHERE id=$1', [req.params.index])
    .then(result => {
      const todo = result.rows[0];
      // const todo = todos[index];
      const index = req.params.index;
      // res.send(todos[index]);
      res.render('detail.ejs', { todo:  todo});
    });



}

function makeTodo(req, res){
  // todos.push(req.body);
  const title = req.body.title;
  const description = req.body.description;
  const due_date = req.body.due_date;
  client.query(
    'INSERT INTO todo (title, description, due_date) VALUES ($1, $2, $3)',
    [title, description, due_date]
  )
    .then(() => {
      res.redirect('/');
    });
}

function Todo (title, due_date, description){
  this.title = title;
  this.due_date = due_date;
  this.description = description;
}

client.connect().then(() => {
  app.listen(PORT, () => console.log(`up on ${PORT}`));
});
