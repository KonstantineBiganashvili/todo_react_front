import React from 'react';
import './Header.css';

const Header = (props) => {
  const { handleInput, handleAdd, inputValue, errorsArray } = props;

  const errors = errorsArray.map((element) => {
    return <li>{element}</li>;
  });

  return (
    <header id="header">
      <h1>Todo React Application </h1>
      <ul id={errorsArray.length ? 'errors' : 'hidden'}>{errors}</ul>
      <div id="inputField">
        <input
          type="text"
          placeholder="Please enter a todo item"
          id="todoInput"
          value={inputValue}
          onInput={(e) => handleInput(e)}
        />
        <button id="addButton" onClick={handleAdd}>
          <i className="fa-solid fa-circle-plus"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
