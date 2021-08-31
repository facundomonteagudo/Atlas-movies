/* eslint-disable object-shorthand */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  role: '',
  isLoggedIn: false,
  login: (auth) => {},
  logout: () => {}
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const initialRole = localStorage.getItem('role');

  const [token, setToken] = useState(initialToken);
  const [role, setRole] = useState(initialRole);
  const userIsLoggedIn = !!token;

  const loginHandler = (auth) => {
    setToken(auth.token);
    setRole(auth.role);
    localStorage.setItem('token', auth.token);
    localStorage.setItem('role', auth.role);
  };
  const logoutHandler = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  const contextValue = {
    token: token,
    role: role,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
