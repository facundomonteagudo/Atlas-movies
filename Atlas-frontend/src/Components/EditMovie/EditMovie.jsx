/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import AuthContext from '../../Store/auth-context';
import { editMovie, fetchMovies } from '../../Services/movie.service';
import './EditMovie.css';
import Error from '../Error/Error';

function EditMovie() {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('1');

  useEffect(() => {
    let unmounted = false;
    async function getMovies() {
      const response = await fetchMovies();
      if (!unmounted) {
        setItems(
          response.map((movie) => ({
            label: movie.title,
            value: movie.id
          }))
        );
        setLoading(false);
      }
    }
    getMovies();
    return () => {
      unmounted = true;
    };
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await editMovie(data, authCtx.token);
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
          <div className="edit-movie-container">
            <h1 className="title-text">EDIT MOVIE</h1>

            <form className="form-edit-movie" onSubmit={handleSubmit(onSubmit)}>
              <select
                {...register('id')}
                disabled={loading}
                value={value}
                onChange={(e) => {
                  setValue(e.currentTarget.value);
                }}
              >
                {items.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <label className="label-add-movie" htmlFor="title">
                Title
              </label>
              <input
                className="input-add-movie"
                type="text"
                placeholder="new title"
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
                placeholder="new description"
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

              <label className="label-add-movie" htmlFor="imageUrl">
                Image URL
              </label>
              <input
                className="input-add-movie"
                type="text"
                {...register('imageUrl', {
                  required: { value: true, message: '* Image URL is required' }
                })}
                id="imageUrl"
                defaultValue="https://linnea.com.ar/wp-content/uploads/2018/09/404PosterNotFound.jpg"
              />
              {errors.imageUrl && (
                <p className="form-error">{errors.imageUrl.message}</p>
              )}

              <button className="btn-add-movie">EDIT MOVIE</button>
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

export default EditMovie;
