const yup = require('yup');

module.exports = {
  movieSchema: yup.object().shape({
    title: yup.string().min(1).max(20).trim().required(),
    description: yup.string().min(10).max(300).trim().required(),
    imageUrl: yup.string().min(10).max(150).trim().required()
  }),

  editMovieSchema: yup.object().shape({
    id: yup.number().min(1).required(),
    title: yup.string().min(1).max(20).trim().required(),
    description: yup.string().min(10).max(300).trim().required(),
    imageUrl: yup.string().min(10).max(150).trim().required()
  }),

  favMovieSchema: yup.object().shape({
    idMovie: yup.number().min(1).required()
  })
};
