const nano = require('nano');
const { COUCHDB_CONFIG, DB_NAME } = require('../../config');
const couch = nano(`${COUCHDB_CONFIG}`);

// Создание базы данных c именем dbName, если она не существует
const createDb = async (dbName) => {
  try {
    await couch.db.create(dbName);
    console.log(`Database '${dbName}' created.`);
  } catch (err) {
    if (err) {
      console.error('Error creating database:', err);
    }
  }
};
createDb(DB_NAME); //инициализация базы данных "users"
const userDB = couch.db.use(DB_NAME); // запуск базы данных "users"

// функция перечисляет все документы в базе данных "users"
const connectDB = async (userDB) => {
  try {
    const docList = await userDB.list();
    console.log('Databases:', docList);
  } catch (err) {
    console.error('Error connecting to CouchDB:', err);
  }
};

module.exports = { connectDB, userDB };
