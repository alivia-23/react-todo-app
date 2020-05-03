import React, {useContext} from 'react';
import ThemeContext from './ThemeContext';
import { fetchRemoveSession } from './services';

const Logout = ({ user, onLogout }) => {
  const { theme, themes, refreshTheme } = useContext(ThemeContext);
  const buttonStyle = themes[theme]['buttonStyle'];

  const logout = () => {
    fetchRemoveSession()
    .then( () => onLogout() )
    .catch((err) => {

    });
  };

  return (
    <div className='logout'>
      <span className="user-name" > {user.username} </span>
      <span> <button className={buttonStyle} onClick={logout}> Logout </button></span>
    </div>
  );
};

export default Logout;
