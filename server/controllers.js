const express = require('express');
const axios = require('axios');
const model = require('./model');


const controllers = {};


controllers.getReviews = (req, res) => {
  const productId = req.query.product_id;
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  const sort = req.query.sort || 'newest';
  model
    .retrieveReviews(productId, page, count, sort)
    .then((result) => {
      const responseData = {
        "product": productId,
        "page": page,
        "count": count,
        "results": result,
      };
      res.json(responseData);
    })
    .catch((err) => {
      console.log('UNABLE TO PROCESS REQUEST', err);
      res.sendStatus(422);
    });
};



controllers.getMetadata = (req, res) => {
  const productId = req.query.product_id;
  model
    .retrieveMetaReviews(productId)
    .then((result) => {
      console.log(result);
      //aasembling the response object from received result from db
      let ratings = {};
      result[0].forEach(rating => {
        ratings[rating.rating] = rating.count
      });

      let recommended = {};
      result[1].forEach(recommend => {
        recommended[recommend.recommend] = recommend.count;
      })

      let characteristics = {};
      result[2].forEach(characteristic => {
        let name = characteristic.characteristic_name;
        characteristics[name] = {};
        characteristics[name].id = characteristic.characteristics_id;
        characteristics[name].value = characteristic.avg;
      })

      const responseData = {
        'product_id': productId,
        'ratings': ratings,
        'recommended': recommended,
        'characteristics': characteristics
      };
      //console.log(responseData);
      res.json(responseData);
    })
    .catch((err) => {
      console.log('UNABLE TO GET METADATA', err);
      res.sendStatus(422);
    });
}




controllers.postReview = (req, res) => {
  const data = {
    product_id: req.body.product_id,
    rating: req.body.rating || 5,
    summary: req.body.summary || '',
    body: req.body.body || '',
    recommend: req.body.recommend || false,
    name: req.body.name || '',
    email: req.body.email || '',
    photos: req.body.photos || [],
    characteristics: req.body.characteristics || {},
  };
};


controllers.markReviewHelpful = (req, res) => {
  const reviewId = req.params.review_id;
  model.markReviewHelpful(reviewId)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(422);
      console.error('FAILED TO MARK REVIEW AS HELPFUL')
    })
};

controllers.markReviewReported = (req, res) => {
  const reviewId = req.params.review_id;
  model.markReviewReported(reviewId)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(422);
      console.error('FAILED TO MARK REVIEW AS REPORTED')
    })
}


module.exports = controllers;