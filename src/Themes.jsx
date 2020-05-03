import React, {useContext} from 'react';
import { fetchUpdateTheme } from './services';
import ThemeContext from './ThemeContext';
import statusMessages from './statusMessages';

const Themes = ({user, onError}) => {

  const { theme, refreshTheme } = useContext(ThemeContext);
  const changeTheme = (value) => {
     fetchUpdateTheme(user.username, value)
     .then( () => {
        refreshTheme(value);
     })
     .catch( (err) => {
       onError(statusMessages[err.message || 'DEFAULT']);
     })
  }

  return (
    <div className="themes">
      Theme:
      <select className="themes-select" value={user.theme} onChange={ e => changeTheme(e.target.value) }>
        <option value="light">light</option>
        <option value="dark">dark</option>
        <option value="colorful">colorful</option>
      </select>
    </div>
  );
};

export default Themes;
