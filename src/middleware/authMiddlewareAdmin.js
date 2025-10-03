const authMiddlewareAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'No access rights' });
  }
  next();
};
module.exports = authMiddlewareAdmin;
