// middleware/requireAdmin.js — requireAuth-er por use korte hobe; role "admin" na hole block kore
function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Shudhu admin ei kaj korte parbe' });
  }
  next();
}

module.exports = requireAdmin;
