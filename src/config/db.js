const nano = require('nano');
const COUCHDB_CONFIG = require('../../config');

const couchDB = nano(`${COUCHDB_CONFIG}`);

const connectDB = async () => {
  try {
    const docList = await couchDB.db.list();
    console.log('Databases:', docList);
  } catch (err) {
    console.error('Error connecting to CouchDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
