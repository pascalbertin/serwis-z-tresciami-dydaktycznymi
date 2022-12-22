const AppError = require("../helpers/AppError");
const { SERVER_ERROR } = require("../helpers/errorMessages");

const errorHandler = (error, req, res, next) => {

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      message: error.message,
      statusCode: error.statusCode
    });
  }

  return res.status(500).send(SERVER_ERROR);
};

module.exports = errorHandler;