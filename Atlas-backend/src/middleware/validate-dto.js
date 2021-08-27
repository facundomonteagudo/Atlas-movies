const ApiError = require('../error/api-error');

function validateDto(schema) {
  return async (req, _, next) => {
    try {
      const validatedBody = await schema.validate(req.body);

      req.body = validatedBody;
      next();
    } catch (err) {
      next(ApiError.badRequest(err));
    }
  };
}

module.exports = validateDto;
