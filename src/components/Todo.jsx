import React, { useState } from 'react';
import axios from 'axios';

const Todo = ({ todo, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(todo.text);
    const [editedPriority, setEditedPriority] = useState(todo.priority || 'low');
    var w = window.innerWidth;
    console.log(w);
    
    const handleEdit = () => {
      setIsEditing(true);
    };
    
    const handleSave = () => {
        // Send PUT request to update todo text and priority
        axios.put(`https://abc-lg4s.onrender.com/post/${todo.id}`, {
          text: editedText,
          priority: editedPriority,
        })
          .then(() => {
            onUpdate(todo.id, editedText, editedPriority);
            setIsEditing(false);
          })
          .catch(error => {
            console.error('Error updating todo:', error);
          });
      };

      const priorityColors = {
        low: 'green',   // Define your desired color codes here
        medium: 'orange',
        high: 'red',
      };
    
      const priorityStyle = {
        color: priorityColors[editedPriority] || 'black',
        fontWeight: 'bold',
      };
    
    

  return (
    <div className='main'>
      {isEditing ? (
        <>
          <div>
          <input
            className='input-edit'
            type="text"
            value={editedText}
            onChange={e => setEditedText(e.target.value)}
          />
          </div>
          <div>
          <select className='edit-select'
            value={editedPriority}
            onChange={e => setEditedPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          </div>
          <div>
          <button className='save-button' onClick={handleSave}>Save</button>
          </div>
        </>
         ) : (
            <div className='todo-item'>
              <div className='text'>
              <span >{todo.text}</span>
              </div>
              <div className='priority'>
              <span ><span style={{ color: priorityColors[todo.priority] }}>{todo.priority}</span></span>
              </div>
              
              <div className='buttons'>
              <button className='edit-button' onClick={handleEdit}>Edit</button>
              <button className='delete-button' onClick={() => onDelete(todo.id)}>Delete</button>
              </div>
              
            </div>
          )}
        </div>
  );
};

export default Todo;
