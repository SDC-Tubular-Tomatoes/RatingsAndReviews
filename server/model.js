const db = require('./db')

const model = {};

model.retrieveReviews = (productId, page, count, sort) => {
  const args = [productId, page, count, sort];
  let query;
  if (sort === "newest") {
    query = `SELECT r.Review_id, rating, date, summary, body, recommend, reviewer_name, response, helpfulness,
    json_agg(json_build_object(
      'id', ReviewPhoto_id,
      'url', reviewPhoto_url)) as photos
    FROM Reviews r
    JOIN ReviewPhotos rp ON r.Review_id=rp.Review_id
    WHERE Product_id=$1
    GROUP BY r.Review_id
    ORDER BY date DESC
    LIMIT $3`;
  } else if (sort === "helpful") {
    query = `SELECT r.Review_id, rating, date, summary, body, recommend, reviewer_name, response, helpfulness,
    json_agg(json_build_object(
      'id', ReviewPhoto_id,
      'url', reviewPhoto_url)) as photos
    FROM Reviews r
    JOIN ReviewPhotos rp ON r.Review_id=rp.Review_id
    WHERE Product_id=$1
    GROUP BY r.Review_id
    ORDER BY helpfulness DESC
    LIMIT $3`;
  }
  return db
    .query(query, args)
    .then(res => {
      console.log(res); return res;
    })
    .catch(err => {
      console.log('ERROR RETRIEVING REVIEWS:', err);
    })
}

model.markReviewHelpful = (reviewId) => {
  const args = [reviewId];
  const query = `
  UPDATE Reviews
  SET helpfulness = helpfulness + 1
  SET reported = true
  WHERE Review_Id = $1`
  return db
    .query(query, args)
    .then(res => {
      console.log(res); return res;
    })
    .catch(err => {
      console.log('ERROR UPDATING REVIEW RECORD FOR HELPFUL FIELD:', err);
    })
}

model.markReviewReported = (reviewId) => {
  const args = [reviewId];
  const query = `
  UPDATE Reviews
  SET reported = true
  WHERE Review_Id = $1`;
  return db
    .query(query, args)
    .then(res => {
      console.log(res); return res;
    })
    .catch(err => {
      console.log('ERROR UPDATING REVIEW RECORD FOR REPORTED FIELD:', err);
    })
}


module.exports = model;