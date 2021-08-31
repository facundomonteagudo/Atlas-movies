const pool = require('../db/connect');

const getMovies = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, title, description, image FROM movies;'
    );
    res.status(200).json(rows);
  } catch {
    res.status(500).json('An unexpected error occurred in the database :(');
  }
};

const createMovie = async (req, res) => {
  const { title, description, imageUrl } = req.body;

  try {
    await pool.query(
      'INSERT INTO movies (title, description, image) VALUES (?, ?, ?);',
      [title, description, imageUrl]
    );
    res.status(200).json('Movie added succsefuly!');
  } catch {
    res.status(500).json('An unexpected error occurred in the database :(');
  }
};

const editMovie = async (req, res) => {
  const { title, description, imageUrl, id } = req.body;

  try {
    const [maxMovieid] = await pool.query(
      'SELECT id FROM movies ORDER BY id DESC LIMIT 1;'
    );

    if (maxMovieid[0].id < id) {
      return res.status(400).json('The id entered does not exist in the table');
    }
    await pool.query(
      'UPDATE movies SET title = ?, description = ?, image = ? WHERE id = ?;',
      [title, description, imageUrl, id]
    );

    return res.status(200).json('Updated successfully');
  } catch (error) {
    res.json('An unexpected error occurred in the database :(');
  }
};

const addFavMovie = async (req, res) => {
  const { idMovie } = req.body;
  const { id } = req.user;
  try {
    const [maxUserid] = await pool.query(
      'SELECT id FROM users ORDER BY id DESC LIMIT 1;'
    );
    const [maxMovieid] = await pool.query(
      'SELECT id FROM movies ORDER BY id DESC LIMIT 1;'
    );

    if (maxUserid[0].id < id || maxMovieid[0].id < idMovie) {
      return res.status(400).json('The id entered does not exist in the table');
    }

    await pool.query(
      'INSERT INTO fav_movies (id_user, id_movie) VALUES (?, ?);',
      [id, idMovie]
    );

    return res.status(200).json('Movie successfully added to favorites');
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res
        .status(400)
        .json('The movie is already in the favorite list of the user');
    }
    res.json('An unexpected error occurred in the database :(');
  }
};

const deleteFavMovie = async (req, res) => {
  const { idMovie } = req.body;
  const idUser = req.user.id;
  try {
    const [maxUserid] = await pool.query(
      'SELECT id FROM users ORDER BY id DESC LIMIT 1;'
    );
    const [maxMovieid] = await pool.query(
      'SELECT id FROM movies ORDER BY id DESC LIMIT 1;'
    );

    if (maxUserid[0].id < idUser || maxMovieid[0].id < idMovie) {
      return res.status(400).json('The id entered does not exist in the table');
    }

    await pool.query(
      'DELETE FROM fav_movies WHERE id_movie = ? AND id_user = ?;',
      [idMovie, idUser]
    );
    res.status(200).json('Movie removed successfully');
  } catch {
    res.status(500).json('An unexpected error occurred in the database :(');
  }
};

const getFavMovies = async (req, res) => {
  const { id } = req.user;
  let moviesIds = [];
  try {
    const [rowsId] = await pool.query(
      'SELECT id_movie FROM fav_movies WHERE id_user = ?;',
      [id]
    );

    if (!rowsId.length) {
      return res
        .status(200)
        .json('The user still has no favorite movies selected');
    }

    moviesIds = rowsId.map((movie) => movie.id_movie);

    const [rowsMovies] = await pool.query(
      'SELECT id, title, description, image FROM movies WHERE id IN (?);',
      [moviesIds]
    );

    res.status(200).json(rowsMovies);
  } catch (err) {
    res.status(500).json('An unexpected error occurred in the database :(');
  }
};

module.exports = {
  getMovies,
  getFavMovies,
  createMovie,
  editMovie,
  addFavMovie,
  deleteFavMovie
};
