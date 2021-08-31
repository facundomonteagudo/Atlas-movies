import React, { useContext, useState, useEffect } from 'react';

import { addFavMovie, deleteFavMovie } from '../../../Services/movie.service';
import AuthContext from '../../../Store/auth-context';

import Error from '../../Error/Error';
import Star from '../../Svg/Star';

import './MovieCard.css';

const MovieCard = ({ id, title, description, image, isFav }) => {
  const [isFavMovie, setFavMovie] = useState(isFav);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setFavMovie(isFav);
  }, [isFav]);

  const authCtx = useContext(AuthContext);

  const isLogged = authCtx.isLoggedIn;

  const handleFavMovies = async () => {
    if (!isFavMovie) {
      try {
        await addFavMovie(id, authCtx.token);
        setFavMovie(true);
      } catch (error) {
        setErrorMessage(error.message);
        setError(true);
      }
    } else {
      try {
        await deleteFavMovie(id, authCtx.token);
        setFavMovie(false);
      } catch (error) {
        setErrorMessage(error.message);
        setError(true);
      }
    }
  };

  return (
    <>
      {!error ? (
        <div
          className="movie-card"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="card-info">
            <h1>{title}</h1>
            <p>{description}</p>
            {isLogged ? (
              <button
                onClick={handleFavMovies}
                className={`btn-movie ${isFavMovie ? 'fav-movie' : ''}`}
              >
                {`${isFavMovie ? 'REMOVE FROM FAVORITES' : 'ADD TO FAVORITES'}`}
                <Star />
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <Error message={errorMessage} />
      )}
    </>
  );
};

export default MovieCard;
