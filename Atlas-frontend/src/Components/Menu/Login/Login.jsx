import React, { useState, useEffect, useContext } from 'react';
import { Route, useHistory, Redirect } from 'react-router-dom';

import { loginUserService } from '../../../Services/user.service';
import AuthContext from '../../../Store/auth-context';

import LoginForm from './loginForm/LoginForm';
import Error from '../../Error/Error';
import Spinner from '../../Spinner/Spinner';
import './Login.css';

const Login = ({ setAni }) => {
  const history = useHistory();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    setAni(false);
    return () => setLoading(false);
  }, [setAni]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      authCtx.login(await loginUserService(data));

      history.replace('/home');
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      setError(true);
    }
  };

  return (
    <>
      {!error ? (
        <Route>
          {authCtx.isLoggedIn ? (
            <Redirect to="/home" />
          ) : (
            <div className="login-content">
              <button
                className="btn-cancel"
                onClick={() => {
                  history.push('/');
                }}
              >
                X
              </button>
              <h1 className="title-text">WELCOME BACK</h1>
              {isLoading ? <Spinner /> : <LoginForm onSubmit={onSubmit} />}
            </div>
          )}
        </Route>
      ) : (
        <Error message={errorMessage} />
      )}
    </>
  );
};

export default Login;
