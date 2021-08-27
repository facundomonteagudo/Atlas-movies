const ApiError = require('./api-error');

function apiErrorHandler(err, _, res) {
  if (err instanceof ApiError) {
    return res.status(err.code).json(err.message.errors);
  }

  return res.status(500).json('Something went wrong :(');
}

module.exports = apiErrorHandler;
