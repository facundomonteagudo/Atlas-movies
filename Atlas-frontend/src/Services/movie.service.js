import axiosInstance from './axios-instance';

export const fetchMovies = async () => {
  try {
    const { data } = await axiosInstance.get('/movies');
    if (!Array.isArray(data)) {
      return [];
    }
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchFavMovies = async (token) => {
  try {
    const { data } = await axiosInstance.get('/fav-movies', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!Array.isArray(data)) {
      return [];
    }
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const addFavMovie = async (id, token) => {
  try {
    await axiosInstance.post(
      '/add-favmovie',
      { idMovie: id },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteFavMovie = async (id, token) => {
  try {
    await axiosInstance.post(
      '/delete-favmovie',
      { idMovie: id },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

export const addMovie = async (movie, token) => {
  try {
    await axiosInstance.post(
      '/add-movie',
      {
        title: movie.title,
        description: movie.description,
        imageUrl: movie.image
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

export const editMovie = async (newMovie, token) => {
  try {
    await axiosInstance.put(
      '/edit-movie',
      {
        ...newMovie
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};
