const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message || err);
  
    res.status(err.status || 500).json({
      error: err.message || 'Something went wrong. Please try again later.',
    });
  };
  
  module.exports = errorHandler;
  