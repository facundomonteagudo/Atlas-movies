import React, { useState, useEffect, useContext } from 'react';

import { fetchFavMovies } from '../../../Services/movie.service';
import AuthContext from '../../../Store/auth-context';

import Error from '../../Error/Error';
import MovieCard from '../MovieCard/MovieCard';

function FavMoviesCatalog() {
  const [movies, setMovies] = useState([]);
  const authCtx = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getMovies = async () => {
      try {
        setMovies(await fetchFavMovies(authCtx.token));
      } catch (error) {
        setErrorMessage(error.message);
        setError(true);
      }
    };
    getMovies();
  }, [authCtx.token]);

  return (
    <>
      {!error ? (
        movies.map((movie) => <MovieCard key={movie.id} {...movie} isFav />)
      ) : (
        <Error message={errorMessage} />
      )}
    </>
  );
}

export default FavMoviesCatalog;
