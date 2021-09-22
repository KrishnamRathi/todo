import React from 'react'
import Bin from './bin.png'

function List({ list, setList }) {

    const deleteTodo = (item) => {
        setList(list.filter((todo) => todo !== item));
    }
    return (
        <>
            {list.map((item, index) => (
                <>
                    <div key={index} style={{ display: 'flex', width: 400, backgroundColor: '#f0f0f0', padding: 20, borderRadius: 5, alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>{item}</span>
                        <img src={Bin} height={25} width={25} onClick={() => deleteTodo(item)} />
                    </div>
                    <br/>
                </>
            ))}
        </>
    )
}

export default List
