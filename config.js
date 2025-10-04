const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = 'Muha_778sergey';
const COUCHDB_CONFIG = `http://${ADMIN_LOGIN}:${ADMIN_PASSWORD}@127.0.0.1:5984`;
const PORT = 5000;
const DB_NAME = 'users';
const JWT_SECRET =
  '50f74c1cb4eee0cd5258fcd6d5bea9e65fcf37e201ccd73e5a88e000715eb718';
module.exports = {
  COUCHDB_CONFIG,
  PORT,
  DB_NAME,
  JWT_SECRET,
};
