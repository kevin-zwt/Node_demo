const createError = require("http-errors");

const withErrorHandling = (handler) => {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error)
      if (error.name == "ValidationError") {
        // res.promise({ status: 422, errors: error });
        const allErrors = error.details.reduce(
          (errors, currentValidation) =>
            Object.assign(errors, {
              [currentValidation.path[0]]: currentValidation.message,
            }),
          {}
        );
        res.promise({ status: 422, errors: allErrors });
      } else {
        // res.promise({ status: 500, errors: error });
        res.promise(Promise.reject(createError(500)));
      }
    }
  };
};

module.exports = {
  withErrorHandling,
};
