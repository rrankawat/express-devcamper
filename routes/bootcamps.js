const express = require('express');
const router = express.Router();
const Bootcamp = require('../models/Bootcamp');

const { protect, authorize } = require('../middleware/auth');

// Include other resource routers
const couresRouter = require('./courses');

// Re-route into other resource routers
router.use('/:bootcampId/courses', couresRouter);

// Advanced Filtering
const advancedFilters = require('../middleware/advancedFilters');

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampUploadPhoto,
} = require('../controllers/bootcamps');

router.route('/radius/:zipCode/:distance').get(getBootcampsInRadius);
router
  .route('/')
  .get(advancedFilters(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);
router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), bootcampUploadPhoto);

module.exports = router;
