import { TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import './App.css';
import List from './List';

function App() {

  const [todo, setTodo] = useState('');
  const [list, setList] = useState([]);

  const addTodo = () => {
    if(!list) setList([todo])
    else setList([...list, todo])
    setTodo('');
  }

  return (
    <div className="App">
      <h1>TO-DO</h1>
      <TextField value={todo} onChange={(e) => setTodo(e.target.value)} id="filled-basic" label="Add todo" variant="filled" />
      <br/>
      <Button variant="contained" disabled={todo.length==0} onClick={() => addTodo()}>Add</Button>
      <br/>
      <List list={list} setList={setList}/>
    </div>
  );
}

export default App;
