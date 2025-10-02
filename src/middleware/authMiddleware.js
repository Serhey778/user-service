const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');

const authMiddleware = (req, res, next) => {
  //получение значения токина из заголовка запроса клиента
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'No token provided' });
  //проверка полученного токина
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' }); //запрос не санкционированный
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

module.exports = authMiddleware;
