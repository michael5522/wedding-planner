/* eslint-disable */
const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error'); // eslint-disable-line

function authorizationMiddleware(req, res, next) {

  console.log('ola auth middleware');
  const gg = req.get('X-Access-Token');
  if (!gg) {
    throw new ClientError(401, 'authentication is required FDAFSFDS');
  }

  const payload = jwt.verify(gg, process.env.TOKEN_SECRET);
  console.log('111', payload);
  req.user = payload;
  next();

}

module.exports = authorizationMiddleware;
