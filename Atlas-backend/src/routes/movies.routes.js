const express = require('express');

const { authToken, authAdmin } = require('../middleware/auth-token');
const {
  createMovie,
  editMovie,
  addFavMovie,
  deleteFavMovie
} = require('../controller/movies.controller');

const validateDto = require('../middleware/validate-dto');
const {
  movieSchema,
  favMovieSchema,
  editMovieSchema
} = require('../dto/movie-dto');

const router = express.Router();

router.post(
  '/add-favmovie',
  authToken,
  validateDto(favMovieSchema),
  addFavMovie
);

router.delete(
  '/delete-favmovie/:id',
  authToken,
  authAdmin,
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
  '/edit-movie/:id',
  authToken,
  authAdmin,
  validateDto(editMovieSchema),
  editMovie
);

module.exports = router;
