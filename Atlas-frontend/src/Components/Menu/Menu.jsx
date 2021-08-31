import React from 'react';
import { useHistory } from 'react-router-dom';
import './Menu.css';

const Menu = ({ setAni }) => {
  const history = useHistory();

  const goTologin = () => {
    setAni(false);
    history.push('/login');
  };

  const goToRegister = () => {
    setAni(false);
    history.push('/signup');
  };

  return (
    <div className="box">
      <div className="fadeIn">
        <h1>ATLAS MOVIES</h1>
        <h4 className="menu-text">Already have an account ?</h4>
        <button className="btn" onClick={goTologin}>
          SIGN IN
        </button>
        <h4 className="menu-text">Don't have an account ?</h4>
        <button className="btn" onClick={goToRegister}>
          REGISTER
        </button>
      </div>
    </div>
  );
};

export default Menu;
