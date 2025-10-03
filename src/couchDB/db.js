const nano = require('nano');
const { COUCHDB_CONFIG, DB_NAME } = require('../../config');
const couch = nano(`${COUCHDB_CONFIG}`);

// Создание базы данных c именем dbName, если она не существует
const createDb = async (dbName) => {
  try {
    await couch.db.destroy(dbName);
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

module.exports = userDB;
