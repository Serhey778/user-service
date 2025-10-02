const express = require('express');
const cors = require('cors');
const { connectDB, userDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { PORT } = require('../config');

const app = express();
app.use(cors());
app.use(express.json());

connectDB(userDB);

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
