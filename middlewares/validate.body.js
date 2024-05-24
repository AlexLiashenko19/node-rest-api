const { HttpError } = require("../helpers/index");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400));
    }
    next();
  };
  return func;
};

module.exports = {
  validateBody,
};
