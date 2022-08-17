import React, { useState } from 'react';
import './Todo.css';

const Todo = (props) => {
  const { name, isChecked, handleDelete, handleChange, id, toEdit } = props;

  const [editInput, setEditinput] = useState({});

  let nameClass = '';
  let inputClass = '';

  if (isChecked) {
    nameClass = 'row1-done';
  } else {
    nameClass = 'row1';
  }

  if (toEdit.hasOwnProperty(id)) {
    nameClass += ' hide';
    inputClass = 'row1';
  } else {
    inputClass = 'hide';
  }

  const handleEdit = (event, id) => {
    setEditinput((oldEditInput) => ({
      ...oldEditInput,
      [id]: event.target.value,
    }));
  };

  return (
    <ul id="todoList">
      <li>
        <ul className="todo-item">
          <li className={nameClass}>{name}</li>
          <li className={inputClass}>
            <input
              type="text"
              value={editInput[id] || name}
              onChange={(e) => handleEdit(e, id)}
            />
          </li>
          <li className="row2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => handleChange('check', id)}
            />

            <button
              className={inputClass === 'hide' ? 'hide' : 'confirmBtn'}
              onClick={() => handleChange('confirm', id, editInput[id])}
            >
              <i className="fa-solid fa-check"></i>
            </button>

            <button
              className={inputClass === 'hide' ? 'editBtn' : 'hide'}
              onClick={() => handleChange('edit', id)}
            >
              <i className="fa-solid fa-pen"></i>
            </button>

            <button className="deleteBtn" onClick={() => handleDelete(id)}>
              <i className="fa-solid fa-circle-minus"></i>
            </button>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default Todo;
