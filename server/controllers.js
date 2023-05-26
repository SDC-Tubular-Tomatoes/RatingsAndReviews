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

/*
controllers.getMetadata(req, res) => {
  const productId = req.params.productID;
  const options = {
    method: 'get',
    url: `${url}/reviews/meta?product_id=${productId}`,
    headers: {
      Authorization: token,
    }
  }
}

  "product": "40346",
    "page": 0,
    "count": 5,
    "results": [
        {
            "review_id": 1279314,
            "rating": 2,
            "summary": "summary",
            "recommend": true,
            "response": null,
            "body": "Aidan and Nam were here",
            "date": "2023-03-27T00:00:00.000Z",
            "reviewer_name": "Andrew",
            "helpfulness": 7,
            "photos": []
        }]
*/

module.exports = controllers;