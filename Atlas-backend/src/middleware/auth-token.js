const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function authAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.sendStatus(403);
  }
  next();
}

module.exports = { authToken, authAdmin };
