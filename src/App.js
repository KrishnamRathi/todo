import { TextField, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import './App.css';
import List from './List';
import axios from 'axios';

function App() {

  const [todo, setTodo] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    getTodos();
  }, [])

  const getTodos = async () => {
    axios.get('http://localhost:5000/todo', {
      headers: {
        "Content-Type": 'application/json'
      }
    })
      .then(res => {
        setList(res.data);
      })
      .catch(err => {
        alert("Error", err);
      })
  }

  const addTodo = () => {
    axios.post('http://localhost:5000/todo', { todo })
      .then(res => {
        if (res.status === 200) {
          if (!list) setList([res.data])
          else setList([...list, res.data]);
          setTodo('');
        }else alert("Error");
      })
      .catch(err => alert("Error", err));

  }

  return (
    <div className="App">
      <h1>TO-DO</h1>
      <TextField value={todo} onChange={(e) => setTodo(e.target.value)} id="filled-basic" label="Add todo" variant="filled" />
      <br />
      <Button variant="contained" disabled={todo.length === 0} onClick={() => addTodo()}>Add</Button>
      <br />
      {list.length === 0 ? <h2>No todos</h2> : null}
      <List list={list} setList={setList} />
    </div>
  );
}

export default App;
