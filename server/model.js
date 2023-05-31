const db = require('./db')

const model = {};

model.retrieveReviews = (productId, page, count, sort) => {
  let sortQuery = 'helpfulness, date'
  if (sort = 'newest') { sortQuery = 'date' };
  if (sort = 'helpful') { sortQuery = 'helpfulness' };
  const offSet = (page - 1) * count;
  const args = [productId, offSet, count, sortQuery];
  let query = `
    SELECT r.Review_id, rating, date, summary, body, recommend, reviewer_name, response, helpfulness,
    json_agg(json_build_object(
      'id', ReviewPhoto_id,
      'url', reviewPhoto_url)) as photos
    FROM Reviews r
    JOIN ReviewPhotos rp ON r.Review_id=rp.Review_id
    WHERE Product_id=$1
    GROUP BY r.Review_id
    ORDER BY $4 DESC
    OFFSET $2 LIMIT $3`;

  return db
    .query(query, args)

};


model.retrieveMetaReviews = (productId) => {
  const args = [productId];
  /*
  const query1 = `
  SELECT rating, count
  FROM View_metaData_rating
  WHERE Product_Id=$1`;
  const query2 = `
  SELECT recommend, count
  FROM View_metaData_recommended
  WHERE Product_Id=$1`;
  const query3 = `
  SELECT characteristic_name, Characteristics_id, avg
  FROM View_metaData_characteristics
  WHERE Product_Id=$1`;
  */
  const query1 = `
  SELECT rating, COUNT(Review_Id)
  FROM Reviews
  WHERE Product_Id=$1
  GROUP BY rating;`;
  const query2 = `
  SELECT recommend, COUNT(Review_Id)
  FROM Reviews
  WHERE Product_Id=$1
  GROUP BY recommend;`;
  const query3 = `
  SELECT characteristic_name, c.Characteristics_id, AVG(characteristic_value)
  FROM ReviewCharacteristics rc
  JOIN Characteristics c ON rc.Characteristics_id=c.Characteristics_id
  WHERE c.Product_Id=$1
  GROUP BY characteristic_name, c.Characteristics_id`

  let arr = [
    db.query(query1, args),
    db.query(query2, args),
    db.query(query3, args)
  ]
  return Promise.all(arr);
};

/*
model.refreshMetadataMatView = () => {
  const query = `
  REFRESH MATERIALIZED VIEW matView_metaData_rating;
  REFRESH MATERIALIZED VIEW matView_metaData_recommended;
  REFRESH MATERIALIZED VIEW matView_metaData_characteristics;`
  return db.query(query);
};
*/


model.postReview = ( {product_id, rating, summary, body, recommend, name, email, photos, characteristics} ) => {

  return db.tx(async t => {

    const args1 = [product_id, rating, summary, body, recommend, '', new Date(), name, email, 0, false];
    const query1 = `
    INSERT INTO Reviews (Product_id, rating, summary, body, recommend, response, date, reviewer_name, reviewer_email, helpfulness, reported)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING Review_id`;
    const reviewId = await t.one(query1, args1, row => row.review_id);

    const query2 = `
    INSERT INTO ReviewPhotos (Review_id, reviewPhoto_url)
    VALUES ($1, $2)`;
    await photos.forEach(async url => {
      const args2 = [reviewId, url];
      await t.none(query2, args2);
    });

    const query3 = `
    INSERT INTO ReviewCharacteristics (Review_Id, Characteristics_id, characteristic_value)
    VALUES ($1, $2, $3)`;
    let characteristicsArr = [];
    for (let prop in characteristics) {
      characteristicsArr.push([reviewId, prop, characteristics[prop]]);
    }
    await characteristicsArr.forEach(async args3 => {
      await t.none(query3, args3);
    });
  });
};


model.markReviewHelpful = (reviewId) => {
  const args = [reviewId];
  const query = `
  UPDATE Reviews
  SET helpfulness = helpfulness + 1
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

/*
`INSERT INTO Reviews (Product_id, rating, summary, body, recommend, response, date, reviewer_name, reviewer_email, helpfulness, reported)
  VALUES (40347,2,'vrebe','dverg',true,'', '2021-01-22 18:32:47.82','test','test',12,false);`
  select currval('reviews_review_id_seq')


*/