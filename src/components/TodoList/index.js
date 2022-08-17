import React from 'react';
import Todo from '../Todo';

const TodoList = (props) => {
  const { allTodos, handleChange, handleDelete, toEdit } = props;

  const todoItems = allTodos.map((element) => {
    return (
      <Todo
        key={element.id}
        id={element.id}
        name={element.todoItem}
        isChecked={element.checked}
        handleChange={handleChange}
        handleDelete={handleDelete}
        toEdit={toEdit}
      />
    );
  });

  return (
    <div id="todoTable">
      <div id="tableHead">
        <p className="row1">Todo Name</p>
        <p className="row2">Actions</p>
      </div>
      {todoItems}
    </div>
  );
};

export default TodoList;
