const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const authMiddlewareAdmin = require('../middleware/authMiddlewareAdmin');

// Регистрация (user, admin)
router.post('/register', userController.registerUser);

// Авторизация (user, admin)
router.post('/login', userController.loginUser);

// Получение пользователя по ID (user, admin)
router.get('/:id', authMiddleware, userController.getUserById);

// Получение списка пользователей (admin)
router.get(
  '/',
  authMiddleware,
  authMiddlewareAdmin,
  userController.getAllUsers
);

// Блокировка пользователя (user, admin)
router.put('/:id/block', authMiddleware, userController.blockUser);

module.exports = router;
