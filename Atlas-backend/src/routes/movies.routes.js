const express = require('express');

const { authToken, authAdmin } = require('../middleware/auth-token');
const {
  createMovie,
  editMovie,
  addFavMovie,
  deleteFavMovie,
  getMovies,
  getFavMovies
} = require('../controller/movies.controller');

const validateDto = require('../middleware/validate-dto');
const {
  movieSchema,
  favMovieSchema,
  editMovieSchema
} = require('../dto/movie-dto');

const router = express.Router();

router.get('/movies', getMovies);
router.get('/fav-movies', authToken, getFavMovies);

router.post(
  '/add-favmovie',
  authToken,
  validateDto(favMovieSchema),
  addFavMovie
);

router.post(
  '/delete-favmovie',
  authToken,
  validateDto(favMovieSchema),
  deleteFavMovie
);

router.post(
  '/add-movie',
  authToken,
  authAdmin,
  validateDto(movieSchema),
  createMovie
);

router.put(
  '/edit-movie',
  authToken,
  authAdmin,
  validateDto(editMovieSchema),
  editMovie
);

module.exports = router;
