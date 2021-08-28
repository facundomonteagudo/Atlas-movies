const ApiError = require('./api-error');

// eslint-disable-next-line no-unused-vars
function apiErrorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.code).json(err.message.errors);
  }

  return res.status(500).json('something went wrong :(');
}

module.exports = apiErrorHandler;
