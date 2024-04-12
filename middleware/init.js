const init = (req, res, next) => {
  req.context = {};
  return next();
};

module.exports = init;
