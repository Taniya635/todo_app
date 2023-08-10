import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import axios from 'axios'
import './Todo.css'

const TodoCard = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputPriority, setInputPriority] = useState('low');

  useEffect(() => {
    // Fetch existing todos from your backend or local storage
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios.get('https://abc-lg4s.onrender.com/post') // Replace with your API endpoint
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  };


  const handleAddTodo = () => {
    if (inputValue.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      priority: inputPriority,
    };

    // Update backend and UI
    axios.post('https://abc-lg4s.onrender.com/post', newTodo)
      .then(() => {
        setTodos([...todos, newTodo]);
        setInputValue('');
        setInputPriority('low'); // Reset priority to default
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
  };

  const handleDeleteTodo = (id) => {
    // Update backend and UI
    axios.delete(`https://abc-lg4s.onrender.com/post/${id}`)
      .then(() => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };



  const handleUpdateTodo = (id, newText, newPriority) => {
    // Update backend and UI
    axios.put(`https://abc-lg4s.onrender.com/post/${id}`, {
      text: newText,
      priority: newPriority,
    })
      .then(() => {
        const updatedTodos = todos.map(todo =>
          todo.id === id ? { ...todo, text: newText, priority: newPriority } : todo
        );
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
  };



  return (
    <div className='div'>
        <h1 className='heading'>Todo App</h1>
        <div className='input-section'>
        <input
            className='add'
            type="text"
            placeholder='add something...'
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
        />
        <select className='select'
            value={inputPriority}
            onChange={e => setInputPriority(e.target.value)}
        >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
        <button className='add-button' onClick={handleAddTodo} >Add Todo</button>
        </div>
        <TodoList
            todos={todos}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
        />
        </div>

  );
};

export default TodoCard;
