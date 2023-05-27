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
  const productId = req.params.productID;
  model
    .retrieveMetaReviews(productId)
    .then((result) => {
      const responseData = {
        "product": productId,

      };
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