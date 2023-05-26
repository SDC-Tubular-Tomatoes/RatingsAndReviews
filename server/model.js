const db = require('./db')

const models = {};

models.retrieveReviews = (productId, page, count, sort) => {
  const args = [productId, page, count, sort];
  let query;
  if (sort === "newest") {
    query = 'SELECT Review_id, rating, date, summary, body, recommend, reviewer_name, response, helpfulness FROM Reviews WHERE Product_id=$1 ORDER BY date DESC LIMIT $3';
  } else if (sort === "helpful") {
    query = 'SELECT Review_id, rating, date, summary, body, recommend, reviewer_name, response, helpfulness FROM Reviews WHERE Product_id=$1 ORDER BY helpfulness DESC LIMIT $3';
  }
  return db
    .any(query, args)
    .then(res => {
      console.log(res); return res;
    })
    .catch(err => {
      console.log('ERROR RETRIEVING REVIEWS:', err);
    })
}






module.exports = models;