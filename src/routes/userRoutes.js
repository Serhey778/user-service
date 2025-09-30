const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Регистрация
router.post('/register', userController.registerUser);

// Авторизация
router.post('/login', userController.loginUser);

// Получение пользователя по ID
router.get('/:id', authMiddleware, userController.getUserById);

// Получение списка пользователей (только для админа)
router.get('/', authMiddleware, userController.getAllUsers);

// Блокировка пользователя
router.patch('/:id/block', authMiddleware, userController.blockUser);

module.exports = router;
