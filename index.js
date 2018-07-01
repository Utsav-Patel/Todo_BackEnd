const {
  addTodo,
  deleteTodo,
  listAllTodos,
  changeStateOfTodo
} = require('./TodoController');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(cors({
//   origin: 'https://r74p24k7oo.codesandbox.io'
// }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (request, response) => listAllTodos(response));

app.post('/addTodo', (request, response) => addTodo(request.body, response));

app.post('/deleteTodo', (request, response) => deleteTodo(request.body, response));

app.get('/listAllTodos', (request, response) => listAllTodos(response));

app.post('/changeStateOfTodo', (request, response) => changeStateOfTodo(request.body, response));

const port = 3000;
app.listen(port);