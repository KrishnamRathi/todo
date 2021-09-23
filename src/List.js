import React, { useState } from 'react'
import Bin from './bin.png'
import Edit from './pencil.png'
import Delete from './delete.png'
import axios from 'axios';
import { TextField } from '@mui/material';

function List({ list, setList }) {
    const [isEditable, setIsEditable] = useState(null);
    const [edit, setEdit] = useState('');
    const deleteTodo = (id) => {
        axios.delete('http://localhost:5000/todo', {data: { _id: id }})
            .then(res => {
                if (res.status === 200) {
                    setList(list.filter((todo) => todo._id !== id));
                } else alert('Error!');
            })
            .catch(err => alert('Error!', err));

    }

    const editTodo = (id) => {
        axios.put('http://localhost:5000/todo', { _id: id, todo: edit })
            .then(res => {
                if (res.status === 200) {
                    alert("Todo edited successfully");
                    window.location.reload();
                } else alert('Error!');
            })
            .catch(err => alert('Error!', err));
    }
    return (
        <>
            {list.map((item, index) => (
                <div key={item._id}>
                    <div style={{ display: 'flex', width: '100%', minWidth: 300, backgroundColor: '#f0f0f0', padding: 10, borderRadius: 5, alignItems: 'center', justifyContent: 'space-between' }}>
                        {isEditable && isEditable === item._id ? <TextField id="standard-basic" value={edit} onChange={(e) => setEdit(e.target.value)} variant="standard" /> : <p>{item.body}</p>}
                        <div>
                            {isEditable && isEditable === item._id ? 
                                <img alt="edit_todo" style={{ marginRight: 20 }} src={Delete} height={25} width={25} onClick={() => {setIsEditable(null); editTodo(item._id)}} /> :
                                <img alt="edit_todo" style={{ marginRight: 20 }} src={Edit} height={25} width={25} onClick={() => {setIsEditable(item._id); setEdit(item.body)}} /> 
                                }
                            <img alt="delete_todo" src={Bin} height={25} width={25} onClick={() => deleteTodo(item._id)} />
                        </div>
                    </div>
                    <br />
                </div>
            ))}
        </>
    )
}

export default List
