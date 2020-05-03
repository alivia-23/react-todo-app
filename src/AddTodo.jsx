import React, { useState, useContext } from 'react';
import { fetchAddOneTask } from './services';
import ThemeContext from './ThemeContext';
import statusMessages from './statusMessages';

const AddTodo = ({ user, onAddSuccess, onAddError}) => {
   const { theme, themes, refreshTheme } = useContext(ThemeContext);
   const buttonStyle = themes[theme]['buttonStyle'];
   const [text, setText] = useState("");

   const addTodo = (text) => {
     if(!text || text.trim() === "") {
       onAddError(statusMessages['EMPTY_TASKNAME']);
       return;
     }

     fetchAddOneTask(user.username, text)
     .then( (response) => {
       setText("");
       onAddSuccess(response['data']);
     })
     .catch( (err) => {
       onAddError(statusMessages[err.message || 'DEFAULT']);
     })
   }
   return (
    <div className="add-message">
        <input className="to-add" type="text" value={text} placeholder="Enter your text" onChange={ e => setText(e.target.value) } />
        <button className={buttonStyle} onClick={ () => addTodo(text) } >Add</button>
    </div>
  );
}
export default AddTodo;
