const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth');
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(protect, getMe);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetPassword/:resettoken').put(resetPassword);

module.exports = router;
