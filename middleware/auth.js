// middleware/auth.js — Request-er sathe thaka JWT token check kore, valid hole req.user set kore
const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization; // format: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Login kora dorkar (token pawa jay nai)' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid ba expire hoye geche' });
  }
}

module.exports = requireAuth;
