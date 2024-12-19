const AppError = require('../utils/appError');

const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }

  // Programming errors
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = `${err.statusCode}`.startsWith('4') ? 'fail' : 'error';

  if (process.env.NODE_ENV.trim() === 'production') {
    let error = Object.create(
      Object.getPrototypeOf(err),
      Object.getOwnPropertyDescriptors(err)
    );

    if (err.code === 11000) {
      error = new AppError('Email already exists', 400);
    }
    if (error.name === 'ValidationError') {
      error = new AppError(error.message, 400);
    }

    if (error.name === 'CastError') {
      error = new AppError('Not found', 404);
    }

    return sendProdError(error, res);
  }
  sendDevError(err, res);
};
