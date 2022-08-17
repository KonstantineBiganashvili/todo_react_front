import Axios from 'axios';
import React, { useEffect, useState } from 'react';

import Header from '../Header';
import TodoList from '../TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [errorsArray, setErrorsArray] = useState([]);
  const [toEdit, setToEdit] = useState({});

  const url = 'http://127.0.0.1:8080';

  useEffect(() => {
    Axios.get(`${url}`).then((res) => {
      setTodos(res.data);
    });
  }, []);

  const handleChange = (string, id, name) => {
    setErrorsArray([]);

    todos.map((element) => {
      if (element.id === id) {
        if (string === 'check') {
          const newCheck = !element.checked;

          if (typeof newCheck === 'boolean') {
            Axios.patch(`${url}/${id}`, {
              checked: newCheck,
            }).then((response) => {
              setTodos(response.data);
            });
          } else {
            setErrorsArray((oldErrors) => [
              ...oldErrors,
              'Passed checkbox value must be a boolean',
            ]);
          }
        }
        if (string === 'edit') {
          setToEdit((oldEdits) => ({
            ...oldEdits,
            [id]: id,
          }));
        }
        if (string === 'confirm') {
          if (typeof name !== 'undefined') {
            const newEdits = toEdit;
            delete newEdits[id];
            setToEdit(newEdits);

            Axios.patch(`${url}/${id}`, {
              todoItem: name,
            }).then((response) => {
              setTodos(response.data);
            });
          } else {
            setErrorsArray((oldErrors) => [
              ...oldErrors,
              'Todo item must be changed to proceed!',
            ]);
          }
        }
      }

      return element;
    });
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleAdd = () => {
    setErrorsArray([]);

    if (typeof input === 'string' && input.trim()) {
      Axios.post(`${url}`, { todoItem: input }).then((response) => {
        setTodos(response.data);
      });
    } else {
      if (typeof input !== 'string') {
        setErrorsArray((oldErrors) => [
          ...oldErrors,
          'Entered todo item must be a string!',
        ]);
      }
      if (!input.trim()) {
        setErrorsArray((oldErrors) => [
          ...oldErrors,
          'You must enter a todo item!',
        ]);
      }
    }
  };

  const handleDelete = (id) => {
    todos.map((element) => {
      if (element.id === id) {
        Axios.delete(`${url}/${id}`).then((response) => {
          setTodos(response.data);
        });
      }

      return element;
    });
  };

  return (
    <div id="todoContainer">
      <Header
        handleInput={handleInput}
        handleAdd={handleAdd}
        inputValue={input}
        errorsArray={errorsArray}
      />
      <TodoList
        allTodos={todos}
        toEdit={toEdit}
        handleChange={handleChange}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
