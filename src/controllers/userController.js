const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { userDB } = require('../config/db');
const { JWT_SECRET } = require('../../config');

// Регистрация пользователя
exports.registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.hashPassword(); // функция хэширует пароль

    const emailByResponse = await userDB.find({
      selector: { email: newUser.email },
      fields: ['email'], // указываем поле, которые хотим получить
    });
    //проверяем по email имеется newUser в userDB
    if (emailByResponse.docs.length === 0) {
      const insertResponse = await userDB.insert(newUser);
      res
        .status(201)
        .json({ message: 'User registered successfully:', insertResponse });
    } else {
      res.status(400).json({
        message:
          'User with such data is already registered, please change the email',
      });
    }
  } catch (err) {
    res.status(500).json({ error: 'Registration failed:', err });
  }
};

// Авторизация пользователя
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailResponse = await userDB.find({
      selector: { email: email },
      fields: ['_id', 'email', 'password'], // Получаем только нужные поля
    });
    //проверяем по email имеется newUser в userDB
    if (emailResponse.docs.length === 0) {
      res.status(404).json({
        message: 'User not found',
      });
    }
    const user = emailResponse.docs[0];
    // Сравнение паролей
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({
        message: 'Invalid password',
      });
    }
    //фомирование токина после всех проверок
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

// Получение пользователя по ID
exports.getUserById = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await userDB.find({
      selector: { _id: userId },
      fields: ['_id', 'fullName', 'dateOfBirth', 'email', 'role', 'password'],
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// Получение списка пользователей (только для админа)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Блокировка пользователя
exports.blockUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.isActive = false;
    await user.save();
    res.json({ message: 'User blocked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error blocking user' });
  }
};
