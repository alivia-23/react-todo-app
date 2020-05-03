import React, { useState } from 'react';
import { fetchCreateSession } from './services';
import statusMessages from './statusMessages';
import spinner from './spinner.svg';

const Login = ({ onLogin }) => {

  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const performLogin = () => {
    if(!username || username.trim() === "") {
      setError(statusMessages['login denied']);
      return;
    }
    setError('');
    setIsLoading(true);
    fetchCreateSession(username)
    .then( (response) => {
      setError('');
      onLogin(response['data']); // inform parent
    })
    .catch( (err) => {
      setError(statusMessages[err.message || 'DEFAULT']);
      setIsLoading(false);
    });
  };

  return (
    <div className="login">
      <p className="error">{error}</p>
      <div>
      <input onChange={ (e) => setUsername(e.target.value) }/>
      { isLoading ?
          <img alt="spinner" src={spinner}/> :
          <button onClick={ performLogin }>Login</button>
      }
      </div>
    </div>
  );

};

export default Login;
