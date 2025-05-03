const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/logged-in');
const {updatePassword, updateAccountSettings} = require('../controllers/acc-controllers');

router.put('/update-password', isLoggedIn, updatePassword);
router.put('/update-account', isLoggedIn, updateAccountSettings);

module.exports = router;