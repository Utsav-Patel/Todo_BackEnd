const mongoose = require('mongoose');
const {MONGOOSE_URL} = require('./constant');
const {Todo} = require('./todoModel');

mongoose.connect(MONGOOSE_URL, (err) => {
  if(err){
    console.log('Connection Error');
    return ;
  }
  console.log('Successfully Connected');
});

addTodo = (todoObject, response) => {
  let key = mongoose.Types.ObjectId();
  const todo = new Todo({
    _id: key,
    isCompleted: todoObject.isCompleted,
    todo: todoObject.todo
  });

  todo.save(err => {
    if(err){
      console.log('Error in Adding todo');
      response.status(500).send('Could not add todo');
      return ;
    }
    console.log('todo added successfully');
    response.status(200).send(key);
  });
}

deleteTodo = (todoObject, response) => {
  Todo.deleteOne({
    _id: mongoose.Types.ObjectId(todoObject._id)
  }, (err) => {
    if(err){
      console.log('Error in deleting todo');
      console.log(err);
      response.status(500).send('Error in deleting todo');
      return ;
    }

    console.log('todo deleted successfully');
    response.status(200).send('todo deleted successfully');
  });
}

changeStateOfTodo = (todoObject, response) => {
  Todo.findByIdAndUpdate(mongoose.Types.ObjectId(todoObject._id), {
    isCompleted: !todoObject.isCompleted
  }, (err, todos) => {
    if(err){
      console.log('Error in changing state of todo');
      console.log(err);
      response.status(500).send('Error in changing state of todo');
      return ;
    }

    console.log('Todo Updated successfully');
    console.log(todos);
    response.status(200).send('Todo updated successfully');
  });
}

listAllTodos = (response) => {
  Todo.find({}).exec((err, todos) => {
    if(err){
      console.log('Error in retrieving all todos');
      console.log(err);
      response.status(500).send('Error in retrieving all todos');
      return ;
    }

    console.log('All todos retrieved successfully');
    console.log(todos);
    response.status(200).send(todos);
  });
}

module.exports = {
  addTodo,
  deleteTodo,
  changeStateOfTodo,
  listAllTodos,
}