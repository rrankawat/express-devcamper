const express = require('express');
const router = express.Router();
const Bootcamp = require('../models/Bootcamp');

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
  .post(createBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);
router.route('/:id/photo').put(bootcampUploadPhoto);

module.exports = router;
