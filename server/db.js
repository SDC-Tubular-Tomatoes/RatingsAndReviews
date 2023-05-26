require('dotenv').config();
const pgpModule = require('pg-promise');

const pgp = pgpModule();

const connection = {
  host: 'localhost',
  user: process.env.USER,
  database: 'reviews',
  password: process.env.PASSWORD,
  port: 5432,
};

const db = pgp(connection);
db.connect('SELECT * FROM reviews LIMIT 1')
  .then(() => console.log('CONNECTED TO THE DATABASE SUCCESSFULLY...'))
  .catch((err) => console.log('FAILED TO CONNECT TO THE DATABASE', err));

module.exports = db;