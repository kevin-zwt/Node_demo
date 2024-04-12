const { handleResponse, handleError } = require("../utils/response");

const promiseMiddleware = (req, res, next) => {
  res.promise = (p) => {
    let promiseToResolve;
    if (p.then && p.catch) {
      promiseToResolve = p;
    } else if (typeof p === "function") {
      promiseToResolve = Promise.resolve().then(() => p());
    } else {
      promiseToResolve = Promise.resolve(p);
    }
    return promiseToResolve
      .then((data) => handleResponse(res, data))
      .catch((e) => handleError(res, e));
  };
  return next();
};
module.exports = {
  promiseMiddleware,
};
