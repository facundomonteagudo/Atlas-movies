const yup = require('yup');

module.exports = {
  createSchema: yup.object().shape({
    name: yup
      .string()
      .required()
      .min(3, 'The name must be at least 3 characters long')
      .max(12, 'The name cannot be longer than 12 characters')
      .trim(),
    email: yup.string().required().email(),
    password: yup
      .string()
      .trim()
      .required()
      .min(6, 'The password must be at least 6 characters long')
      .max(20, 'The password cannot be longer than 20 characters')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
  }),

  loginSchema: yup.object().shape({
    email: yup.string().required().email(),
    password: yup
      .string()
      .trim()
      .required()
      .min(6, 'The password must be at least 6 characters long')
      .max(20, 'The password cannot be longer than 20 characters')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
  })
};
