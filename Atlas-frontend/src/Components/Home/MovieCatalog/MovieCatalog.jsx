import React, { useState, useEffect, useContext } from 'react';

import { fetchFavMovies, fetchMovies } from '../../../Services/movie.service';
import AuthContext from '../../../Store/auth-context';

import Error from '../../Error/Error';
import MovieCard from '../MovieCard/MovieCard';
import Spinner from '../../Spinner/Spinner';

const MovieCatalog = () => {
  const [movies, setMovies] = useState([]);
  const [favMovies, setFavMovies] = useState([]);

  const authCtx = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  let movieCatalog = <Spinner />;

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        if (authCtx.isLoggedIn) {
          setMovies(await fetchMovies());
          setFavMovies(await fetchFavMovies(authCtx.token));
        } else {
          setMovies(await fetchMovies());
        }
      } catch (error) {
        setErrorMessage(error.message);
        setError(true);
      }
    };
    fetchAllMovies();
  }, [authCtx.token, authCtx.isLoggedIn]);

  if (authCtx.isLoggedIn) {
    const favMoviesId = favMovies.map((movie) => movie.id);

    movieCatalog = movies.map((movie) => {
      if (favMoviesId.includes(movie.id)) {
        return <MovieCard key={movie.id} {...movie} isFav />;
      }
      return <MovieCard key={movie.id} {...movie} isFav={false} />;
    });
  } else {
    movieCatalog = movies.map((movie) => (
      <MovieCard key={movie.id} {...movie} isFav={false} />
    ));
  }
  return <>{!error ? movieCatalog : <Error message={errorMessage} />}</>;
};

export default MovieCatalog;
