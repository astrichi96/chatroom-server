const errorResponse = (error, req, res, next) => {
  return res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error'
    }
  });
};

module.exports = errorResponse;
