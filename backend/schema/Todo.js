const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const todoSchema = new Schema({
  id: ObjectId,
  body: String,
});

const Todo = new mongoose.model('Todo', todoSchema);
module.exports = Todo;