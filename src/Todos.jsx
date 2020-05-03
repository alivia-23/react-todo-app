import React, {useState, useContext} from 'react';
import descSortIcon from './Human-go-down.svg';
import ascSortIcon from './Human-go-up.svg';
import todoReducer from './todoReducer'
import Todo from './Todo'
import ThemeContext from './ThemeContext';
import { fetchReadAllTasks } from './services';
import statusMessages from './statusMessages';

const Todos = ({ user, todos, refreshTodos, onError }) => {

  const [searchName, setSearchName] = useState("");
  const [filterDone, setFilterDone] = useState(false);
  const { theme, themes, refreshTheme } = useContext(ThemeContext);
  const buttonStyle = themes[theme]['buttonStyle'];

  const sortByNameAsc = () => {
      const newTodos = todoReducer(
          todos,
          {
            type: 'sortByNameAsc'
          }
      );
      refreshTodos(newTodos);
  };

  const sortByNameDesc = () => {
      const newTodos = todoReducer(
          todos,
            {
              type: 'sortByNameDesc'
            }
      );
      refreshTodos(newTodos);
  };

  const sortByNotDoneFirst = () => {
      const newTodos = todoReducer(
        todos,
        {
          type: 'sortByNotDoneFirst'
        }
      );
      refreshTodos(newTodos);
  };

  const sortByDoneFirst = () => {
      const newTodos = todoReducer(
        todos,
        {
          type: 'sortByDoneFirst'
        }
      );
      refreshTodos(newTodos);
  };

  const refreshOriginalTodos = () => {
      fetchReadAllTasks(user.username)
      .then( response => {
        refreshTodos(Object.values(response['data']));
      })
      .catch( (err) => {
         onError(statusMessages[err.message]);
      });
   };

  const filterTodos = (selected) => {
      if(selected) {
          const newTodos = todoReducer(
             todos,
              {
                type: 'filterOutDone'
              }
           );
          setFilterDone(true);
          refreshTodos(newTodos);
      } else {
          setFilterDone(false);
          refreshOriginalTodos();
      }
  };

  return (
    <div className="todo-content">
        <div>
           <span ><button className={buttonStyle} onClick={ e => refreshOriginalTodos() }>Refresh</button></span>
        </div>
        <br/>
        <div>
          <span>
             Filter out completed tasks<input className="filter-todos" type="checkbox" onChange={ e => filterTodos(e.target.checked)} />
          </span>
        </div>
        <br/>
        <div>
          <div className="todo-done-header">
            <div>
              <span>Done</span>
              <span><img className="asc-sort-icon" alt="asc-sort-icon" src={ascSortIcon} onClick={sortByNotDoneFirst} /></span>
              <span><img className="desc-sort-icon" alt="desc-sort-icon" src={descSortIcon} onClick={sortByDoneFirst} /></span>
            </div>
          </div>
          <div className="todo-name-header">
            <div>
              <span>Name</span>
              <span><img className="asc-sort-icon" alt="asc-sort-icon" src={ascSortIcon} onClick={sortByNameAsc} /></span>
              <span><img className="desc-sort-icon" alt="desc-sort-icon" src={descSortIcon} onClick={sortByNameDesc} /></span>
            </div>
          </div>
        </div>
         <ul className="todos">
         {
           todos.map( (todo, index) => (
                (filterDone && !todo.done) || (!filterDone) ?
                 <Todo key={todo.taskId} user={user} todos={todos} todo={todo} index={index} refreshTodos={refreshTodos} onError={onError} /> : ''
           ))
         }
         </ul>
    </div>
  );
}

export default Todos;
