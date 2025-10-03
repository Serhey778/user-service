const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'No token provided' });
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Unauthorized' });
    req.userRole = decoded.role;
    req.userRole === 'user'
      ? (req.userId = decoded.id)
      : (req.userId = req.headers.id);
    next();
  });
};

module.exports = authMiddleware;
