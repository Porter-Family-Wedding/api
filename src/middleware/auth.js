/* eslint "consistent-return": "off" */
import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
  const { JWT_SECRET } = process.env;

  const authorizationToken = req.header('Authorization');

  // make sure we get a token
  if (!authorizationToken) {
    res.send(401, 'No auth token passed');
    return next(false);
  }

  const tokenParts = authorizationToken.split(' ');
  const token = tokenParts[1];

  if (!(tokenParts[0].toLowerCase() === 'jwt' && token)) {
    res.send(401, 'JWT missing form authorization header');
    return next(false);
  }

  try {
    const options = {
      algorithm: 'HA256',
    };

    const { sub, permissions } = jwt.verify(token, JWT_SECRET, options);

    req.auth = {
      id: sub,
      permissions,
    };

    return next();
  } catch (err) {
    res.send(401, err.message || 'Internal server error.');
    return next(false);
  }
};