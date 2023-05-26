const { Client } = require("pg");

const client = new Client({
  host: 'localhost',
  user: process.env.USER,
  database: 'reviews',
  password: process.env.PASSWORD,
  port: 5432,
});


client
  .connect()
  .then(() => console.log('connected'))
  .catch((err) => comnsole.error('connection error', err.stack))

const models = {};

models.retrieveReviews = (productId, page, count, sort) => {
  const args = [productId, page, count, sort];
  const query = 'SELECT (Review_id, rating, date, summary, body, recommend, reviewer_name, response, helpfulness) FROM Reviews WHERE Product_id=$1 ORDER BY date DESC LIMIT $3'
  return client
    .query(query, args)
    .then(res => {
      console.log(res.rows[0]);
    })
    .catch(err => {
      console.log(err.stack);
    })
}



module.exports = models;