const AppError = require("../helpers/AppError");
const { SERVER_ERROR } = require("../helpers/errorCodes");
const { ENDPOINT_HTTP_METHOD_NOT_SUPPORTED } = require("../helpers/errorMessages");

const errorHandler = (req, res) => {
  throw new AppError(SERVER_ERROR, ENDPOINT_HTTP_METHOD_NOT_SUPPORTED, 400);
};

module.exports = {
  errorHandler
};