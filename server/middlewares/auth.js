const { verifyToken } = require('../../utils');
const isAuthenticated = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({
      statusCode: 401,
      error: 'Missing authentication'
    });
  }
  try {
    const token = authorization.split(' ')[1];
    verifyToken(token);
    next();
  } catch (error) {
    return res.status(401).send({
      statusCode: 401,
      error: 'Missing authentication'
    });
  }
};
module.exports = { isAuthenticated };
