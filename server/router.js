const express = require('express');
const router = express.Router();

const controllers = require('./controllers');


router.get('/', controllers.getReviews);

//router.get('/meta', controllers.getMetadata);

//router.post('/', controllers.postReview);

//router.put('/:review_id/helpful', controllers.markReviewHelpful)

//router.put('/:review_id/report', controllers.markReviewReported)



module.exports = router;