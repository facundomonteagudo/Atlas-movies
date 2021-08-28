const ApiError = require('../error/api-error');

function validateDto(schema) {
  return async (req, res, next) => {
    try {
      const toValidate = { ...req.body, ...req.params };
      const validatedBody = await schema.validate(toValidate);
      req.body = validatedBody;
      next();
    } catch (err) {
      next(ApiError.badRequest(err));
    }
  };
}

module.exports = validateDto;
