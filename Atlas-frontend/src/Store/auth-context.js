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
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const userIsLoggedIn = !!token;

  const loginHandler = (auth) => {
    setToken(auth.token);
    setRole(auth.role);
  };
  const logoutHandler = () => {
    setToken(null);
    setRole(null);
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
