const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      msg: 'Validation Error',
      errors: Object.values(err.errors).map(error => error.message)
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      msg: 'Invalid ID format'
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      msg: 'Duplicate field value entered'
    });
  }

  res.status(500).json({
    msg: 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

module.exports = errorHandler; 