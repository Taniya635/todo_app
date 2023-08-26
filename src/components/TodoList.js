import React from 'react';
import Todo from './Todo';
import './Todo.css'

const TodoList = ({ todos, onDelete, onUpdate }) => {
  return (
    <div className='list'>
      {
      todos?.map(todo => (
        <div className='sub-list'>
            <Todo key={todo.id} todo={todo} onDelete={onDelete} onUpdate={onUpdate} />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
