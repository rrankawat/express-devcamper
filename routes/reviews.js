const express = require('express');
const router = express.Router({ mergeParams: true });

const Review = require('../models/Review');
const advancedFilters = require('../middleware/advancedFilters');
const { protect, authorize } = require('../middleware/auth');

const { getReviews } = require('../controllers/reviews');

router.route('/').get(
  advancedFilters(Review, {
    path: 'bootcamp',
    select: 'name description',
  }),
  getReviews
);

module.exports = router;
