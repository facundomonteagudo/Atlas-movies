/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useForm } from 'react-hook-form';

const LoginForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Enter you Username</label>
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
      {errors.email && <p className="form-error">{errors.email.message}</p>}

      <label htmlFor="password">Enter you Password</label>
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
            message: '* The password cannot be longer than 20 characters'
          }
        })}
        id="password"
        placeholder="Password"
      />
      {errors.password && (
        <p className="form-error">{errors.password.message}</p>
      )}
      <button>LOGIN</button>
    </form>
  );
};

export default LoginForm;
