/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { registerUserService } from '../../../Services/user.service';

import Error from '../../Error/Error';
import Spinner from '../../Spinner/Spinner';
import './Register.css';

function Register() {
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerUserService(data);
      setLoading(false);
      history.push('/login');
    } catch (error) {
      setErrorMessage(error.message);
      setError(true);
    }
  };

  return (
    <>
      {!error ? (
        <div className="register-content">
          <button
            className="btn-cancel"
            onClick={() => {
              history.push('/');
            }}
          >
            X
          </button>
          <h1 className="title-text">WELCOME</h1>
          {!isLoading ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="email">Email</label>
              <input
                className="input-info"
                type="text"
                {...register('email', {
                  required: { value: true, message: '* Email is required' },
                  pattern: {
                    value: /^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/,
                    message: 'Please enter a valid email'
                  }
                })}
                id="email"
                placeholder="Email"
              />
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}

              <label htmlFor="name">username</label>
              <input
                className="input-info"
                id="name"
                type="text"
                {...register('name', {
                  required: { value: true, message: '* username is required' },
                  minLength: {
                    value: 3,
                    message: '* The username must be at least 3 characters long'
                  },
                  maxLength: {
                    value: 20,
                    message:
                      '* The username cannot be longer than 20 characters'
                  },
                  pattern: {
                    value: /^[a-zA-Z-]+$/,
                    message: '* Invalid username'
                  }
                })}
                placeholder="Username"
              />
              {errors.name && (
                <p className="form-error">{errors.name.message}</p>
              )}

              <label htmlFor="password">Password</label>
              <input
                className="input-info"
                type="password"
                {...register('password', {
                  required: { value: true, message: '* Password is required' },
                  minLength: {
                    value: 6,
                    message: '* The password must be at least 6 characters long'
                  },
                  maxLength: {
                    value: 20,
                    message:
                      '* The password cannot be longer than 20 characters'
                  }
                })}
                id="password"
                placeholder="Password"
              />
              {errors.password && (
                <p className="form-error">{errors.password.message}</p>
              )}
              <button>Register</button>
            </form>
          ) : (
            <Spinner />
          )}
        </div>
      ) : (
        <Error message={errorMessage} />
      )}
    </>
  );
}

export default Register;
