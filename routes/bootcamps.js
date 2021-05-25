const express = require('express');
const router = express.Router();
const Bootcamp = require('../models/Bootcamp');

const { protect } = require('../middleware/auth');

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
  .post(protect, createBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);
router.route('/:id/photo').put(protect, bootcampUploadPhoto);

module.exports = router;
