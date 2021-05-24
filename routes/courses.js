const express = require('express');
const router = express.Router({ mergeParams: true });

const Course = require('../models/Course');
const advancedFilters = require('../middleware/advancedFilters');

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
  .post(createCourse);
router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
