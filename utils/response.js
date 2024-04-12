const handleResponse = (res, data) => res.status(data.status).send(data);
const handleError = (res, err = {}) =>
  res.status(err.status || 500).send({ error: err });
module.exports = {
  handleResponse,
  handleError,
};
