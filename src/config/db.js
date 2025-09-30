const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

//-------------------------------
const nano = require('nano');
require('dotenv').config(); // Подключение dotenv для работы с .env

const couchdb = nano({
  url: process.env.COUCHDB_URI,
  requestDefaults: {
    auth: {
      username: process.env.COUCHDB_USERNAME,
      password: process.env.COUCHDB_PASSWORD,
    },
  },
});

// Пример использования
couchdb.db
  .list()
  .then((body) => {
    console.log('Databases:', body);
  })
  .catch((err) => {
    console.error('Error connecting to CouchDB:', err);
  });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
