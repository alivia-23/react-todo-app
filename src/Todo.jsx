import React, {useReducer, useState, useContext} from 'react';
import { fetchRemoveOneTask, fetchUpdateOneTask } from './services';
import ThemeContext from './ThemeContext';
import statusMessages from './statusMessages';

const Todo = ({ user, todos, todo, index, refreshTodos, onError }) => {
  const { theme, themes, refreshTheme } = useContext(ThemeContext);
  const buttonStyle = themes[theme]['buttonStyle'];
  const [edit, setEdit] = useState(false);
  const [editError, setEditError] = useState("");
  const [taskName, setTaskName] = useState(todo.taskName);
  const [prevTaskName, setPrevTaskName] = useState(todo.taskName);

  const deleteTodo = (taskId) => {
    fetchRemoveOneTask(user.username, taskId)
    .then( (response) => {
      const deletedTodo = response['data'];
      const newTodos = todos.filter(todo => todo.taskId !== deletedTodo.taskId);
      refreshTodos([...newTodos]);
    })
    .catch( (err) => {
       onError(statusMessages[err.message || 'DEFAULT']);
     })
  };

  const changeTodoStatus = (taskId, index) => {
     const todo = findTodo(taskId);
     const newTodo = {...todo, done: !todo.done};
     fetchUpdateOneTask(user.username, taskId, newTodo)
     .then( (response) => {
         const updatedTodo = response['data'];
         todos[index] = updatedTodo;
         refreshTodos([...todos]);
     })
     .catch( (err) => {
         onError(statusMessages[err.message || 'DEFAULT']);
     })
  };

   const changeTodoTaskName = (taskId) => {
      const todo = findTodo(taskId);
      const newTodo = {...todo, taskName: taskName};
      if(!taskName || taskName.trim() === "") {
         setEditError(statusMessages['EMPTY_TASKNAME']);
         return;
      }
      setEditError("");
      fetchUpdateOneTask(user.username, taskId, newTodo)
      .then( (response) => {
        setEdit(false);
        const updatedTodo = response['data'];
        todos[index] = updatedTodo;
        refreshTodos([...todos]);
      })
      .catch( (err) => {
        onError(statusMessages[err.message || 'DEFAULT']);
      })
   };

    const findTodo = (taskId) => {
       return todos.filter(todo => todo.taskId === taskId)[0];
    };

    const onCancel = () => {
      setEdit(false);
      setTaskName(prevTaskName)
      setEditError("");
    }

    const onEdit = () => {
      setEdit(true);
      setPrevTaskName(taskName);
    }

    let content;
    if(edit) {
      content =
        <>
          <span><input type="text" className="todo-name" value={taskName} onChange={ (e) => setTaskName(e.target.value) } /></span>
          <span><button className={buttonStyle} onClick={ () => changeTodoTaskName(todo.taskId)} >Save</button></span>
          <span><button className={buttonStyle} onClick={ () => onCancel()} >Cancel</button></span>
        </>
    } else {
        content =
          <>
            <span className={ todo.done? "todo-name-complete": "todo-name"}> {todo.taskName} </span>
            <span><button className={buttonStyle} onClick={ () => onEdit() }>Edit</button> </span>
          </>
    }

  return (
    <li key={todo.taskId} className="todo-row">
      <div className="edit-error">
          {editError}
      </div>
      <div className="todo">
        <span><input className="todo-done" type="checkbox" checked={todo.done} onChange={ e => changeTodoStatus(todo.taskId, index) } /></span>
          {content}
        <span ><button className="delete-todo" onClick={ e => deleteTodo(todo.taskId) }>X</button> </span>
      </div>
    </li>
  );
}

export default Todo;
