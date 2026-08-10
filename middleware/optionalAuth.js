// middleware/optionalAuth.js — token thakle req.user set kore, na thakle-o request block kore na
const jwt = require('jsonwebtoken');

function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // invalid token hole shudhu ignore kora, request block na kora
    }
  }
  next();
}

module.exports = optionalAuth;
