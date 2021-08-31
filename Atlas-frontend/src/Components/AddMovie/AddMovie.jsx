/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import AuthContext from '../../Store/auth-context';
import { addMovie } from '../../Services/movie.service';

import Error from '../Error/Error';
import './AddMovie.css';

function AddMovie() {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addMovie(data, authCtx.token);
      history.push('/home');
    } catch (err) {
      setErrorMessage(err.message);
      setError(true);
    }
  };

  return (
    <>
      {!error ? (
        authCtx.role === 'admin' ? (
          <div className="add-movie-container">
            <h1 className="title-text">ADD MOVIE</h1>

            <form className="form-add-movie" onSubmit={handleSubmit(onSubmit)}>
              <label className="label-add-movie" htmlFor="title">
                Title
              </label>
              <input
                className="input-add-movie"
                type="text"
                {...register('title', {
                  required: { value: true, message: '* Title is required' },
                  maxLength: {
                    value: 20,
                    message: '* Maximum length of the title is 20 characters'
                  }
                })}
                id="title"
              />
              {errors.title && (
                <p className="form-error">{errors.title.message}</p>
              )}

              <label className="label-add-movie" htmlFor="description">
                Description
              </label>
              <textarea
                clasname="input-add-movie"
                {...register('description', {
                  required: {
                    value: true,
                    message: '* Description is required'
                  },
                  maxLength: {
                    value: 300,
                    message:
                      '* Maximum length of the description is 300 characters'
                  },
                  minLength: {
                    value: 10,
                    message:
                      '* Minimun length of the description is 10 characters'
                  }
                })}
                id="description"
                cols="20"
                rows="6"
              />
              {errors.description && (
                <p className="form-error">{errors.description.message}</p>
              )}

              <label className="label-add-movie" htmlFor="image">
                Image URL
              </label>
              <input
                className="input-add-movie"
                type="text"
                {...register('image', {
                  required: { value: true, message: '* Image URL is required' }
                })}
                id="image"
                defaultValue="https://linnea.com.ar/wp-content/uploads/2018/09/404PosterNotFound.jpg"
              />
              {errors.image && (
                <p className="form-error">{errors.image.message}</p>
              )}

              <button className="btn-add-movie">ADD MOVIE</button>
            </form>
          </div>
        ) : (
          <Redirect to="/home" />
        )
      ) : (
        <Error message={errorMessage} />
      )}
    </>
  );
}

export default AddMovie;
