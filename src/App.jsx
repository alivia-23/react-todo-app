import React, { useState, useEffect} from 'react';
import { fetchGetSession, fetchReadAllTasks } from './services';
import statusMessages from './statusMessages';
import './todo.css';
import Login from './Login';
import Logout from './Logout';
import Todos from './Todos';
import AddTodo from './AddTodo';
import AppTitle from './AppTitle';
import Themes from './Themes'
import ThemeContext from './ThemeContext'


function App() {

  const defaultTheme = 'light';
  const [userState, setUserState] = useState({ isLoggedIn: false, theme: defaultTheme });
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  const themes = {
    light: {
      buttonStyle: 'light-theme-button',
      bodyBackground: '#fff7e6'
    },
    dark: {
      buttonStyle: 'dark-theme-button',
      bodyBackground: '#C0C0C0'
    },
    colorful: {
      buttonStyle: 'colorful-theme-button',
      bodyBackground: '#78428a'
    }
  }

  const getValidTheme = (theme) => {
    return Object.keys(themes).includes(theme) ? theme : defaultTheme;
  }

  useEffect( () => {
    fetchGetSession()
    .then( response => {
      let userInfo = response['data'];
      setUserState({
        ...userInfo, isLoggedIn: true, theme: getValidTheme(userInfo.theme)
      });
      setBodyColor(userInfo.theme);
      setError("");
    })
    .catch( (err) => {
       setError(statusMessages[err.message || 'DEFAULT']);
    });
  }, []);

  useEffect( () => {
    if(userState.isLoggedIn) {
      fetchReadAllTasks(userState.username)
      .then( response => {
        setTodos(Object.values(response['data']));
        setError("");
      })
      .catch( (err) => {
        setError(statusMessages[err.message || 'DEFAULT']);
      });
    }
  }, [userState]);

  const login = (userInfo) => {
    setUserState({
      ...userInfo, isLoggedIn: true, theme: getValidTheme(userInfo.theme)
    });
    setBodyColor(userInfo.theme);
    setError("");
  };

  const logout = () => {
    setUserState({
      isLoggedIn: false, theme: defaultTheme
    });
    setBodyColor(defaultTheme);
    setError("");
  };

  const refreshTodos = (todos) => {
    setTodos(todos);
    setError("");
  }

  const onAddSuccess = (todo) => {
    setTodos([...todos, todo]);
    setError("");
  };

  const onDeleteSuccess = (deletedTodo) => {
    const newTodos = todos.filter(todo => todo.taskId !== deletedTodo.taskId);
    setTodos(newTodos);
    setError("");
  }

  const onError = (error) => {
    setError(error);
  };

  const refreshTheme = (theme) => {
    setUserState({
      ...userState, theme: theme
    });
    setBodyColor(theme);
  }

  const setBodyColor = (theme) => {
    document.body.style.backgroundColor = themes[theme]['bodyBackground'];
  }

  let content;
  if(userState.isLoggedIn) {
    content =
       <div>
          <Themes user={userState} onError={onError}/>
          <Logout user={userState} onLogout={logout} />
          <div className="error">{error}</div>
          <AddTodo user={userState} onAddSuccess={onAddSuccess} onAddError={onError} />
          <Todos user={userState} todos={todos} refreshTodos={refreshTodos} onError={onError} />
      </div>
  } else {
      content = <Login onLogin={login} />
  }

  return (
    <div className="app">
      <ThemeContext.Provider value={  {theme: userState.theme, themes, refreshTheme} }>
        <AppTitle />
        {content}
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
