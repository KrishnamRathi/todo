const express = require('express')
const app = express()
const mongoose = require('mongoose');
const url = "mongodb+srv://krishnam:todo1234@cluster0.jfmmm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const port = 5000
const Todo = require('./schema/Todo');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json())
app.use(cors())

mongoose.connect(url)
  .then((result) => {
    console.log("DB connected!");
    app.listen(port, () => {
      console.log(`app listening at http://localhost:${port}`)
    })
  })
  .catch((err) => console.log("Erro ", err));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/todo', (req, res) => { // Read
  const result = Todo.find({}, (err, todos) => {
    if(err) res.status(400).json({"message": 'Error'});
    else res.status(200).json(todos);

  });
})

app.put('/todo', (req, res) => { // Update
  Todo.updateOne({_id: req.body._id}, {body: req.body.todo}, (err, doc) => {
    if(err) res.status(400).json(err);
    else res.status(200).json(doc);
  })
})

app.post('/todo', (req, res) => { // Create
  const newTodo = new Todo({
    body: req.body.todo
  })
  newTodo.save();
  res.status(200).json(newTodo);
})

app.delete('/todo', (req, res) => { // Delete
  Todo.deleteOne({_id: req.body._id}, (err, result) => {
    if(err) {
      res.status(400).json({"message": "Unable to delete"});
    }else{
      res.status(200).json(result);
    }
  })
})

