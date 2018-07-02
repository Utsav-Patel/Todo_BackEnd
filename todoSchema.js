const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  todo: String,
  isCompleted: Boolean,
  _id: mongoose.Schema.Types.ObjectId
});

module.exports = {
  todoSchema
};