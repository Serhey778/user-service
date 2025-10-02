const createUser = require('../models/userModel');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { userDB } = require('../config/db');

// Регистрация пользователя
exports.registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.hashPassword(); // функция хэширует пароль

    const responseByEmeil = await userDB.find({
      selector: { email: newUser.email },
      fields: ['email'], // указываем поле, которые хотим получить
    });
    //проверяем по email имеется newUser в userDB
    if (responseByEmeil.docs.length === 0) {
      const responseInsert = await userDB.insert(newUser);
      res
        .status(201)
        .json({ message: 'User registered successfully:', responseInsert });
    } else {
      res.status(405).json({
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
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

// Получение пользователя по ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
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
