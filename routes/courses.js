const express = require('express');
const router = express.Router({ mergeParams: true });

const Course = require('../models/Course');
const advancedFilters = require('../middleware/advancedFilters');
const { protect, authorize } = require('../middleware/auth');

const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses');

router
  .route('/')
  .get(
    advancedFilters(Course, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getCourses
  )
  .post(protect, authorize('publisher', 'admin'), createCourse);
router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize('publisher', 'admin'), updateCourse)
  .delete(protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;
