const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (token === null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next(); // Continue to the next middleware or route
  });
}

module.exports = authenticateToken;
